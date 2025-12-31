import ProjectsList from "@/components/projects/projects-list"

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
      </div>

      <ProjectsList />
    </div>
  )
}
