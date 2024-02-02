import Image from 'next/image'
import Link from 'next/link'
import { CartWidget } from './cart-widget'
import { SearchForm } from './search-form'
import { Suspense } from 'react'

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link className="text-2xl font-extrabold text-white" href="/">
          devstore
        </Link>
        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </div>
      <div className="flex items-center gap-4">
        <CartWidget />

        <div className="w-px h-4 bg-zinc-700" />

        <Link className="flex items-center gap-2 hover:underline" href="/">
          <span className="text-sm">Conta</span>
          <Image
            className="h-6 w-6 rounded-full"
            width={24}
            height={24}
            src="https://github.com/brunomestanza.png"
            alt=""
          />
        </Link>
      </div>
    </div>
  )
}
