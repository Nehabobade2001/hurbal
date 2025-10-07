import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { requestWithdrawal } from "../../../api/user.api";
import PageLoader from "../../../Component/PageLoader";
import { useNavigate } from "react-router-dom";

const PayoutComponent = ({ dashboard, isLoading }) => {
    const [data, setData] = useState(dashboard?.Withdrawals || []);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        amount: "",
        ifscCode: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const availableBalance = dashboard?.mainBalance - 100; // Adjust this calculation as needed
        const withdrawalAmount = parseFloat(formData.amount);

        if (withdrawalAmount > availableBalance) {
            Swal.fire({
                title: "Error!",
                text: `Withdrawal amount exceeds available balance of ₹${availableBalance.toFixed(2)}.`,
                icon: "error",
                confirmButtonColor: "#90479B",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            const response = await requestWithdrawal(formData);
            console.log(response);
            if (response?.data?.success) {
                const newWithdrawal = response.data.newWithdrawal;
                setData(prevData => [...prevData, newWithdrawal]);

                setFormData({
                    accountHolderName: "",
                    bankName: "",
                    accountNumber: "",
                    amount: "",
                    ifscCode: "",
                });

                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonColor: "#90479B",
                    confirmButtonText: "OK",
                });
                navigate('/user-dashboard')
            } else {
                Swal.fire({
                    title: "Failed!",
                    text: response.data.message,
                    icon: "error",
                    confirmButtonColor: "#90479B",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Error submitting withdrawal request:", error);
            const errorMessage = error.response?.data?.message || "Failed to submit withdrawal request.";
            Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#90479B",
                confirmButtonText: "OK",
            });
        }

    };


    return (
        <>
            {isLoading && (
                <PageLoader />
            )}
            <div className="">
                <div className="mb-3">
                    <p className="text-sm font-medium">Available Withdrawal Balance: ₹{(dashboard?.mainBalance - 100)}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                    {[
                        { title: "Total Requested", value: dashboard?.WithdrawalPending, icon: "⏳" },
                        { title: "Total Approved", value: dashboard?.WithdrawalApproved, icon: "✅" },
                        { title: "Total Rejected", value: dashboard?.withdrawalRejected, icon: "❌" },
                        { title: "Total Paid Amount", value: dashboard?.totalWithdrawalAmount, icon: "💵" },
                    ].map((card, index) => (
                        <div key={index} className="bg-white/30 border-2 border-white p-4 rounded-lg flex gap-2 justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-500 text-sm">{card.title}</p>
                                <p className="text-xl font-bold">₹ {card.value}</p>
                            </div>
                            <div className="p-1 bg-gray-200 rounded-lg">
                                <span className="text-2xl">{card.icon}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold mb-4">Send Withdrawal Request</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <label className="flex flex-col text-sm font-medium gap-1">
                                Holder Name
                                <input placeholder="Holder Name" type="text" name="accountHolderName" className="p-2 border rounded text-sm outline-none" onChange={handleChange} required />
                            </label>
                            <label className="flex flex-col text-sm font-medium gap-1">
                                Bank Name
                                <input placeholder="Bank Name" type="text" name="bankName" className="p-2 border rounded text-sm outline-none" onChange={handleChange} required />
                            </label>
                            <label className="flex flex-col text-sm font-medium gap-1">
                                Account Number
                                <input placeholder="Account Number" type="text" name="accountNumber" className="p-2 border rounded text-sm outline-none" onChange={handleChange} required />
                            </label>
                            <label className="flex flex-col text-sm font-medium gap-1">
                                Withdrawal Amount
                                <input placeholder="Minium Withdrawal Amount 100" type="number" name="amount" className="p-2 border rounded text-sm outline-none" onChange={handleChange} required />
                            </label>
                            <label className="flex flex-col text-sm font-medium gap-1">
                                IFSC Code
                                <input placeholder="IFSC Code" type="text" name="ifscCode" className="p-2 border rounded text-sm outline-none" onChange={handleChange} required />
                            </label>
                        </div>
                        <button type="submit" className="p-2 bg-bg-color text-white rounded">Send Request</button>
                    </form>
                </div>

                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                    {Array.isArray(data) && data.length > 0 ? (
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-2 whitespace-nowrap">Holder Name</th>
                                    <th className="p-2 whitespace-nowrap">Bank Name</th>
                                    <th className="p-2 whitespace-nowrap">Account No.</th>
                                    <th className="p-2 whitespace-nowrap">Amount</th>
                                    <th className="p-2 whitespace-nowrap">Transaction ID</th>
                                    <th className="p-2 whitespace-nowrap">Status</th>
                                    <th className="p-2 whitespace-nowrap">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index} className="border-t text-sm">
                                        <td className="p-2 whitespace-nowrap">{item?.accountHolderName}</td>
                                        <td className="p-2 whitespace-nowrap">{item?.bankName}</td>
                                        <td className="p-2 whitespace-nowrap">{item?.accountNumber}</td>
                                        <td className="p-2 whitespace-nowrap text-green-500">₹ {item?.amount?.toFixed(2)}</td>
                                        <td className="p-2 whitespace-nowrap text-green-500">{item?.transactionId || "NULL"}</td>
                                        <td className="p-2 whitespace-nowrap">
                                            <button
                                                className={`p-2 rounded-full text-center px-5 ${item?.status === "pending"
                                                    ? "bg-yellow-200 text-yellow-700"
                                                    : item?.status === "approved"
                                                        ? "bg-green-200 text-green-700"
                                                        : "bg-red-200 text--700"
                                                    }
                                         rounded-full text-center px-5`}>
                                                {item?.status}
                                            </button>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">{new Date(item?.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No withdrawal records available.</p>
                    )}

                </div>
            </div>
        </>
    );
};

export default PayoutComponent;
