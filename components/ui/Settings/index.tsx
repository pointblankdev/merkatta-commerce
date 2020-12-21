import { useState } from 'react'
import { Container } from '@components/ui'
import Input from '../Input'

const SellerSettings = ({ props }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="text-sm font-medium text-gray-900">
          {props.seller}
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{props.email}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">Today</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {props.status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{props.zipcode}</div>
    </td>
  </tr>
)

const SettingsHeader = () => (
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Seller Company
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Email
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Last Updated
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Status
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Zipcode
      </th>
    </tr>
  </thead>
)

export default function Settings() {
  const [settings, setSettings] = useState(
    [{
     seller: "Snoop Dogg",
      status: 'Active',
      email: "snoop@dogg.com",
      phone: "0123456789",
      address: "420GinAndJuice St",
      address2: "",
      city: "Long Beach",
      state: "CA",
      country: "USA",
      zipcode: "90210"
    }]
  )  
  const [hideSettingsModal, setHideSettingsModal] = useState(true)
  const [seller, setSeller] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipcode, setZipcode] = useState('')

  const editSettings = () => {
    // setSettings([...settings, {seller, status, email, phone, address, address2, city, state, country, zipcode}])
    // setSeller('')
    // setEmail('')
    // setPhone('')
    // setAddress('')
    // setAddress2('')
    // setCity('')
    // setState('')
    // setCountry('')
    // setZipcode('')
    setHideSettingsModal(true)
  }

    return <Container>
      <div className="mb-12 transition ease-in duration-75" >
        <h1 className="flex-auto text-xl font-semibold">Settings</h1>
        {!hideSettingsModal && (
          <div className={"fixed z-10 inset-0 overflow-y-auto"}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Edit Settings
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={editSettings}>
                        <div className="flex flex-col space-y-4 w-full my-6">
                          <Input placeholder="Seller" onChange={setSeller} />
                          <Input type="email" placeholder="Email" onChange={setEmail} />
                          <Input placeholder="Phone" onChange={setPhone} />
                          <Input placeholder="Address" onChange={setAddress} />
                          <Input placeholder="Address 2" onChange={setAddress2} />
                          <Input placeholder="City" onChange={setCity} />
                          <Input placeholder="State" onChange={setState} />
                          <Input placeholder="Country" onChange={setCountry} />
                          <Input placeholder="Zipcode" onChange={setZipcode} />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={editSettings} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button onClick={() => setHideSettingsModal(true)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <SettingsHeader />
                <tbody className="bg-white divide-y divide-gray-200">
                  {settings.map((setting) => (
                    <SellerSettings props={setting} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button onClick={() => setHideSettingsModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Edit Settings
        </button>
      </div>
    </Container>
}