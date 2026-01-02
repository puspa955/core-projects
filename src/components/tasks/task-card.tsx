// src/components/tasks/task-card.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Task, TaskStatus, Priority } from "@/types/task"
import { Search, Filter, X, Edit2, Trash2, Calendar, Flag } from "lucide-react"


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

export default function TaskCard({
  task,
  onClick,
}: {
  task: Task
  onClick: () => void
}) {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "HIGH":
        return "border-l-red-500"
      case "MEDIUM":
        return "border-l-yellow-500"
      case "LOW":
        return "border-l-green-500"
    }
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded-lg border-l-4 shadow-sm hover:shadow-md transition cursor-pointer ${getPriorityColor(
        task.priority
      )}`}
    >
      <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <Flag
          className={`w-4 h-4 ${
            task.priority === "HIGH"
              ? "text-red-500"
              : task.priority === "MEDIUM"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        />
      </div>
    </div>
  )
}