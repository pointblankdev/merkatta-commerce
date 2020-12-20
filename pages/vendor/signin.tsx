import { useState } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { Button, Container, Input, Logo } from '@components/ui'
export default function Signin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const click = (e) => {
    e.preventDefault()
    router.push("/vendor/dashboard")
  }

  return (
    <Container>
      <div className="grid justify-items-stretch">
        <div className="justify-self-center">
          <form onSubmit={click}>
            <div className="flex justify-center pb-12">
              <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <Input placeholder="username" onChange={setUsername} />
              <Input type="password" placeholder="password" onChange={setPassword} />
              <Button type="submit" variant="slim">Sign In</Button>
              <span className="pt-1 text-center text-sm">
                <span className="text-accents-7">Don't have an account? </span>
                <a className="text-accent-9 font-bold hover:underline cursor-pointer" href="/vendor/register">
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
