import { useState } from 'react'
import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import { Layout } from '@components/common'
import { Container, Button, Input } from '@components/ui'
import { defatultPageProps } from '@lib/defaults'
import LogoFull from '@components/ui/LogoFull'
import { useUser } from '@lib/vendor/hooks'
import useMagicLink from '@lib/hooks/useMagicLink'
import { createVendor, getLoginSession } from '@lib/vendor/auth'
import { useRouter } from 'next/router'

export async function getStaticProps ({
  preview,
  locale
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { ...defatultPageProps, pages }
  }
}

export default function Register () {
  const [seller, setSeller] = useState('')
  const [email, setEmail] = useState('')
  const [loading] = useState(false)
  const { register } = useMagicLink()
  const router = useRouter()

  useUser({ redirectTo: '/vendor/dashboard', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit (e) {
    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    try {
      await register({ email, name: seller })
      router.push('/vendor/signin')
    } catch (error) {
      console.error('An unexpected error occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <Container>
      <div className="grid justify-center content-center">
        <div className="justify-self-center lg:p-10 mt-20">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center pb-12 ">
              <LogoFull width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <Input placeholder="Company Name" onChange={setSeller} />
              <Input type="email" placeholder="Email" onChange={setEmail} />

              <div className="pt-2 w-full flex flex-col">
                <Button
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={email === '' || seller === ''}
                >
                  Sign Up
                </Button>
              </div>

              <span className="pt-1 text-center text-sm">
                <span className="text-accents-7">Do you have an account? </span>
                <a
                  className="text-accent-9 font-bold hover:underline cursor-pointer"
                  href="/vendor/signin"
                >
                  Log In
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

Register.Layout = Layout
