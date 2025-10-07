import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Address from "./Address";
import { getProfile, placeOrder, verifyPayment, getCarts, placeOrderWithEPin } from "../api/user.api";
import PageLoader from "../Component/PageLoader";
import QR from '../assets/slider/QR.jpeg'

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState("Razorpay");
    const [isProcessing, setIsProcessing] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { finalTotalAmonut } = location.state || { coupon: null, cartItems: [] };
    const totalAmount = finalTotalAmonut || 0;
    const defaultDeliveryCharge = 70;

    const user = useSelector((state) => state.auth);
    const userDetails = user?.user || {};
    const [selectedAddress, setSelectedAddress] = useState(null);
    const deliveryCharge = paymentMethod === "Pickup" ? 0 : defaultDeliveryCharge;
    const [userBalance, setUserBalance] = useState(0);
    const [appliedBalance, setAppliedBalance] = useState(0);
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [finalTotal, setFinalTotal] = useState(totalAmount + deliveryCharge);
    const [remainingBalance, setRemainingBalance] = useState(0);

    const fetchBalance = async () => {
        try {
            const response = await getProfile();
            const balance = response?.data?.user?.balance || 0;
            setUserBalance(balance);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    useEffect(() => {
        const newFinalTotal = (totalAmount + deliveryCharge) - appliedBalance;
        const newRemainingBalance = userBalance - appliedBalance;
        setFinalTotal(newFinalTotal);
        setRemainingBalance(newRemainingBalance);
    }, [paymentMethod, selectedAddress, totalAmount, deliveryCharge, appliedBalance, userBalance]);

    const handleApplyBalance = () => {
        if (userBalance >= 100) {
            const usableBalance = userBalance - 100;
            const amountToDeduct = Math.min(usableBalance, totalAmount + deliveryCharge);
            setAppliedBalance(amountToDeduct);
            setIsApplied(true);
        } else {
            Swal.fire({
                title: "Insufficient Balance!",
                text: "You must have at least ₹100 to apply balance.",
                icon: "warning",
                confirmButtonColor: "#90479B",
                confirmButtonText: "OK",
            });
        }
    };

    // const handlePayment = async () => {
    //     if (paymentMethod === "Razorpay") {
    //         setIsProcessing(true);
    //         try {
    //             const orderPayload = {
    //                 userId: user?.user?._id,
    //                 paymentMethod,
    //                 address: selectedAddress,
    //             };

    //             const orderData = await placeOrder(orderPayload);

    //             if (orderData?.data?.razorpayOrder?.id) {
    //                 const options = {
    //                     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    //                     amount: orderData?.data?.amount * 100,
    //                     order_id: orderData?.data?.razorpayOrder?.id,
    //                     name: "Orgacure  India",
    //                     description: "Complete your order",
    //                     handler: async function (response) {
    //                         try {
    //                             const paymentData = {
    //                                 razorpay_order_id: response.razorpay_order_id,
    //                                 razorpay_payment_id: response.razorpay_payment_id,
    //                                 razorpay_signature: response.razorpay_signature,
    //                                 userId: user.user._id,
    //                                 address: selectedAddress,
    //                                 paymentMethod
    //                             };
    //                             const verification = await verifyPayment(paymentData);
    //                             if (verification) {
    //                                 Swal.fire("Payment Successful!", "Your order has been placed.", "success");
    //                                 await getCarts(user.user._id);
    //                                 navigate('/');
    //                             }
    //                         } catch (error) {
    //                             console.error("Payment verification error:", error);
    //                             Swal.fire({
    //                                 icon: "error",
    //                                 title: "Payment Verification Failed",
    //                                 text: "There was an error verifying your payment. Please contact support.",
    //                             });
    //                         } finally {
    //                             setIsProcessing(false);
    //                         }
    //                     },
    //                     prefill: {
    //                         name: user?.user?.name || "",
    //                         email: user?.user?.email || "",
    //                     },
    //                     theme: { color: "#3399cc" },
    //                 };

    //                 const razorpay = new window.Razorpay(options);
    //                 razorpay.open();
    //             }
    //         } catch (error) {
    //             console.error("Payment error:", error);
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Payment Failed",
    //                 text: "There was an error processing your payment. Please try again.",
    //             });
    //             setIsProcessing(false);
    //         }
    //     } else if (paymentMethod === "E-Pin") {
    //         setIsProcessing(true);
    //         try {
    //             const orderPayload = {
    //                 userId: user?.user?._id,
    //                 paymentMethod,
    //                 address: selectedAddress,
    //             };
    //             const epinResponse = await placeOrderWithEPin(orderPayload);
                
    //             if (epinResponse?.data?.success) {
    //                 Swal.fire("Order Successful", "Your order has been placed with E-Pin.", "success");
    //                 await getCarts(user.user._id);
    //                 navigate('/');
    //             } else {
    //                 Swal.fire("Error", `${epinResponse.data.message}`, "error");
    //             }
    //         } catch (error) {
    //             console.error("E-Pin payment error:", error);
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Payment Failed",
    //                 text: "There was an error processing your E-Pin payment. Please try again.",
    //             });
    //         } finally {
    //             setIsProcessing(false);
    //         }
    //     } else {
    //         Swal.fire("Error", "Unsupported payment method.", "error");
    //     }
    // };

    const handlePayment = async () => {
    if (paymentMethod === "QR") {
        // Direct order placement after QR scan
        setIsProcessing(true);
        try {
            const orderPayload = {
                userId: user?.user?._id,
                paymentMethod: "UPI-QR",
                address: selectedAddress,
            };

            const orderResponse = await placeOrder(orderPayload);

            if (orderResponse?.data?.success) {
                Swal.fire(
                    "Order Placed!",
                    "Please complete payment by scanning the QR code.",
                    "success"
                );
                await getCarts(user.user._id);
                navigate('/');
            } else {
                Swal.fire("Error", "Could not place order. Try again.", "error");
            }
        } catch (error) {
            console.error("Order error:", error);
            Swal.fire("Error", "Something went wrong. Try again.", "error");
        } finally {
            setIsProcessing(false);
        }
    } 
    else if (paymentMethod === "E-Pin") {
        // Keep your existing E-Pin code here
    }
};




    if (loading) return <PageLoader />;

    const myBalance = userDetails?.wallets?.purchaseWallet;

    return (
        <div className="flex flex-col justify-center lg:flex-row gap-6 lg:gap-10 pt-32 pb-20 p-5">
            {/* <div className="w-full lg:w-2/3 border bg-white p-6 rounded-lg">
                <Address selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
            </div> */}

            <div className="w-full lg:w-1/3 border h-fit bg-white p-6 rounded-lg lg:sticky lg:top-5">
                <h2 className="text-lg font-bold mb-4">Your Order</h2>

                <div className="py-4 border-b">
                    <div className="flex justify-between">
                        <span>My Balance</span>
                        <span>₹{myBalance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                {/* <div className="mt-4 flex flex-col gap-2">
                    {["Razorpay", "E-Pin"].map(method => (
                        <label key={method} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === method}
                                onChange={() => setPaymentMethod(method)}
                            />
                            {method === "Razorpay" ? "Online" : method}
                        </label>
                    ))}
                </div> */}

                {/* <div className="mt-4 flex flex-col gap-2">
  {["E-Pin"].map(method => (
    <label key={method} className="flex items-center gap-2">
      <input
        type="radio"
        name="payment"
        checked={paymentMethod === method}
        onChange={() => setPaymentMethod(method)}
      />
      {method}
    </label>
  ))}
</div> */}


<div className="mt-4 flex flex-col gap-2">
  {["QR"].map(method => (
    <label key={method} className="flex items-center gap-2">
      <input
        type="radio"
        name="payment"
        checked={paymentMethod === method}
        onChange={() => setPaymentMethod(method)}
      />
      {method === "QR" ? "Pay via UPI QR" : method}
    </label>
  ))}
</div>

{/* Show QR Code if selected */}
{paymentMethod === "QR" && (
  <div className="mt-4 flex justify-center">
    <img
      src={QR} // Put your QR code image in /public folder
      alt="E-Pin QR Code"
      className="w-64 h-64 object-contain border rounded-lg"
    />
  </div>
)}







                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full mt-4 px-5 py-2 btn-primary text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessing ? "Processing..." : "Place Order"}
                </button>
            </div>

            {isProcessing && <PageLoader />}
        </div>
    );
};

export default Checkout;
