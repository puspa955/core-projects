// src/app/dashboard/projects/[id]/page.tsx
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import CreateTaskForm from "@/components/tasks/create-task-form"
import TaskList from "@/components/tasks/task-list"
import type { Task } from "@/types/task"

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const project = await db.project.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      tasks: {
        orderBy: [
          { status: "asc" },
          { createdAt: "desc" },
        ],
      },
    },
  })

  if (!project) {
    redirect("/dashboard/projects")
  }

  // Transform tasks to match the Task type
  const tasks: Task[] = project.tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    status: task.status as Task["status"],
    priority: task.priority as Task["priority"],
    projectId: task.projectId,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  }))

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/projects"
          className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block"
        >
          ← Back to Projects
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            {project.description && (
              <p className="text-gray-600 mt-1">{project.description}</p>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </div>
        </div>
      </div>

      {/* Create Task Form */}
      <CreateTaskForm projectId={project.id} />

      {/* Task List */}
      <TaskList tasks={tasks} />
    </div>
  )
}