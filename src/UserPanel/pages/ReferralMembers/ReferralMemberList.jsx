import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ReferralMemberList = ({ referralMember }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const rowsPerPage = 10;
  const referralMembers = referralMember?.partners || [];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setStatusFilter(location.state || "All");
    }, 2000);
  }, []);

  const filteredData = referralMembers.filter((member) => {
    const matchesSearch = member?.name?.toLowerCase().includes(searchInput.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border p-2 rounded-md text-sm w-60"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse whitespace-nowrap border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 font-medium p-2">S.No</th>
              <th className="border border-gray-300 font-medium p-2">User ID</th>
              <th className="border border-gray-300 font-medium p-2">User Name</th>
              <th className="border border-gray-300 font-medium p-2">Email</th>
              <th className="border border-gray-300 font-medium p-2">Mobile No</th>
              <th className="border border-gray-300 font-medium p-2">Leg</th>
              <th className="border border-gray-300 font-medium p-2">Left PV</th>
              <th className="border border-gray-300 font-medium p-2">Right PV</th>
              <th className="border border-gray-300 font-medium p-2">Left SP</th>
              <th className="border border-gray-300 font-medium p-2">Right SP</th>
              <th className="border border-gray-300 font-medium p-2">Self PV</th>
              <th className="border border-gray-300 font-medium p-2">Self SP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <td key={i} className="border border-gray-300 p-2">
                      <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td className="border border-gray-300 p-2">{member?.userId || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{member?.name || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{member?.email || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{member?.mobileNo || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{member?.leg || "N/A"}</td>
                  <td className="border border-gray-300 p-2">{member?.leftPV || "0"}</td>
                  <td className="border border-gray-300 p-2">{member?.rightPV || "0"}</td>
                  <td className="border border-gray-300 p-2">{member?.leftSP || "0"}</td>
                  <td className="border border-gray-300 p-2">{member?.rightSP || "0"}</td>
                  <td className="border border-gray-300 p-2">{member?.selfPV || "0"}</td>
                  <td className="border border-gray-300 p-2">{member?.selfSP || "0"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="border border-gray-300 p-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600">Rows per page: {rowsPerPage}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-1 border rounded hover:bg-gray-100"
            disabled={loading || currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 border rounded ${currentPage === i + 1 ? "bg-bg-color text-white" : "hover:bg-gray-100"}`}
              disabled={loading}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-2 py-1 border rounded hover:bg-gray-100"
            disabled={loading || currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralMemberList;
