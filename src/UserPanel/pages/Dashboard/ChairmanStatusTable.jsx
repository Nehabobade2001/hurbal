import React from "react";

const ChairmanStatusTable = ({ data }) => {
  const columns = ["Leg1", "Leg2", "Silver"];

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm mt-4">
      <div className="bg-blue-100 p-3 font-semibold text-gray-800 border-b">Chairman Status</div>
      <table className="min-w-full text-sm text-center">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, index) => (
            <tr key={index} className="border-t">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2">
                  {row[col] !== undefined ? row[col] : "0"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChairmanStatusTable;
