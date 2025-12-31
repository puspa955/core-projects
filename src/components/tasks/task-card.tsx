// src/components/tasks/task-card.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Task, TaskStatus, Priority } from "@/types/task"

interface TaskCardProps {
  task: Task
}

const statusColors = {
  TODO: "bg-gray-100 text-gray-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
}

const priorityColors = {
  LOW: "border-l-gray-400",
  MEDIUM: "border-l-yellow-400",
  HIGH: "border-l-red-400",
}

const statusLabels = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
}

export default function TaskCard({ task }: TaskCardProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (newStatus: TaskStatus) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update task")

      router.refresh()
    } catch (error) {
      console.error("Error updating task:", error)
      alert("Failed to update task")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete task")

      router.refresh()
    } catch (error) {
      console.error("Error deleting task:", error)
      alert("Failed to delete task")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow border-l-4 ${
        priorityColors[task.priority]
      } hover:shadow-md transition`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{task.title}</h4>
        <div className="flex gap-2">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            disabled={isLoading}
            className={`text-xs px-2 py-1 rounded-full ${
              statusColors[task.status]
            } disabled:opacity-50`}
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="capitalize">Priority: {task.priority.toLowerCase()}</span>
        <span>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}