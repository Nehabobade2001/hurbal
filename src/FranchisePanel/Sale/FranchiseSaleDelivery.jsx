import React from 'react';
import TableComponent from '../../Component/TableComponent';

const FranchiseSaleDelivery = () => {
  const title = "Franchise Sale Delivery";

  const headers = [
    "S.No.",
    "Delivery ID",
    "Invoice ID",
    "Order ID",
    "Franchise Name",
    "Franchise Code",
    "Delivery Date",
    "Delivered Items",
    "Total Quantity",
    "Delivery Status",
    "Received By",
    "Delivery Remarks",
    "Action"
  ];

  const data = [
    {
      deliveryId: "DLV001",
      invoiceId: "INV1001",
      orderId: "ORD1001",
      franchiseName: "Franchise A",
      franchiseCode: "FRA001",
      deliveryDate: "2025-05-18",
      deliveredItems: 5,
      totalQuantity: 120,
      deliveryStatus: "Delivered",
      receivedBy: "Ravi Kumar",
      deliveryRemarks: "Received in good condition"
    },
    {
      deliveryId: "DLV002",
      invoiceId: "INV1002",
      orderId: "ORD1002",
      franchiseName: "Franchise B",
      franchiseCode: "FRA002",
      deliveryDate: "2025-05-17",
      deliveredItems: 3,
      totalQuantity: 75,
      deliveryStatus: "Delivered",
      receivedBy: "Anjali Sharma",
      deliveryRemarks: "Minor damage to packaging"
    },
    {
      deliveryId: "DLV003",
      invoiceId: "INV1003",
      orderId: "ORD1003",
      franchiseName: "Franchise C",
      franchiseCode: "FRA003",
      deliveryDate: "2025-05-16",
      deliveredItems: 6,
      totalQuantity: 145,
      deliveryStatus: "Delivered",
      receivedBy: "Manoj Singh",
      deliveryRemarks: "Delivered late"
    }
  ];

  return (
    <div className=''>
      <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={["deliveryId", "invoiceId", "orderId", "franchiseName", "franchiseCode"]}
        renderRow={(item, index) => (
          <>
            <td className="border p-2 text-center">{index + 1}</td>
            <td className="border p-2 text-center">{item.deliveryId}</td>
            <td className="border p-2 text-center">{item.invoiceId}</td>
            <td className="border p-2 text-center">{item.orderId}</td>
            <td className="border p-2 text-center">{item.franchiseName}</td>
            <td className="border p-2 text-center">{item.franchiseCode}</td>
            <td className="border p-2 text-center">{item.deliveryDate}</td>
            <td className="border p-2 text-center">{item.deliveredItems}</td>
            <td className="border p-2 text-center">{item.totalQuantity}</td>
            <td className="border p-2 text-center">{item.deliveryStatus}</td>
            <td className="border p-2 text-center">{item.receivedBy}</td>
            <td className="border p-2 text-center">{item.deliveryRemarks}</td>
            <td className="border p-2 text-center">
              <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">View</button>
            </td>
          </>
        )}
      />
    </div>
  );
};

export default FranchiseSaleDelivery;
