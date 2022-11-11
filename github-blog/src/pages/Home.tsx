import { useCallback, useEffect, useState } from 'react'
import { SearchBox } from '../components/SearchBox'
import {
  FaBuilding,
  FaExternalLinkAlt,
  FaGithub,
  FaUserFriends,
} from 'react-icons/fa'
import { Post } from '../components/Post'
import { api } from '../lib/api'

interface PostProps {
  body: string
  comments: number
  title: string
  number: number
  created_at: string
  user: {
    login: string
  }
}

interface ProfileData {
  bio: string
  company: string
  name: string
  login: string
  followers: number
  avatar_url: string
  html_url: string
}

export function Home() {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [profile, setProfile] = useState<ProfileData>({} as ProfileData)
  const [searchInput, setSearchInput] = useState('')

  const loadProfile = useCallback(async function loadPosts() {
    const response = await api.get('/users/brunomestanza')

    setProfile(response.data)
  }, [])

  const loadPosts = useCallback(
    async function loadPosts() {
      const response = await api.get(
        `search/issues?q=${searchInput}repo:brunomestanza/ignite-react`,
      )

      console.log(response)
      setPosts(response.data.items)
    },
    [searchInput],
  )

  useEffect(() => {
    loadProfile()
    loadPosts()
  }, [loadProfile, loadPosts])

  function handleSearch(input: string) {
    setSearchInput(input)
  }

  return (
    <div className="max-w-[864px] flex align-center flex-col mx-auto">
      <section className="bg-brand-baseProfile flex p-8 rounded-[10px] mt-[-88px] gap-8">
        <img
          className="w-[148px] h-[148px] rounded-lg"
          src={profile.avatar_url}
          alt="Foto de perfil"
        />
        <div>
          <header className="flex items-center justify-between">
            <h3 className="font-bold text-2xl text-brand-baseTitle mb-2">
              {profile.name}
            </h3>
            <a
              className="text-brand-blue font-bold text-xs gap-2 self-start flex align-center justify-center"
              href={profile.html_url}
            >
              GITHUB <FaExternalLinkAlt size={12} />
            </a>
          </header>
          <p className="text-base mb-10">{profile.bio}</p>
          <footer className="flex gap-6">
            <div className="flex gap-2 items-center">
              <FaGithub className="text-brand-baseLabel" />
              <span>{profile.login}</span>
            </div>
            <div className="flex gap-2 items-center">
              <FaBuilding className="text-brand-baseLabel" />
              <span>{profile.company}</span>
            </div>
            <div className="flex gap-2 items-center">
              <FaUserFriends className="text-brand-baseLabel" />
              <span>{profile.followers} seguidores</span>
            </div>
          </footer>
        </div>
      </section>
      <SearchBox
        handleSearch={handleSearch}
        searchInput={searchInput}
        postsCount={posts.length}
      />
      <div className="grid grid-cols-2 mt-12 gap-8 mb-[234px]">
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <Post
                title={post.title}
                body={post.body}
                createdAt={post.created_at}
                key={post.number}
                postId={post.number}
                login={post.user.login}
              />
            )
          })}
      </div>
    </div>
  )
}
