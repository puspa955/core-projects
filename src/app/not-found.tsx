import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-4">
          The page you are looking for doesn’t exist.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-4 py-2 rounded bg-primary text-primary-foreground"
        >
          Go back to dashboard
        </Link>
      </div>
    </div>
  )
}
