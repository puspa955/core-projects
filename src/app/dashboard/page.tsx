import EmptyState from "@/components/dashboard/empty-state"

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <EmptyState
        title="No projects yet"
        description="Get started by creating your first project."
        actionLabel="Create Project"
      />
    </div>
  )
}
