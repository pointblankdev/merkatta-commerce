import { magic } from '@lib/vendor/magic'
import { removeTokenCookie } from '@lib/vendor/auth-cookies'
import { getLoginSession } from '@lib/vendor/auth'

export default async function logout(req, res) {
  try {
    const session = await getLoginSession(req)

    if (session) {
      await magic.users.logoutByIssuer(session.issuer)
      removeTokenCookie(res)
    }
  } catch (error) {
    console.error(error)
  }

  res.writeHead(302, { Location: '/vendor/signin' })
  res.end()
}
