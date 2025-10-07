import { useState } from "react";
import React from "react";
import { FaWallet, FaCheckCircle, FaPaperPlane, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import WalletEarningTable from "./WalletEarningTable";

const allTransactions = [
    // { id: 1, description: "Referral From BINARYADDONAAAA", amount: 12.46, date: "22 Oct 2024 22:04:16", balance: 1.12, type: "credit" },
]

const WalletComponent = () => {
    return (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                <Card icon={FaArrowUp} title="Total Earning" amount={allTransactions.length || 0} />
            </div>

            <h1 className="text-black/80 text-base font-medium mb-4">My Earnings</h1>
            <WalletEarningTable  Earnings={allTransactions}/>
        </div>
    );
};

const Card = ({ icon: Icon, title, amount, subtitle }) => (
    <div className="p-4 bg-white/30 border-2 border-white rounded-lg flex gap-2 justify-between items-center">
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-xl font-bold ">₹ {amount}</p>
        </div>
        <div className="p-2 bg-bg-color rounded-lg">
            <Icon className=" text-white " size={24} />
        </div>
    </div>
);

export default WalletComponent;
