import { Button } from "@/components/ui/button"

export default function EmptyState({
  title,
  description,
  actionLabel,
}: {
  title: string
  description: string
  actionLabel?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>

      {actionLabel && <Button>{actionLabel}</Button>}
    </div>
  )
}
