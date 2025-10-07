import React, { useEffect, useState } from 'react'
import { getOrdersFranchise } from '../../../api/user.api'
import PageLoader from '../../../Component/PageLoader'
import notfoundImg from "../../../assets/images/notfound.jpg"

const FranchiseOrderHistory = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const fetchOrders = async () => {
        try {
            setIsLoading(true)
            const response = await getOrdersFranchise()
            if (response.success) {
                setOrders(response.orders)
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(orders.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value))
        setCurrentPage(1) // Reset to first page when changing items per page
    }

    const headers = [
        "S.No",
        "Transaction ID",
        "Date",
        "Amount",
        "Payment Method",
        "Status",
        "Total PV",
        "Total SP",
        "Total Products"
    ]

    return (
        <div className='flex flex-col gap-5'>
            <h2 className="text-base font-medium text-black/80">Franchise Order History</h2>
            {isLoading ? (
                <PageLoader />
            ) : (
                <>
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        {headers.map((header, index) => (
                                            <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={headers.length} className="px-4 py-8 text-center">
                                                <img src={notfoundImg} alt="No orders found" className="w-32 h-32 mx-auto mb-4" />
                                                <p className="text-gray-500">No orders found</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentItems.map((order, index) => (
                                            <tr key={order._id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{indexOfFirstItem + index + 1}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.transactionId}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">₹{order.totalAmount}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.paymentMethod}</td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        order.orderStatuses === 'Delivered' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : order.orderStatuses === 'Processing'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {order.orderStatuses}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.orderTotals.totalPV}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.orderTotals.totalSP}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.orderTotals.totalProducts}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    {orders.length > 0 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">Items per page:</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                    className="border rounded px-2 py-1 text-sm"
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
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                <span className="text-sm text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default FranchiseOrderHistory
