import cn from 'classnames'
import { useState } from "react"
import { Layout } from '@components/common'
import { Button, Container } from '@components/ui'
import Link from 'next/link'
export default function Dashboard() {
  const categories = {
    0: {
      "name": "product"
    },
    1: {
      "name": "settings"
    }
  }
  const [activeCategory, setActiveCategory] = useState(0)

  return <Container>
    <div className="grid grid-cols-12 gap-4 mt-3 mb-20">
      <div className="col-span-2">
        <nav className="mb-10">
          <ul>
          <li className="py-1 text-base font-bold tracking-wide">
            <a>Vendor Dashboard</a>
          </li>
          <li className={cn("py-1 text-accents-8", {
                  underline: activeCategory === 0 })}>
            <a onClick={() => setActiveCategory(0)}>
              Product
            </a>
          </li>
          <li className={cn("py-1 text-accents-8", {
            underline: activeCategory === 1
          })}>
            <a onClick={() => setActiveCategory(1)}>
              Settings
            </a>
          </li>
          </ul>
        </nav>
      </div>
      <div className="col-span-10">
        {activeCategory === 0 && <div className="mb-12 transition ease-in duration-75" >
          <>There are no products</>
        </div>
        }
        {activeCategory === 1 && <div className="mb-12 transition ease-in duration-75" >
          <>There are no settings</>
        </div>
        }
      </div>
    </div>
  </Container>
}

Dashboard.Layout = Layout
