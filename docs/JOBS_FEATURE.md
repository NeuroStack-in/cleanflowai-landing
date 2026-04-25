# Jobs Feature Implementation Documentation

## Overview

The Jobs feature enables automated, scheduled ERP-to-ERP data synchronization with built-in data quality (DQ) processing. It implements a complete ETL pipeline: **ERP Import → DQ Validation/Cleaning → ERP Export**, running on user-defined schedules (rate-based or cron).

**Core Capabilities:**
- Bi-directional ERP sync (QuickBooks ↔ Zoho Books)
- Incremental sync with state tracking (only changed records)
- Automated DQ processing with configurable rules
- Advanced column-level profiling and mapping
- Deduplication using primary keys
- Auto-pause on consecutive failures (5 strikes)
- Manual triggers and pause/resume controls

---

## Architecture

### Bounded Context Structure (DDD)

```
contexts/jobs/
├── domain/
│   ├── models/
│   │   └── job.py              # Job, JobRun, JobState, ProcessedRecord entities
│   ├── repositories/
│   │   └── job_repository.py   # Repository interfaces (no AWS imports)
│   └── exceptions.py
├── application/
│   ├── dto/
│   │   └── jobs_dto.py         # Request/response DTOs
│   └── use_cases/
│       ├── create_job.py       # Job CRUD operations
│       ├── update_job.py
│       ├── delete_job.py
│       ├── list_jobs.py
│       ├── get_job.py
│       ├── pause_resume_job.py
│       ├── trigger_job.py      # Manual job execution
│       ├── run_pipeline.py     # Pipeline orchestration
│       └── advanced_options.py # Import preview, profiling, presets, rules
├── infrastructure/
│   ├── repositories/
│   │   └── dynamodb_job_repository.py  # DynamoDB implementations
│   └── services/
│       ├── scheduler_service.py        # EventBridge Scheduler wrapper
│       └── pipeline_service.py         # Full ETL pipeline logic
└── presentation/
    ├── api/
    │   └── handler.py          # API Gateway handler (/jobs/*)
    └── orchestrator/
        └── handler.py          # EventBridge-triggered handler
```

---

## Domain Models

### Job Entity

```python
@dataclass
class Job:
    user_id: str
    job_id: str                    # job_{uuid}
    name: str                      # User-friendly name
    source: str                    # "quickbooks" | "zohobooks"
    destination: str               # "quickbooks" | "zohobooks"
    entities: List[str]            # ["customers", "invoices", "items", ...]
    frequency_type: str            # "rate" | "cron"
    frequency_value: str           # "1 hour" | "0 9 * * ? *"
    schedule_expression: str       # EventBridge expression
    schedule_name: str             # cleanflow-job-{user_id}-{job_id}
    dq_config: Dict[str, Any]      # DQ configuration (see below)
    status: JobStatus              # ACTIVE | PAUSED | AUTO_PAUSED | DELETED
    consecutive_failures: int      # Auto-pause after 5
    total_runs: int
    created_at: str
    updated_at: str
    export_config: Optional[Dict]  # Column mapping, batch size overrides
    batch_size: Optional[int]      # Default: 100
    last_run_at: Optional[str]
    last_run_status: Optional[str]
```

**DQ Config Structure:**
```python
# Automatic mode (default)
dq_config = {"mode": "default"}

# Advanced mode (custom columns/rules)
dq_config = {
    "mode": "custom",
    "columns": ["customer_name", "email", "phone"],  # Selected columns only
    "preset_id": "default_dq_rules",                 # Preset from UserSettings
    "rules": [                                       # Per-rule overrides
        {"rule_id": "invalid_email", "selected": True},
        {"rule_id": "numeric_as_text", "selected": False}
    ],
    "primary_key_field": "Id"  # Override for dedup
}
```

### JobRun Entity

Tracks execution history with detailed metrics per entity.

