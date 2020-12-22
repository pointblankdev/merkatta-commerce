import { useState } from 'react'
import type { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import { Layout } from '@components/common'
import { Container, Button, Input } from '@components/ui'
import { defatultPageProps } from '@lib/defaults'
import LogoFull from '@components/ui/LogoFull'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { ...defatultPageProps, pages },
  }
}

export default function Register() {
  const [seller, setSeller] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const router = useRouter()

  const click = (e) => {
    e.preventDefault()
    router.push("/vendor/dashboard")
  }

  return (
    <Container>
      <div className="grid justify-items-stretch h-screen content-center">
        <div className="justify-self-center w-full md:w-3/5">
          <form onSubmit={click}>
            <div className="flex justify-center pb-12 ">
              <LogoFull width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <Input placeholder="Seller" onChange={setSeller} />
              <Input type="email" placeholder="Email" onChange={setEmail} />
              <Input placeholder="Phone" onChange={setPhone} />
              <Input placeholder="Address" onChange={setAddress} />
              <Input placeholder="Address 2" onChange={setAddress2} />
              <Input placeholder="City" onChange={setCity} />
              <Input placeholder="State" onChange={setState} />
              <Input placeholder="Country" onChange={setCountry} />
              <Input placeholder="Zipcode" onChange={setZipcode} />

              <div className="pt-2 w-full flex flex-col">
                <Button
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={disabled}
                >
                  Sign Up
                </Button>
              </div>

              <span className="pt-1 text-center text-sm">
                <span className="text-accents-7">Do you have an account? </span>
                <a className="text-accent-9 font-bold hover:underline cursor-pointer" href="/vendor/signin">
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
