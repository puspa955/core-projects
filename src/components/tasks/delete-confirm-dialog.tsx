"use client"

import { Trash2 } from "lucide-react"

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
  isLoading,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  taskTitle: string
  isLoading: boolean
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delete Task</h3>
        </div>
        
        <p className="text-gray-600 mb-2">
          Are you sure you want to delete this task?
        </p>
        <p className="text-sm font-medium text-gray-900 mb-6">&quot;{taskTitle}&quot;</p>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete Task"}
          </button>
        </div>
      </div>
    </div>
  )
}
