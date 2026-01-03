import { Suspense } from "react"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import TaskChart from "@/components/dashboard/task-chart"
import { Skeleton } from "@/components/ui/skeleton"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import type { Project, Task } from "@prisma/client"

// Fetch projects and tasks for the logged-in user
async function fetchDashboardData() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  // Fetch all projects of the user
  const projects = await db.project.findMany({
    where: { userId: session.user.id },
  })

  // Fetch all tasks across all projects
  const tasks = await db.task.findMany({
    where: { projectId: { in: projects.map((p) => p.id) } },
    orderBy: [
      { status: "asc" },
      { createdAt: "desc" },
    ],
  })

  return { projects, tasks }
}

// Compute stats for dashboard
function computeStats(projects: Project[], tasks: Task[]) {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "COMPLETED").length,
    inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    pending: tasks.filter((t) => t.status === "TODO").length,
    totalProjects: projects.length
  }
}

// Skeleton for stats loading
function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  )
}

// Skeleton for chart loading
function ChartLoading() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Skeleton className="h-6 w-48 mb-6" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  )
}

// Dashboard Page (Server Component)
export default async function DashboardPage() {
  const { projects, tasks } = await fetchDashboardData()
  const stats = computeStats(projects, tasks)

  // You can get darkMode from cookies or context if needed
  const darkMode = false // Set this based on your app's theme state

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          Project Overview
        </h1>
        <p className="text-sm text-gray-600">
          Track your projects and tasks at a glance
        </p>
      </div>

      {/* Statistics Cards */}
      <Suspense fallback={<StatsLoading />}>
        <DashboardStats stats={stats} darkMode={darkMode} />
      </Suspense>

      {/* Task Chart */}
      <Suspense fallback={<ChartLoading />}>
        <TaskChart stats={stats} darkMode={darkMode} />
      </Suspense>
    </div>
  )
}