import React from 'react';

const InstantBenefitsTable = () => {
  const data = [
    {
      level: 1,
      directSales: '10%',
      rewards: 'Product Voucher',
      monthlySalary: '5,000',
    },
    {
      level: 2,
      directSales: '5%',
      rewards: 'Smart Phone',
      monthlySalary: '10,000',
    },
    {
      level: 3,
      directSales: '3%',
      rewards: 'Laptop',
      monthlySalary: '20,000',
    },
    {
      level: 4,
      directSales: '2%',
      rewards: 'Bike',
      monthlySalary: '40,000',
    },
    {
      level: 5,
      directSales: '1%',
      rewards: 'Car',
      monthlySalary: '80,000',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Level</th>
            <th className="py-2 px-4 border-b">Direct Sales</th>
            <th className="py-2 px-4 border-b">Rewards</th>
            <th className="py-2 px-4 border-b">Monthly Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.level}>
              <td className="py-2 px-4 border-b text-center">{row.level}</td>
              <td className="py-2 px-4 border-b text-center">{row.directSales}</td>
              <td className="py-2 px-4 border-b text-center">{row.rewards}</td>
              <td className="py-2 px-4 border-b text-center">{row.monthlySalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstantBenefitsTable;
