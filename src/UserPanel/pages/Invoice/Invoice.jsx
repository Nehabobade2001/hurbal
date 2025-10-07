import React from 'react';
import { sampleInvoice as invoiceData } from './sampleInvoice'
import { MainContent } from '../../../constants/mainContent';

const Invoice = () => {
    const {
        invoiceNo,
        orderNo,
        date,
        billTo,
        careOf,
        items,
        totalAmount,
        discount,
        afterDiscount,
        gst,
        shipping,
        sponsorBonus,
        grandTotal,
    } = invoiceData;

    return (
        <div className="md:p-6 p-3 font-sans text-gray-800 bg-white rounded-lg">
            <div className="grid md:grid-cols-2 gap-5  border-b pb-4">
                <div className='flex items-center justify-start'>
                    <img src={MainContent.logo1} className='h-20' alt="" />
                </div>
                <div className='flex md:items-end md:justify-end flex-col'>
                    <h4 className="font-bold">AETHERIC DYNAMIC MKT PRIVATE LIMITED</h4>
                    <p className="text-sm">B402/2, Ganga Nagar, Dewas Naka, Indore</p>
                    <p className="text-sm">Lasudiya Mori, Indore, India - 452010</p>
                    <p className="text-sm">(+91) 896 496 9960 | info@admpvt.com | www.admfashion.com</p>
                    <p className="text-sm">GSTIN : 23ABBCA1033C1ZO | PAN : ABBCA1033C</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 text-sm">
                <div>
                    <h4 className="font-bold">INVOICE TO</h4>
                    <p>Name: {billTo.name}</p>
                    <p>ECID: {billTo.ecid}</p>
                    <p>Email: {billTo.email}</p>
                    <p>Mobile: {billTo.mobile}</p>
                    <p>PAN: {billTo.pan}</p>
                </div>
                <div>
                    <h4 className="font-bold">CARE OF</h4>
                    <p>Name: {careOf.name}</p>
                    <p>Mobile: {careOf.mobile}</p>
                    <p>Address: {careOf.address}</p>
                    <p>City: {careOf.city}</p>
                    <p>State: {careOf.state}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm">INVOICE : <span className="font-semibold">{invoiceNo}</span></p>
                    <p className="text-sm">ORD : <span className="font-semibold">{orderNo}</span></p>
                    <p className="text-sm">Date: {date}</p>
                </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
                <table className="w-full text-xs border border-collapse mt-4 whitespace-nowrap ">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border p-2">#</th>
                            <th className="border p-2">Particular</th>
                            <th className="border p-2">HSN</th>
                            <th className="border p-2">Size</th>
                            <th className="border p-2">Color</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Qty</th>
                            <th className="border p-2">Discount (%)</th>
                            <th className="border p-2">After Discount</th>
                            <th className="border p-2">GST</th>
                            <th className="border p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => (
                            <tr key={i}>
                                <td className="border p-2">{i + 1}</td>
                                <td className="border p-2">
                                    <div className='flex items-center gap-1'>
                                        <img src="https://itc.admpvt.com/assets/202424131043f.jpeg" className='h-8' alt="" />
                                        {item.name}
                                    </div>
                                </td>
                                <td className="border p-2">{item.hsn}</td>
                                <td className="border p-2">{item.size}</td>
                                <td className="border p-2">{item.color}</td>
                                <td className="border p-2">₹{item.price}</td>
                                <td className="border p-2">{item.qty}</td>
                                <td className="border p-2">{item.discount}%</td>
                                <td className="border p-2">₹{item.afterDiscount}</td>
                                <td className="border p-2">{item.gst}%</td>
                                <td className="border p-2">₹{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="text-sm text-right mt-6 space-y-2">
                <p className='border-b pb-2'>Total Amount : ₹{totalAmount}</p>
                <p className='border-b pb-2'>Discount(s) : ₹{discount}</p>
                <p className='border-b pb-2'>After Discount : ₹{afterDiscount}</p>
                <p className='border-b pb-2'>GST : ₹{gst}</p>
                <p className='border-b pb-2'>Shipping : ₹{shipping}</p>
                <p className='border-b pb-2'>Sponsor Bonus : ₹{sponsorBonus}</p>
                <p className="border-b pb-2 font-bold">Grand Total : ₹{grandTotal}</p>
            </div>

            <p className="mt-6 text-xs">Thank you!</p>
        </div>
    );
};

export default Invoice;