```python
@dataclass
class JobRun:
    job_id: str
    run_id: str                      # run_20260227153045_abc123de
    user_id: str
    status: RunStatus                # SUCCESS | FAILED | PARTIAL | NO_CHANGES | SKIPPED
    started_at: str
    completed_at: str
    duration_seconds: Decimal
    source_erp: str
    destination_erp: str
    entities: List[str]
    entity_results: Dict[str, Any]   # Per-entity breakdown (see below)
    total_records_imported: int
    total_records_exported: int
    trigger_source: str              # "eventbridge_scheduler" | "manual_trigger"
    error: Optional[str]
    processing_metadata: Dict        # Aggregate stats (avg DQ score, etc.)
```

**Entity Results Sample:**
```python
entity_results = {
    "customers": {
        "status": "SUCCESS",
        "records_imported": 150,
        "records_exported": 145,
        "new_records_count": 120,          # After dedup
        "skipped_duplicates_count": 30,
        "dq_score": 0.97,
        "rows_in": 150,
        "rows_out": 145,
        "rows_clean": 130,
        "rows_fixed": 15,
        "rows_quarantined": 5,
        "upload_id": "upload_abc123",
        "duration_seconds": 45.3,
        "sync_from": "2026-02-26T10:00:00Z",  # Last sync boundary
        "sync_to": "2026-02-27T15:30:00Z"     # Current sync boundary
    },
    "invoices": {
        "status": "FAILED",
        "error": "Zoho export failed: Invalid currency code in row 23"
    }
}
```

### JobState Entity (Incremental Sync)

```python
@dataclass
class JobState:
    job_id: str
    entity: str              # Composite with job_id for SK
    last_sync_time: str      # ISO timestamp of last successful sync
    updated_at: str
    sync_from: Optional[str] # Previous boundary (audit trail)
```

**How Incremental Sync Works:**
1. First run: No JobState → Full sync (no date filter)
2. Subsequent runs: Query `last_sync_time` for entity → Pass as `date_from` filter to ERP import
3. Update `last_sync_time` only on SUCCESS

### ProcessedRecord Entity (Deduplication)

```python
@dataclass
class ProcessedRecord:
    job_id: str                    # PK
    record_key: str                # SK: "{entity}#{pk_value}" (e.g., "customers#12345")
    processed_at: str
    upload_id: str
    run_id: str
    expires_at: Optional[int]      # TTL epoch (optional)
```

**Primary Key Detection:**
- QuickBooks: `Id` field for all entities
- Zoho Books: `contact_id` (customers/vendors), `invoice_id`, `item_id`, etc.
- Override: Set `dq_config["primary_key_field"]` for custom PK

---

## Infrastructure

### DynamoDB Tables (Shared Platform)


| Table | PK | SK | Purpose |
|-------|----|----|---------|
| **CleanFlowAI-Jobs** | `user_id` | `job_id` | Job configuration |
| **CleanFlowAI-JobState** | `job_id` | `entity` | Incremental sync cursors |
| **CleanFlowAI-JobRuns** | `job_id` | `run_id` | Execution history |
| **CleanFlowAI-ProcessedKeys** | `job_id` | `record_key` | Deduplication tracking |

### EventBridge Scheduler

- **Schedule Name:** `cleanflow-job-{user_id[:12]}-{job_id[:12]}`
- **Expression Examples:**
  - Rate: `rate(1 hour)`, `rate(5 minutes)`, `rate(1 day)`
  - Cron: `cron(0 9 * * ? *)` (daily at 9 AM UTC)
- **Target:** Job Orchestrator Lambda (async invocation)
- **Flexible Window:** 5-minute jitter to smooth out load
- **Payload:**
  ```json
  {
    "user_id": "user-123",
    "job_id": "job_abc456",
    "source": "eventbridge_scheduler"
  }
  ```

### Lambda Functions

#### 1. **Job Config Lambda** ([contexts/jobs/presentation/api/handler.py](contexts/jobs/presentation/api/handler.py))
- **Routes:** All `/jobs/*` API endpoints
- **Memory:** 512 MB
- **Timeout:** 120s (increased for import-preview/profiling)
- **Responsibilities:**
  - CRUD operations (create, update, delete, list, get)
  - Pause/resume (disable/enable schedule)
  - Manual trigger (async invoke orchestrator)
  - Advanced options (import-preview, profiling, presets, rules)
