import Link from "next/link"

const links = [
  { name: "Overview", href: "/dashboard" },
  { name: "Projects", href: "/dashboard/projects" },
  { name: "Tasks", href: "/dashboard/tasks" },
  { name: "Settings", href: "/dashboard/settings" },
]

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-6 font-bold text-xl">Project Manager</div>

      <nav className="px-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-4 py-2 rounded hover:bg-gray-100"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
