import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addAddress, deteleAddress, getAddress, updateAddress } from "../api/user.api";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const Address = ({ selectedAddress, setSelectedAddress }) => {
    const user = useSelector((store) => store?.auth);
    const userId = user?.user?._id;
    const [address, setAddress] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editAddressId, setEditAddressId] = useState(null);

    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
        "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
        "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
        "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
    ];

    console.log(user.user);
    
    const [formData, setFormData] = useState({
        firstName: user?.user?.name?.firstName || "",
        userId: userId || "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        phone: user?.user?.mobile || "",
        email: user?.user?.email || "",
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editMode) {
                response = await updateAddress(editAddressId, formData);
            } else {
                response = await addAddress(formData);
            }

            console.log(response);

            if (response && response?.data && response?.data?.message) {
                Swal.fire({
                    title: "Success!",
                    text: editMode ? "Address updated successfully!" : "Address added successfully!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });

                setFormData({
                    firstName: user?.user?.name || "",
                    userId: userId || "",
                    addressLine1: "",
                    addressLine2: "",
                    city: "",
                    state: "",
                    pincode: "",
                    country: "India",
                    phone: user?.user?.mobile || "",
                    email: user?.user?.email || "",
                });

                setShowForm(false);
                setEditMode(false);
                setEditAddressId(null);
                const data = await fetchAddress();
                console.log(data);
                
            } else {
                Swal.fire({
                    title: "error!",
                    text: response?.message,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Error Adding Address:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to save address. Please try again.",
                icon: "error",
                confirmButtonColor: "#90479B",
                confirmButtonText: "OK",
            });
        }
    };

    const fetchAddress = async () => {

        if (!userId) {
            console.error("User ID is missing.");
            return;
        }
        try {
            const response = await getAddress(userId);
            const addresses = response?.data?.addresses || [];
            setAddress(addresses);
            const defaultAddress = addresses.find(addr => addr.isDefault);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress._id);
            } else if (addresses.length > 0) {
                setSelectedAddress(addresses[0]._id);
            }
        } catch (error) {
            console.error("Error Fetching Address:", error);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    const handleDelete = async (addressId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this address?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deteleAddress(addressId);
                    if (response?.data?.success) {
                        Swal.fire({
                            title: "success",
                            text: response?.data?.message ,
                            icon: "success",
                        });
                        fetchAddress();
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: response?.data?.message || "Failed to delete address.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error Deleting Address:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete address. Please try again.",
                        icon: "error",
                        confirmButtonColor: "#90479B",
                        confirmButtonText: "OK",
                    });
                }
            }
        });
    }

    const handleEdit = (address) => {
        setFormData({ ...address });
        setEditAddressId(address._id);
        setEditMode(true);
        setShowForm(true)
    };

    useEffect(() => {
        if (editMode && editAddressId) {
            const selectedAddress = address.find(addr => addr._id === editAddressId);
            if (selectedAddress) {
                setFormData({ ...selectedAddress });
            }
        }
    }, [editMode, editAddressId]);

    return (
        <div className=" ">
            <h2 className="text-xl font-medium mb-4">Billing Details</h2>
            {!showForm ? (
                <>
                    {address.length > 0 ? (
                        <div className="space-y-4">
                            {address.map((addr, index) => (
                                <div
                                    key={index}
                                    className={`border p-4 rounded-md flex items-center justify-between ${selectedAddress === addr._id ? "border-blue-500" : ""
                                        }`}
                                >
                                    <div className="text-sm">
                                        <p className="font-semibold">{addr?.firstName}</p>
                                        <p>{addr?.addressLine1}, {addr?.addressLine2}</p>
                                        <p>{addr?.city}, {addr?.state} - {addr?.pincode}</p>
                                        <p>{addr?.country}</p>
                                        <p className="text-gray-500">Phone: {addr?.phone}</p>


                                        <div className="flex gap-5 items-center text-xl mt-4">
                                            <div>
                                                <FiEdit onClick={() => handleEdit(addr)} className="text-btn-primary cursor-pointer" />
                                            </div>
                                            <div>
                                                <MdDeleteForever onClick={() => handleDelete(addr._id)} className="text-red-500 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        value={addr._id}
                                        checked={selectedAddress === addr._id}
                                        onChange={() => setSelectedAddress(addr._id)}
                                        className="w-5 h-5"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No addresses found.</p>
                    )}

                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full mt-4 px-4 py-2 btn-primary text-white font-semibold rounded-md"
                    >
                        + Add New Address
                    </button>
                </>
            ) : (
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold">Full Name</label>
                        <input type="text" name="firstName" value={formData.firstName || user.user.name} disabled className="w-full border p-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Email</label>
                        <input type="text" name="email" value={formData.email || user.user.email} disabled className="w-full border p-2 rounded-md" />
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold">Phone</label>
                        <input type="text" name="phone" value={formData.phone || user.user.mobile} onChange={handleChange} className="w-full border p-2 rounded-md" />
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold">Street Address</label>
                        <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="w-full border p-2 rounded-md mb-2" />
                        <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="w-full border p-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">State</label>
                        <select name="state" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded-md">
                            <option value="">Select State</option>
                            {indianStates.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Country</label>
                        <input type="text" name="country" value={formData.country} disabled className="w-full border p-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Zip Code</label>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full border p-2 rounded-md" />
                    </div>

                    <button type="submit" className="w-full px-5 py-2 btn-primary text-white rounded-md">
                        {editMode ? "Update Address" : "Save Address"}
                    </button>

                    <button onClick={() => { setShowForm(false); setEditMode(false); setEditAddressId(null); }}
                        className="w-full px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                        Cancel
                    </button>
                </form>

            )}
        </div>
    );
};

export default Address;
