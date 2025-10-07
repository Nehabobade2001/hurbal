import React, { useEffect, useState } from 'react';
import InputField from '../../Component/InputField';
import SelectComponent from '../../Component/SelectComponent';
import Button from '../../Component/Button';
import RadioInput from "../../Component/RadioInput";
import TextareaField from "../../Component/TextareaField";
import TableComponent1 from "../../Component/TableComponent1";
import Swal from 'sweetalert2';
import { findUserDetails, createDistributorSaleData } from '../../api/franchise.api';
import { getAllCategories, getProductByCategory, getSingleProductDetails } from '../../api/user.api';
import notfoundImg from "../../assets/images/notfound.jpg";
import PageLoader from '../../Component/PageLoader';



const generateTransactionId = () => {
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);
    return `TXN${randomNum}`;
};

const DistributorSalesForm = () => {

    const [paymentModes, setPaymentModes] = useState([
        { value: "Wallet", label: "Wallet" },
        { value: "Cash", label: "Cash" },
        { value: "UPI", label: "UPI" },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null); // 'SP' or 'PV'
    const [showForm, setShowForm] = useState(false);
    const [distributorId, setDistributorId] = useState("");
    const [distributorFound, setDistributorFound] = useState(false);
    // const [data,setData] = useState({})
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [formdata, setFormdata] = useState([])
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getAllCategories();
                const formatted = result.data.map((cat) => ({
                    label: cat.name,
                    value: cat._id,
                }));
                setCategories(formatted);
                console.log(formatted);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCardClick = () => {
        if (!showForm) {
            setShowModal(true);
        }
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setShowModal(false);
        setShowForm(true);
    };

    const [formData, setFormData] = useState({
        orderDate: new Date().toISOString().split('T')[0], // Default to today's date
        transactionId: generateTransactionId(),
        distributorId: "",
        distributorName: "",
        sponsorId: "",
        sponsorName: "",
        walletBalance: "",
        address: "",
        saleType: "",
        franchise: "",
        groupType: "",
        products: [],
        shippingType: "",
        quantity: "",
        walletDiscount: "",
        courierCharges: "",
        netAmount: "",
        deliveryAddress: "",
        paymentMode: "",
        remarks: "",
    });

    const [errors, setErrors] = useState({});

    const handleDistributorSearch = async () => {
        if (!distributorId) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill Distributor ID field before submitting.",
            });
            return;
        }

        if (searchLoading) return; // Prevent multiple calls

        try {
            setSearchLoading(true);
            const result = await findUserDetails({ distributorId });

            if (result.success) {
                setFormData((prev) => ({
                    ...prev,
                    distributorId: result.data._id,
                    distributorName: result.data.distributorName,
                    sponsorId: result.data.sponsorId,
                    sponsorName: result.data.sponsorName,
                    walletBalance: result.data.walletBalance,
                    address: result.data.address,
                }));

                setDistributorFound(true);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.message,
            });
        } finally {
            setSearchLoading(false);
        }
    };



    const handleChange = (e, field) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Placeholder for validation logic
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    // const filteredProduct = [
    //     {
    //         productCode: "148",
    //         productName: "A To Z",
    //         hsn: "2006",
    //         mrp: 800,
    //         discount: 0,
    //         rate: 761.904,
    //         quantity: 10,
    //         bvPerItem: 360,
    //         amount: 7619.04,
    //         cgstRate: 2.5,
    //         cgstAmount: 190.48,
    
    //         sgstRate: 2.5,
    //         sgstAmount: 190.48,
    //         totalBv: 3600,
    //         netAmount: 8000,
    //     },
    // ];

    // const serialNumberTemplate = (_, { rowIndex }) => rowIndex + 1;
    // const actionBodyTemplate = () => (
    //     <button className="text-red-600 font-semibold hover:underline">Delete</button>
    // );
    // const title = "Added Product Overview";

    const headers = [
        "S.No",
        "Image",
        "Product Name",
        "MRP",
        "DP",
        "GST",
        "HSN",
        "Qty",
        "Net Amt",
        "Action"
    ]

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddProduct((prev) => ({ ...prev, [name]: value }));
    };

    const [product, setProduct] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [addProduct, setAddProduct] = useState({
        group: '',
        product: '',
        quantity: ''
    });

    const handleAddProduct = () => {
        if (!addProduct.group || !addProduct.product || !addProduct.quantity) {
            alert('Please fill all product fields');
            return;
        }

        if (isNaN(addProduct.quantity) || addProduct.quantity <= 0 || addProduct.quantity > product?.stock) {
            alert('Invalid quantity');
            return;
        }

        const productToAdd = {
            ...product,
            group: addProduct.group,
            quantity: Number(addProduct.quantity),
        };

        // ✅ Check for duplicate
        const alreadyInCart = formData.products.find(p => p._id === productToAdd._id);
        if (alreadyInCart) {
            alert("Product already in the cart.");
            return;
        }

        const updatedProducts = [...formData.products, productToAdd];
        const subtotal = productToAdd.dp * productToAdd.quantity;

        setFormData((prev) => ({
            ...prev,
            products: updatedProducts,
            netAmount: Number(prev.netAmount) + subtotal,
        }));

        // ✅ Log updated cart correctly
        setCartProducts((prev) => {
            const updated = [...prev, productToAdd];
            console.log("Updated cartProducts:", updated);
            return updated;
        });

        // ✅ Reset product selection fields
        setAddProduct({ group: '', product: '', quantity: '' });
        setProducts([]);
        setProduct(null);
    };



    const handleSubmit = async () => {
        if (loading) return; // Prevent multiple submissions

        try {
            setLoading(true);

            // Validate required fields
            if (!formData.distributorId || !formData.products.length || !formData.paymentMode) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Fields",
                    text: "Please fill all required fields and add at least one product.",
                });
                setLoading(false);
                return;
            }

            // Only perform wallet validation if payment mode is Wallet
            if (formData.paymentMode === "Wallet") {
                const walletBalance = Number(formData.walletBalance);
                const netAmount = Number(formData.netAmount);

                if (isNaN(walletBalance) || walletBalance <= 0) {
                    Swal.fire({
                        icon: "warning",
                        title: "Invalid Wallet Balance",
                        text: "Your wallet balance is zero or negative. Please recharge your wallet to continue.",
                    });
                    setLoading(false);
                    return;
                }

                if (walletBalance < netAmount) {
                    Swal.fire({
                        icon: "warning",
                        title: "Insufficient Wallet Balance",
                        text: `Your wallet balance (₹${walletBalance}) is insufficient for the order amount (₹${netAmount}).`,
                    });
                    setLoading(false);
                    return;
                }
            }
            
            const response = await createDistributorSaleData(formData);
            if (response.success) {
                Swal.fire({
                    title: 'Success',
                    text: response?.message || 'Order submitted successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: response?.message || 'Order submission failed!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            Swal.fire({
                title: 'Error',
                text: error?.response?.data?.message || 'Failed to submit order',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
            // Reset form after submission
            setFormData({
                date: new Date().toISOString().split('T')[0],
                transactionId: generateTransactionId(),
                fromFranchise: '',
                address: '',
                walletAmount: '',
                netAmount: '',
                products: [],
                remarks: '',
                distributorId: "",
                distributorName: "",
                sponsorId: "",
                sponsorName: "",
                paymentMode: "",
            });
            setAddProduct({
                group: '',
                product: '',
                quantity: ''
            });
            setCartProducts([]);
            setProducts([]);
            setProduct(null);
        }
    };




    return (
        <>
            {loading && <PageLoader />}
            <div className="p-4">
            {/* Clickable Card */}
            <div onClick={handleCardClick} className="cursor-pointer">
                {showForm && (
                    <div className="">
                        <div className="bg-white p-6 rounded shadow mb-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputField label="Order Date" type="date" value={formData.orderDate} onChange={(e) => handleChange(e, "orderDate")} error={errors.orderDate} />
                                <InputField label="Transaction ID" value={formData.transactionId} onChange={(e) => handleChange(e, "transactionId")} error={errors.transactionId} />
                                {/* <InputField label="Distributor ID" value={formData.distributorId} onChange={(e) => handleChange(e, "distributorId")} error={errors.distributorId} /> */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium text-gray-700">User ID</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={distributorId}
                                            onChange={(e) => setDistributorId(e.target.value)}
                                            className="p-2 border rounded-md w-full"
                                            placeholder="Enter User ID"
                                            disabled={searchLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleDistributorSearch}
                                            className={`bg-blue-600 text-white px-4 rounded-md ${
                                                searchLoading ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                            disabled={searchLoading}
                                        >
                                            {searchLoading ? 'Searching...' : 'Search'}
                                        </button>
                                    </div>
                                    {errors.distributorId && (
                                        <span className="text-red-500 text-sm">{errors.distributorId}</span>
                                    )}
                                </div>

                                <InputField label="Distributor Name" value={formData.distributorName} onChange={(e) => handleChange(e, "distributorName")} error={errors.distributorName} disabled={!distributorFound} />
                                <InputField label="Sponsor ID" value={formData.sponsorId} onChange={(e) => handleChange(e, "sponsorId")} error={errors.sponsorId} disabled={!distributorFound} />
                                <InputField label="Sponsor Name" value={formData.sponsorName} onChange={(e) => handleChange(e, "sponsorName")} error={errors.sponsorName} disabled={!distributorFound} />
                                <InputField label="Wallet Balance" value={formData.walletBalance} onChange={(e) => handleChange(e, "walletBalance")} error={errors.walletBalance} disabled={!distributorFound} />
                                <InputField label="Address" value={formData.address} onChange={(e) => handleChange(e, "address")} error={errors.address} disabled={!distributorFound} />
                                <div className="flex gap-10 text-black">
                                    <label className="flex items-center gap-2 cursor-not-allowed  opacity-70">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="SP"
                                            checked={selectedType === 'SP'}
                                            disabled
                                            className="pointer-events-none text-black"
                                        />
                                        SP sale
                                    </label>
                                    <label className="flex items-center gap-2 cursor-not-allowed opacity-70">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="PV"
                                            checked={selectedType === 'PV'}
                                            disabled
                                            className="pointer-events-none"
                                        />
                                        PV sale
                                    </label>
                                </div>
                            </div>
                        </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-10">
                                <SelectComponent
                                    label="Group Type"
                                    value={addProduct.group}
                                    onChange={async (e) => {
                                        const value = e.target.value;
                                        handleAddChange({ target: { name: "group", value } });
                                        try {
                                            const result = await getProductByCategory(value);
                                        const formatted = result?.data?.products?.map((product) => ({
                                            label: product.name,
                                            value: product._id,
                                        }));
                                        setProducts(formatted);
                                        } catch (error) {
                                            console.error("Error fetching products:", error);
                                        }
                                    }}
                                    options={categories}
                                    placeholder="Select a group type"
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
                                            console.error("Error fetching products:", error);
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
                                    placeholder="Quantity"
                                    className="border p-2 rounded w-full"
                                />

                                <button
                                    type="button"
                                    onClick={handleAddProduct}
                                    className="bg-bg-color text-white px-4 py-2 rounded mt-6"
                                >
                                    Add Product
                                </button>
                        </div>

                            {formData.products.length > 0 && (
                                <div className="rounded-xl overflow-hidden space-y-5 my-5">
                                    <table className='w-full text-sm whitespace-nowrap'>
                                        <thead>
                                            <tr className=' text-left'>
                                                {headers.map((header, index) => (
                                                    <th key={index} className='p-2 border border-white/30 text-center'>{header}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartProducts?.length === 0 ? (
                                                <tr>
                                                    <td colSpan="100%" className="text-center">
                                                        <img src={notfoundImg} alt="Not found" className="w-60 h-60 mx-auto mt-4" />
                                                    </td>
                                                </tr>
                                            ) : (
                                                cartProducts?.map((item, index) => {
                                                    return (
                                                        <tr key={index} className='border-b border-white/30 py-1'>
                                                            <td className=' text-base text-center'>{index + 1}</td>
                                                            <td className='w-full p-1 flex items-center justify-center'><img src={item?.images?.[0]} alt="" className='w-20 h-20 object-cover' /></td>
                                                            <td className=' text-base text-center'>{item?.name}</td>
                                                            <td className=' text-base text-center'>{item?.mrp}</td>
                                                            <td className=' text-base text-center'>{item?.dp}</td>
                                                            <td className=' text-base text-center'>{item?.gst}</td>
                                                            <td className=' text-base text-center'>{item?.hsn}</td>
                                                            <td className=' text-base text-center'>{item?.quantity}</td>
                                                            <td className=' text-base text-center'>{(item?.dp * item?.quantity)}</td>
                                                            <td>
                                                                <button
                                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                                    onClick={() => {
                                                                        const updatedProducts = formData.products.filter(p => p._id !== item._id);
                                                                        const subtotal = item.dp * item.quantity;

                                                                        setFormData((prev) => ({
                                                                            ...prev,
                                                                            products: updatedProducts,
                                                                            netAmount: Number(prev.netAmount) - subtotal,
                                                                        }));

                                                                        setCartProducts((prev) => prev.filter(p => p._id !== item._id));
                                                                    }}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )}
                                        </tbody>

                                    </table>
                            </div>
                        )}


                        <div className="bg-white p-6 rounded shadow mb-6">
                            <h2 className="text-2xl font-bold mb-4">Final Summary</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                    {/* <InputField label="Wallet Discount" value={formData.walletDiscount} onChange={(e) => handleChange(e, "walletDiscount")} error={errors.walletDiscount} /> */}
                                <InputField label="Net Amount" value={formData.netAmount} onChange={(e) => handleChange(e, "netAmount")} error={errors.netAmount} disabled/>
                                <SelectComponent
                                    label="Payment Mode"
                                    value={formData.paymentMode}
                                    onChange={(e) => handleChange(e,"paymentMode")}
                                    options={paymentModes}
                                    error={errors.product}
                                    placeholder="Select a product"
                                
                                    />
                                </div>
                            <button
                                type="submit"
                                className={`bg-bg-color text-white px-4 py-2 rounded mt-6 ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </button>

                        </div>
                    </div>
                )}

                {/* Click prompt before form shown */}
                {!showForm && (
                    <div className="p-6 bg-white rounded-xl shadow text-xl font-semibold text-gray-700  hover:bg-[rgb(90,122,133)] text-center">
                        Distributor Sales (Click to Continue)
                    </div>
                )}
            </div>

            {/* Modal for SP/PV Selection */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80 h-40">
                        <h2 className="text-lg font-bold mb-4">Select Sales Type</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => handleTypeSelect('SP')}
                                className="px-9 py-3  bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                SP
                            </button>
                            <button
                                onClick={() => handleTypeSelect('PV')}
                                className="px-9 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                PV
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>

    );
};

export default DistributorSalesForm;
