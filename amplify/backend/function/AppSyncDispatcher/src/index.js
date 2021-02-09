/* Amplify Params - DO NOT EDIT
	API_MERKATTAAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_MERKATTAAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const request = require('request')

const options = {
  method: 'GET',
  url: `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/catalog/products`,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
    'x-auth-token': process.env.ACCESS_TOKEN
  },
  json: true
}

const resolvers = {
  Query: {
    listProducts: async (event) => {
      const { data } = await new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if (error) reject(error)
          resolve(body)
        })
      })
      return { statusCode: 200, items: data }
    }
  },
  Mutation: {
    createOrUpdateProduct: async (event) => {
      const data = await new Promise((resolve, reject) => {
        options.body = {
          name: 'Create product with image ' + Math.random() * 100,
          price: '10.00',
          categories: [23],
          weight: 4,
          type: 'physical',
          images: [
            {
              image_url:
                'https://upload.wikimedia.org/wikipedia/commons/7/7f/Anglel_Bless_Legendary_Hills_1_m%C4%9Bs%C3%ADc_st%C3%A1%C5%99%C3%AD.jpg'
            }
          ]
        }
        request(options, (error, response, body) => {
          if (error) reject(error)
          resolve(body)
        })
      })
      return { statusCode: 200 }
    }
  }
}

exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName]
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName]
    if (resolver) {
      return await resolver(event)
    }
  }
  throw new Error('Resolver not found.')
}
