import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getSlug from '@lib/get-slug'
import { Container, Logo } from '@components/ui'
import LogoFull from '@components/ui/LogoFull'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages, legalPages } = usePages(pages)
  const rootClassName = cn(className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accents-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="invisible flex flex-initial items-center font-bold md:mr-24 md:visible">
                <Logo />
              </a>
            </Link>
          </div>
          <div className="justify-self-center col-span-1 lg:col-span-2 lg:col-start-6">
            <ul className="flex flex-initial flex-row md:flex-1">
              <li className="px-3">
                <Link href="/">
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    Home
                  </a>
                </Link>
              </li>
              <li className="px-3">
                <Link href="/blog">
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    Blog
                  </a>
                </Link>
              </li>
              {sitePages.map((page) => (
                <li key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="col-span-1 lg:col-span-2">
            <ul className="flex flex-initial flex-col md:flex-1">
              {legalPages.map((page) => (
                <li key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </Container>
    </footer>
  )
}

function usePages (pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)

      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return

      if (isLegalPage(slug, locale)) {
        legalPages.push(page)
      } else {
        sitePages.push(page)
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder)
  }
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug)

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder (a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
