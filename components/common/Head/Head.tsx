import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import config from '@config/seo.json'

const Head: FC = () => {
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <script type="text/javascript" src="/zest/settings.js"></script>
        <script type="text/javascript" src="/zest/start.js"></script>
      </NextHead>
    </>
  )
}

export default Head
