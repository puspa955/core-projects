// src/components/tasks/task-list.tsx
import type { Task } from "@/types/task"
import TaskCard from "./task-card"

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  const todoTasks = tasks.filter((t) => t.status === "TODO")
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS")
  const doneTasks = tasks.filter((t) => t.status === "DONE")

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* To Do Column */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
          To Do ({todoTasks.length})
        </h3>
        <div className="space-y-3">
          {todoTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {todoTasks.length === 0 && (
            <p className="text-gray-400 text-sm italic">No tasks</p>
          )}
        </div>
      </div>

      {/* In Progress Column */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
          In Progress ({inProgressTasks.length})
        </h3>
        <div className="space-y-3">
          {inProgressTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {inProgressTasks.length === 0 && (
            <p className="text-gray-400 text-sm italic">No tasks</p>
          )}
        </div>
      </div>

      {/* Done Column */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          Done ({doneTasks.length})
        </h3>
        <div className="space-y-3">
          {doneTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {doneTasks.length === 0 && (
            <p className="text-gray-400 text-sm italic">No tasks</p>
          )}
        </div>
      </div>
    </div>
  )
}