import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

// Data

import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getProduct from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getAllProductPaths from '@bigcommerce/storefront-data-hooks/api/operations/get-all-product-paths'

export async function getStaticProps ({
  params,
  locale,
  preview
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })

  const { pages } = await getAllPages({ config, preview })
  const { product } = await getProduct({
    variables: { slug: params!.slug },
    config,
    preview
  })

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }
  const { data } = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products/${product.entityId}?include=custom_fields`,
    {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'x-auth-token': process.env.ACCESS_TOKEN
      }
    }
  ).then((r) => r.json())

  return {
    props: { pages, product, data },
    revalidate: 200
  }
}

export async function getStaticPaths ({ locales }: GetStaticPathsContext) {
  const { products } = await getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
        // Add a product path for every locale
        products.forEach((product) => {
          arr.push(`/${locale}/product${product.node.path}`)
        })
        return arr
      }, [])
      : products.map((product) => `/product${product.node.path}`),
    fallback: 'blocking'
  }
}

export default function Slug ({
  product,
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback
    ? (
    <h1>Loading...</h1>
      )
    : (
    <ProductView product={product} data={data} />
      )
}

Slug.Layout = Layout
