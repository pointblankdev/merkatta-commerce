import { useState } from 'react'
import { Input, Container } from '@components/ui'

const ProductEmpty = () => (
  <Container>
    <div className="my-6">You haven't added any products.</div>
  </Container>
)

const ProductItem = ({ props }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img className="h-10 w-10 rounded-full" src={props.image || "https://bigcommerce.webkul.com/resource/images/placeholders/product-placeholder.jpg"} alt="" />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
            {props.title}
          </div>
          <div className="text-sm text-gray-500">
            {props.description}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{props.sku}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {props.status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {`$${props.price}`}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
    </td>
  </tr>
)

const ProductHeader = () => (
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Item
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        SKU
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Status
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Price
      </th>
      <th scope="col" className="relative px-6 py-3">
        <span className="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
)



const Products = () => {
  const [products, setProducts] = useState([
    {
      title: "T-shirt",
      description: "It's a shirt that belongs to dan.",
      image: "",
      sku: '123',
      status: "Active",
      price: "12.50"
    }
  ])
  const [hideProductModal, setHideProductModal] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [SKU, setSKU] = useState('')
  const [price, setPrice] = useState('0.00')

  const addProduct = () => {
    setProducts([...products, {title, description, image: "", sku: SKU,  status: 'Active', price}])
    setHideProductModal(true)
  }

    return <Container>
      <div className="mb-12 transition ease-in duration-75" >
        <h1 className="flex-auto text-xl font-semibold">Products</h1>
        {!hideProductModal && (
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
                      Add New Product
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please fill in all of the fields to add a new product.
                      </p>
                      <form onSubmit={addProduct}>
                        <div className="flex flex-col space-y-4 w-full my-6">
                          <Input placeholder="name" onChange={setTitle} />
                          <Input placeholder="description" onChange={setDescription} />
                          <Input placeholder="SKU" onChange={setSKU} />
                          <Input placeholder="price" onChange={setPrice} />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={addProduct} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
        {products.length > 0 ? (
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <ProductHeader />
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <ProductItem props={product} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        ) : (
          <ProductEmpty />
        )}
        <button onClick={() => setHideProductModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Add Product</button>
      </div>
    </Container>
}

export default Products
