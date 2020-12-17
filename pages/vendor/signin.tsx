import { Layout } from '@components/common'
import { Button, Container } from '@components/ui'
const axios = require('axios').default
// fetch(
//   'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login',
//   {
//     headers: {
//       accept:
//         'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//       'accept-language': 'en-US,en;q=0.9',
//       'cache-control': 'no-cache',
//       'content-type': 'application/x-www-form-urlencoded',
//       pragma: 'no-cache',
//       'sec-fetch-dest': 'document',
//       'sec-fetch-mode': 'navigate',
//       'sec-fetch-site': 'same-origin',
//       'sec-fetch-user': '?1',
//       'sec-gpc': '1',
//       'upgrade-insecure-requests': '1',
//       cookie:
//         '__cfduid=df8c026ea548bc03c68cf6a1a8df9e5dd1606794659; sidenav=; PHPSESSID=ce91sdpgkn41mmu4ts34k9soue',
//     },
//     referrer:
//       'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login',
//     referrerPolicy: 'strict-origin-when-cross-origin',
//     body: '_username=rossragsdale2971&_password=yxR%40Wwerl2&_remember_me=on',
//     method: 'POST',
//     mode: 'cors',
//   }
// )

const click = () =>
  fetch(
    'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login',
    {
      method: 'POST',
      body: '_username=rossragsdale2971&_password=yxR%40Wwerl2&_remember_me=on',
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        pragma: 'no-cache',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        cookie:
          '__cfduid=df8c026ea548bc03c68cf6a1a8df9e5dd1606794659; sidenav=; PHPSESSID=ce91sdpgkn41mmu4ts34k9soue',
      },
      referrer:
        'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login',
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors',
    }
  )

export default function Signin() {
  return (
    <Container>
      <button onClick={click}>REQUEST</button>
    </Container>
  )
}

Signin.Layout = Layout
