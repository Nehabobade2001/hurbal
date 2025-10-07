import React from 'react';
import { useSelector } from 'react-redux';

const PersonalDetails = () => {
  const user = useSelector((state) => state.auth);
  const userDetails = user?.user || {};

  console.log(userDetails);


  // console.log(userDetails.leftLeg.length);

  const fullName = userDetails?.name?.firstName
    ?`${userDetails.name.firstName} ${userDetails?.name?.middleName ? userDetails.name.middleName : ''} ${userDetails.name.lastName}`.trim()
    : userDetails.name || "N/A";

  const fields = [
    { label: "Name", value: fullName },
    { label: "ID", value: userDetails?.userId },
    { label: "Joining Date", value: new Date(userDetails?.createdAt).toLocaleDateString('en-CA') },
    { label: "Package", value: userDetails.package },
    { label: "Rank", value: userDetails.rank },
    { label: "PAN No", value: userDetails.panNo },
    { label: "Total Activation", value: userDetails.totalActivation },
    { label: "Total Direct", value: userDetails?.partners.length },
    { label: "Total Direct SP", value: userDetails?.tree?.directSP },
    { label: "Left Distributors", value: userDetails?.tree?.leftCount },
    { label: "Right Distributors", value: userDetails?.tree?.rightCount },
    { label: "Left PV", value: userDetails?.tree?.leftPV },
    { label: "Right PV", value: userDetails?.tree?.rightPV },
    { label: "Self PV", value: userDetails?.incomeDetails?.selfPV },
    { label: "Left SP", value: userDetails?.tree?.leftSP },
    { label: "Right SP", value: userDetails?.tree?.rightSP },
    { label: "Self SP", value: userDetails?.incomeDetails?.selfSP },
    // { label: "Carry Left SP", value: userDetails?.tree?.leftCarrySP },
    // { label: "Carry Right SP", value: userDetails?.tree?.rightCarrySP },
    // { label: "Current Left SP", value: userDetails?.tree?.currLeftSP },
    // { label: "Current Right SP", value: userDetails?.tree?.currRightSP },
    {
      label: "Green Date", value: userDetails?.activationDate ? new Date(userDetails.activationDate).toLocaleDateString('en-CA')
        : "N/A"
    },
    { label: "Sponsor ID", value: userDetails?.sponsorId || "N/A" },
    { label: "Status", value: userDetails?.isActive ? "ACTIVE" : "INACTIVE" },
  ];

  // Split into 2 columns
  const half = Math.ceil(fields.length / 2);
  const firstHalf = fields.slice(0, half);
  const secondHalf = fields.slice(half);

  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="font-medium text-gray-800 text-lg mb-4">Personal Info</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[firstHalf, secondHalf].map((columnFields, colIndex) => (
          <table key={colIndex} className="w-full table-fixed border border-gray-300 text-sm">
            <tbody>
              {columnFields.map(({ label, value }) => (
                <tr key={label} className="border-gray-300">
                  <td className="border font-medium px-4 py-2 w-1/2">{label}</td>
                  <td className="border px-4 py-2 text-gray-700 w-1/2">{value ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default PersonalDetails;
