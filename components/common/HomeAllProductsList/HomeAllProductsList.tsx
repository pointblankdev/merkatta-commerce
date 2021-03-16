import { FC } from 'react'
import Link from 'next/link'
import { Hero } from '@components/ui'
import s from './HomeAllProductsList.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'
import ProductsTable from '../ProductsTable'

interface Props {
  bestSelling?: any
  categories?: any
  brands?: any
  newestProducts?: any
  data?: any
}

const Head: FC<Props> = ({
  categories,
  brands,
  newestProducts,
  bestSelling,
  data
}) => {
  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            {/* <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getCategoryPath('')}>
                <a>All Categories</a>
              </Link>
            </li> */}
            {categories.map((cat: any) => (
              <li key={cat.path} className="py-1 text-accents-8">
                <Link href={getCategoryPath(cat.path)}>
                  <a>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          {/* <ul className="">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getDesignerPath('')}>
                <a>All Vendors</a>
              </Link>
            </li>
            {brands.flatMap(({ node }: any) => (
              <li key={node.path} className="py-1 text-accents-8">
                <Link href={getDesignerPath(node.path)}>
                  <a>{node.name}</a>
                </Link>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <Hero
          headline="Welcome to Merkatta"
          description="
        The simplest wholesale packaging marketplace."
        />
        <ProductsTable data={data} categories={categories} />
      </div>
    </div>
  )
}

export default Head