- **Permissions:**
  - DynamoDB: Read/Write Jobs, JobState, JobRuns
  - EventBridge Scheduler: Create/Update/Delete schedules
  - Lambda: Invoke orchestrator, ERP connector, DQ engine
  - IAM: PassRole for scheduler role

#### 2. **Job Orchestrator Lambda** ([contexts/jobs/presentation/orchestrator/handler.py](contexts/jobs/presentation/orchestrator/handler.py))
- **Trigger:** EventBridge Scheduler OR manual async invocation
- **Memory:** 1024 MB
- **Timeout:** 15 minutes
- **Responsibilities:**
  - Validate job status (skip if PAUSED/DELETED)
  - Delegate to PipelineService for full ETL execution
  - Record JobRun with entity-level results
  - Auto-pause on 5 consecutive failures
- **Permissions:**
  - DynamoDB: Read/Write Jobs, JobState, JobRuns, ProcessedKeys, FileRegistry, ERPConnections
  - Lambda: Invoke ERP connector + DQ engine
  - S3: Read/Write data bucket

---

## Workflow 1: Automatic Mode (Default)

**User Journey:**
1. User configures ERP connections (QuickBooks OAuth, Zoho Books API key)
2. User creates a job via `/jobs` POST with minimal config:
   ```json
   {
     "name": "QuickBooks to Zoho Sync",
     "source": "quickbooks",
     "destination": "zohobooks",
     "entities": ["customers", "invoices"],
     "frequency_type": "rate",
     "frequency_value": "1 hour",
     "dq_config": {"mode": "default"}
   }
   ```
3. Backend creates EventBridge schedule → Job runs every hour automatically

**Pipeline Execution (PipelineService.run):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ ORCHESTRATOR (Triggered by EventBridge Scheduler)                  │
├─────────────────────────────────────────────────────────────────────┤
│ 1. Validate job status (skip if PAUSED)                            │
│ 2. Create JobRun record (status=RUNNING)                           │
└────────────────┬────────────────────────────────────────────────────┘
                 │
    ┌────────────▼───────────┐
    │ FOR EACH ENTITY        │
    └────────────┬───────────┘
                 │
        ┌────────▼──────────────────────────────────────────┐
        │ PHASE 1: ERP IMPORT                               │
        ├───────────────────────────────────────────────────┤
        │ • Query JobState for last_sync_time               │
        │ • Invoke ERP connector Lambda with filters:       │
        │   - QuickBooks: { limit: 1000, date_from: ... }   │
        │   - Zoho Books: { limit: 1000, date_from: ... }   │
        │ • Receive: upload_id, records_imported            │
        │ • If records_imported=0 → Skip to next entity     │
        └────────┬──────────────────────────────────────────┘
                 │
        ┌────────▼──────────────────────────────────────────┐
        │ PHASE 2: DEDUPLICATION (Optional)                 │
        ├───────────────────────────────────────────────────┤
        │ • Extract primary keys from imported records      │
        │ • Batch check ProcessedKeys table                 │
        │ • Calculate: new_records = total - duplicates     │
        └────────┬──────────────────────────────────────────┘
                 │
        ┌────────▼──────────────────────────────────────────┐
        │ PHASE 3: DQ PROCESSING                            │
        ├───────────────────────────────────────────────────┤
        │ • Lookup s3_raw_key from FileRegistry             │
        │ • Invoke DQ Engine Lambda with:                   │
        │   - s3_raw_key, bucket, allow_autofix=true        │
        │   - dq_config (default or custom)                 │
        │ • Receive: dq_score, rows_out, quarantine stats   │
        │ • If rows_out=0 → Mark NO_EXPORTABLE_ROWS         │
        └────────┬──────────────────────────────────────────┘
                 │
        ┌────────▼──────────────────────────────────────────┐
        │ PHASE 4: ERP EXPORT                               │
        ├───────────────────────────────────────────────────┤
        │ • QuickBooks: Single batch (async mode)           │
        │ • Zoho Books: Batch loop with retries             │
        │   - Batch size: 100 (default) or job.batch_size   │
        │   - Max batches: 50                               │
        │   - Retry on timeout with exponential backoff     │
        │ • Receive: records_synced, failed_count           │
        │ • Zoho validation: Fail if partial failures       │
        └────────┬──────────────────────────────────────────┘
                 │
        ┌────────▼──────────────────────────────────────────┐
        │ PHASE 5: STATE UPDATE                             │
        ├───────────────────────────────────────────────────┤
        │ • Save JobState with new last_sync_time           │
        │ • Batch save ProcessedKeys for imported records   │
        │ • Update entity_results with SUCCESS metrics      │
        └───────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FINAL STATUS DETERMINATION                                          │
