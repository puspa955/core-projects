"use client"

import { useEffect, useState } from "react"
import ProjectCard from "./project-card"
import CreateProjectModal from "./create-project-modal"

export type Project = {
  id: string
  name: string
  description?: string
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function loadProjects() {
    try {
      const res = await fetch("/api/projects")

      if (!res.ok) {
        setProjects([])
        return
      }

      const data = await res.json()

      // ✅ ensure array
      if (Array.isArray(data)) {
        setProjects(data)
      } else {
        setProjects([])
      }
    } catch (error) {
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  loadProjects()
}, [])


  if (loading) return <p>Loading projects...</p>

  if (projects.length === 0) {
    return (
      <div className="text-center">
        <p className="mb-4">No projects yet</p>
        <CreateProjectModal onCreated={(p) => setProjects([p])} />
      </div>
    )
  }

  return (
    <>
      <div className="mb-4">
        <CreateProjectModal
          onCreated={(p) => setProjects((prev) => [p, ...prev])}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
