import { useState } from 'react'
import ProductForm from './Form'

const EditProductModal = ({ product, hide, closeModal }) => {
  const addProduct = async (p) => {
    await fetch('/api/vendor/product', {
      method: 'post',
      body: JSON.stringify(p)
    }).then((r) => r.json())
    closeModal(true)
  }

  if (hide) return null
  return (
    <div className={'fixed z-10 inset-0 overflow-y-auto'}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Edit Product
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Fill in any fields to edit the product.
                  </p>
                  <ProductForm
                    product={product}
                    onSubmit={(p) => addProduct(p)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={addProduct}
              type="submit"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              onClick={() => closeModal(true)}
              type="reset"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductItem = ({ product }) => {
  const [hideProductModal, setHideProductModal] = useState(true)
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
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {product.weight}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {`$${product.price}`}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {product.shipsWithinDay}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {product.minOrderSize}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {product.widths}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {product.samples}
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

export default ProductItem
