"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Task } from "@/types/task"
import TaskCard from "./task-card"
import TaskDetailModal from "./task-detail-modal"
import { Search, Filter } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
}

type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED"
type Priority = "LOW" | "MEDIUM" | "HIGH"

export default function TaskList({ tasks }: TaskListProps) {
  const router = useRouter() 
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "ALL">("ALL")
  const [filterPriority, setFilterPriority] = useState<Priority | "ALL">("ALL")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showFilters, setShowFilters] = useState<boolean>(false)

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  // Filter + search
  const filteredTasks = localTasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      filterStatus === "ALL" || task.status === filterStatus

    const matchesPriority =
      filterPriority === "ALL" || task.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const todoTasks = filteredTasks.filter(t => t.status === "TODO")
  const inProgressTasks = filteredTasks.filter(t => t.status === "IN_PROGRESS")
  const completedTasks = filteredTasks.filter(t => t.status === "COMPLETED")

  const columns: [TaskStatus, Task[]][] = [
    ["TODO", todoTasks],
    ["IN_PROGRESS", inProgressTasks],
    ["COMPLETED", completedTasks],
  ]

  // ✅ Save handler (PATCH API + optimistic update)
  const handleSaveTask = async (taskId: string, updates: Partial<Task>) => {
    // Optimistic UI update
    setLocalTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, ...updates } : task))
    )

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error("Failed to update task")

      const updatedTask = await res.json()
      setLocalTasks(prev =>
        prev.map(task => (task.id === taskId ? updatedTask : task))
      )
      
      // ✅ Refresh the router to update server components (dashboard)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Failed to save changes")
      // Revert optimistic update on error
      setLocalTasks(tasks)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    setLocalTasks(prev => prev.filter(t => t.id !== taskId))

    try {
      const res = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete task")
      
      // ✅ Refresh the router to update server components (dashboard)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Failed to delete task")
      // Revert optimistic update on error
      setLocalTasks(tasks)
    }
  }

  const activeFiltersCount =
    (filterStatus !== "ALL" ? 1 : 0) + (filterPriority !== "ALL" ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Tasks</h1>
          <p className="text-gray-600">
            {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
            {(searchQuery || activeFiltersCount > 0) && " (filtered)"}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => setShowFilters(prev => !prev)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value as TaskStatus | "ALL")}
                className="border rounded-lg px-3 py-2"
              >
                <option value="ALL">All Statuses</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>

              <select
                value={filterPriority}
                onChange={e => setFilterPriority(e.target.value as Priority | "ALL")}
                className="border rounded-lg px-3 py-2"
              >
                <option value="ALL">All Priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          )}
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(([status, list]) => (
            <div key={status}>
              <h3 className="font-semibold mb-4">
                {status.replace("_", " ")} ({list.length})
              </h3>

              <div className="space-y-3">
                {list.map(task => (
                  <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
                ))}
                {list.length === 0 && <p className="text-gray-400 text-sm italic">No tasks</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            isOpen
            onClose={() => setSelectedTask(null)}
            onSave={handleSaveTask} // passes taskId + updates
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  )
}
