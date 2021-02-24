import { useState } from 'react'
import { Layout } from '@components/common'
import { Button, Container, Input } from '@components/ui'
import LogoFull from '@components/ui/LogoFull'
import { useUser } from '@lib/vendor/hooks'
import useMagicLink from '@lib/hooks/useMagicLink'
import { useRouter } from 'next/router'

export default function Signin () {
  const [email, setEmail] = useState('')
  const { signIn } = useMagicLink()
  const router = useRouter()

  useUser({ redirectTo: '/vendor/dashboard', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit (e) {
    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    try {
      const res = await signIn({ email })
      if (res.status === 200) {
        router.push('/vendor/dashboard')
      } else {
        throw new Error(await res.text())
      }
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
            <div className="flex justify-center pb-12">
              <LogoFull />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <Input
                name="email"
                placeholder="Email address"
                onChange={setEmail}
              />
              <Button type="submit" variant="slim" disabled={email === ''}>
                Sign in with magic link
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
