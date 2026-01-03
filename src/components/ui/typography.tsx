import clsx from "clsx"

export function H1({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h1
      className={clsx(
        "font-heading text-3xl md:text-4xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  )
}

export function H2({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={clsx(
        "font-heading text-2xl md:text-3xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h2>
  )
}

export function H3({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3
      className={clsx(
        "font-heading text-xl font-semibold",
        className
      )}
    >
      {children}
    </h3>
  )
}

export function Text({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={clsx("font-body text-sm text-gray-600", className)}>
      {children}
    </p>
  )
}

export function MutedText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={clsx("font-body text-xs text-gray-400", className)}>
      {children}
    </p>
  )
}
