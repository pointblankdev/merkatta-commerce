import { useState } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { Button, Container, Input } from '@components/ui'
import LogoFull from '@components/ui/LogoFull'

import { Amplify } from 'aws-amplify'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'

// TODO: find a way to do this properly with vercel + amplify
const awsmobile = {
  aws_project_region: 'us-east-2',
  aws_cognito_identity_pool_id:
    'us-east-2:8afaf5f9-57dd-4453-b450-19f123a7b401',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_7XL26x0Ki',
  aws_user_pools_web_client_id: '262nusf7sdqovsutecoinufr2m',
  oauth: {},
  aws_appsync_graphqlEndpoint:
    'https://u7b3kybfgnf3hotw3invwqgewy.appsync-api.us-east-2.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-2',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
}

Amplify.configure({ ...awsmobile, ssr: true })

export default function Signin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = (e) => {
    e.preventDefault()
    router.push('/vendor/dashboard')
  }

  return (
    <Container>
      <AmplifyAuthenticator>
        <div className="grid justify-center h-screen content-center">
          <div className="justify-self-center">
            <form onSubmit={click}>
              <div className="flex justify-center pb-12">
                <LogoFull />
              </div>
              <div className="flex flex-col space-y-4 w-full">
                <Input placeholder="email" onChange={setEmail} />
                <Input
                  type="password"
                  placeholder="password"
                  onChange={setPassword}
                />
                <Button type="submit" variant="slim">
                  Sign In
                </Button>
                <span className="pt-1 text-center text-sm">
                  <span className="text-accents-7">
                    Don't have an account?{' '}
                  </span>
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
      </AmplifyAuthenticator>
    </Container>
  )
}

Signin.Layout = Layout
