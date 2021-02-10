import { FC } from 'react'
import Link from 'next/link'
import { Grid, Hero, Marquee } from '@components/ui'
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'
import useConfig from '@lib/hooks/useConfig'

interface Props {
  bestSelling?: any
  categories?: any
  brands?: any
  newestProducts?: any
}

const Head: FC<Props> = ({
  categories,
  brands,
  newestProducts,
  bestSelling
}) => {
  const config = useConfig()
  console.log('CONFIG: ', config)

  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getCategoryPath('')}>
                <a>All Categories</a>
              </Link>
            </li>
            {categories.map((cat: any) => (
              <li key={cat.path} className="py-1 text-accents-8">
                <Link href={getCategoryPath(cat.path)}>
                  <a>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="">
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
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <Hero
          headline="Welcome to Merkatta"
          description="
        The simplest wholesale packaging marketplace."
        />
        <Marquee>
          {bestSelling.slice(0, 3).map(({ node }) => (
            <ProductCard
              key={node.path}
              product={node}
              variant="slim"
              imgWidth={320}
              imgHeight={320}
              imgLayout="fixed"
            />
          ))}
        </Marquee>
        <div className="flex-1">
          <Grid layout="normal">
            {newestProducts.map(({ node }: any) => (
              <ProductCard
                key={node.path}
                product={node}
                variant="simple"
                imgWidth={480}
                imgHeight={480}
              />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default Head
