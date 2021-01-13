import { getBrandIdFromSession, getLoginSession } from '@lib/vendor/auth'
import _ from 'lodash'

export default async function product(req, res) {
  const session = await getLoginSession(req)
  const brandId = await getBrandIdFromSession(session)
  const body = JSON.stringify({
    ...JSON.parse(req.body),
    type: 'physical',
    brand_id: brandId,
  })
  const response = await fetch(
    `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products`,
    {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'x-auth-token': process.env.ACCESS_TOKEN,
      },
      body,
    }
  ).then((r) => r.json())
  res.statusCode = response.status || 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(response))
}
