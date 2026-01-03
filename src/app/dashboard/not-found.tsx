import Link from "next/link"

export default function DashboardNotFound() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-2">
        Dashboard page not found
      </h2>
      <Link
        href="/dashboard"
        className="text-primary underline"
      >
        Back to dashboard
      </Link>
    </div>
  )
}
