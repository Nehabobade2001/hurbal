import React from 'react';
import TableComponent from '../../Component/TableComponent';

const FranchiseSaleList = () => {
  const title = "Franchise Sales Invoice List";

  const headers = [
    "S.No.",
    "Dispatch ID",
    "Invoice ID",
    "Order ID",
    "Franchise Name",
    "Franchise ID",
    "Dispatch Date",
    "Courier Partner",
    "Tracking Number",
    "Total Items",
    "Total Quantity",
    "Dispatched By",
    "Status",
    "Action"
  ];

  const data = [
    {
      dispatchId: "DSP-20250519-001",
      invoiceId: "INV-FR-20250518001",
      orderId: "ORD-FR-20250517002",
      franchiseName: "HealthFirst Franchise",
      franchiseId: "FR-1089",
      dispatchDate: "2025-05-19",
      courierPartner: "Delhivery",
      trackingNumber: "DLV123456789IN",
      totalItems: 5,
      totalQuantity: 120,
      dispatchedBy: "Admin",
      status: "Dispatched"
    }
  ];

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={["dispatchId", "invoiceId", "orderId", "franchiseName", "franchiseId", "trackingNumber"]}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b p-2 text-center">{index + 1}</td>
            <td className="border-r border-b p-2 text-center">{item.dispatchId}</td>
            <td className="border-r border-b p-2 text-center">{item.invoiceId}</td>
            <td className="border-r border-b p-2 text-center">{item.orderId}</td>
            <td className="border-r border-b p-2 text-center">{item.franchiseName}</td>
            <td className="border-r border-b p-2 text-center">{item.franchiseId}</td>
            <td className="border-r border-b p-2 text-center">{item.dispatchDate}</td>
            <td className="border-r border-b p-2 text-center">{item.courierPartner}</td>
            <td className="border-r border-b p-2 text-center">{item.trackingNumber}</td>
            <td className="border-r border-b p-2 text-center">{item.totalItems}</td>
            <td className="border-r border-b p-2 text-center">{item.totalQuantity}</td>
            <td className="border-r border-b p-2 text-center">{item.dispatchedBy}</td>
            <td className="border-r border-b p-2 text-center">{item.status}</td>
            <td className="border-b p-2 text-center">
              <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Track</button>
            </td>
          </>
        )}
      />
    </div>
  );
};

export default FranchiseSaleList;
