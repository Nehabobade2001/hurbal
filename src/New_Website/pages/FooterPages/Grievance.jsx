import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { MainContent } from "../../../constants/mainContent";
import Swal from "sweetalert2";
import { addComplain } from "../../../api/user.api";
export default function Grievance() {
  const [payload, setPayload] = useState({
    userId: "",
    name: "",
    mobileNo: "",
    email: "",
    nature: "",
    subject: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setPayload({ ...payload, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addComplain(payload);
      Swal.fire({
        title: "Success",
        text: "Your message has been sent successfully",
        icon: "success",
      })
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      })
    } finally {
      setLoading(false);
    }
  }


  const grievanceCommittee = [
    {
      name: "Narbada Prasad",
      email: "np9522574074@gmail.com",
      phone: "9399361500"
    },
    {
      name: "Rupesh Patidar",
      email: "ttsplrupesh@gmail.com",
      phone: "9752456893"
    },
    {
      name: "Dharmendra Silawat",
      email: "dharmendrasilawat1234@gmail.com",
      phone: "8839028034"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 mt-16 md:mt-20">
      {/* Main Content */}
      <div className="   grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-16 py-12">
        {/* Left Side - Form */}
        <div>
          <div className="flex gap-4 mb-6">
            <button className="text-[#b00938] font-bold">Complaint Form</button>
          </div>

          <h2 className="text-xl font-semibold mb-4">Grievance Redressal</h2>

          <form className="space-y-3">
            <input name="userId" type="text" placeholder="Customer ID : *" className="w-full border px-3 py-2 rounded" onChange={(e) => handleChange(e)} value={payload.userId} />
            <input name="name" type="text" placeholder="Name : *" className="w-full border px-3 py-2 rounded" onChange={(e) => handleChange(e)} value={payload.name} />
            <input name="mobileNo" type="tel" maxLength={10} placeholder="Mobile No : *" className="w-full border px-3 py-2 rounded" onChange={(e) => handleChange(e)} value={payload.mobile} />
            <input name="email" type="email" placeholder="Email ID : *" className="w-full border px-3 py-2 rounded" onChange={(e) => handleChange(e)} value={payload.email} />
            <input name="nature" type="text" placeholder="Nature of Grievance : *" className="w-full border px-3 py-2 rounded" onChange={(e) => handleChange(e)} value={payload.natureOfGrievance} />
            <input name="subject" type="text" placeholder="Subject : *" className="w-full border px-3 py-2 rounded" onChange={(e) => handleChange(e)} value={payload.subject} />
            <textarea name="description" placeholder="Description" rows="4" className="w-full border px-3 py-2 rounded" onChange={(e) => handleChange(e)} value={payload.description}></textarea>
            <button onClick={handleSubmit} type="submit" className="bg-[#b00938] text-white px-6 py-2 rounded">SUBMIT</button>
          </form>
        </div>

        {/* Right Side - Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold">Orgacure India</h3>
            <p className="font-semibold">Head Office</p>
            <p>4th Floor,
              404 B, Shrivardhan Complex
              RNT Marg, Indore</p>
            <p><span className="font-semibold">Mobile:</span>

              +91-95205 01840</p>
            {/* <p><span className="font-semibold">Phone:</span> 0731 3557130</p> */}
            <p><span className="font-semibold">Email id:</span> {MainContent.email}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Grievances Redressal Committee</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {grievanceCommittee.map((member, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  {index === 2 && <p className="text-lg font-bold text-black">Nodal Officer</p>}
                  <p><span className="font-semibold">Name:</span> {member.name}</p>
                  <p><span className="font-semibold">Email ID:</span> <span className="text-orange-500">{member.email}</span></p>
                  <p><span className="font-semibold">Mobile No.:</span> {member.phone}</p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
