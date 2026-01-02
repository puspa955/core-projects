"use client"

import { useEffect, useState } from "react"
import ProjectCard from "./project-card"
import CreateProjectModal from "./create-project-modal"
import type { Project } from "@/types/project"

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects")

        if (!res.ok) {
          setProjects([])
          return
        }

        const data: unknown = await res.json()

        if (Array.isArray(data)) {
          setProjects(data as Project[])
        } else {
          setProjects([])
        }
      } catch {
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
        <CreateProjectModal
          onCreated={(project) => setProjects([project])}
        />
      </div>
    )
  }

  return (
    <>
      <div className="mb-4">
        <CreateProjectModal
          onCreated={(project) =>
            setProjects((prev) => [project, ...prev])
          }
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
