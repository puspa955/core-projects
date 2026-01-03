"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderKanban, Settings, X, Sparkles } from "lucide-react"

const links = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardSidebar({ 
  isOpen, 
  onClose,
  darkMode 
}: { 
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
}) {
  const pathname = usePathname()

  return (
    <aside
      className={`
        fixed md:static inset-y-0 left-0 z-50
        w-72 transform transition-all duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className={`h-full m-4 rounded-2xl p-6 ${
        darkMode 
          ? 'bg-gray-900/40 backdrop-blur-xl border border-gray-800/50' 
          : 'bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl'
      } flex flex-col`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                : 'bg-gradient-to-br from-blue-600 to-purple-600'
            }`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Dashboard
              </h2>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                v2.0
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className={`md:hidden p-2 rounded-lg ${
              darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-white/50'
            } transition-colors`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200 relative overflow-hidden
                  ${isActive
                    ? darkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-300/50'
                    : darkMode
                      ? 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'animate-bounce' : ''}`} />
                <span className="font-medium relative z-10">{link.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse relative z-10"></div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Card
        <div className={`mt-4 p-4 rounded-xl ${
          darkMode 
            ? 'bg-gray-800/50 border border-gray-700/50' 
            : 'bg-white/50 border border-gray-200/50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                John Doe
              </p>
              <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                john@example.com
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </aside>
  )
}