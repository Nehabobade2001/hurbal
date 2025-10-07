import { Table } from 'lucide-react'
import React from 'react'
import TableComponent1 from '../../Component/TableComponent1'
import TableComponent from '../../Component/TableComponent'

const headers = [
  "S.No",
  "Product Name",
  "Product Code",
  "Category",
  "Price",
  "Stock",
  "Actions"
]
const ProductTable = () => {
  return (
    <div>
      <TableComponent1
        headers={headers}
        title="Product List"
        showBackButton={false}
    
        searchKey="Product Name"
        searchKeys={["productName", "productCode", "category"]}
        data={[
          {
            productName: "Product A",
            productCode: "P001",
            category: "Category 1",
            price: "$10.00",
            stock: 100
          },
          {
            productName: "Product B",
            productCode: "P002",
            category: "Category 2",
            price: "$20.00",
            stock: 50
          },
          {
            productName: "Product C",
            productCode: "P003",
            category: "Category 3",
            price: "$30.00",
            stock: 200
          }
        ]}
        renderRow={(item, index) => (
         <>
            <td className='p-2 border border-white/30'>{index + 1}</td>
            <td className='p-2 border border-white/30'>{item.productName}</td>
            <td className='p-2 border border-white/30'>{item.productCode}</td>
            <td className='p-2 border border-white/30'>{item.category}</td>
            <td className='p-2 border border-white/30'>{item.price}</td>
            <td className='p-2 border border-white/30'>{item.stock}</td>
            <td className='p-2 border border-white/30'>
              {/* Actions can be added here */}
              <button className='text-blue-500'>Edit</button>
              <button className='text-red-500 ml-2'>Delete</button>
            </td>
        
         </>
        )}
      />
    </div>
  )
}

export default ProductTable
