import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { FC } from 'react'
import type { AppProps } from 'next/app'

import { ManagedUIContext } from '@components/ui/context'
import { Head } from '@components/common'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apollo'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head />
      <ManagedUIContext>
        <ApolloProvider client={apolloClient}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </ManagedUIContext>
    </>
  )
}
