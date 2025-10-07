import React from 'react'
import TableComponent from '../../Component/TableComponent';


const StockReport = () => {


  const title = "Stock Report";
  const headers = [
    "S.NO.",
    "Product Code",
    "Product Name",
    "Unit",
    "Product Group",
    "PV",
    "Qty In",
    "Qty Out",
    "Balance",
    "Purchase Price",
    "Stock value"
  ];

 const data = [
  {
    productCode: "PX001",
    productName: "Wellness Oil",
    unit: "Bottle",
    productGroup: "Health",
    pv: 10,
    qtyIn: 100,
    qtyOut: 40,
    balance: 60,
    purchasePrice: 150,
    stockValue: 9000
  },
  {
    productCode: "PY002",
    productName: "Herbal Soap",
    unit: "Piece",
    productGroup: "Beauty",
    pv: 5,
    qtyIn: 200,
    qtyOut: 80,
    balance: 120,
    purchasePrice: 30,
    stockValue: 3600
  },
  {
    productCode: "PZ003",
    productName: "Organic Tea",
    unit: "Pack",
    productGroup: "Beverage",
    pv: 8,
    qtyIn: 150,
    qtyOut: 50,
    balance: 100,
    purchasePrice: 100,
    stockValue: 10000
  },
  {
    productCode: "PA004",
    productName: "Protein Bar",
    unit: "Box",
    productGroup: "Health",
    pv: 12,
    qtyIn: 90,
    qtyOut: 30,
    balance: 60,
    purchasePrice: 200,
    stockValue: 12000
  },
  {
    productCode: "PB005",
    productName: "Aloe Vera Gel",
    unit: "Tube",
    productGroup: "Beauty",
    pv: 7,
    qtyIn: 180,
    qtyOut: 70,
    balance: 110,
    purchasePrice: 80,
    stockValue: 8800
  },
  {
    productCode: "PC006",
    productName: "Green Coffee",
    unit: "Pouch",
    productGroup: "Beverage",
    pv: 9,
    qtyIn: 160,
    qtyOut: 60,
    balance: 100,
    purchasePrice: 120,
    stockValue: 12000
  },
  {
    productCode: "PD007",
    productName: "Energy Drink",
    unit: "Can",
    productGroup: "Health",
    pv: 6,
    qtyIn: 130,
    qtyOut: 50,
    balance: 80,
    purchasePrice: 90,
    stockValue: 7200
  },
  {
    productCode: "PE008",
    productName: "Face Cream",
    unit: "Jar",
    productGroup: "Beauty",
    pv: 11,
    qtyIn: 140,
    qtyOut: 60,
    balance: 80,
    purchasePrice: 110,
    stockValue: 8800
  },
  {
    productCode: "PF009",
    productName: "Detox Juice",
    unit: "Bottle",
    productGroup: "Beverage",
    pv: 10,
    qtyIn: 120,
    qtyOut: 40,
    balance: 80,
    purchasePrice: 95,
    stockValue: 7600
  },
  {
    productCode: "PG010",
    productName: "Multivitamin Capsules",
    unit: "Strip",
    productGroup: "Health",
    pv: 15,
    qtyIn: 100,
    qtyOut: 30,
    balance: 70,
    purchasePrice: 180,
    stockValue: 12600
  }
];

  return (
    <div className="flex flex-col gap-5">
  <TableComponent
    title={title}
    headers={headers}
    data={data}
    searchKeys={["productCode", "productName"]}
    renderRow={(item, index) => (
      <>
        <td className="border-r border-b p-2 text-center">{index + 1}</td>
        <td className="border-r border-b p-2 text-center">{item.productCode}</td>
        <td className="border-r border-b p-2 text-center">{item.productName}</td>
        <td className="border-r border-b p-2 text-center">{item.unit}</td>
        <td className="border-r border-b p-2 text-center">{item.productGroup}</td>
        <td className="border-r border-b p-2 text-center">{item.pv}</td>
        <td className="border-r border-b p-2 text-center">{item.qtyIn}</td>
        <td className="border-r border-b p-2 text-center">{item.qtyOut}</td>
        <td className="border-r border-b p-2 text-center">{item.balance}</td>
        <td className="border-r border-b p-2 text-center">{item.purchasePrice}</td>
        <td className="border-b p-2 text-center">{item.stockValue}</td>
      </>
    )}
  />
</div>

  )
}

export default StockReport