import { getBrandIdFromSession, getLoginSession } from '@lib/vendor/auth'
import _ from 'lodash'

export default async function product (req, res) {
  /**
   * Create or Update Product
   */
  if (req.method === 'POST') {
    const product = JSON.parse(req.body)
    const session = await getLoginSession(req)
    const brandId = await getBrandIdFromSession(session)
    const body = JSON.stringify({
      type: 'physical',
      weight: 0,
      brand_id: brandId,
      ...product
    })

    let pathParam = ''
    let method = 'POST'
    if (product.id) {
      pathParam = `/${product.id}`
      method = 'PUT'
    }

    const response = await fetch(
      `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products${pathParam}`,
      {
        method,
        mode: 'no-cors',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'x-auth-token': process.env.ACCESS_TOKEN
        },
        body
      }
    ).then((r) => r.json())

    res.statusCode = response.status || 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response))
  }

  /**
   * Get Product by ID
   */
  if (req.method === 'GET') {
    const response = await fetch(
      `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products/${req.query.id}&include=custom_fields`,
      {
        method: 'GET',
        mode: 'no-cors',
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
}
