import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'

const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function setLoginSession(res, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req)

  if (!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}

export async function getBrandIdFromSession(session) {
  // 1-to-many relationship between email (session.publicAddress) and vendor/brand (brandId)
  const query = /* GraphQL */ `
    query myBrandId($publicAddress: String) {
      Vendors(where: { Users: { id: { _eq: $publicAddress } } }) {
        id
      }
    }
  `
  const variables = {
    publicAddress: session.publicAddress,
  }
  const response = await fetch('https://top-quagga-69.hasura.app/v1/graphql', {
    method: 'POST',
    Accept: 'api_version=2',
    'Content-Type': 'application/graphql',
    body: JSON.stringify({ query, variables }),
  })
  const { data } = await response.json()
  return data?.Vendors[0]?.id
}
