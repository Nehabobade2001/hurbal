import React from 'react'
import TableComponent from '../../Component/TableComponent';


const ProductSaleReport = () => {

  const title = "Product Sale Report";
  const headers = [
    "S.No",
    "Product ID",
    "Product Name",
    "Quantity Sold",
    "Total Sales",
    "Sale Date",
    "Sale Type"
  ];


  const data = [
    {
      productId: "PX001",
      productName: "Wellness Oil",
      quantitySold: 50,
      totalSales: 7500,
      saleDate: "10/05/2025",
      saleType: "Retail"
    },
    {
      productId: "PY002",
      productName: "Herbal Soap",
      quantitySold: 120,
      totalSales: 3600,
      saleDate: "12/05/2025",
      saleType: "Wholesale"
    },
    {
      productId: "PZ003",
      productName: "Organic Tea",
      quantitySold: 200,
      totalSales: 10000,
      saleDate: "15/05/2025",
      saleType: "Retail"
    }
  ];

  return (
    <div>
        <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={[ "productName", "productId"]}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b p-2 text-center">{index + 1}</td>
            <td className="border-r border-b p-2 text-center">{item.productId}</td>
            <td className="border-r border-b p-2 text-center">{item.productName}</td>
            <td className="border-r border-b p-2 text-center">{item.quantitySold}</td>
            <td className="border-r border-b p-2 text-center">{item.totalSales}</td>
            <td className="border-r border-b p-2 text-center">{item.saleDate}</td>
            <td className="border-b p-2 text-center">{item.saleType}</td>
          </>
        )}
      />
    </div>
  )
}

export default ProductSaleReport