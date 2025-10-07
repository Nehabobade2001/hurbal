import React, { useEffect, useState } from 'react';
import InputField from '../../Component/InputField';
import SelectComponent from '../../Component/SelectComponent';
import TextareaField from "../../Component/TextareaField";
import Swal from 'sweetalert2';
import { findFranchiseDetails, createUserSaleData } from '../../api/franchise.api';
import { getAllCategories, getProductByCategory, getSingleProductDetails, getProfile } from '../../api/user.api';
import PageLoader from '../../Component/PageLoader';
import { useSelector } from 'react-redux';

const generateTransactionId = () => {
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);
    return `TXN${randomNum}`;
};

const DistributorSalesForm = () => {
    const user = useSelector((state) => state.auth.user);
    const [walletBalance, setWalletBalance] = useState(0);
    const [franchiseId, setFranchiseId] = useState("");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [addProduct, setAddProduct] = useState({
        group: '',
        product: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const initialFormData = {
        orderDate: new Date().toISOString().split('T')[0],
        transactionId: generateTransactionId(),
        fId: "",
        distributorId: user?.userId || "",
        distributorName: "",
        address: "",
        saleType: "",
        products: [],
        shippingType: "",
        netAmount: 0,
        deliveryAddress: "",
        paymentMode: "",
        remarks: "",
        walletBalance: 0,
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const response = await getProfile();
                const balance = response?.data?.data?.wallets?.purchaseWallet || 0;
                setWalletBalance(balance);
                setFormData(prev => ({
                    ...prev,
                    walletBalance: balance
                }));
            } catch (error) {
                console.error("Error fetching wallet balance:", error);
            }
        };

        fetchWalletBalance();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getAllCategories();
                const formatted = result.data.map((cat) => ({
                    label: cat.name,
                    value: cat._id,
                }));
                setCategories(formatted);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const paymentModes = [
        { value: "Wallet", label: "Wallet" },
        { value: "UPI", label: "UPI" },
    ];

    const saleTypes = [
        { value: "Standard", label: "Standard" },
        { value: "Bulk", label: "Bulk Order" },
    ];

    const shippingTypes = [
        { value: "Standard", label: "Standard Shipping" },
        { value: "Express", label: "Express Shipping" },
    ];

    const handleDistributorSearch = async () => {
        if (!franchiseId) {
            Swal.fire("Warning", "Please enter a Franchisee ID.", "warning");
            return;
        }
        try {
            const result = await findFranchiseDetails({ franchiseId });
            if (result.success) {
                setFormData((prev) => ({
                    ...prev,
                    fId: result.data._id,
                    distributorName: result.data.distributorName,
                    address: result.data.address,
                }));
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleChange = (e, field) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = () => {
        if (!addProduct.group || !addProduct.product || !addProduct.quantity) {
            Swal.fire("Warning", "Please fill all product fields.", "warning");
            return;
        }

        if (isNaN(addProduct.quantity) || addProduct.quantity <= 0 || addProduct.quantity > product?.stock) {
            Swal.fire("Warning", "Invalid quantity. It must be a positive number and not exceed stock.", "warning");
            return;
        }

        const productToAdd = {
            ...product,
            quantity: Number(addProduct.quantity),
        };

        if (formData.products.some(p => p._id === productToAdd._id)) {
            Swal.fire("Info", "Product is already in the cart.", "info");
            return;
        }

        const updatedProducts = [...formData.products, productToAdd];
        const subtotal = productToAdd.dp * productToAdd.quantity;

        setFormData((prev) => ({
            ...prev,
            products: updatedProducts,
            netAmount: Number(prev.netAmount) + subtotal,
        }));

        setAddProduct({ group: '', product: '', quantity: '' });
        setProducts([]);
        setProduct(null);
    };

    const handleRemoveProduct = (item) => {
        const updatedProducts = formData.products.filter(p => p._id !== item._id);
        const subtotal = item.dp * item.quantity;

        setFormData((prev) => ({
            ...prev,
            products: updatedProducts,
            netAmount: Number(prev.netAmount) - subtotal,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fId) newErrors.fId = "Please search and select a franchisee.";
        if (formData.products.length === 0) newErrors.products = "Please add at least one product.";
        if (!formData.saleType) newErrors.saleType = "Sale type is required.";
        if (!formData.shippingType) newErrors.shippingType = "Shipping type is required.";
        if (!formData.deliveryAddress) newErrors.deliveryAddress = "Delivery address is required.";
        if (!formData.paymentMode) newErrors.paymentMode = "Payment mode is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Swal.fire("Validation Error", "Please fill all required fields.", "error");
            return;
        }

        setLoading(true);

        try {
            if (formData.paymentMode === "Wallet") {
                if (walletBalance <= 0) {
                    Swal.fire("Warning", "Your wallet balance is zero or negative.", "warning");
                    setLoading(false);
                    return;
                }
                if (walletBalance < formData.netAmount) {
                    Swal.fire("Warning", `Insufficient wallet balance (₹${walletBalance}).`, "warning");
                    setLoading(false);
                    return;
                }
            }

            const response = await createUserSaleData(formData);

            if (response.success) {
                Swal.fire('Success', response.message || 'Order submitted successfully!', 'success');
                setFormData(initialFormData);
                setAddProduct({ group: '', product: '', quantity: '' });
                setProducts([]);
                setProduct(null);
                setFranchiseId("");
            } else {
                Swal.fire('Error', response.message || 'Order submission failed!', 'error');
            }
        } catch (error) {
            Swal.fire('Error', error?.response?.data?.message || 'Failed to submit order', 'error');
        } finally {
            setLoading(false);
        }
    };

    const headers = ["S.No", "Image", "Product Name", "MRP", "DP", "GST", "HSN", "Qty", "Net Amt", "Action"];

    return (
        <>
            {loading && <PageLoader />}
            <div className="p-4 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Order Date" type="date" value={formData.orderDate} onChange={(e) => handleChange(e, "orderDate")} />
                        <InputField label="Transaction ID" value={formData.transactionId} disabled />
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700">Franchisee ID</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={franchiseId}
                                    onChange={(e) => setFranchiseId(e.target.value)}
                                    className="p-2 border rounded-md w-full"
                                    placeholder="Enter Franchisee ID"
                                />
                                <button type="button" onClick={handleDistributorSearch} className="bg-blue-600 text-white px-4 rounded-md">Search</button>
                            </div>
                            {errors.fId && <span className="text-red-500 text-sm">{errors.fId}</span>}
                        </div>
                        <InputField label="Franchisee Name" value={formData.distributorName} disabled />
                        <InputField label="Address" value={formData.address} disabled />
                        <InputField label="User ID" value={formData.distributorId} disabled />
                        <InputField label="Wallet Balance" value={walletBalance} disabled />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Add Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <SelectComponent
                            label="Group Type"
                            value={addProduct.group}
                            onChange={async (e) => {
                                const value = e.target.value;
                                handleAddChange({ target: { name: "group", value } });
                                try {
                                    const result = await getProductByCategory(value);
                                    const formatted = result?.data?.products?.map((p) => ({ label: p.name, value: p._id }));
                                    setProducts(formatted);
                                } catch (error) {
                                    console.error("Error fetching products:", error);
                                }
                            }}
                            options={categories}
                            placeholder="Select a group"
                        />
                        <SelectComponent
                            label="Product"
                            name="product"
                            value={addProduct.product}
                            onChange={async (e) => {
                                const value = e.target.value;
                                handleAddChange({ target: { name: "product", value } });
                                try {
                                    const result = await getSingleProductDetails(value);
                                    setProduct(result?.data?.data);
                                } catch (error) {
                                    console.error("Error fetching product details:", error);
                                }
                            }}
                            options={products}
                            placeholder="Select a product"
                        />
                        <InputField
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={addProduct.quantity}
                            onChange={handleAddChange}
                            placeholder="Enter quantity"
                        />
                        <button type="button" onClick={handleAddProduct} className="bg-bg-color text-white px-4 py-2 rounded h-10">Add Product</button>
                    </div>
                    {errors.products && <p className="text-red-500 text-sm mt-2">{errors.products}</p>}
                </div>

                {formData.products.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
                        <h2 className="text-xl font-semibold mb-4">Added Products</h2>
                        <table className='w-full text-sm whitespace-nowrap'>
                            <thead>
                                <tr className='text-left bg-gray-100'>
                                    {headers.map((header, index) => <th key={index} className='p-2 text-center'>{header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {formData.products.map((item, index) => (
                                    <tr key={item._id} className='border-b'>
                                        <td className='p-2 text-center'>{index + 1}</td>
                                        <td className='p-1 flex justify-center'><img src={item?.images?.[0]} alt={item.name} className='w-16 h-16 object-cover rounded' /></td>
                                        <td className='p-2 text-center'>{item?.name}</td>
                                        <td className='p-2 text-center'>{item?.mrp}</td>
                                        <td className='p-2 text-center'>{item?.dp}</td>
                                        <td className='p-2 text-center'>{item?.gst}</td>
                                        <td className='p-2 text-center'>{item?.hsn}</td>
                                        <td className='p-2 text-center'>{item?.quantity}</td>
                                        <td className='p-2 text-center'>{(item?.dp * item?.quantity).toFixed(2)}</td>
                                        <td className="p-2 text-center">
                                            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRemoveProduct(item)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Final Summary</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <SelectComponent label="Sale Type" value={formData.saleType} onChange={(e) => handleChange(e, "saleType")} options={saleTypes} placeholder="Select Sale Type" error={errors.saleType} />
                        <SelectComponent label="Shipping Type" value={formData.shippingType} onChange={(e) => handleChange(e, "shippingType")} options={shippingTypes} placeholder="Select Shipping Type" error={errors.shippingType} />
                        <TextareaField label="Delivery Address" value={formData.deliveryAddress} onChange={(e) => handleChange(e, "deliveryAddress")} error={errors.deliveryAddress} placeholder="Enter delivery address" />
                        <TextareaField label="Remarks" value={formData.remarks} onChange={(e) => handleChange(e, "remarks")} placeholder="Enter remarks (optional)" />
                        <InputField label="Net Amount" value={formData.netAmount.toFixed(2)} disabled />
                        <SelectComponent label="Payment Mode" value={formData.paymentMode} onChange={(e) => handleChange(e, "paymentMode")} options={paymentModes} placeholder="Select Payment Mode" error={errors.paymentMode} />
                    </div>
                    <button type="submit" className="bg-bg-color text-white px-6 py-2 rounded mt-6" onClick={handleSubmit}>Save Order</button>
                </div>
            </div>
        </>
    );
};

export default DistributorSalesForm;
