import { FC, useEffect, useState, useCallback } from 'react'
import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import { Layout } from '@components/common'
import { Info } from '@components/icons'
import { Text, Container, Logo, Button, Input } from '@components/ui'
import { defatultPageProps } from '@lib/defaults'

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
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <Container>
      <div className="grid justify-items-stretch">
        <div className="justify-self-center">
          <form>
            <div className="flex justify-center pb-12 ">
              <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4">
              {message && (
                <div className="text-red border border-red p-3">{message}</div>
              )}
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
                <span className="text-accents-7">Do you have an account?</span>
                <a className="text-accent-9 font-bold hover:underline cursor-pointer">
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
