import ContactSellerModal from '@components/product/ContactSellerModal'
import { useState } from 'react'
import { find, toInteger } from 'lodash'
import { getCategoryPath } from '@lib/search'
import getSlug from '@lib/get-slug'

const ExcessInventoryTable = ({ data, categories }) => {
  const [contactSellerModalVisible, setContactSellerModalVisible] = useState(
    false
  )
  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="justify-start text-center">
          <tr className="bg-secondary">
            <th className="px-16 py-2">
              <span className="text-gray-300">Material type</span>
            </th>
            <th className="px-24 py-2">
              <span className="text-gray-300">Name</span>
            </th>
            <th className="px-2 py-2">
              <span className="text-gray-300">Pre-slit width</span>
            </th>
            <th className="px-2 py-2">
              <span className="text-gray-300">Footage available</span>
            </th>
            <th className="px-2 py-2">
              <span className="text-gray-300">Contact vendor</span>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {data.map((node) => (
            <tr
              key={node.id}
              className="bg-gradient-to-l odd:from-gray-200 h-16"
            >
              <td className="px-16 py-2 flex flex-row items-center overflow-hidden select-none pointer-events-none">
                <ProductIcon product={node} categories={categories} />
              </td>
              <td className="text-center ml-2 font-light">
                <span>{node.name}</span>
              </td>
              <td className="text-center ml-2 font-normal">
                <span>{node.width}</span>
              </td>
              <td className="px-12 py-2 text-center">
                <span className="text-green">
                  {find(node.custom_fields, {
                    name: 'shipsWithinDay'
                  })?.value
                    ? '✔️'
                    : null}
                </span>
              </td>
              <td className="px-12 py-2">
                <div className="flex">
                  <button
                    className="bg-secondary-2 text-white px-4 w-full py-2 border rounded-md hover:bg-white hover:border-secondary hover:text-primary"
                    onClick={() => {
                      setContactSellerModalVisible(!contactSellerModalVisible)
                    }}
                  >
                    Call
                  </button>
                  <button
                    className="bg-secondary-2 text-white px-4 w-full py-2 border rounded-md hover:bg-white hover:border-secondary hover:text-primary"
                    onClick={() => {
                      setContactSellerModalVisible(!contactSellerModalVisible)
                    }}
                  >
                    Email
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ContactSellerModal
        show={contactSellerModalVisible}
        onClose={() => setContactSellerModalVisible(false)}
      />
    </div>
  )
}

const ProductIcon = ({ product, categories }) => {
  if (!categories || !product) return null
  // HACK support multiple category matching on product
  const cat = categories.find((c) => c.entityId === product.categories[0])
  const path = getSlug(cat.path).toUpperCase()
  return (
    <>
      <img
        className="h-16 w-16 rounded-full object-cover opacity-50"
        src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/paper_roll.png"
        alt=""
        style={{
          transform: 'scale(3)',
          filter: `saturate(0.4) hue-rotate(${
            path === 'PPFP' ? '0deg' : '-180deg'
          })`
        }}
      />
      <div className="text-3xl -ml-14 font-thin">{path}</div>
    </>
  )
}

export default ExcessInventoryTable
