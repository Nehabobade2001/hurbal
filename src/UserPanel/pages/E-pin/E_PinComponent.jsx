import { useEffect, useState } from "react";
import React from 'react';
import InputField from "../../../Component/InputField";
import E_pinList from "./E_pinList";
import { getEpinBalance, requestEpinBalance } from "../../../api/user.api";
import PageLoader from "../../../Component/PageLoader";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const E_pinComponent = () => {
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.auth);
    const userDetails = user?.user
    const [formData, setFormData] = useState({
        amount: "",
        TransactionId: "",
        HolderName: "",
        paymentProof: null,
        // remark: "Requested",
        // associateName: userDetails?.name,
        // associateId: userDetails?.username,
        // type: "CREDIT",
        // status: "Requested",
        // by: "User"
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    [name]: reader.result,
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.TransactionId || !formData.amount || !formData.HolderName || !formData.paymentProof) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill all fields before submitting.',
            });
            return;
        }


        setLoading(true);
        try {
            const response = await requestEpinBalance(formData);
            if (response?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Payment request submitted successfully.',
                });
                setFormData({
                    amount: "",
                    TransactionId: "",
                    HolderName: "",
                    paymentProof: null,
                });


            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Payment request Failed.',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Something went wrong while submitting your request.',
            });
        } finally {
            setLoading(false);
            window.location.reload()
        }
    };

    return (
        <div className="flex flex-col gap-5">

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/30 border-2 border-white rounded-lg p-5 flex flex-col gap-4">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                value={formData.amount}
                                onChange={handleChange}
                                label={'Enter Amount'}
                            />
                            <InputField
                                type="number"
                                name="TransactionId"
                                placeholder="Transaction Id"
                                value={formData.TransactionId}
                                onChange={handleChange}
                                label={'Transaction Id'}
                                
                            />
                            <InputField
                                type="text"
                                name="HolderName"
                                placeholder="Account Holder Name"
                                value={formData.HolderName}
                                onChange={handleChange}
                                label={'Account Holder Name'}
                            />
                            <div>
                                <label className="block text-sm font-normal text-gray-700">Payment Proof</label>
                                <InputField
                                    type="file"
                                    name="paymentProof"
                                    placeholder='Payment Proof'
                                    value={formData.paymentProof}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-bg-color text-white py-2 rounded">
                            Submit Payment
                        </button>
                    </form>
                </div>
            </div>
            {loading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </div>
    );
};

export default E_pinComponent;
