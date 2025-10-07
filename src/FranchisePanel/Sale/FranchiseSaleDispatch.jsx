import React from 'react';
import TableComponent from '../../Component/TableComponent';

const FranchiseSaleDispatch = () => {
  const title = "Franchise Sale Dispatch";

  const headers = [
    "S.No.",
    "Dispatch ID",
    "Invoice ID",
    "Order ID",
    "Franchise Name",
    "Franchise Code",
    "Dispatch Date",
    "Dispatched Items",
    "Total Quantity",
    "Courier Partner",
    "Tracking Number",
    "Dispatched By",
    "Dispatch Status",
    "Action"
  ];

  const data = [
    {
      dispatchId: "D-1001",
      invoiceId: "INV-FR-3001",
      orderId: "ORD-FR-4001",
      franchiseName: "Herbal Health Mart",
      franchiseCode: "FR-7788",
      dispatchDate: "2025-05-19",
      dispatchedItems: 6,
      totalQuantity: 105,
      courierPartner: "BlueDart",
      trackingNumber: "BD123456789IN",
      dispatchedBy: "System Admin",
      dispatchStatus: "Dispatched"
    },
    {
      dispatchId: "D-1002",
      invoiceId: "INV-FR-3002",
      orderId: "ORD-FR-4002",
      franchiseName: "Nature's Wellness",
      franchiseCode: "FR-5501",
      dispatchDate: "2025-05-18",
      dispatchedItems: 4,
      totalQuantity: 80,
      courierPartner: "Delhivery",
      trackingNumber: "DL123456789IN",
      dispatchedBy: "Admin",
      dispatchStatus: "In Transit"
    }
  ];

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={data}
        searchKeys={[
          "dispatchId",
          "invoiceId",
          "orderId",
          "franchiseName",
          "franchiseCode",
          "trackingNumber"
        ]}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b p-2 text-center">{index + 1}</td>
            <td className="border-r border-b p-2 text-center">{item.dispatchId}</td>
            <td className="border-r border-b p-2 text-center">{item.invoiceId}</td>
            <td className="border-r border-b p-2 text-center">{item.orderId}</td>
            <td className="border-r border-b p-2 text-center">{item.franchiseName}</td>
            <td className="border-r border-b p-2 text-center">{item.franchiseCode}</td>
            <td className="border-r border-b p-2 text-center">{item.dispatchDate}</td>
            <td className="border-r border-b p-2 text-center">{item.dispatchedItems}</td>
            <td className="border-r border-b p-2 text-center">{item.totalQuantity}</td>
            <td className="border-r border-b p-2 text-center">{item.courierPartner}</td>
            <td className="border-r border-b p-2 text-center">{item.trackingNumber}</td>
            <td className="border-r border-b p-2 text-center">{item.dispatchedBy}</td>
            <td className="border-r border-b p-2 text-center">{item.dispatchStatus}</td>
            <td className="border-b p-2 text-center">
              <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Track</button>
            </td>
          </>
        )}
      />
    </div>
  );
};

export default FranchiseSaleDispatch;
