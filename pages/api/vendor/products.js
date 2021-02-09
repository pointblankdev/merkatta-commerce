import { getBrandIdFromSession, getLoginSession } from '@lib/vendor/auth'

export default async function products (req, res) {
  const session = await getLoginSession(req)
  const brandId = await getBrandIdFromSession(session)
  // Each vendor account is associated with a BigCommerce 'Brand'
  const response = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products?brand_id=${brandId}`,
    {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'x-auth-token': process.env.ACCESS_TOKEN
      }
    }
  ).then((r) => r.json())
  res.statusCode = response.status || 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(response))
}
