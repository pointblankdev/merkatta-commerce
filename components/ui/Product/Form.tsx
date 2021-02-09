import { useState } from 'react'
import { Input } from '@components/ui'
import { proxy } from 'valtio'

export const form: any = proxy({})

const ProductForm = ({ product: p }) => {
  const [unit, setUnit] = useState('')
  const [showUnitDropdown, setShowUnitDropdown] = useState(false)
  const selectUnitDropdown = (unit) => {
    setUnit(unit)
    setShowUnitDropdown(false)
  }

  return (
    <div className="flex flex-col space-y-4 w-full my-6">
      <Input
        type="text"
        placeholder="Product name or identifier"
        defaultValue={p.name}
        onChange={(v) => (form.name = v)}
      />
      <div className="flex justify-end">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={() => setShowUnitDropdown(!showUnitDropdown)}
              className="inline-flex justify-between w-full border border-gray-200 shadow-sm px-6 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              aria-haspopup="true"
              aria-expanded="true"
            >
              {unit || 'Units'}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {showUnitDropdown && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  type="button"
                  onClick={() => selectUnitDropdown('MSI')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  MSI
                </button>
                <button
                  type="button"
                  onClick={() => selectUnitDropdown('lbs')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  Pounds
                </button>
                <button
                  type="button"
                  onClick={() => selectUnitDropdown('Linear ft')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  Linear Feet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between my-1">
          <Input
            label="Price per unit"
            type="number"
            step="0.01"
            placeholder="Price"
            defaultValue={p.price}
          />
          <div className="px-2">{`$ / ${unit}`}</div>
        </div>
        <div className="flex flex-row justify-between my-1">
          <Input
            label="Weight per unit"
            type="number"
            step="0.01"
            placeholder="Weight"
            defaultValue={p.weight}
          />
          <div className="px-2">{`${unit}`}</div>
        </div>
        <div className="flex flex-row justify-between my-1">
          <Input
            label="Minimum order size"
            type="number"
            step="0.01"
            placeholder="Minimum order size"
            defaultValue={p.order_quantity_minimum}
            onChange={(v) => (form.order_quantity_minimum = v)}
          />
          <div className="px-2">{`${unit}`}</div>
        </div>
      </div>
      <Input
        label="Width range (inches)"
        type="text"
        placeholder="Width range"
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox"
          defaultChecked={p.availability_description === '< 24 hours'}
          onChange={() => {
            form.availability_description = '< 24 hours'
            form.description = 'Ships within 24 hours.'
          }}
        />
        <span className="ml-2">Ships in 24 hours or less</span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox"
          defaultChecked={false}
          onChange={() => {}}
        />
        <span className="ml-2">Trial rolls offered</span>
      </label>
    </div>
  )
}

export default ProductForm
