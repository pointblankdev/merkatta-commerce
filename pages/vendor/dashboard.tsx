import cn from 'classnames'
import { useState } from 'react'
import { Layout } from '@components/common'
import { Container, Products, Settings } from '@components/ui'
import { getBrandIdFromSession, getLoginSession } from '@lib/vendor/auth'
import { useUser } from '@lib/vendor/hooks'

export async function getServerSideProps(ctx) {
  try {
    const session = await getLoginSession(ctx.req)
    const brandId = await getBrandIdFromSession(session)
    // Each vendor account is associated with a BigCommerce 'Brand'
    const { data, error } = await fetch(
      `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products?brand_id=${brandId}`,
      {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'x-auth-token': process.env.ACCESS_TOKEN,
        },
      }
    ).then((r) => r.json())

    return {
      props: {
        products: data,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {
        products: [],
      },
    }
  }
}

export default function Dashboard({ products = [] }) {
  useUser({ redirectTo: '/vendor/signin', redirectIfFound: false })
  const categories = [
    { index: 0, label: 'Product' },
    { index: 1, label: 'Settings' },
  ]
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <Container>
      <div className="grid grid-cols-12 gap-4 mt-3 mb-20">
        <div className="col-span-2">
          <ul>
            <li className="py-1 text-base font-bold tracking-wide">
              <a>Vendor Dashboard</a>
            </li>
            {categories.map(({ index, label }) => (
              <li
                key={index}
                onClick={() => setActiveCategory(index)}
                className={cn(
                  'flex items-center mt-4 py-2 px-6 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100',
                  { underline: activeCategory === index }
                )}
              >
                <a className="btn-blue">{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-10">
          {activeCategory === 0 ? (
            <Products products={products} />
          ) : (
            <Settings />
          )}
        </div>
      </div>
    </Container>
  )
}

Dashboard.Layout = Layout
