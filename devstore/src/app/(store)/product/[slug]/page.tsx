import { AddToCartButton } from '@/components/add-to-cart-button'
import { SizeButton } from '@/components/pages/product/size-button'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductProps {
  params: {
    slug: string
  }
}

async function findProductById(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    // cache: 'no-store', Used for not saving a cache in the BFF
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })
  const product = await response.json()

  return product
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await findProductById(params.slug)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map((product) => {
    return { slug: product.slug }
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await findProductById(params.slug)
  const priceInCredit = (product.price / 12).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-small text-zinc-400">
            Em 12x s/ juros de {priceInCredit}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            <SizeButton size="P" />
            <SizeButton size="M" />
            <SizeButton size="G" />
            <SizeButton size="GG" />
          </div>
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
