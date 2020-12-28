import cn from 'classnames'
import { useState } from 'react'
import { Layout } from '@components/common'
import { Container, Products, Settings } from '@components/ui'

import { Amplify, withSSRContext, Auth } from 'aws-amplify'
import { listProducts } from '@lib/graphql/queries'

// TODO: find a way to do this properly with vercel + amplify
const awsmobile = {
  aws_project_region: 'us-east-2',
  aws_cognito_identity_pool_id:
    'us-east-2:8afaf5f9-57dd-4453-b450-19f123a7b401',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_7XL26x0Ki',
  aws_user_pools_web_client_id: '262nusf7sdqovsutecoinufr2m',
  oauth: {},
  aws_appsync_graphqlEndpoint:
    'https://u7b3kybfgnf3hotw3invwqgewy.appsync-api.us-east-2.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-2',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
}

Amplify.configure({ ...awsmobile, ssr: true })

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req })
  const { data } = await SSR.API.graphql({ query: listProducts })

  return {
    props: {
      products: data.listProducts,
    },
  }
}

export default function Dashboard({ products = [] }) {
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
