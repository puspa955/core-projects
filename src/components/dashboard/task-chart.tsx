"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  PieLabelRenderProps,
} from "recharts"

interface TaskChartProps {
  stats: {
    total: number
    completed: number
    pending: number
    inProgress: number
  }
}

export default function TaskChart({ stats }: TaskChartProps) {
  const data = [
    { name: "Completed", value: stats.completed, color: "#10b981" },
    { name: "In Progress", value: stats.inProgress, color: "#f59e0b" },
    { name: "Pending", value: stats.pending, color: "#8b5cf6" },
  ]

  const completionRate =
    stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Task Breakdown</h3>
        <div className="text-sm text-gray-600">
          Completion Rate:{" "}
          <span className="font-semibold text-green-600">
            {completionRate}%
          </span>
        </div>
      </div>

      {stats.total > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              labelLine={false}
              label={(props: PieLabelRenderProps) => {
                const name = props.name ?? ""
                const percent = props.percent ?? 0
                return `${name} ${(percent * 100).toFixed(0)}%`
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-lg mb-2">No tasks yet</p>
            <p className="text-sm">
              Create your first task to see the breakdown
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
