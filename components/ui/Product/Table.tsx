import _ from 'lodash'
import { useState } from 'react'
import EditProductModal from './Modal'

const ProductTable = ({ products }) => {
  return (
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <ProductHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable

const ProductItem = ({ product }) => {
  const [hideProductModal, setHideProductModal] = useState(true)
  const trialRollsOffered =
    _.find(product.custom_fields, {
      name: 'Trial Rolls Offered'
    })?.value === 'true'
      ? '✔️'
      : ''
  const shipsIn24Hours =
    product.availability_description === 'Ships within 24 hours' ? '✔️' : ''
  return (
    <>
      <EditProductModal
        product={product}
        hide={hideProductModal}
        closeModal={() => setHideProductModal(true)}
      />
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  product.image ||
                  'https://bigcommerce.webkul.com/resource/images/placeholders/product-placeholder.jpg'
                }
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {product.name}
              </div>
              <div className="text-sm text-gray-500">
                {product.description.replace(/<[^>]*>?/gm, '')}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{product.unit}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{product.sku}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {`$${product.price}`}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {shipsIn24Hours}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {product.order_quantity_minimum}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {product.width ? `${product.width}"` : ''}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {trialRollsOffered}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => setHideProductModal(false)}
          >
            Edit
          </a>
        </td>
      </tr>
    </>
  )
}

const ProductHeader = () => (
  <thead className="bg-gray-50">
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Item
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Unit
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        SKU
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Price
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Ships in 24 hours
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Min Order Size
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Max Width
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Samples Offered
      </th>
      <th scope="col" className="relative px-6 py-3">
        <span className="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
)
