import React from 'react';
import TableComponent from '../../Component/TableComponent';

const ApproveFranchiseOrder = () => {
  const title = "Franchise Sale Invoice List";

  const headers = [
    "S.No.",
    "Invoice ID",
    "Order ID",
    "Franchise Name",
    "Franchise ID",
    "Invoice Date",
    "Total Quantity",
    "Total Amount",
    "Discount",
    "Net Amount",
    "Payment Mode",
    "Payment Status",
    "Invoice Status",
    "Action"
  ];

  const data = [
    {
      invoiceId: "INV-FR-20250519001",
      orderId: "ORD-FR-20250518003",
      franchiseName: "BoostWell Pvt Ltd",
      franchiseId: "FR1002",
      invoiceDate: "2025-05-19",
      totalQuantity: 50,
      totalAmount: 15000,
      discount: 1500,
      netAmount: 13500,
      paymentMode: "Online",
      paymentStatus: "Paid",
      invoiceStatus: "Approved"
    }
  ];

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={["invoiceId", "orderId", "franchiseName", "franchiseId"]}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b p-2 text-center">{index + 1}</td>
            <td className="border-r border-b p-2 text-center">{item.invoiceId}</td>
            <td className="border-r border-b p-2 text-center">{item.orderId}</td>
            <td className="border-r border-b p-2 text-center">{item.franchiseName}</td>
            <td className="border-r border-b p-2 text-center">{item.franchiseId}</td>
            <td className="border-r border-b p-2 text-center">{item.invoiceDate}</td>
            <td className="border-r border-b p-2 text-center">{item.totalQuantity}</td>
            <td className="border-r border-b p-2 text-center">{item.totalAmount}</td>
            <td className="border-r border-b p-2 text-center">{item.discount}</td>
            <td className="border-r border-b p-2 text-center">{item.netAmount}</td>
            <td className="border-r border-b p-2 text-center">{item.paymentMode}</td>
            <td className="border-r border-b p-2 text-center">{item.paymentStatus}</td>
            <td className="border-r border-b p-2 text-center">{item.invoiceStatus}</td>
            <td className="border-b p-2 text-center">
              <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
            </td>
          </>
        )}
      />
    </div>
  );
};

export default ApproveFranchiseOrder;
