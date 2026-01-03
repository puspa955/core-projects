"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import DashboardHeader from "./header"
import DashboardSidebar from "./sidebar"

export default function DashboardWrapper({
  children,
  user,
}: {
  children: React.ReactNode
  user: { email?: string | null; name?: string | null }
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  // Page title
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean)
    if (path.length <= 1) return "Overview"
    const lastSegment = path[path.length - 1]
    return lastSegment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div
      className={`relative flex h-screen overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 -left-4 w-72 h-72 ${darkMode ? 'bg-blue-900' : 'bg-blue-200'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob`}></div>
        <div className={`absolute top-0 -right-4 w-72 h-72 ${darkMode ? 'bg-purple-900' : 'bg-purple-200'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-8 left-20 w-72 h-72 ${darkMode ? 'bg-pink-900' : 'bg-pink-200'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000`}></div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden transition-all duration-300"
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        darkMode={darkMode}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 relative z-10">
        {/* Header */}
        <DashboardHeader
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((v) => !v)}
        />

        {/* Hero Section */}
        <div className="px-4 sm:px-6 md:px-10 pt-2 pb-4 md:pt-4 md:pb-6">
          {/* Welcome Message */}
          <div className="mb-2">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
              Welcome back,
            </p>
            <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {user.name || user.email} 👋
            </h1>
          </div>

          {/* Page Title */}
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${
            darkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
          }`}>
            {getPageTitle()}
          </h2>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 pb-8 space-y-6">
          {children}
        </main>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}