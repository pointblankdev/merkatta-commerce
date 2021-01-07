import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { Button, Container, Input } from '@components/ui'
import LogoFull from '@components/ui/LogoFull'
import { useUser } from '@lib/hooks'
import { Magic } from 'magic-sdk'

export default function Signin() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  useUser({ redirectTo: '/vendor/dashboard', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value,
    }

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
      })
      const res = await fetch('/api/vendor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/vendor/dashboard')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <Container>
      <div className="grid justify-center h-screen content-center">
        <div className="justify-self-center">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center pb-12">
              <LogoFull />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <Input name="email" placeholder="email" onChange={setEmail} />
              <Button type="submit" variant="slim">
                Sign In
              </Button>
              <span className="pt-1 text-center text-sm">
                <span className="text-accents-7">Don't have an account? </span>
                <a
                  className="text-accent-9 font-bold hover:underline cursor-pointer"
                  href="/vendor/register"
                >
                  Sign Up
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

Signin.Layout = Layout
