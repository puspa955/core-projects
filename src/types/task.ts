// src/types/task.ts
export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED"
export type Priority = "LOW" | "MEDIUM" | "HIGH"

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: Priority
  projectId: string
  createdAt: string
  updatedAt: string
}