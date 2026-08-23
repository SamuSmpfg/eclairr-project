'use client'

interface RefreshButtonProps {
  className?: string
  children: React.ReactNode
  onRefresh?: () => void
  lastRefreshedAt?: string | Date | null
}

function formatLastRefreshed(date: string | Date) {
  const parsed = typeof date === 'string' ? new Date(date) : date

  return parsed.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function RefreshButton({ className, children, onRefresh, lastRefreshedAt }: RefreshButtonProps) {
  const handleClick = () => {
    onRefresh?.()
    window.location.reload()
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button onClick={handleClick} className={className}>
        {children}
      </button>
      {lastRefreshedAt && (
        <span className="text-xs text-[#848484] font-light">
          Atualizado em {formatLastRefreshed(lastRefreshedAt)}
        </span>
      )}
    </div>
  )
}