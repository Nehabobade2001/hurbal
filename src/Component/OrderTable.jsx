import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

export default function OrderTable({ data = [], isLoading }) {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const rowsPerPage = 10;

  const filteredData = data.filter(order => {
    const orderId = order?.razorpayOrderId?.toLowerCase() || "";
    const customerName = order?.userId?.name?.firstName?.toLowerCase() || "";
    const createdAt = order?.createdAt || "";

    return (
      orderId.includes(searchInput.toLowerCase()) ||
      customerName.includes(searchInput.toLowerCase()) ||
      createdAt.includes(searchInput)
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID, Customer Name, or Date"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 font-medium p-2">SR No.</th>
              <th className="border border-gray-300 font-medium p-2">Order ID</th>
              <th className="border border-gray-300 font-medium p-2">Customer Name</th>
              <th className="border border-gray-300 font-medium p-2">Order Date</th>
              <th className="border border-gray-300 font-medium p-2">Total Items</th>
              <th className="border border-gray-300 font-medium p-2">Total Amount (Rs)</th>
              <th className="border border-gray-300 font-medium p-2">Payment Method</th>
              <th className="border border-gray-300 font-medium p-2">Order Status</th>
              <th className="border border-gray-300 font-medium p-2">Show</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 9 }).map((_, i) => (
                    <td key={i} className="border border-gray-300 p-2">
                      <motion.div
                        className="h-4 bg-gray-300 rounded animate-pulse"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      ></motion.div>
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="9" className="border border-gray-300 p-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            ) : (
              paginatedData.map((order, index) => (
                <tr key={order?._id || index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td className="border border-gray-300 p-2">{order?.razorpayOrderId || "N/A"}</td>
                  <td className="border border-gray-300 p-2">
                    {order?.userId?.name?.firstName
                      ? `${order.userId.name.firstName} ${order.userId.name.lastName || ""}`
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">{order?.items?.length || 0}</td>
                  <td className="border border-gray-300 p-2">{order?.totalAmount || 0}</td>
                  <td className="border border-gray-300 p-2">{order?.paymentMethod || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{order?.orderStatuses || "N/A"}</td>
                  <td className="border text-center border-gray-300 p-2">
                    <button
                      onClick={() => handleShowDetails(order)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Order Details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">Order Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium break-words">{selectedOrder.razorpayOrderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer Name</p>
                  <p className="font-medium">
                    {`${selectedOrder.userId?.name?.firstName || ''} ${selectedOrder.userId?.name?.lastName || ''}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium break-words">{selectedOrder.userId?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Status</p>
                  <p className="font-medium">{selectedOrder.orderStatuses}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="border p-3 rounded">
                      <p className="font-medium break-words">{item.product.name}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-sm">
                        <div>
                          <p className="text-gray-600">Quantity</p>
                          <p>{item.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Subtotal</p>
                          <p>₹{item.subtotal}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">SP</p>
                          <p>{item.productSP}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total PV</p>
                    <p className="font-medium">{selectedOrder.orderTotals?.totalPV || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total SP</p>
                    <p className="font-medium">{selectedOrder.orderTotals?.totalSP || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="font-medium">{selectedOrder.orderTotals?.totalProducts || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium">₹{selectedOrder.totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600">Rows per page: {rowsPerPage}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-1 border rounded hover:bg-gray-100"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-2 py-1 border rounded hover:bg-gray-100"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
