import { Magic } from 'magic-sdk'

const fetcher = async (url, body) => {
  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
  const didToken = await magic.auth.loginWithMagicLink({
    email: body.email
  })
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + didToken
    },
    body: JSON.stringify(body)
  }).then((r) => r.json())
}

export const useMagicLink = () => {
  const signIn = async (body) => {
    await fetcher('/api/vendor/login', body)
  }

  const register = async (body) => {
    await fetcher('/api/vendor/register', body)
  }

  return {
    signIn,
    register
  }
}

export default useMagicLink
