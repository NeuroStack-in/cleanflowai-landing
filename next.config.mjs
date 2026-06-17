/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: "/solutions/data-profiling",     destination: "/capabilities/profiling" },
      { source: "/solutions/data-quality",        destination: "/capabilities/quality" },
      { source: "/solutions/data-transformation", destination: "/capabilities/transformation" },
      { source: "/solutions/data-migration",      destination: "/capabilities/migration" },
      { source: "/solutions/data-modernization",  destination: "/capabilities/modernization" },
      { source: "/solutions/data-security",       destination: "/capabilities/security" },
    ]
  },
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },
  experimental: {
    optimizePackageImports: ["recharts", "@radix-ui/react-*"],
  },
}

export default nextConfig

