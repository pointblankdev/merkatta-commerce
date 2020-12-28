/* Amplify Params - DO NOT EDIT
	API_MERKATTAAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_MERKATTAAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var request = require('request')

var options = {
  method: 'POST',
  url: 'https://api.bigcommerce.com/stores/mvk5ue8r3o/v3/catalog/products',
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
    'x-auth-token': process.env.ACCESS_TOKEN,
  },
  body: {
    name: 'Create product with image 2',
    price: '10.00',
    categories: [23],
    weight: 4,
    type: 'physical',
    images: [
      {
        image_url:
          'https://upload.wikimedia.org/wikipedia/commons/7/7f/Anglel_Bless_Legendary_Hills_1_m%C4%9Bs%C3%ADc_st%C3%A1%C5%99%C3%AD.jpg',
      },
    ],
  },
  json: true,
}

exports.handler = async (event) => {
  const data = await new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (error) reject(error)
      resolve(body)
    })
  })

  console.log(data)
  return { statusCode: 200 }
}
