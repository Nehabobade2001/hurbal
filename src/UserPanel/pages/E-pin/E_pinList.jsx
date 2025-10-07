import { useEffect, useState } from "react";
import { getEpinBalance } from "../../../api/user.api";
import PageLoader from "../../../Component/PageLoader";

const E_pinList = () => {
    const [epins, setEpins] = useState(null);
    const [activeAmount, setActiveAmount] = useState(0)
    const [pendingAmount, setPendingAmount] = useState(0)
    const [rejectAmount, setRejectAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    const fetchEpinBalance = async () => {
        try {
            setLoading(true);
            const response = await getEpinBalance();
            const data = response?.data;
            
            setEpins(data?.transactions);
            setActiveAmount(data?.totalCompletedAmount)
            setPendingAmount(data?.totalRequestedAmount)
            setRejectAmount(data?.totalRejectedAmount)
        } catch (error) {
            console.error("Error fetching Epin Balance:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEpinBalance();
    }, []);

    return (
        <div className='flex flex-col gap-5'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { title: "Active Wallet Balance", value: activeAmount || 0, icon: "✅" },
                    { title: "Pending Wallet Request", value: pendingAmount || 0, icon: "💵" },
                    { title: "Reject Wallet Request", value: rejectAmount || 0, icon: "💵" }
                ]
                    .map((card, index) => (
                        <div key={index} className="bg-white/30 border-2 border-white p-4 rounded-lg flex gap-2 justify-between items-center">
                            <div>
                                <p className="text-gray-500 text-sm">{card.title}</p>
                                <p className="text-xl font-bold ">₹ {card.value}</p>
                            </div>
                            <div className="p-1 bg-bg-color rounded-lg">
                                <span className="text-2xl">{card.icon}</span>
                            </div>
                        </div>
                    ))}
            </div>
            <h2 className="text-base font-medium text-black/80 ">Fund History</h2>
            <div className="bg-white p-3 rounded-lg text-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr>
                                <th className="p-2 whitespace-nowrap">#</th>
                                <th className="p-2 whitespace-nowrap">Payment Proof</th>
                                <th className="p-2 whitespace-nowrap">Transaction ID</th>
                                <th className="p-2 whitespace-nowrap">Balance Amount</th>
                                <th className="p-2 whitespace-nowrap">Status</th>
                                <th className="p-2 whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {epins?.map((item, index) => (
                                <tr key={item.id} className="border-b">
                                    <td className="p-2 py-3 whitespace-nowrap">{index + 1}</td>
                                    <td className="p-2 py-3 whitespace-nowrap">
                                        {/* <div className="w-10 h-10 rounded-md border overflow-hidden">
                                            <img src={item.paymentProof || "https://pbs.twimg.com/media/EVAj6MHVAAAaMmw.jpg:large"} className="w-full h-full object-contain" alt="" />
                                        </div> */}
                                    </td>
                                    <td className="p-2 py-3 whitespace-nowrap">{item.TransactionId}</td>
                                    <td className="p-2 py-3 whitespace-nowrap">₹ {item.amount}</td>
                                    <td
                                        className={`p-2 py-3 whitespace-nowrap font-semibold ${item.status === "Requested"
                                            ? "text-yellow-500"
                                            : item.status === "Rejected"
                                                ? "text-red-500"
                                                : item.status === "Completed"
                                                    ? "text-green-500"
                                                    : "text-gray-500"
                                            }`}
                                    >
                                        {item.status}
                                    </td>
                                    <td className="p-2 py-3 whitespace-nowrap">{new Date(item?.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                loading && (
                    <div>
                        <PageLoader />
                    </div>
                )
            }
        </div>
    );
};

export default E_pinList;
