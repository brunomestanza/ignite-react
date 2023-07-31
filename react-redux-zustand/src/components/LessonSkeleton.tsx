export function LessonSkeleton () {
  return (
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded-full bg-zinc-600"></div>
      <div className="flex justify-between w-full">
        <div className="h-4 w-[150px] rounded bg-zinc-600"></div>
        <div className="h-4 w-[40px] rounded bg-zinc-600"></div>
      </div>
    </div>
  )
}