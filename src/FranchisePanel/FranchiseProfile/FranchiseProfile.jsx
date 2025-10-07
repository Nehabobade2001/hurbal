import React, { useEffect, useState } from "react";
import InputField from "../../Component/InputField";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../Component/PageLoader";
import Swal from "sweetalert2";
import { convertToBase64 } from "../../utils/convertToBase64";
import { profileUpdate } from "../../api/user.api";
import { loginSuccess } from "../../Redux/Reducer/authReducer";
import { getFranchiseProfile } from "../../api/franchise.api";

const FranchiseProfile = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userPhoto: null,
        panCardImage: null,
        aadhaarFront: null,
        aadhaarBack: null,
        profession: "",
        email: "",
        maritalStatus: "",
        address: "",
        city: "",
        location: "",
        state: "",
        pincode: "",
        bankName: "",
        branchName: "",
        aadharNo: "",
        ownerName: "",
        gstNumber: ""
    });

    const user = useSelector((state) => state.auth);
    const franchise = user?.user
    console.log(franchise);


    useEffect(() => {
        if (franchise) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                // distributorName: franchise?.name ?? "",
                ownerName: franchise?.ownerName ?? "",
                distributorID: franchise?.fid ?? "",
                email: franchise?.email ?? "",
                mobile: franchise?.mobile?.primary ?? "",
                panNo: franchise?.panNumber ?? "",
                accountNo: franchise?.bankDetails?.accountNumber ?? "",
                ifscCode: franchise?.bankDetails?.ifscCode ?? "",
                bankName: franchise?.bankDetails?.bankName ?? "",
                branchName: franchise?.bankDetails?.branchName ?? "",
                address: franchise?.address ?? "",
                city: franchise?.city ?? "",
                state: franchise?.state ?? "",
                pincode: franchise?.pinCode ?? "",
                doj: franchise?.createdAt
                    ? new Date(franchise.createdAt).toISOString().split("T")[0]
                    : "",
                location: franchise?.location ?? "",
                userPhoto: franchise?.generalDetails?.userProfile ?? "",
                aadharNo: franchise?.generalDetails?.aadharNo ?? "",
                gstNumber: franchise?.gstNumber ?? "",
            }));

        }
    }, [franchise]);

    const disabledFields = [
        "sponserID",
        "sponserName",
        "distributorID",
        "distributorName",
        "doj",
        "mobile",
        "email",
        "panNo",
        "accountNo",
        "ifscCode",
        "ownerName"
    ];

    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            try {
                const base64 = await convertToBase64(files[0]);
                setFormData({ ...formData, [name]: base64 });
            } catch (err) {
                console.error("Error converting to base64:", err);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const getUserData = async () => {
        try {
            const data = await getFranchiseProfile();
            if (data) {
                dispatch(loginSuccess({
                    token: data?.data?.token,
                    role: data?.data?.role,
                    user: data?.data?.data
                }));
            }
        } catch (err) {
            console.error("Failed to fetch updated user profile", err);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const optionalFields = [
            "nomineeName",
            "nomineeRelation",
            "nomineeDOB",
            "nomineeAadhar"
        ];

        const requiredFields = Object.keys(formData).filter(
            (key) => !optionalFields.includes(key)
        );

        const emptyFields = requiredFields.filter(
            (key) => formData[key] === "" || formData[key] === null
        );

        if (emptyFields.length = 0) {
            Swal.fire({
                toast: true,
                icon: 'error',
                title: 'Please fill all required fields before submitting.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    popup: 'swal2-toast'
                }
            });
            return;
        }
        console.log("Form submitted:", formData);

        try {
            setLoading(true);
            const response = await profileUpdate(formData);
            if (response?.success) {
                dispatch(loginSuccess({
                    token: response?.token,
                    role: response?.role,
                    user: response?.data
                }));
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "user verify successfully",
                });
                setFormData({
                    userPhoto: null,
                    panCardImage: null,
                    aadhaarFront: null,
                    aadhaarBack: null,
                    fatherName: "",
                    profession: "",
                    maritalStatus: "",
                    address: "",
                    city: "",
                    location: "",
                    state: "",
                    pincode: "",
                    ownerName: "",
                    bankName: "",
                    branchName: "",
                    aadharNo: "",
                });
                await getUserData();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response?.data?.msg || "Something went wrong",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data?.msg || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }

    };


    return (
        <div className="">
            <form className="flex flex-col gap-5 p-4 bg-white shadow rounded-xl" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold">Personal Details</h2>
                <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[

                        ["distributorID", "Franchise ID"],
                        // ["distributorName", "Franchise  Name"],
                        ["ownerName", "Owner  Name"],
                        ["doj", "Date of Joining"],
                        ["gstNumber", "GST Number"],
                        ["mobile", "Mobile Number"],
                        ["email", "Email ID"],
                        ["aadharNo", "Aadhar No"],
                    ].map(([name, label]) => (
                        <InputField
                            label={label}
                            key={name}
                            type="text"
                            name={name}
                            value={formData[name] || ""}
                            placeholder={label}
                            onChange={handleChange}
                            disabled={disabledFields.includes(name)}
                            className="border p-2 rounded w-full"
                        />
                    ))}
                </div>

                <h2 className="text-xl font-bold">Permanent Address</h2>
                <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        ["location", "Location"],
                        ["address", "Address"],
                        ["city", "City"],
                        ["state", "State"],
                        ["pincode", "PinCode"]
                    ].map(([field, label]) => (

                        <InputField
                            key={field}
                            type="text"
                            label={label}
                            name={field}
                            value={formData[field] || ""}
                            placeholder={label}
                            onChange={handleChange}
                            disabled={disabledFields.includes(name)}
                            className="border p-2 rounded w-full"
                        />
                    ))}
                </div>


                <h2 className="text-xl font-bold">Bank Details</h2>
                <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        ["bankName", "Bank Name"],
                        ["branchName","Branch Name"],
                        ["accountNo", "Account No"],
                        ["ifscCode", 'IFSC Code']
                    ].map(([field, label]) => (
                        <InputField
                            key={field}
                            type="text"
                            label={label}
                            name={field}
                            value={formData[field] || ""}
                            placeholder={label}
                            onChange={handleChange}
                            disabled={disabledFields.includes(name)}
                            className="border p-2 rounded w-full"
                        />
                    ))}
                </div>

                <h2 className="text-xl font-bold">PAN Details</h2>
                <InputField
                    label={'Pan Card No'}
                    type="text"
                    name="panNo"
                    value={formData.panNo || ""}
                    placeholder="PAN Number"
                    onChange={handleChange}
                    disabled
                    className="border p-2 rounded w-full"
                />

                {/* {!franchise.status && (
                    <button
                        type="submit"
                        className="bg-bg-color text-white px-4 py-2 rounded mt-6"
                    >
                        Save Changes
                    </button>
                )} */}

                {/* <button
          type="submit"
          className="bg-bg-color text-white px-4 py-2 rounded mt-6"
        >
          Save Changes
        </button> */}

            </form>

            {loading && (
                <PageLoader />
            )}
        </div>
    );
};

export default FranchiseProfile