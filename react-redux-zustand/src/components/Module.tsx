import * as Collapsible from '@radix-ui/react-collapsible';
import { ArrowDown } from "@phosphor-icons/react";
import { Lesson } from "./Lesson";
import { useStore } from '../zustand-store';

interface ModuleProps {
  title: string
  amountOfLessons: number
  moduleIndex: number
}

export function Module({ title, amountOfLessons, moduleIndex }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(store => {
    return {
      currentLessonIndex : store.currentLessonIndex,
      currentModuleIndex: store.currentModuleIndex,
      lessons: store.course?.modules[moduleIndex].lessons,
      play: store.play
    }
  })
  
  function handlePlayLesson([moduleIndex, lessonIndex]: number[]) {
    play([moduleIndex, lessonIndex])
  }

  return (
    <Collapsible.Root className='group' defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ArrowDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons && lessons.map((lesson, lessonIndex) => {
            const isCurrent = currentModuleIndex === moduleIndex &&
              currentLessonIndex === lessonIndex

            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                onPlay={() => handlePlayLesson([moduleIndex, lessonIndex])}
                isCurrent={isCurrent}
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
