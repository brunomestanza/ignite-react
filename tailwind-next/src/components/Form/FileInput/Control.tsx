'use client'

import { ChangeEvent, ComponentProps } from 'react'
import { useFileInput } from './Root'

type ControlProps = ComponentProps<'input'>

export function Control({ multiple = false, ...props }: ControlProps) {
  const { id, onFilesSelection } = useFileInput()

  function handleFilesSelection(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    // Convert a FileList to a File[]
    const files = Array.from(event.target.files)

    onFilesSelection(files, multiple)
  }

  return (
    <input
      type="file"
      className="sr-only"
      id={id}
      onChange={handleFilesSelection}
      multiple={multiple}
      {...props}
    />
  )
}
