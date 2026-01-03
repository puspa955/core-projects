"use client"

import { CheckCircle, Clock, ListTodo, PlayCircle, TrendingUp, ArrowUpRight } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    total: number
    completed: number
    pending: number
    inProgress: number
  }
  darkMode?: boolean
}

export default function DashboardStats({ stats, darkMode = false }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
      color: "from-blue-500 to-blue-600",
      iconColor: "text-blue-600",
      bgColor: darkMode ? "bg-blue-500/10" : "bg-blue-50/50",
      change: "+12%",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      iconColor: "text-green-600",
      bgColor: darkMode ? "bg-green-500/10" : "bg-green-50/50",
      change: "+8%",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: PlayCircle,
      color: "from-orange-500 to-orange-600",
      iconColor: "text-orange-600",
      bgColor: darkMode ? "bg-orange-500/10" : "bg-orange-50/50",
      change: "+3%",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "from-purple-500 to-purple-600",
      iconColor: "text-purple-600",
      bgColor: darkMode ? "bg-purple-500/10" : "bg-purple-50/50",
      change: "-5%",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.title}
            className={`group relative overflow-hidden rounded-2xl ${
              darkMode 
                ? 'bg-gray-900/40 backdrop-blur-xl border border-gray-800/50' 
                : 'bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-purple-100/20'
            } p-5 hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            <div className="relative flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} backdrop-blur-sm`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            
            <div className="relative">
              <p className={`text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.title}
              </p>
              <p className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </p>
            </div>

            {/* Arrow indicator */}
            <div className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
              <ArrowUpRight className={`w-4 h-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}