├─────────────────────────────────────────────────────────────────────┤
│ • All SUCCESS → Overall: SUCCESS                                    │
│ • All FAILED → Overall: FAILED                                      │
│ • Mixed → Overall: PARTIAL                                          │
│ • All NO_CHANGES → Overall: NO_CHANGES                              │
├─────────────────────────────────────────────────────────────────────┤
│ • If SUCCESS/NO_CHANGES/PARTIAL: Reset consecutive_failures=0      │
│ • If FAILED: Increment consecutive_failures                         │
│   → If consecutive_failures ≥ 5: AUTO_PAUSE job + disable schedule │
└─────────────────────────────────────────────────────────────────────┘
```

**Error Handling:**
- **Per-entity isolation:** One failed entity doesn't stop others
- **Auto-pause:** 5 consecutive failures → Job status=AUTO_PAUSED, schedule disabled
- **Zoho retries:** Timeout errors retry with fallback batch sizes (100 → 50 → 25 → 10 → 5 → 1)
- **Partial failures:** Zoho exports fail if ANY record fails (strict validation)

---

## Workflow 2: Advanced Options

**User Journey:**
1. User clicks "Create Job" → Wizard starts
2. **Step 1: Basic Config** (source, destination, entities, frequency)
3. **Step 2: Advanced Options** (optional column selection + DQ customization)

### Step 2A: Import Preview

**API:** `POST /jobs/import-preview`

**Request:**
```json
{
  "source": "quickbooks",
  "entity": "customers"
}
```

**Backend Flow:**
```
1. Invoke ERP connector with { limit: 10 }
2. Import sample (10 records) → S3 + FileRegistry
3. Read CSV header from S3 (first 2KB)
4. Extract columns: ["Id", "DisplayName", "CompanyName", "Email", ...]
```

**Response:**
```json
{
  "columns": ["Id", "DisplayName", "CompanyName", "Email", "PrimaryPhone"],
  "sample_rows": 10,
  "upload_id": "upload_preview_abc123",
  "records_imported": 10
}
```

**Frontend:** User sees column list → Selects subset for DQ processing

---

### Step 2B: Column Profiling

**API:** `POST /jobs/profiling`

**Request:**
```json
{
  "upload_id": "upload_preview_abc123",
  "columns": ["DisplayName", "Email", "PrimaryPhone"]  // Optional (profiles all if omitted)
}
```

**Backend Flow:**
```
1. Lookup s3_raw_key from FileRegistry
2. Invoke DQ Engine with action=profile_preview
3. DQ Engine:
   - Read sample_size=500 rows
   - Detect data types via LLM (Groq llama-4-maverick)
   - Cache LLM results in LLMCache table (7-day TTL)
   - Return per-column statistics
