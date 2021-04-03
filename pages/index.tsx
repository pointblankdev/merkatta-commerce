import rangeMap from '@lib/range-map'
import { Layout } from '@components/common'
import HomeAllProductsList from '@components/common/HomeAllProductsList'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllProducts from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import Blog from './blog'
import getSlug from '@lib/get-slug'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  // Get Featured Products
  const { products: featuredProducts } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Selling Products
  const { products: bestSellingProducts } = await getAllProducts({
    variables: { field: 'bestSellingProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Newest Products
  const { products: newestProducts } = await getAllProducts({
    variables: { field: 'newestProducts', first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  const categoriesFilter = `&categories=${
    categories.find((c) => getSlug(c.path) === 'ppfp')?.entityId
  }`
  const { data } = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products?include=custom_fields${categoriesFilter}`,
    {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'x-auth-token': process.env.ACCESS_TOKEN,
      },
    }
  ).then((r) => r.json())

  // These are the products that are going to be displayed in the landing.
  // We prefer to do the computation at buildtime/servertime
  const { featured, bestSelling } = (() => {
    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.prices.price.value - b.node.prices.price.value)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

  return {
    props: {
      featured,
      bestSelling,
      newestProducts,
      categories,
      brands,
      pages,
      data,
    },
    revalidate: 14400,
  }
}

const nonNullable = (v: any) => v

export function Home({
  featured,
  bestSelling,
  brands,
  categories,
  newestProducts,
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <HomeAllProductsList
        categories={categories}
        brands={brands}
        newestProducts={newestProducts}
        bestSelling={bestSelling}
        data={data}
      />
    </div>
  )
}

Home.Layout = Layout

/**
 * This is temporary.
 * Make home the default export for local dev.
 */
export default function ComingSoon() {
  return <Blog pages={[]} />
}
