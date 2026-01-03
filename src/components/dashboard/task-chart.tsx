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
import { ListTodo } from "lucide-react"

interface TaskChartProps {
  stats: {
    total: number
    completed: number
    pending: number
    inProgress: number
  }
  darkMode?: boolean
}

export default function TaskChart({ stats, darkMode = false }: TaskChartProps) {
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
    <div className={`rounded-2xl ${
      darkMode 
        ? 'bg-gray-900/40 backdrop-blur-xl border border-gray-800/50' 
        : 'bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-purple-100/20'
    } p-6 lg:p-8`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className={`text-xl font-bold mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Task Breakdown
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Overview of your task distribution
          </p>
        </div>
        
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${
          darkMode ? 'bg-gray-800/50' : 'bg-white/50'
        } backdrop-blur-md border ${
          darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className={`text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Completion Rate
            </span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            {completionRate}%
          </span>
        </div>
      </div>

      {stats.total > 0 ? (
        <div className="relative">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={70}
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

              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backdropFilter: 'blur(12px)',
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none" style={{ marginTop: '-18px' }}>
            <p className={`text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {stats.total}
            </p>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Total Tasks
            </p>
          </div>
        </div>
      ) : (
        <div className="h-[320px] flex items-center justify-center">
          <div className="text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${
              darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
            } backdrop-blur-md flex items-center justify-center`}>
              <ListTodo className={`w-10 h-10 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
            </div>
            <p className={`text-lg font-semibold mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              No tasks yet
            </p>
            <p className={`text-sm ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Create your first task to see the breakdown
            </p>
          </div>
        </div>
      )}
    </div>
  )
}