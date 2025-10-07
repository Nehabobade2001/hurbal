import React from 'react';

const MonthlySaleReport = () => {
    const salesData = [
        
    ];

    return (
        <div className="p-4 bg-white rounded-lg">
            <h2 className="font-medium text-gray-800 text-lg mb-4">Monthly Sale Report</h2>
            <table className="border border-gray-300 w-full text-sm">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Months</th>
                        <th className="border border-gray-300 px-4 py-2">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.length > 0 ? (
                        salesData.map(({ month, amount }) => (
                            <tr key={month}>
                                <td className="border border-gray-300 px-4 py-2">{month}</td>
                                <td className="border border-gray-300 px-4 py-2">{amount.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center border border-gray-300 px-4 py-2 text-gray-500">
                                Data not found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MonthlySaleReport;
