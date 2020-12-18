import { useState } from 'react'
import { Layout } from '@components/common'
import { Button, Container, Input, Logo } from '@components/ui'
const axios = require('axios').default

const click = (username, password) =>
  fetch(
    'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login',
    {
      method: 'POST',
      body: `_username=${username}&_password=${password}&_remember_me=on`,
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        pragma: 'no-cache',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        cookie:
          '__cfduid=df8c026ea548bc03c68cf6a1a8df9e5dd1606794659; sidenav=; PHPSESSID=ce91sdpgkn41mmu4ts34k9soue',
      },
      referrer:
        'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login',
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors',
    }
  )

export default function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <Container>
      <div className="grid justify-items-stretch">
        <div className="justify-self-center">
          <form>
            <div className="flex justify-center pb-12">
              <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <Input placeholder="username" onChange={setUsername} />
              <Input type="password" placeholder="password" onChange={setPassword} />

              <div className="pt-2 w-full flex flex-col">
                <Button
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={disabled}
                  onClick={() => click(username, password)}
                >
                  Sign Up
                </Button>
              </div>
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
