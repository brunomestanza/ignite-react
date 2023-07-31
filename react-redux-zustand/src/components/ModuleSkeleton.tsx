import { LessonSkeleton } from "./LessonSkeleton"

interface ModuleSkeletonProps {
  quantityOfModules: number
  quantityOfLessons: number
}

export function ModuleSkeleton({ quantityOfModules, quantityOfLessons }: ModuleSkeletonProps) {
  const modules = Array.from(Array(quantityOfModules).keys())
  const lessons = Array.from(Array(quantityOfLessons).keys())

  return (
    <>
      {modules.map((module) => {
        return (
          <div className='group animate-pulse' key={module}>
            <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
              <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950"></div>
              
              <div className="flex flex-col gap-1 left flex-1">
                <div className="h-4 w-[150px] rounded bg-zinc-600"></div>
                <div className="h-4 w-[35px] rounded bg-zinc-600"></div>
              </div>

              <div className="flex h-5 w-5 rounded-full items-center justify-center bg-zinc-950"></div>
            </div>
            
            <div className="relative flex flex-col gap-4 p-6">
              {lessons.map((lesson) => {
                return <LessonSkeleton key={lesson} />
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}