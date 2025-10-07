import React from 'react';
import { useSelector } from 'react-redux';

const FranchiseDashboard = () => {
  const userInfo = useSelector((state) => state.auth);
  const user = userInfo?.user;

  console.log(user);
  

  const franchiseName = user?.buissnessName || "N/A";
  const ownerName = user?.name || "N/A";
  const location = `${user?.location || ""}, ${user?.city || ""}, ${user?.state || ""} - ${user?.pinCode || ""}`;
  const bankName = user?.bankDetails?.bankName || "N/A";
  const branchName = user?.bankDetails?.branchName || "N/A";
  const accountNumber = user?.bankDetails?.accountNumber || "N/A";
  const ifsc = user?.bankDetails?.ifscCode || "N/A";
  const pan = user?.panNumber || "N/A";
  const fid = user?.fid || "N/A"

  return (
    <div className="p-4 bg-white rounded-lg ">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Franchise Information</h1>
      <table className="w-full table-auto text-sm border border-gray-300">
        <tbody>
          <tr><td className="border px-4 py-2 font-medium">Franchise Name</td><td className="border px-4 py-2">: {franchiseName}</td></tr>
          <tr><td className="border px-4 py-2 font-medium">Owner Name</td><td className="border px-4 py-2">: {ownerName?.firstName + " " + ownerName?.middleName + " " + ownerName?.lastName}</td></tr>
          <tr><td className="border px-4 py-2 font-medium">Franchise Id</td><td className="border px-4 py-2">: {fid} </td></tr>

          <tr><td className="border px-4 py-2 font-medium">Location</td><td className="border px-4 py-2">: {location}</td></tr>
          <tr><td className="border px-4 py-2 font-medium">Bank Name</td><td className="border px-4 py-2">: {bankName}</td></tr>
          <tr><td className="border px-4 py-2 font-medium">Branch Name</td><td className="border px-4 py-2">: {branchName}</td></tr>
          <tr><td className="border px-4 py-2 font-medium">AC No</td><td className="border px-4 py-2">: {accountNumber}</td></tr>
          <tr><td className="border px-4 py-2 font-medium">IFSC</td><td className="border px-4 py-2">: {ifsc}</td></tr>
          <tr><td className="border px-4 py-2 font-medium">PAN No.</td><td className="border px-4 py-2">: {pan}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default FranchiseDashboard;
