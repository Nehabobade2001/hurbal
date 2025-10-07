import React, { useEffect, useState } from "react";

const DownlineMemberList = ({ referralMember }) => {
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Access the data array from the response
  const referralMembers = referralMember?.data || [];

  console.log("Referral Members Data:", referralMembers);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const filteredData = referralMembers.filter((member) => {
    const fullName = `${member?.name?.firstName || ''} ${member?.name?.middleName || ''} ${member?.name?.lastName || ''}`.trim();
    return fullName.toLowerCase().includes(searchInput.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border p-2 rounded-md text-sm w-60"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">S.No</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">User ID</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Name</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Email</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Sponsor ID</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Position</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Left PV</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Right PV</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Left SP</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Right SP</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Self PV</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Self SP</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Left Members</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Right Members</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Total Members</th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <td key={i} className="border border-gray-300 p-2">
                      <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 whitespace-nowrap">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.userId || "N/A"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">
                    {`${member?.name?.firstName || ''} ${member?.name?.middleName || ''} ${member?.name?.lastName || ''}`.trim() || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.email || "N/A"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.sponsorId || "N/A"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.leg || "N/A"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.leftPV?.toLocaleString() || "0"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.rightPV?.toLocaleString() || "0"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.leftSP?.toLocaleString() || "0"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.rightSP?.toLocaleString() || "0"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.selfPV?.toLocaleString() || "0"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.selfSP?.toLocaleString() || "0"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.leftCount?.toLocaleString() || "0"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.rightCount?.toLocaleString() || "0"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">{member?.memberCount?.toLocaleString() || "0"}</td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">
                    <span className={`font-semibold ${member?.isActive ? "text-green-600" : "text-red-600"}`}>
                      {member?.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="border border-gray-300 p-4 text-center text-gray-500">
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

export default DownlineMemberList;
