import { Play, Video } from "@phosphor-icons/react";

interface LessonProps {
  title: string
  duration: string
  isCurrent?: boolean
  onPlay: () => void
}

export function Lesson({ title, duration, onPlay, isCurrent = false }: LessonProps) {
  return (
    <button
      onClick={onPlay}
      data-active={isCurrent}
      disabled={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 active:hover:text-zinc-100"
    >
      { isCurrent  ? (
        <Play className="w-4 h-4 text-emerald-500" />
      ) : (
        <Video className="w-4 h-4 text-zinc-500" />
      )}
      <span>{title}</span>
      <span className="ml-auto font-mono text-sm text-zinc-500">{duration}</span>
    </button>
  )
}