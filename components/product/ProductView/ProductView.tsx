import { FC, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import s from './ProductView.module.css'
import { useUI } from '@components/ui/context'
import { Swatch, ProductSlider } from '@components/product'
import { Button, Container, Text } from '@components/ui'

import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import useAddItem from '@bigcommerce/storefront-data-hooks/cart/use-add-item'
import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import {
  getCurrentVariant,
  getProductOptions,
  SelectedOptions
} from '../helpers'
import WishlistButton from '@components/wishlist/WishlistButton'

interface Props {
  className?: string
  children?: any
  product: ProductNode
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()
  const { price } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode!
  })
  const { openSidebar } = useUI()
  const options = getProductOptions(product)
  const [loading, setLoading] = useState(false)
  const [contactSellerModalVisible, setContactSellerModalVisible] = useState(
    false
  )
  const [choices, setChoices] = useState<SelectedOptions>({
    size: null,
    color: null
  })
  const variant =
    getCurrentVariant(product, choices) || product.variants.edges?.[0]

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: product.entityId,
        variantId: product.variants.edges?.[0]?.node.entityId!
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images.edges?.[0]?.node.urlOriginal!,
              width: 800,
              height: 600,
              alt: product.name
            }
          ]
        }}
      />
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {price} {product.prices?.price.currencyCode}
            </div>
          </div>

          <div className={s.sliderContainer}>
            <ProductSlider>
              {product.images.edges?.map((image, i) => (
                <div key={image?.node.urlOriginal} className={s.imageContainer}>
                  <Image
                    className={s.img}
                    src={image?.node.urlOriginal!}
                    alt={image?.node.altText || 'Product Image'}
                    width={1050}
                    height={1050}
                    priority={i === 0}
                    quality="85"
                  />
                </div>
              ))}
            </ProductSlider>
          </div>
        </div>

        <div className={s.sidebar}>
          <section>
            {options?.map((opt: any) => (
              <div className="pb-4" key={opt.displayName}>
                <h2 className="uppercase font-medium">{opt.displayName}</h2>
                <div className="flex flex-row py-4">
                  {opt.values.map((v: any, i: number) => {
                    const active = (choices as any)[opt.displayName]

                    return (
                      <Swatch
                        key={`${v.entityId}-${i}`}
                        active={v.label === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            return {
                              ...choices,
                              [opt.displayName]: v.label
                            }
                          })
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="pb-14 break-words w-full max-w-xl">
              <Text html={product.description} />
            </div>
          </section>
          <div>
            <Button
              aria-label="Contact Seller"
              type="button"
              className={s.button}
              onClick={() => {
                setContactSellerModalVisible(!contactSellerModalVisible)
              }}
              loading={loading}
              disabled={!variant}
            >
              Contact Seller
            </Button>
          </div>
        </div>

        <WishlistButton
          className={s.wishlistButton}
          productId={product.entityId}
          variant={product.variants.edges?.[0]!}
        />
      </div>
      <ContactSellerModal
        show={contactSellerModalVisible}
        onClose={() => setContactSellerModalVisible(false)}
      />
    </Container>
  )
}

export default ProductView

const ContactSellerModal = ({ show, onClose }) => {
  if (!show) return null
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                📞
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Contact Seller
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You can learn more about this product by calling the number
                    below.
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-xl text-black">+1 (847) 910 4354</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <a
              href="tel:18479104354"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
