import React, { useEffect, useState } from "react";
import { getProcessingOrder, franchisePermission, getFranchiseProfile } from "../../api/franchise.api";
import BackButton from "../../Component/BackButton";
import { ChevronDown, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";

const ApproveDistributorsOrder = () => {
  const title = "Processing Orders";
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [franchiseKey, setFranchiseKey] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResult, profileResult] = await Promise.all([
          getProcessingOrder(),
          getFranchiseProfile()
        ]);
        setOrders(ordersResult?.orders || []);
        setFranchiseKey(profileResult?.data?.data?.key);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (orderId) => {
    try {
      const { value: password } = await Swal.fire({
        title: 'Enter Password',
        input: 'password',
        inputLabel: 'Please enter your password to approve this order',
        inputPlaceholder: 'Enter your password',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Password is required!';
          }
        }
      });

      if (password) {
        if (password !== franchiseKey) {
          Swal.fire({
            title: 'Error',
            text: 'Invalid password!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }

        const payload = {
          orderId,
          orderStatuses: "Delivered",
          password
        };

        const response = await franchisePermission(payload);
        
        if (response?.success) {
          Swal.fire({
            title: 'Success',
            text: 'Order approved successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          // Refresh orders list
          const result = await getProcessingOrder();
          setOrders(result?.orders || []);
        } else {
          Swal.fire({
            title: 'Error',
            text: response?.message || 'Failed to approve order',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    } catch (error) {
      console.error("Error approving order:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message || 'Failed to approve order',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleReject = async (orderId) => {
    try {
      const { value: password } = await Swal.fire({
        title: 'Enter Password',
        input: 'password',
        inputLabel: 'Please enter your password to reject this order',
        inputPlaceholder: 'Enter your password',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Password is required!';
          }
        }
      });

      if (password) {
        if (password !== franchiseKey) {
          Swal.fire({
            title: 'Error',
            text: 'Invalid password!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }

        const payload = {
          orderId,
          orderStatuses: "Cancelled",
          password
        };

        const response = await franchisePermission(payload);
        
        if (response?.success) {
          Swal.fire({
            title: 'Success',
            text: 'Order rejected successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          // Refresh orders list
          const result = await getProcessingOrder();
          setOrders(result?.orders || []);
        } else {
          Swal.fire({
            title: 'Error',
            text: response?.message || 'Failed to reject order',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    } catch (error) {
      console.error("Error rejecting order:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message || 'Failed to reject order',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleShowDetails = (order) => {
    Swal.fire({
      title: 'Order Details',
      html: `
        <div class="text-left">
          <div class="mb-4">
            <h3 class="font-bold mb-2">Order Information</h3>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Transaction ID:</strong> ${order.transactionId}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Order Status:</strong> ${order.orderStatuses}</p>
            <p><strong>Created At:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          </div>
          
          <div class="mb-4">
            <h3 class="font-bold mb-2">Order Totals</h3>
            <p><strong>Total PV:</strong> ${order.orderTotals.totalPV}</p>
            <p><strong>Total SP:</strong> ${order.orderTotals.totalSP}</p>
            <p><strong>Total Products:</strong> ${order.orderTotals.totalProducts}</p>
            <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
            <p><strong>GST Amount:</strong> ₹${order.gstAmount}</p>
          </div>

          <div>
            <h3 class="font-bold mb-2">Order Items</h3>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-100">
                  <th class="border p-2">Product</th>
                  <th class="border p-2">Image</th>
                  <th class="border p-2">Quantity</th>
                  <th class="border p-2">MRP</th>
                  <th class="border p-2">DP</th>
                  <th class="border p-2">PV</th>
                  <th class="border p-2">SP</th>
                  <th class="border p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td class="border p-2">${item.product.name}</td>
                    <td class="border p-2">
                      <img src="${item.product.images[0]}" alt="${item.product.name}" class="w-16 h-16 object-cover">
                    </td>
                    <td class="border p-2">${item.quantity}</td>
                    <td class="border p-2">₹${item.product.mrp}</td>
                    <td class="border p-2">₹${item.product.dp}</td>
                    <td class="border p-2">${item.productPV}</td>
                    <td class="border p-2">${item.productSP}</td>
                    <td class="border p-2">₹${item.subtotal}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `,
      width: '800px',
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        container: 'swal2-container',
        popup: 'swal2-popup',
        content: 'swal2-content'
      }
    });
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const mainHeaders = [
    "S.No",
    "Order ID",
    "Total Items",
    "Total Amount",
    "Payment Method",
    "Order Status",
    "Date",
    "Actions"
  ];

  const itemHeaders = [
    "Product Name",
    "Quantity",
    "MRP",
    "DP",
    "PV",
    "SP",
    "Subtotal"
  ];

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedOrder(null); // Close any expanded order when changing pages
  };

  return (
    <div>
      <div className="space-y-4 bg-[#ffffff13] backdrop-blur-md p-4 rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <BackButton />
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
              {currentItems.length === 0 ? (
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
                      <td className="p-2 border border-white/30">{order.paymentMethod}</td>
                      <td className="p-2 border border-white/30">{order.orderStatuses}</td>
                      <td className="p-2 border border-white/30">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2 border border-white/30">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShowDetails(order);
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          >
                            <Eye className="w-4 h-4 inline-block mr-1" />
                            Show
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(order._id);
                            }}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(order._id);
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
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
                                    <td className="p-2 border border-white/30">{item.productPV}</td>
                                    <td className="p-2 border border-white/30">{item.productSP}</td>
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
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded ${
                currentPage === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-black'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveDistributorsOrder;