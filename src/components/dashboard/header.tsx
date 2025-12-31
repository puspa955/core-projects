import LogoutButton from "./logout-button"

export default function DashboardHeader({
  user,
}: {
  user: { email?: string | null; name?: string | null }
}) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <h1 className="text-lg font-semibold">
        Welcome, {user.name || user.email}
      </h1>

      <LogoutButton />
    </header>
  )
}
