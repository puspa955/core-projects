"use client"

import { Menu, Search, Moon, Sun, Bell } from "lucide-react"
import ProfileMenu from "./profile-menu"

export default function DashboardHeader({
  user,
  onMenuClick,
  darkMode,
  onToggleDarkMode,
}: {
  user: { email?: string | null; name?: string | null }
  onMenuClick: () => void
  darkMode: boolean
  onToggleDarkMode: () => void
}) {
  return (
    <header className="px-4 sm:px-6 md:px-10 py-4">
      <div className={`flex items-center justify-between p-3 md:p-4 rounded-2xl ${
        darkMode 
          ? 'bg-gray-900/40 backdrop-blur-xl border border-gray-800/50' 
          : 'bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-purple-100/20'
      }`}>
        {/* Left - Mobile Menu */}
        <button
          onClick={onMenuClick}
          className={`md:hidden p-2 rounded-xl ${
            darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-white/50'
          } transition-all duration-200`}
        >
          <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
        </button>

        {/* Center - Search */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-6">
          <div className={`flex items-center w-full ${
            darkMode ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-md rounded-xl px-4 py-2.5 border ${
            darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
          } focus-within:ring-2 focus-within:ring-purple-500/20 transition-all duration-200`}>
            <Search className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
            <input
              type="text"
              placeholder="Search anything..."
              className={`${
                darkMode 
                  ? 'bg-transparent text-white placeholder-gray-500' 
                  : 'bg-transparent text-gray-900 placeholder-gray-500'
              } outline-none flex-1 text-sm`}
            />
            <kbd className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold ${
              darkMode ? 'bg-gray-700/50 text-gray-300 border border-gray-600' : 'bg-gray-100/50 text-gray-600 border border-gray-300'
            } rounded`}>
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Dark Mode */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2.5 rounded-xl ${
              darkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50' 
                : 'bg-white/50 hover:bg-white/70 border border-gray-200/50'
            } transition-all duration-200 backdrop-blur-md`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </button>

          {/* Notifications */}
          <button
            className={`relative p-2.5 rounded-xl ${
              darkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50' 
                : 'bg-white/50 hover:bg-white/70 border border-gray-200/50'
            } transition-all duration-200 backdrop-blur-md`}
          >
            <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 ring-2 ring-white"></span>
            </span>
          </button>

          {/* Profile */}
          <ProfileMenu user={user} darkMode={darkMode} />
        </div>
      </div>
    </header>
  )
}