import { Link } from 'react-router-dom'
import { format } from 'date-fns'

interface PostProps {
  title: string
  body: string
  createdAt: string
  postId: number
  login: string
}

export function Post({ title, body, createdAt, postId, login }: PostProps) {
  return (
    <section className="p-8 bg-brand-basePost rounded-[10px]">
      <header className="flex justify-between items-start">
        <Link
          to={`/publication/${postId}/${login}`}
          className="font-bold text-xl text-brand-baseTitle"
        >
          {title}
        </Link>
        <time className="text-sm text-brand-baseSpan leading-7 whitespace-nowrap">
          {format(new Date(createdAt), 'MMM')}
        </time>
      </header>
      <main className="mt-5 text-ellipsis overflow-hidden max-h-[90px]">
        {body}
      </main>
    </section>
  )
}
