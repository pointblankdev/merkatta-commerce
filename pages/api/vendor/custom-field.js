export default async function customField (req, res) {
  if (req.method === 'PUT') {
    try {
      const field = JSON.parse(req.body)
      const response = await fetch(
        `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products/${req.query.id}/custom-fields/${req.query.custom_field_id}`,
        {
          method: 'PUT',
          mode: 'no-cors',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            'x-auth-token': process.env.ACCESS_TOKEN
          },
          body: JSON.stringify(field)
        }
      ).then((r) => r.json())
      res.statusCode = response.status || 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))
    } catch (error) {
      res.end()
    }
  }
  if (req.method === 'POST') {
    try {
      const field = JSON.parse(req.body)
      const response = await fetch(
        `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products/${req.query.id}/custom-fields`,
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            'x-auth-token': process.env.ACCESS_TOKEN
          },
          body: JSON.stringify(field)
        }
      ).then((r) => r.json())
      res.statusCode = response.status || 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))
    } catch (error) {
      res.end()
    }
  }
}
