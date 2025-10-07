import React, { useEffect, useState } from 'react';
import { MainContent } from '../../constants/mainContent';
import { getDeliveredOrder, getFranchiseProfile } from '../../api/franchise.api';
import { useParams } from 'react-router-dom';
import BackButton from '../../Component/BackButton';

const Invoice = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [franchiseData, setFranchiseData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [orderResponse, franchiseResponse] = await Promise.all([
                    getDeliveredOrder(),
                    getFranchiseProfile()
                ]);
                const order = orderResponse?.orders?.find(order => order._id === id);
                setOrderData(order);
                setFranchiseData(franchiseResponse?.data.data);
                // console.log(franchiseData.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="p-4 text-center">
                <p>Loading invoice data...</p>
            </div>
        );
    }

    if (!orderData || !franchiseData) {
        return (
            <div className="p-4 text-center">
                <p>No invoice data found for this order.</p>
            </div>
        );
    }

    const invoiceData = {
        company: {
            name: franchiseData?.buissnessName || "N/A",
            address: `${franchiseData?.address || ""}, ${franchiseData?.city || ""}, ${franchiseData?.state || ""} - ${franchiseData?.pinCode || ""}`,
            mobile: franchiseData?.mobile?.primary || "N/A",
            gst: franchiseData?.gstNumber || "N/A",
            logo: MainContent.logo1,
        },
        buyer: {
            id: orderData.userId?.userId || "N/A",
            name: `${orderData.userId?.name?.firstName || ""} ${orderData.userId?.name?.middleName || ""} ${orderData.userId?.name?.lastName || ""}`.trim(),
            city: `${orderData.userId?.city || ""}, ${orderData.userId?.state || ""}`,
            pin: orderData.userId?.pincode || "N/A",
            mobile: orderData.userId?.mobileNo || "N/A",
        },
        invoice: {
            number: orderData._id,
            date: new Date(orderData.createdAt).toLocaleDateString(),
            deliveryDate: new Date(orderData.updatedAt).toLocaleDateString(),
            terms: "Terms Of Delivery",
        },
        items: orderData.items.map((item, index) => ({
            sno: index + 1,
            code: item.product._id,
            description: item.product.name,
            hsn: "3101",
            qty: item.quantity,
            rate: item.product.dp,
            unit: item.product.mrp,
            bvPv: item.productPV,
            amount: item.subtotal,
            gst: (item.subtotal * item.product.gst) / 100,
            total: item.subtotal + ((item.subtotal * item.product.gst) / 100),
        })),
        totals: {
            amount: orderData.amount,
            gst: orderData.gstAmount,
            total: orderData.totalAmount,
            wallet: 0,
            courier: 0,
            net: orderData.totalAmount,
            bvPv: orderData.orderTotals?.totalPV || 0,
        },
    };

    return (
        <div className="p-3 rounded-lg text-sm bg-white text-black w-full max-w-screen-lg mx-auto">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <img src={invoiceData.company.logo} alt="Logo" className="h-16 object-contain" />
                <div className="text-right text-sm">
                    <h2 className="font-bold text-lg">{invoiceData.company.name}</h2>
                    <p>{invoiceData.company.address}</p>
                    <p>Mobile: {invoiceData.company.mobile}</p>
                    <p>GST No.: {invoiceData.company.gst}</p>
                </div>
            </div>

            {/* Title */}
            <div className='border-b border-t p-1 my-2'>
                <h2 className="text-base text-center font-medium">Tax INVOICE</h2>
            </div>

            {/* Buyer & Invoice Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-xs sm:text-sm">
                <div>
                    <h3 className="font-bold mb-1">Buyer :</h3>
                    <p>ID: {invoiceData.buyer.id} / {invoiceData.buyer.name}</p>
                    <p>{invoiceData.buyer.city}</p>
                    <p>PIN: {invoiceData.buyer.pin}</p>
                    <p>Mobile: {invoiceData.buyer.mobile}</p>
                </div>
                <div>
                    <p><strong>Invoice No.</strong>: {invoiceData.invoice.number}</p>
                    <p><strong>Dated</strong>: {invoiceData.invoice.date}</p>
                    <p><strong>Delivery Date</strong>: {invoiceData.invoice.deliveryDate}</p>
                    <p><strong>Terms</strong>: {invoiceData.invoice.terms}</p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border text-xs sm:text-sm mb-4 min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-200">
                            {["S No", "Product Code", "Description", "HSN/SAC", "Quantity", "Rate", "Unit", "BV/PV", "Amount", "GST Amount", "Total"].map((h, idx) => (
                                <th key={idx} className="border p-1">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.items.map((item, idx) => (
                            <tr key={idx} className="text-center">
                                <td className="border p-1">{item.sno}</td>
                                <td className="border p-1">{item.code}</td>
                                <td className="border p-1">{item.description}</td>
                                <td className="border p-1">{item.hsn}</td>
                                <td className="border p-1">{item.qty}</td>
                                <td className="border p-1">{item.rate}</td>
                                <td className="border p-1">{item.unit}</td>
                                <td className="border p-1">{item.bvPv}</td>
                                <td className="border p-1">{item.amount.toFixed(2)}</td>
                                <td className="border p-1">{item.gst.toFixed(2)}</td>
                                <td className="border p-1">{item.total.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr className="font-semibold bg-gray-100 text-center">
                            <td colSpan="8" className="border p-1">Total</td>
                            <td className="border p-1">{invoiceData.totals.amount.toFixed(2)}</td>
                            <td className="border p-1">{invoiceData.totals.gst.toFixed(2)}</td>
                            <td className="border p-1">{invoiceData.totals.total.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                    <p><strong>Amount Chargeable (In Words):</strong></p>
                    <p className="italic">Rupees {numberToWords(invoiceData.totals.total)} Only</p>
                    <p className="mt-2"><strong>Buyer's GST No:</strong></p>
                    <p className="text-[11px] mt-2 leading-snug">
                        <strong>Declaration:</strong><br />
                        We declare that invoice shows the actual price of the goods.<br />
                        SUBJECT TO GUNA JURISDICTION.<br />
                        This is a computer generated invoice.
                    </p>
                </div>
                <div className="text-right flex flex-col gap-1">
                    <p>Wallet Used: ₹{orderData.paymentMethod === "Wallet" ? invoiceData.totals.net.toFixed(2) : "0.00"}</p>
                    {/* <p>Courier Charge: ₹{invoiceData.totals.courier.toFixed(2)}</p> */}
                    <p className="text-base font-bold">Net Amount: ₹{invoiceData.totals.net.toFixed(2)}</p>
                    <div className="mt-8">
                        <p className="text-sm">For <strong>{invoiceData.company.name}</strong></p>
                        <p className="mt-8 font-semibold">Authorised Signatory</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function to convert number to words
function numberToWords(num) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    if (num === 0) return 'Zero';

    function convert(n) {
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
        if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convert(n % 100) : '');
        if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convert(n % 1000) : '');
        if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + convert(n % 100000) : '');
        return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + convert(n % 10000000) : '');
    }

    return convert(Math.floor(num));
}

export default Invoice;
