import { Button, Container } from '@components/ui'

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
      <div className="text-sm text-gray-900">123</div>
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
  const products = [
    {
      title: "T-shirt",
      description: "It's a shirt that belongs to dan.",
      image: "",
      status: "Active",
      price: "12.50"
    },
    {
      title: "Other T-shirt",
      description: "It's a shirt that belongs to dan.",
      image: "",
      status: "Active",
      price: "12.50"
    }
  ]
    return <Container>
      <div className="mb-12 transition ease-in duration-75" >
        <h1 className="flex-auto text-xl font-semibold">Products</h1>
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
        <Button variant="slim">Add Product</Button>
      </div>
    </Container>
}

export default Products