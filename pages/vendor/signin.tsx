import { useState } from 'react'
import { Layout } from '@components/common'
import { Button, Container, Input, Logo } from '@components/ui'
var axios = require('axios').default

var qs = require('qs');
var data = qs.stringify({
 '_username': 'rossragsdale2971',
'_password': 'yxR@Wwerl2',
'_remember_me': 'on' 
});
var config = {
  method: 'post',
  url: 'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login',
  headers: { 
    'Connection': 'keep-alive', 
    'Cache-Control': 'max-age=0', 
    'Upgrade-Insecure-Requests': '1', 
    'Origin': 'https://bigcommerce.webkul.com', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36', 
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
    'Sec-Fetch-Site': 'same-origin', 
    'Sec-Fetch-Mode': 'navigate', 
    'Sec-Fetch-User': '?1', 
    'Sec-Fetch-Dest': 'document', 
    'Referer': 'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login', 
    'Accept-Language': 'en-US,en;q=0.9'
  },
  data : data
};

// const instance = axios.create({
//   baseURL: 'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure',
//   timeout: 1000,
//   headers: { 
//     'Connection': 'keep-alive', 
//     'Cache-Control': 'max-age=0', 
//     'Upgrade-Insecure-Requests': '1', 
//     'Origin': 'https://bigcommerce.webkul.com', 
//     'Content-Type': 'application/x-www-form-urlencoded', 
//     'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36', 
//     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
//     'Sec-Fetch-Site': 'same-origin', 
//     'Sec-Fetch-Mode': 'navigate', 
//     'Sec-Fetch-User': '?1', 
//     'Sec-Fetch-Dest': 'document', 
//     'Referer': 'https://bigcommerce.webkul.com/en/bigcommerce/app/marketplace/mvk5ue8r3o/mp-seller/secure/login', 
//     'Accept-Language': 'en-US,en;q=0.9'
//   }
// });




export default function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const click = async (username: string, password: string) => {
    axios(config)
      .then(function (response) {
        console.log('hello')
        // console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        console.log('hello1')
        console.log(error);
      });
    
    // setLoading(true)
    // setDisabled(true)
    // const response = await axios({
    //   method: 'post',
    //   url: '/login',
    //   data: {
    //     username,
    //     password
    //   }
    // })
    // console.log(response)
    // if (response.status === 200) {
    //   // store session token
    //   console.log('Success')
    // } else {
    //   // return an error message
    //   setMessage('Whoops, something went wrong.')
    //   console.log('Failed')
    // }
    // setLoading(false)
    // setDisabled(false)
  }

  return (
    <Container>
      <div className="grid justify-items-stretch">
        <div className="justify-self-center">
          <form>
            <div className="flex justify-center pb-12">
              <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              {message && (
                <div className="text-red border border-red p-3">{message}</div>
              )}
              <Input placeholder="username" onChange={setUsername} />
              <Input type="password" placeholder="password" onChange={setPassword} />

              <div className="pt-2 w-full flex flex-col">
                <Button
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={disabled}
                  onClick={() => click(username, password)}
                >
                  Sign In
                </Button>
              </div>
              <span className="pt-1 text-center text-sm">
                <span className="text-accents-7">Don't have an account? </span>
                <a className="text-accent-9 font-bold hover:underline cursor-pointer" href="/vendor/register">
                  Sign Up
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

Signin.Layout = Layout
