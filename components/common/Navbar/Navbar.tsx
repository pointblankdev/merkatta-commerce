import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'


const Navbar: FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const router = useRouter()

  const handleScroll = () => {
    const offset = 0
    const { scrollTop } = document.documentElement
    const scrolled = scrollTop > offset
    setHasScrolled(scrolled)
  }

  useEffect(() => {
    document.addEventListener('scroll', throttle(handleScroll, 200))
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div className={cn(s.root, { 'shadow-magical': hasScrolled })}>
      <Container>
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="space-x-4 ml-6 hidden">
              <Link href="/search">
                <a className={s.link}>All</a>
              </Link>
              <Link href="/search?q=clothes">
                <a className={s.link}>Clothes</a>
              </Link>
              <Link href="/search?q=accessories">
                <a className={s.link}>Accessories</a>
              </Link>
              <Link href="https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login">
                <a className={s.link}>Seller Login</a>
              </Link>
              <Link href="https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/register">
                <a className={s.link}>Seller Registration</a>
              </Link>
            </nav>
          </div>
          {router.pathname !== '/vendor/signin' && router.pathname !== '/vendor/register' && (
            <>
              <div className="flex-1 justify-center">
                <Searchbar />  
              </div>
              <div className="flex flex-1 justify-end space-x-8">
                <UserNav />
              </div>
            </>
          )}
        </div>
        <div className="flex pb-4 lg:px-6 hidden">
          <Searchbar id="mobile-search" />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
