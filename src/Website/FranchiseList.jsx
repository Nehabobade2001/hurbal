import React, { useEffect, useState } from 'react';
import { fetchFranchis } from '../api/admin.api';
import PageLoader from '../Component/PageLoader';

const FranchiseList = () => {
  const title = "Franchise List";

  const headers = [
    "S.No.",
    "Franchise Name",
    "Franchise ID",
    "Owner",
    "Location",
    "Address",
    "Pincode",
    "State",
    "City",
    "Bank Name",
    "Branch Name",
    "AC No.",
    "IFSC",
    "PAN No."
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getFranchisees = async () => {
      try {
        const response = await fetchFranchis();
        // console.log('API Response:', response);
        if (response?.success) {
          setData(response.data);
        } else {
          setError(response.message || 'No data found');
        }
      } catch (err) {
        setError('Failed to load franchise data');
      } finally {
        setLoading(false);
      }
    };

    getFranchisees();
  }, []);

  return (
    <div className="mt-[5rem] px-4">
      <h2 className="text-4xl font-bold text-center mb-8">{title}</h2>

      {loading ? (
        <PageLoader/>
      )  : (
        <div className="overflow-x-auto">
          <table className="min-w-full mb-8 border border-gray-300">
            <thead>
              <tr className="text-white" style={{ backgroundImage: 'linear-gradient(to right, #4e65ab, #323d87)' }}>
                {headers.map((header, index) => (
                  <th key={index} className="border p-2 text-center font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">{item?.buissnessName}</td>
                  <td className="border p-2 text-center">{item?.fid}</td>
                  <td className="border p-2 text-center">{item?.name?.firstName + " " + item?.name?.middleName + " " + item?.name?.lastName}</td>
                  <td className="border p-2 text-center">{item?.location}</td>
                  <td className="border p-2 text-center">{item?.address}</td>
                  <td className="border p-2 text-center">{item?.pinCode}</td>
                  <td className="border p-2 text-center">{item?.state}</td>
                  <td className="border p-2 text-center">{item?.city}</td>
                  <td className="border p-2 text-center">{item?.bankDetails?.bankName}</td>
                  <td className="border p-2 text-center">{item?.bankDetails?.branchName}</td>
                  <td className="border p-2 text-center">{item?.bankDetails?.accountNumber}</td>
                  <td className="border p-2 text-center">{item?.bankDetails?.ifscCode}</td>
                  <td className="border p-2 text-center">{item?.panNumber || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FranchiseList;
