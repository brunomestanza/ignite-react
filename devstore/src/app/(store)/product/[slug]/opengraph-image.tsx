import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

interface ProductImageProps {
  params: {
    slug: string
  }
}

export const runtime = 'edge'
export const alt = 'About Acme'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
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

export default async function Image({ params }: ProductImageProps) {
  const product = await findProductById(params.slug)
  const absoluteUrl = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Its not necessary to use Next Image in the opengraph image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={absoluteUrl} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
