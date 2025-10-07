import React, { useEffect, useState } from 'react';
import { Routers } from '../../../constants/Routes';
import { Link, useNavigate } from 'react-router-dom';
import { getIncomeHistory } from '../../../api/user.api';

const WalletCard = ({ data }) => {
  const navigate = useNavigate();
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Date filter state
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const fetchIncomeHistory = async () => {
      setLoading(true);
      const res = await getIncomeHistory();
      if (res?.success && Array.isArray(res.data)) {
        setIncomeHistory(res.data);
        setFilteredHistory(res.data);
      }
      setLoading(false);
    };
    fetchIncomeHistory();
  }, []);

  // Filter data based on date range
  useEffect(() => {
    let filtered = [...incomeHistory];
    
    if (fromDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.createdAt);
        const fromDateObj = new Date(fromDate);
        return itemDate >= fromDateObj;
      });
    }
    
    if (toDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.createdAt);
        const toDateObj = new Date(toDate);
        toDateObj.setHours(23, 59, 59, 999); // Set to end of day
        return itemDate <= toDateObj;
      });
    }
    
    setFilteredHistory(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [fromDate, toDate, incomeHistory]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Clear filters
  const clearFilters = () => {
    setFromDate('');
    setToDate('');
  };

  console.log(data);

  const cards = [
    // {
    //   title: "Purchase Wallet",
    //   value: data?.totalUsers ?? 0,
    //   img: "https://img.icons8.com/3d-fluency/94/group--v2.png",
    //   color: "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400",
    //   route: Routers.Member,
    //   pathstate: "All",
    // },
    // {
    //   title: "Income Wallet",
    //   value: data?.totalDownline ?? 0,
    //   img: "https://img.icons8.com/3d-fluency/94/group--v2.png",
    //   color: "bg-gradient-to-r from-blue-400 via-teal-400 to-green-400",
    // //   route: Routers.Downline,
    // },
    {
      title: "Commission Wallet",
      value: `₹ ${data?.wallets?.commissionWallet.toFixed(2) ?? "0.00"}`,
      img: "https://img.icons8.com/3d-fluency/94/stack-of-coins.png",
      color: "bg-gradient-to-r from-green-400 via-lime-400 to-yellow-300",
    //   route: Routers.Member,
      // pathstate: "Active",
    },
    {
      title: "Income Wallet",
      value: `₹ ${data?.wallets?.totalIncomeWallet.toFixed(2) ?? "0.00"}`,
      img: "https://img.icons8.com/3d-fluency/94/money-bag.png",
      color: "bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400",
    //   route: Routers.Member,
      // pathstate: "Inactive",
    },
    // {
    //   title: "Current Month GPG",
    //   value: data?.todayTotalSales > 0 ? "Paid" : "UnPaid",
    //   img: "https://img.icons8.com/3d-fluency/94/coin-wallet.png",
    //   color: "bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300",
    // },
    // {
    //   title: "Total Sale",
    //   value: `₹ ${data?.totalAmount?.toFixed(2) ?? "0.00"}`,
    //   img: "https://img.icons8.com/3d-fluency/94/cash-in-hand.png",
    //   color: "bg-gradient-to-r from-green-400 via-blue-400 to-black-400",
    // },
    // {
    //   title: "Total Today Sale",
    //   value: `₹ ${data?.todayTotalSales?.toFixed(2) ?? "0.00"}`,
    //   img: "https://img.icons8.com/3d-fluency/94/cash-in-hand.png",
    //   color: "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400",
    // },
    {
      title: "Purchase Wallet",
      value: `₹ ${data?.wallets?.purchaseWallet.toFixed(2) ?? "0.00"}`,
      img: "https://img.icons8.com/3d-fluency/94/receive-cash.png",
      color: "bg-gradient-to-r from-pink-400 via-rose-400 to-red-300",
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((stat, index) => (
          <div
            onClick={() => stat.route && navigate(stat.route, { state: stat.pathstate })}
            key={index}
            className={`relative cursor-pointer overflow-hidden text-white ${stat.color} border-2 border-white rounded-3xl flex flex-col items-center justify-between shadow-lg transition-transform hover:scale-105`}
            style={{ minHeight: 180 }}
          >
            <div className="flex items-center w-full px-6 pt-6">
              <div className="flex-1">
                <h4 className="text-lg font-bold mb-1">{stat.title}</h4>
                <h3 className="text-2xl font-semibold">{stat.value}</h3>
              </div>
              <img src={stat.img} alt={stat.title} className="w-16 h-16 drop-shadow-lg" />
            </div>
            <div className="w-full px-6 pb-6 flex justify-end">
              
            </div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/10 rounded-full z-0"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full z-0"></div>
          </div>
        ))}
      </div>

      {/* Income History Table inside a card */}
      <div className="mt-8 flex justify-start">
        <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-t-3xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Income History</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">From:</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">To:</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  />
                </div>
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span className="ml-3 text-gray-500">Loading...</span>
              </div>
            ) : (
              <table className="w-full border-collapse text-sm text-left bg-white">
                <thead>
                  <tr>
                    <th className="font-medium p-3 text-center whitespace-nowrap text-gray-700">S.No</th>
                    <th className="font-medium p-3 text-center whitespace-nowrap text-gray-700">Date</th>
                    <th className="font-medium p-3 text-center whitespace-nowrap text-gray-700">Type</th>
                    <th className="font-medium p-3 text-center whitespace-nowrap text-gray-700">Amount</th>
                    <th className="font-medium p-3 text-center whitespace-nowrap text-gray-700">Description</th>
                    <th className="font-medium p-3 text-center whitespace-nowrap text-gray-700">Transaction ID</th>
                    <th className="font-medium p-3 text-center whitespace-nowrap text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-6 text-center text-gray-400">
                        No income history found.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item, idx) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="p-3 whitespace-nowrap">{indexOfFirstItem + idx + 1}</td>
                        <td className="p-3 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="p-3 whitespace-nowrap capitalize">{item.incomeType.replace(/_/g, ' ')}</td>
                        <td className="p-3 whitespace-nowrap text-green-600 font-semibold">₹ {item.amount.toFixed(2)}</td>
                        <td className="p-3 whitespace-nowrap">{item.description}</td>
                        <td className="p-3 whitespace-nowrap">{item.transactionId}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`font-semibold px-2 py-1 rounded-full ${item.status === 'CREDITED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-b-3xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredHistory.length)} of {filteredHistory.length} entries
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Items per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    {[10, 20, 50].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletCard;