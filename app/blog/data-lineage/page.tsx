"use client"

import { BlogPost } from "../_components/BlogPost"

export default function DataLineagePost() {
  return (
    <BlogPost
      meta={{
        eyebrow: "GOVERNANCE",
        title: "Building defensible data lineage: from source to decision",
        subtitle:
          "Lineage isn't a diagram you draw once. It's an immutable record of every transformation, approval, and override that touched a record on its way to a downstream system. Here's what that takes in practice.",
        date: "March 12, 2026",
        readTime: "10 min read",
        author: "Infiniqon Engineering",
      }}
    >
      <p>
        Data lineage gets discussed as if it were a feature you turn on. It
        is not. Defensible lineage &mdash; the kind that holds up in front of
        a regulator, an auditor, or a board-level inquiry &mdash; is a
        discipline. It requires that <em>every</em> step a record undergoes
        on its journey from source system to downstream decision is captured
        in a permanent, queryable, immutable record. No exceptions.
      </p>
      <p>
        Most organizations have something they call lineage. Most of it would
        not survive a serious audit.
      </p>

      <h2>What &ldquo;defensible&rdquo; means</h2>
      <p>
        A defensible lineage record answers, for any given data element in any
        downstream system, the following questions without ambiguity:
      </p>
      <ul>
        <li><strong>Where did this value come from?</strong> Specifically: which source system, which extraction job, which row, which timestamp.</li>
        <li><strong>What was done to it?</strong> Every transformation, in order, with the rule version applied at the time.</li>
        <li><strong>Who approved each transformation?</strong> Not the engine that ran the rule &mdash; the human who approved the rule.</li>
        <li><strong>What did it look like at each step?</strong> The before-state and after-state of each transformation, retrievable on demand.</li>
        <li><strong>Could we reproduce it today?</strong> If we re-ran the same source data through the same rules, would we get the same output?</li>
      </ul>
      <p>
        If you cannot answer all five with certainty for any record in any
        downstream report, your lineage is not defensible. It is descriptive at
        best, decorative at worst.
      </p>

      <div className="bp-callout">
        <div className="bp-callout-label">Litmus test</div>
        <p>
          Pick one number from one report. Trace it to the source row, name
          every transformation it underwent, and produce the steward who
          approved each one &mdash; in under five minutes. If you can&rsquo;t,
          your lineage is incomplete.
        </p>
      </div>

      <h2>Why most lineage falls short</h2>
      <h3>It&rsquo;s scraped from code, not captured from execution</h3>
      <p>
        Many lineage tools work by parsing SQL or pipeline DAGs. This produces
        a structural diagram of <em>where data could flow</em>, not a record of
        <em> where it actually did flow</em>. The two are not the same.
        Conditional logic, dynamic queries, and runtime data drive actual
        execution. Static analysis is blind to all of it.
      </p>
      <h3>It captures pipelines, not records</h3>
      <p>
        Pipeline-level lineage tells you that table A flows into table B. It
        does not tell you which rows were quarantined, which failed
        validation, which were merged with other rows, or which had a steward
        override applied. Defensible lineage is record-level, not table-level.
      </p>
      <h3>It&rsquo;s separate from the audit trail</h3>
      <p>
        Lineage and audit are often built as two systems. Lineage shows the
        data flow; audit shows the user actions. Reconciling the two when a
        question arises is its own multi-day project. Defensible lineage
        unifies them: every transformation event includes both the rule that
        ran and the human who approved the rule.
      </p>
      <h3>It&rsquo;s mutable</h3>
      <p>
        If your lineage records can be edited, deleted, or backfilled, they
        are not defensible. The whole point is that the record is immutable
        once written. An audit trail that can be rewritten is not an audit
        trail.
      </p>

      <h2>The four properties defensible lineage requires</h2>
      <h3>1. Append-only</h3>
      <p>
        Lineage events are written once and never modified. Corrections happen
        through new compensating events, not through edits. This is the same
        principle that underlies regulatory accounting ledgers, and it exists
        for the same reason: an editable record is a record that can be
        repudiated.
      </p>
      <h3>2. Record-grain</h3>
      <p>
        Each event captures a single transformation applied to a single
        record (or a clearly bounded batch). &ldquo;The pipeline ran&rdquo; is
        not a lineage event. &ldquo;Rule R-104 was applied to record X at
        timestamp T, transforming field F from value V1 to value V2&rdquo; is.
      </p>
      <h3>3. Approval-linked</h3>
      <p>
        Every transformation event references the rule version that was
        applied. Every rule version references the steward approval that
        promoted it. Walking the chain backward yields not just the rule but
        the human accountability behind it.
      </p>
      <h3>4. Replayable</h3>
      <p>
        Given the source data and the rules-as-of-a-date, you can re-run the
        pipeline and get the same output. This is the property that lets you
        answer &ldquo;could you reproduce this?&rdquo; with certainty. If
        re-running might produce different output, your lineage is not
        defensible &mdash; the underlying execution is non-deterministic.
      </p>

      <blockquote>
        <p>
          Lineage that you can edit is decoration. Lineage that is
          append-only, record-grained, approval-linked, and replayable is the
          substrate that holds the rest of your governance program up.
        </p>
      </blockquote>

      <h2>What this looks like architecturally</h2>
      <p>
        The pattern that produces defensible lineage has three components,
        each of which has to be designed in from the beginning:
      </p>
      <h3>An event-sourced execution engine</h3>
      <p>
        Every transformation, every quarantine, every steward override is
        published as an immutable event to an append-only log. The execution
        engine never mutates state in place &mdash; it produces events, and
        downstream materializations replay those events to produce the current
        state.
      </p>
      <h3>A versioned rule store</h3>
      <p>
        Rules are first-class versioned artifacts. Promoting a rule produces a
        new version, signed by the approving steward and timestamped. Old rule
        versions remain queryable forever &mdash; they have to, because
        historical lineage events reference them.
      </p>
      <h3>A unified governance graph</h3>
      <p>
        Sources, fields, rules, approvals, transformations, and downstream
        artifacts all live in a single graph that can be traversed from any
        starting point. Asking &ldquo;what records did this rule touch?&rdquo;
        is the same kind of query as &ldquo;what rules touched this
        record?&rdquo; &mdash; just walked in opposite directions.
      </p>

      <h2>Where most teams trip up</h2>
      <ul>
        <li>
          <strong>Missing the override path.</strong> Manual steward
          interventions on individual records often happen outside the system.
          They have to be inside the system, captured as events, or the
          lineage has gaps.
        </li>
        <li>
          <strong>Forgetting the quarantine queue.</strong> Records that fail
          validation and are held for review must be lineage-tracked, including
          the resolution decision. The records that <em>didn&rsquo;t</em> make
          it to production tell you as much as the ones that did.
        </li>
        <li>
          <strong>Treating ML model outputs as opaque.</strong> If an ML model
          assigns a value to a record, the lineage event must capture which
          model version produced it. Otherwise re-running the pipeline a year
          later produces different outputs, and your lineage no longer
          replays.
        </li>
        <li>
          <strong>Truncating history.</strong> Storage is cheap. Lineage
          history is irreplaceable. Truncate at your peril &mdash; the
          regulator will ask about a record from three years ago and you will
          wish you had kept it.
        </li>
      </ul>

      <h2>What you get when it&rsquo;s done right</h2>
      <p>
        Three things change when defensible lineage becomes the substrate of
        your data platform:
      </p>
      <h3>Audits become routine</h3>
      <p>
        The auditor&rsquo;s questions are answered by querying the lineage
        graph. There is no audit-prep project. There is no scramble. The
        evidence already exists, in a form the auditor can examine themselves.
      </p>
      <h3>Incident response collapses</h3>
      <p>
        When a downstream report is wrong, you walk the lineage backward from
        the wrong number to the upstream value, identify the transformation
        responsible, and find the steward approval that authorized it &mdash;
        in minutes, not days. Root cause is one query.
      </p>
      <h3>Trust becomes transferable</h3>
      <p>
        When a downstream consumer asks &ldquo;can I trust this number?&rdquo;
        the answer is no longer &ldquo;ask the data team.&rdquo; The answer is
        &ldquo;here is the lineage, judge for yourself.&rdquo; That is the
        end-state every data leader claims to want, and almost no one
        achieves.
      </p>

      <h2>Closing</h2>
      <p>
        Lineage is the part of governance that everyone agrees they need and
        almost no one builds correctly. The reason is that defensible lineage
        is not a feature &mdash; it is a property of the entire data platform,
        and it has to be designed in from the start. Bolt-on lineage tools
        produce bolt-on lineage records, which produce bolt-on audits.
      </p>
      <p>
        CleanFlowAI is built around the assumption that lineage is the
        substrate, not the decoration. Every rule, every approval, every
        transformation, every override flows through the same event-sourced
        spine. The lineage is not something we generate &mdash; it is what the
        system <em>is</em>.
      </p>
    </BlogPost>
  )
}
