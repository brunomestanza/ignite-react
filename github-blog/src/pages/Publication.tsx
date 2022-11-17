import { useCallback, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import {
  FaLessThan,
  FaExternalLinkAlt,
  FaGithub,
  FaCalendarDay,
  FaComment,
} from 'react-icons/fa'
import { api } from '../lib/api'
import { MarkdownContent } from '../components/MarkdownContent'

interface PostData {
  html_url: string
  title: string
  created_at: string
  comments: string
  body: string
  user: {
    login: string
  }
}

export function Publication() {
  const [postData, setPostData] = useState<PostData>({} as PostData)
  const { postId, username } = useParams()

  const loadPost = useCallback(
    async function loadPost() {
      const response = await api.get(
        `/repos/brunomestanza/ignite-react/issues/${postId}`,
      )

      console.log(response)
      setPostData(response.data)
    },
    [postId],
  )

  useEffect(() => {
    loadPost()
  }, [loadPost])

  return (
    <div className="max-w-[864px] flex align-center flex-col mx-auto">
      <div className="bg-brand-baseProfile flex flex-col p-8 rounded-[10px] mt-[-88px] mb-10">
        <header className="flex justify-between text-brand-blue">
          <Link to="/" className="flex gap-2 items-center font-bold text-sm">
            <FaLessThan size={12} /> VOLTAR
          </Link>
          <a
            href={postData.html_url}
            className="flex gap-2 items-center font-bold text-sm"
          >
            VER NO GITHUB
            <FaExternalLinkAlt size={12} />
          </a>
        </header>
        <h1 className="font-bold text-2xl text-brand-baseTitle mb-2 mt-5">
          {postData.title}
        </h1>
        <footer className="flex items-center gap-8">
          <span className="flex gap-2 items-center text-brand-baseSpan">
            <FaGithub size={18} className="text-brand-baseLabel" /> {username}
          </span>
          <span className="flex gap-2 items-center text-brand-baseSpan">
            <FaCalendarDay size={18} className="text-brand-baseLabel" />
            {postData.created_at !== undefined
              ? formatDistanceToNow(new Date(postData.created_at), {
                  addSuffix: true,
                  locale: ptBr,
                })
              : ''}
          </span>
          <span className="flex gap-2 items-center text-brand-baseSpan">
            <FaComment size={18} className="text-brand-baseLabel" />
            {postData.comments} comentários
          </span>
        </footer>
      </div>
      <main className="mb-10">
        <MarkdownContent content={postData.body} />
      </main>
    </div>
  )
}
