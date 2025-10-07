import React, { useEffect, useState } from 'react';
import { getFranchiseeOrdersAll } from '../../api/franchise.api';
import PageLoader from '../../Component/PageLoader';
import { ChevronDown } from "lucide-react";

const OrderReport = () => {
  const title = "Order Report";
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getFranchiseeOrdersAll();
        // Filter only processing orders
        const processingOrders = response?.data?.filter(order => order.orderStatuses === "Delivered") || [];
        setOrders(processingOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedOrder(null); // Close expanded row when changing pages
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
    setExpandedOrder(null); // Close expanded row when changing items per page
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const mainHeaders = [
    "S.No",
    "Order ID",
    "Total Items",
    "Total Amount",
    "Order Status",
    "Date"
  ];

  const itemHeaders = [
    "Product Name",
    "Quantity",
    "MRP",
    "DP",
    "GST",
    "Subtotal"
  ];

  return (
    <div>
      {loading && <PageLoader />}
      <div className="space-y-4 bg-[#ffffff13] backdrop-blur-md p-4 rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-sm md:text-lg font-medium">{title}</h1>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="text-left">
                <th className="p-2 border border-white/30 w-10"></th>
                {mainHeaders.map((header, index) => (
                  <th key={index} className="p-2 border border-white/30">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={mainHeaders.length + 1} className="p-2 md:p-3 text-center">
                    No orders found
                  </td>
                </tr>
              ) : (
                currentItems.map((order, index) => (
                  <React.Fragment key={order._id}>
                    <tr className="cursor-pointer hover:bg-white/5" onClick={() => toggleExpand(order._id)}>
                      <td className="p-2 border border-white/30">
                        <ChevronDown 
                          className={`w-5 h-5 transition-transform duration-200 ${
                            expandedOrder === order._id ? 'rotate-180' : ''
                          }`}
                        />
                      </td>
                      <td className="p-2 border border-white/30">{indexOfFirstItem + index + 1}</td>
                      <td className="p-2 border border-white/30">{order._id}</td>
                      <td className="p-2 border border-white/30">{order.items?.length || 0}</td>
                      <td className="p-2 border border-white/30">₹{order.totalAmount}</td>
                      <td className="p-2 border border-white/30">{order.orderStatuses}</td>
                      <td className="p-2 border border-white/30">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                    {expandedOrder === order._id && (
                      <tr>
                        <td colSpan={mainHeaders.length + 1} className="p-0 border border-white/30">
                          <div className="p-4 bg-white/5">
                            <table className="w-full">
                              <thead>
                                <tr className="text-left">
                                  {itemHeaders.map((header, index) => (
                                    <th key={index} className="p-2 border border-white/30">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((item) => (
                                  <tr key={item._id}>
                                    <td className="p-2 border border-white/30">{item.product.name}</td>
                                    <td className="p-2 border border-white/30">{item.quantity}</td>
                                    <td className="p-2 border border-white/30">₹{item.product.mrp}</td>
                                    <td className="p-2 border border-white/30">₹{item.product.dp}</td>
                                    <td className="p-2 border border-white/30">{item.product.gst}%</td>
                                    <td className="p-2 border border-white/30">₹{item.subtotal}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {orders.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#ffffff13] p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/80">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-[#ffffff13] border border-white/30 rounded px-2 py-1 text-sm text-white"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? 'bg-[#ffffff13] text-white/40 cursor-not-allowed'
                    : 'bg-[#ffffff13] text-white hover:bg-white/10 border border-white/30'
                }`}
              >
                Previous
              </button>
              
              <span className="text-sm text-white/80">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-[#ffffff13] text-white/40 cursor-not-allowed'
                    : 'bg-[#ffffff13] text-white hover:bg-white/10 border border-white/30'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderReport;