```

**Response:**
```json
{
  "profiles": {
    "DisplayName": {
      "data_type": "string",
      "null_count": 0,
      "unique_count": 498,
      "avg_length": 32.5,
      "recommended_rules": ["leading_trailing_whitespace", "excessively_long_text"]
    },
    "Email": {
      "data_type": "email",
      "null_count": 12,
      "unique_count": 486,
      "invalid_count": 3,
      "recommended_rules": ["invalid_email", "missing_required"]
    },
    "PrimaryPhone": {
      "data_type": "phone_number",
      "null_count": 45,
      "formats_detected": ["US", "UK"],
      "recommended_rules": ["invalid_phone"]
    }
  }
}
```

**Frontend:** User sees per-column stats → Enables/disables specific rules

---

### Step 2C: List Presets

**API:** `GET /jobs/presets`

**Backend:** Queries UserSettings table for system + user presets

**Response:**
```json
{
  "presets": [
    {
      "preset_id": "default_dq_rules",
      "preset_name": "Default Data Quality Rules",
      "is_default": true,
      "is_system": true,
      "config": {
        "policies": {"strictness": "balanced", "unknown": "safe_cleanup_only"},
        "auto_fix": true
      }
    },
    {
      "preset_id": "user_strict_preset",
      "preset_name": "My Strict Validation",
      "is_default": false,
      "is_system": false,
      "config": { ... }
    }
  ]
}
```

**Frontend:** User selects preset from dropdown

---

### Step 2D: List Rules

**API:** `GET /jobs/rules`

**Backend:** Returns static list of 18 global DQ rules (hardcoded in `ListRulesUseCase`)

**Sample Rules:**
- `duplicate_primary_key` (severity: fatal)
- `invalid_email` (severity: medium)
- `sql_injection_pattern` (severity: high)
- `leading_trailing_whitespace` (severity: medium, default_selected: true)

**Frontend:** User toggles rules on/off → Builds custom `dq_config`

---

### Final DQ Config (Advanced Mode)

```json
{
  "mode": "custom",
  "columns": ["DisplayName", "Email", "PrimaryPhone"],
  "preset_id": "default_dq_rules",
  "rules": [
    {"rule_id": "invalid_email", "selected": true},
    {"rule_id": "invalid_phone", "selected": true},
    {"rule_id": "numeric_as_text", "selected": false}
  ]
}
```

**Runtime Behavior:**
- DQ Engine processes ONLY `columns` (ignores others)
- Applies preset as baseline + rule overrides
- Disabled rules in `global_disabled_rules` are skipped

---

## API Endpoints

### Job CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/jobs` | Create job (returns job_id + creates schedule) |
| `GET` | `/jobs` | List user's jobs |
| `GET` | `/jobs/{job_id}` | Get job details |
| `PUT` | `/jobs/{job_id}` | Update job (reschedules if frequency changed) |
| `DELETE` | `/jobs/{job_id}` | Delete job + schedule + state |

### Job Actions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/jobs/{job_id}/pause` | Disable schedule (status=PAUSED) |
| `POST` | `/jobs/{job_id}/resume` | Enable schedule (status=ACTIVE) |
| `POST` | `/jobs/{job_id}/trigger` | Manual run (async invoke orchestrator) |
| `GET` | `/jobs/{job_id}/runs` | List execution history |

### Advanced Options

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/jobs/import-preview` | Import 10 sample records from ERP |
| `POST` | `/jobs/profiling` | Profile columns (data types, stats) |
| `GET` | `/jobs/presets` | List available DQ presets |
| `GET` | `/jobs/rules` | List global DQ rules |

---

## Key Implementation Details

### 1. Deduplication Strategy

**Problem:** Incremental syncs may re-import unchanged records (ERP APIs filter by `ModifiedDate`, but some systems update metadata without content changes).

**Solution:** Track processed primary keys in `ProcessedKeys` table.

```python
# Extract PKs from import result
def _extract_primary_keys(import_result, job, entity):
    pk_field = _get_primary_key_field(job, entity)  # "Id" or "contact_id"
    records = import_result.get("records", [])
    return [str(rec[pk_field]) for rec in records if pk_field in rec]

# Check for duplicates
already_processed = processed_key_repo.batch_check(job_id, entity, imported_keys)
new_records = total_imported - len(already_processed)

