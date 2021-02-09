import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import { Layout } from '@components/common'
import { Container } from '@components/ui'

export async function getStaticProps ({
  preview,
  locale
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages }
  }
}

export default function Blog () {
  return (
    <div className="pb-20">
      <div className="text-center pt-40 pb-56 bg-secondary">
        <Container>
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
            Welcome to Merkatta
          </h2>
          <p className="mt-3 max-w-md mx-auto text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We're happy you've stopped by.
          </p>
          <p className="mt-3 max-w-md mx-auto text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            You've found the best place to buy and sell wholesale packaging
            online.
          </p>
          <p className="mt-3 max-w-md mx-auto text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Site launching in Q1 2021.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="flex">
              <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://vercel.com/api/www/avatar/61182a9f6bda512b4d9263c9c8a60aabe0402f4c?s=204"
                  alt="Avatar"
                />
              </div>
              <div className="ml-4">
                <div className="leading-6 font-medium text-white">
                  Tony King
                </div>
                <div className="leading-6 font-medium text-gray-200">
                  CEO, Merkatta
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        {/* <div className="-mt-96 mx-auto">
          <img src="/graphic.png" alt="Graphic" />
        </div> */}
        {/** Replace by HTML Content */}
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
          <p className="py-6">
            We're still getting things set up here, so stay tuned from something
            great!
          </p>
          {/* <p className="py-6">
            Biscuit sugar plum sweet chocolate cake sesame snaps soufflé
            topping. Gummies topping bonbon chocolate pudding cookie. Wafer
            icing cake pastry. Gummies candy dessert chupa chups lemon drops.
            Soufflé marshmallow oat cake chocolate jelly-o caramels pie marzipan
            jelly beans. Cheesecake liquorice donut jujubes halvah ice cream
            cotton candy cupcake sugar plum. Ice cream ice cream sweet roll
            fruitcake icing. Muffin candy canes bonbon croissant gummies lemon
            drops pie danish. Oat cake chocolate toffee cake jelly tart
            caramels. Sweet donut cheesecake pastry pie sweet. Bonbon lollipop
            brownie. Soufflé pudding macaroon cotton candy gingerbread. Biscuit
            macaroon gummi bears candy canes chocolate cake lemon drops
            marshmallow. Chocolate cake cotton candy marshmallow cake sweet
            tootsie roll bonbon carrot cake sugar plum.
          </p> */}
        </div>
      </Container>
    </div>
  )
}

Blog.Layout = Layout
