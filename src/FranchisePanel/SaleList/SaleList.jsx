import React, { useEffect, useState } from 'react';
import TableComponent from '../../Component/TableComponent';
import { Link } from 'react-router-dom';
import { Routers } from '../../constants/Routes';
import { getDeliveredOrder } from '../../api/franchise.api';
import BackButton from '../../Component/BackButton';
import PageLoader from '../../Component/PageLoader';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SaleList = () => {
    const title = "Sales List";
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('Delivered');
    const [loading, setLoading] = useState(true);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await getDeliveredOrder();
                // Filter only Delivered orders
                const deliveredOrders = response?.orders?.filter(order => order.orderStatuses === 'Delivered') || [];
                setOrders(deliveredOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const headers = [
        "S.No", "Order ID", "Transaction ID", "Date", "Total Items", 
        "Total Amount", "GST Amount", "Payment Method", "Order Status", "View Receipt"
    ];

    const handleViewReceipt = (orderId) => {
        // Open receipt in new tab
        window.open(`${window.location.origin}/franchise-dashboard/invoice/${orderId}`, '_blank');
    };

    if (loading) {
        return <PageLoader />;
    }

    return (
        <div className='space-y-4 bg-[#ffffff13] backdrop-blur-md p-4 rounded-xl overflow-hidden'>
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-center gap-3">
                    <BackButton />
                    <h1 className="text-sm md:text-lg font-medium">{title}</h1>
                </div>
                {/* <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm">Filter by Status:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-white/10 border border-white/30 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                        >
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div> */}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm whitespace-nowrap">
                    <thead>
                        <tr className="text-left">
                            {headers.map((header, index) => (
                                <th key={index} className="p-2 border border-white/30">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={headers.length} className="p-2 md:p-3 text-center">
                                    No delivered orders found
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((order, index) => (
                                <tr key={order._id}>
                                    <td className="p-2 border border-white/30">{indexOfFirstItem + index + 1}</td>
                                    <td className="p-2 border border-white/30">{order._id}</td>
                                    <td className="p-2 border border-white/30">{order.transactionId}</td>
                                    <td className="p-2 border border-white/30">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-2 border border-white/30">{order.items?.length || 0}</td>
                                    <td className="p-2 border border-white/30">₹{order.totalAmount}</td>
                                    <td className="p-2 border border-white/30">₹{order.gstAmount}</td>
                                    <td className="p-2 border border-white/30">{order.paymentMethod}</td>
                                    <td className="p-2 border border-white/30">
                                        <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-500">
                                            {order.orderStatuses}
                                        </span>
                                    </td>
                                    <td className="p-2 border border-white/30">
                                        <button
                                            onClick={() => handleViewReceipt(order._id)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                        >
                                            View Receipt
                                        </button>
                                    </td>
                                </tr>
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
    );
};

export default SaleList;