# Save processed keys on success
processed_key_repo.batch_save(job_id, entity, imported_keys, run_id, upload_id)
```

**Benefits:**
- Prevents redundant exports
- Tracks `new_records_count` vs `skipped_duplicates_count` in metrics
- TTL support (optional auto-cleanup)

---

### 2. Zoho Books Export Batching

**Challenge:** Zoho API is rate-limited and timeout-prone.

**Solution:** Adaptive batching with retries and fallback sizes.

```python
# Batch loop
attempts = [100, 50, 25, 10, 5, 1]  # Fallback sizes
for round in range(1, max_attempts + 1):
    offset, batch_count = 0, 0
    while batch_count < max_batches:
        result = invoke_erp_export(batch_size=attempts[0], offset=offset)
        total_synced += result["records_synced"]
        if not result["has_more"]:
            return final_result
        offset = result["next_offset"]
        batch_count += 1
```

**Retry Logic:**
- Timeout errors → Wait 2s, 4s, 6s... → Retry with smaller batch
- Max 50 batches per entity (safety limit)
- Strict validation: Any failed record → Fail entire export

---

### 3. EventBridge Scheduler Lifecycle

**Create Job:**
```python
schedule_expr = scheduler.validate_and_build_expression("rate", "1 hour")
schedule_name = scheduler.create_or_update(user_id, job_id, schedule_expr, enabled=True)
job.schedule_name = schedule_name  # Save for future updates
```

**Update Frequency:**
```python
new_schedule_expr = scheduler.validate_and_build_expression("cron", "0 9 * * ? *")
scheduler.create_or_update(user_id, job_id, new_schedule_expr, enabled=True)
# EventBridge updates existing schedule (no delete needed)
```

**Delete Job:**
```python
scheduler.delete(user_id, job_id)
# Also deletes JobState for all entities
job_state_repo.delete_all_for_job(job_id)
```

**Auto-Pause:**
```python
if consecutive_failures >= 5:
    job_repo.update_status(user_id, job_id, "AUTO_PAUSED")
    scheduler.set_enabled(user_id, job_id, schedule_expr, enabled=False)
```

---

### 4. LLM Integration (Advanced Options)

**Column Type Detection:**
- Groq API: `meta-llama/llama-4-maverick-17b-128e-instruct`
- Caches results in `LLMCache` table (7-day TTL)
- Cache key: `hash(sample_data + column_name)`
- Fallback: Regex-based heuristics if LLM fails

**Custom Rules:**
- User provides natural language prompt (e.g., "Flag amounts > $10,000")
- LLM generates Python code → Executed via `code_executor.py`
- Stored in `dq_config["custom_rules"]`

---

## DQ Config Examples

### Automatic Mode (No Customization)

```json
{
  "name": "Daily Sync",
  "source": "quickbooks",
  "destination": "zohobooks",
  "entities": ["customers"],
  "frequency_type": "rate",
  "frequency_value": "1 day",
  "dq_config": {"mode": "default"}
}
```
→ All columns processed, all default rules enabled

---

### Advanced Mode (Column Selection)

```json
{
  "name": "Customer Email Validation",
  "source": "quickbooks",
  "destination": "zohobooks",
  "entities": ["customers"],
  "frequency_type": "rate",
  "frequency_value": "1 hour",
  "dq_config": {
    "mode": "custom",
    "columns": ["DisplayName", "Email", "CompanyName"],
    "preset_id": "default_dq_rules"
  }
}
```
→ Only 3 columns processed (others ignored)

---

### Advanced Mode (Rule Overrides)

```json
{
  "dq_config": {
    "mode": "custom",
    "preset_id": "default_dq_rules",
    "rules": [
      {"rule_id": "invalid_email", "selected": true},
      {"rule_id": "leading_trailing_whitespace", "selected": true},
      {"rule_id": "numeric_as_text", "selected": false},
      {"rule_id": "excessively_long_text", "selected": false}
    ]
  }
}
```
→ Enables email validation + whitespace cleanup, disables numeric/length checks

---

### Advanced Mode (Custom Primary Key)

```json
{
  "dq_config": {
    "mode": "custom",
    "primary_key_field": "CustomerNumber"  // Override default "Id"
  }
}
```
→ Deduplication uses `CustomerNumber` instead of `Id`

---

## Monitoring and Observability

### JobRun Metrics

**Per-Entity Breakdown:**
```json
{
  "entity_results": {
    "customers": {
      "status": "SUCCESS",
      "records_imported": 500,
      "records_exported": 480,
      "new_records_count": 450,
      "skipped_duplicates_count": 50,
      "dq_score": 0.96,
      "rows_clean": 400,
      "rows_fixed": 80,
      "rows_quarantined": 20,
      "duration_seconds": 67.4
    }
  }
}
```

**Aggregate Metadata:**
```json
{
  "processing_metadata": {
    "avg_dq_score": 0.94,
    "entities_processed": 2,
    "entities_failed": 1,
    "entities_no_changes": 0,
    "total_new_records": 720,
    "total_skipped_duplicates": 85
  }
}
```

---

### CloudWatch Logs

**Orchestrator Lambda:** `/aws/lambda/JobsContextOrchFn`
- Pipeline start/end markers
- Per-entity timing
- Error tracebacks

**DQ Engine Lambda:** `/aws/lambda/DQEngineProcessor`
- Rule execution results
- LLM cache hits/misses
- Quarantine reasons

---

## Security Considerations

### ERP Credentials

- QuickBooks: OAuth tokens stored in ERPConnections table (encrypted at rest via DynamoDB)
- Zoho Books: API keys + refresh tokens in ERPConnections
- **No credentials in Job entity** (looked up at runtime via user_id)

### IAM Permissions

- **Principle of Least Privilege:** Config Lambda can't invoke orchestrator directly (only async)
- **Scheduler Role:** Dedicated IAM role for EventBridge → Can only invoke orchestrator
- **No cross-user access:** All queries filtered by `user_id`

### Input Validation

- Frequency: Min 5 minutes (rate), cron syntax validated
- Entities: Whitelist per ERP type
- DQ rules: Predefined list (no arbitrary code execution)

---

## Limitations and Future Enhancements

### Current Limitations

1. **Max File Size:** DQ engine supports up to 50GB (enforced in orchestrator)
2. **Max Batch Size:** 50 batches per entity (Zoho export limit)
3. **Retry Logic:** Only Zoho exports retry (imports fail immediately)
4. **No Rollback:** Failed exports don't undo imports (manual cleanup needed)

### Planned Enhancements

1. **Dead Letter Queue Alerts:** SNS notifications for failed scheduler invocations
2. **Retry Policies:** Configurable retry counts + exponential backoff for imports
3. **Webhook Support:** Trigger jobs on ERP events (e.g., QuickBooks webhook for new invoice)
4. **Multi-Destination:** Fan-out to multiple targets (e.g., QuickBooks → Zoho + NetSuite)
5. **Custom Export Transformations:** User-defined column mappings via UI
6. **Historical Sync:** Backfill mode for initial data migrations (bypass dedup)

---

## Testing Guidelines

### Unit Tests

**Domain Logic:**
```bash
pytest contexts/jobs/tests/unit/test_create_job.py
pytest contexts/jobs/tests/unit/test_pipeline_service.py
```

**Mock Repositories:**
- In-memory implementations for `JobRepository`, `JobStateRepository`
- No boto3 mocking needed (pure Python)

---

### Integration Tests

**Scheduler Lifecycle:**
```python
# Create job → Verify schedule exists
job = create_job_use_case.execute(request)
schedule = scheduler_client.get_schedule(Name=job.schedule_name)
assert schedule["State"] == "ENABLED"

# Pause → Verify disabled
pause_job_use_case.execute(job_id)
schedule = scheduler_client.get_schedule(Name=job.schedule_name)
assert schedule["State"] == "DISABLED"
```

**Pipeline Execution:**
```python
# Mock ERP connector + DQ engine responses
# Trigger orchestrator → Verify JobRun created with expected metrics
```

---

## Related Documentation

- [DQ Engine Implementation](CLAUDE.md#dq-engine-deep-dive)
- [ERP Context](contexts/erp/README.md) (QuickBooks/Zoho integrations)
- [Type System Catalog](docs/type_system_catalog.json) (Column type detection)
- [DDD Architecture](DDD_IMPLEMENTATION_SUMMARY.md)

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-27 | Initial documentation | Claude |
