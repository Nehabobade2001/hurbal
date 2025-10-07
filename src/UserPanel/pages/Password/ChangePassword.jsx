import React, { useState } from 'react';
import loginbg from '../../../assets/images/bg.png';
import { MainContent } from '../../../constants/mainContent';
import Button from '../../../Component/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Routers } from '../../../constants/Routes';
import InputField from '../../../Component/InputField';
import Swal from 'sweetalert2';
import { userChangePassword } from '../../../api/user.api';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [validationError, setValidationError] = useState({});
    const [payload, setPayload] = useState({
        email: "",
        newPassword:"",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPayload({ ...payload, [name]: type === "checkbox" ? checked : value });
        setValidationError((prev) => ({ ...prev, [name]: "" }));
    };

    const navigateToHomePage = () => {
        navigate(Routers.Login);
    };

    const handleSubmit = async () => {
        let errors = {};
        if (!payload.email) errors.email = "Please enter your Email.";

        if (Object.keys(errors).length > 0) {
            setValidationError(errors);
            return;
        }

        try {
            setSubmitting(true);
            const data = await userChangePassword(payload);
            console.log("Change Password response:", data);
            if (data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: data?.message,
                    text: data?.message || 'Change Password Successfully',
                }).then(() => {
                    navigateToHomePage();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data?.message,
                    text: data?.message || 'Change Password failed. Try again.',
                });
            }
        } catch (error) {
            console.error("Change Password failed:", error);
            setValidationError({ form: "Something went wrong. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${loginbg})`, backgroundSize: "cover", backgroundPosition: "center" }}
            className='w-full h-screen bg-bg-color1'
        >
            <div className='w-full h-full flex items-center justify-between'>
                <div className='w-full h-full flex items-center justify-center p-4'>
                    <div className='max-w-xl h-fit p-5 flex flex-col gap-5 rounded-xl border bg-[#ffffff6e] backdrop-blur-md'>
                        <div className='flex items-center justify-center'>
                            <img src={MainContent.logo1} className='h-20 object-contain' alt="Logo" />
                        </div>
                        <h1 className='text-lg text-center'>Change Password</h1>
                        <div className='flex flex-col gap-4'>
                            <InputField
                                type="text"
                                name="email"
                                label="Enter Email"
                                value={payload.email}
                                onChange={handleChange}
                            />
                            {validationError.email && (
                                <p className="text-red-500 text-sm mt-1">{validationError.email}</p>
                            )}

                            <InputField
                                type="password"
                                name="newPassword"
                                label="newPassword"
                                value={payload.newPassword}
                                onChange={handleChange}
                            />
                            {validationError.newPassword && (
                                <p className="text-red-500 text-sm mt-1">{validationError.newPassword}</p>
                            )}
                            {validationError.form && (
                                <p className="text-red-500 text-sm mt-1">{validationError.form}</p>
                            )}

                            <Button
                                title={submitting ? "Changing..." : "Change Password"}
                                disabled={submitting}
                                className="bg-primary-500 px-4 py-3 text-sm  rounded-md text-white text-center w-full disabled:opacity-50"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
