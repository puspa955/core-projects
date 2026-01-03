"use client"

import { signOut } from "next-auth/react"
import { LogOut, User, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProfileMenu({
  user,
  darkMode,
}: {
  user: { email?: string | null; name?: string | null }
  darkMode: boolean
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
          darkMode ? 'shadow-lg shadow-purple-500/30' : 'shadow-lg shadow-purple-300/50'
        }`}>
          {(user.name || user.email || 'U').charAt(0).toUpperCase()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className={`w-56 ${
          darkMode 
            ? 'bg-gray-900/95 backdrop-blur-xl border-gray-800/50' 
            : 'bg-white/95 backdrop-blur-xl border-gray-200/50'
        } rounded-xl`}
        align="end"
      >
        <DropdownMenuLabel className={darkMode ? 'text-white' : ''}>
          <div>
            <p className="text-sm font-medium">{user.name || 'User'}</p>
            <p className={`text-xs font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className={darkMode ? 'bg-gray-800' : ''} />
        <DropdownMenuItem className={darkMode ? 'text-gray-300 focus:bg-gray-800/50 focus:text-white' : 'focus:bg-purple-50'}>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className={darkMode ? 'text-gray-300 focus:bg-gray-800/50 focus:text-white' : 'focus:bg-purple-50'}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className={darkMode ? 'bg-gray-800' : ''} />
        <DropdownMenuItem 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={darkMode ? 'text-red-400 focus:bg-gray-800/50 focus:text-red-300' : 'text-red-600 focus:bg-red-50'}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}