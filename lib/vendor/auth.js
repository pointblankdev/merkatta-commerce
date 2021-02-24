import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'

const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function setLoginSession (res, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession (req) {
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

export async function getBrandIdFromSession (session) {
  // 1-to-many relationship between email (session.publicAddress) and vendor/brand (brandId)
  const query = /* GraphQL */ `
    query myBrandId($publicAddress: String) {
      Vendors(where: { Users: { id: { _eq: $publicAddress } } }) {
        id
      }
    }
  `
  const variables = {
    publicAddress: session.publicAddress
  }
  const response = await fetch('https://top-quagga-69.hasura.app/v1/graphql', {
    method: 'POST',
    Accept: 'api_version=2',
    'Content-Type': 'application/graphql',
    body: JSON.stringify({ query, variables })
  })
  const { data } = await response.json()
  if (data?.Vendors.length > 0) {
    return data?.Vendors[0]?.id
  } else {
    throw Error('Vendor for user not found in Hasura')
  }
}

export async function createUser (metadata, vendorID) {
  console.log('creating new user in hasura')
  const variables = { id: metadata.publicAddress, vendor_id: String(vendorID) }
  const query = /* GraphQL */ `
    mutation createUser($id: String, $vendor_id: String) {
      insert_Users_one(object: { id: $id, vendor_id: $vendor_id }) {
        id
        vendor_id
      }
    }
  `
  const resp = await fetch('https://top-quagga-69.hasura.app/v1/graphql', {
    method: 'POST',
    Accept: 'api_version=2',
    'Content-Type': 'application/graphql',
    body: JSON.stringify({ query, variables })
  }).then((r) => r.json())

  if (resp.data) {
    return variables
  } else {
    throw Error('Failure creaing new user')
  }
}

export async function createVendor (vendorDetails) {
  /**
   * part 1: create brand in bigcommerce
   */
  console.log('createVendor: creating new brand in bigcommerce')
  const body = JSON.stringify({
    name: vendorDetails.name
  })
  const response = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/brands`,
    {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'x-auth-token': process.env.ACCESS_TOKEN
      },
      body
    }
  ).then((r) => r.json())

  /**
   * part 2: create vendor in hasura
   */
  console.log('creating new vendor in hasura')
  const query = /* GraphQL */ `
    mutation createVendor($id: String) {
      insert_Vendors_one(object: { id: $id }) {
        id
      }
    }
  `
  const variables = {
    id: String(response?.data?.id)
  }
  const resp = await fetch('https://top-quagga-69.hasura.app/v1/graphql', {
    method: 'POST',
    Accept: 'api_version=2',
    'Content-Type': 'application/graphql',
    body: JSON.stringify({ query, variables })
  }).then((r) => r.json())

  if (resp.data) {
    return variables
  } else {
    throw Error('Failure creaing new vendor')
  }
}
