import type { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import Image from 'next/image'
import s from './ProductList.module.css'
import WishlistButton from '@components/wishlist/WishlistButton'

interface Props {
  className?: string
  product: ProductNode
  variant?: 'slim' | 'simple' | 'label' | 'tag'
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductList: FC<Props> = ({
  className,
  product: p,
  variant,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive'
}) => {
  const { price } = usePrice({
    amount: p.prices?.price?.value,
    baseAmount: p.prices?.retailPrice?.value,
    currencyCode: p.prices?.price?.currencyCode!
  })
  const variants = {
    label: (
      <>
        <div className="box-border w-full z-20 py-2">
          <div className="top-0 left-0 pr-16 max-w-full">
            <h3 className={s.productTitle}>
              <span>{p.name}</span>
            </h3>
            <span className={s.productPrice}>{price} / unit</span>
          </div>
        </div>
        <hr />
      </>
    )
  }
  return (
    <Link href={`/product${p.path}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        {variants[variant]}
      </a>
    </Link>
  )
}

export default ProductList
