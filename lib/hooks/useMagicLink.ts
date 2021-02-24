import { Magic } from 'magic-sdk'

export const useMagicLink = () => {
  const signIn = async (body) => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
    const didToken = await magic.auth.loginWithMagicLink({
      email: body.email
    })
    return await fetch('/api/vendor/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken
      },
      body: JSON.stringify(body)
    }).then((r) => r.json())
  }

  const register = async (body) => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
    const didToken = await magic.auth.loginWithMagicLink({
      email: body.email
    })
    return await fetch('/api/vendor/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken
      },
      body: JSON.stringify(body)
    }).then((r) => r.json())
  }

  return {
    signIn,
    register
  }
}

export default useMagicLink
