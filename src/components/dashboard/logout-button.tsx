"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function LogoutButton({ darkMode }: { darkMode?: boolean }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={`
        flex items-center px-3 py-2 rounded-lg font-medium text-sm
        transition-all duration-200
        ${darkMode 
          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
        }
      `}
    >
      <LogOut className="w-4 h-4 mr-2" />
      <span className="hidden md:inline">Logout</span>
    </button>
  )
}