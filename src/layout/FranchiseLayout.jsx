import React, { useEffect } from 'react'
import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate, Router } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MainContent } from "../constants/mainContent";
import defaultProfile from "../assets/manageMembers/defaultProfile.png";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../Redux/Reducer/authReducer';
import { persistor } from '../Redux/store';
import { Routers } from '../constants/Routes';
import Swal from 'sweetalert2';
import Footer from '../Component/Footer';
import { FaUserGroup } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { MdAccountBalance } from 'react-icons/md';

const FranchiseLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const [openMenu, setOpenMenu] = useState("");

    const navigateToHomePage = () => {
        navigate(Routers.Login);
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#172B33',
            cancelButtonColor: '#F04B4B',
            confirmButtonText: 'Yes, logout!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(logout());
                persistor.purge();
                navigateToHomePage();
            }
        });
    };

    let page = location.pathname.split("/")[1];
    page = page ? page.charAt(0).toUpperCase() + page.slice(1) : "Dashboard";
    page = page.replace(/-/g, " ");
    if (page.includes(" ")) {
        page = page
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const menuItems = [
        { path: Routers.FranchisePanel, label: "Dashboard", icon: <FaHome /> },
        {
            label: "Distributor",
            icon: <FaUserGroup />,
            subRoutes: [
                { path: Routers.FranchiseDistributorSales, label: "Distributor Sale", icon: <CgProfile /> },
                { path: Routers.FranchiseSaleList, label: "Sale List", icon: <CgProfile /> },
                { path: Routers.ApproveDistributorsOrder, label: "Approve Distributors Order", icon: <CgProfile /> },
                // { path: Routers.FranchiseSalesDispatchList, label: "Sales Dispatch", icon: <CgProfile /> },
                { path: Routers.SaleDelivered, label: "Sale Delivery", icon: <CgProfile /> },
            ],
        },

        // sale routes 
        // {
        //     label: "Sale",
        //     icon: <FaUserGroup />,
        //     subRoutes: [
        //         { path: Routers.FranchiseSale, label: "Sale List", icon: <CgProfile /> },
        //         { path: Routers.ApproveFranchiseOrder, label: "Approve Franchine Order", icon: <CgProfile /> },
        //         { path: Routers.FranchiseSalesList, label: "Franchise Sale List", icon: <CgProfile /> },
        //         { path: Routers.FranchiseSaleDispatch, label: "Franchine Sale Dispatch", icon: <CgProfile /> },
        //         { path: Routers.FranchiseSaleDelivery, label: "Franchine Sale Delivery", icon: <CgProfile /> },
        //     ],
        // },
        {
            label: "Stock Details",
            icon: <FaUserGroup />,
            subRoutes: [
                { path: Routers.ProductWiseStock, label: "Product Wise Stock", icon: <CgProfile /> },
                // { path: Routers.ProductSaleReport, label: "Product Sale Report", icon: <CgProfile /> },
                // { path: Routers.StockReport, label: "Stock Report", icon: <CgProfile /> },
                { path: Routers.MyPurchaseReport, label: "My Purchase Report", icon: <CgProfile /> },
                { path: Routers.StockOrderForm, label: "Order Form", icon: <CgProfile /> },
                { path: Routers.OrderReport, label: "Order Report", icon: <CgProfile /> },
            ],
        },
        // {
        //     label: "Ledger",
        //     icon: <FaUserGroup />,
        //     subRoutes: [
        //         { path: '', label: "Fund Request", icon: <CgProfile /> },
        //         { path: '', label: "Wallet Report", icon: <CgProfile /> },
        //     ],
        // },
        {
            label: "My Account",
            icon: <FaUserGroup />,
            subRoutes: [
                // { path: Routers.FranchisePaidPayment, label: "Paid Payment", icon: <CgProfile /> },
                { path: Routers.FranchiseProfile, label: "Profile", icon: <CgProfile /> },
                { path: Routers.FranchiseChangePassword, label: "Chnage Password", icon: <CgProfile /> },
            ],
        },

        { path: Routers.FranchiseWallet, label: "Wallet Balance", icon: <MdAccountBalance /> },
    ];

    const actionButtons = [
        {
            label: "Logout",
            icon: <FaSignOutAlt />,
            bgColor: "bg-[#F04B4B]",
            func: handleLogout,
        },
    ];

    const userInfo = useSelector((state) => state.auth);
      const user = userInfo?.user;
    
      const franchiseName = user?.name || "N/A";
      const buissnessName = user?.buissnessName || "N/A";


    return (
        <div className="flex justify-end md:p-2 gap-4 w-full h-screen bg-bg-color1">
            <div
                className={`absolute md:relative w-[280px] z-50 h-screen md:h-full bg-white md:rounded-xl flex flex-col transition-all duration-300
    ${isSidebarOpen ? "left-0" : "-left-full md:left-0"}
  `}
            >
                <div className="p-4 flex">
                    <div className="w-full h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 relative">
                                <img
                                    src={defaultProfile}
                                    alt="profile"
                                    className="h-full object-cover w-full overflow-hidden rounded-md "
                                />

                            </div>
                            <div className="text-xs">
                                <p className="whitespace-wrap capitalize">{buissnessName}</p>
                                <p className="text-[10px] opacity-50 capitalize">Owner Name :- {franchiseName?.firstName + " " + franchiseName?.middleName + " " + franchiseName?.lastName}</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="text-lg focus:outline-none bg-bg-color text-white rounded-md p-1 ml-5"
                        >
                            <FiChevronsLeft />
                        </button>
                    </div>
                </div>
                <div className="px-4 text-sm">
                    <p className="text-gray-400">MANAGEMENT</p>
                </div>
                <nav className="scrollbar-left flex-1 px-4 overflow-y-auto">
                    <ul className="space-y-2 py-2  ">
                        {menuItems.map(({ path, label, icon, subRoutes }) => {
                            const isActive = location.pathname === path
                            const isOpen = openMenu === label;

                            return (
                                <li key={label}>
                                    <button
                                        onClick={() => {
                                            if (subRoutes) {
                                                setOpenMenu(isOpen ? "" : label);
                                            } else {
                                                navigate(path);
                                                setIsSidebarOpen(false);
                                            }
                                        }}

                                        className={`flex items-center w-full justify-between gap-2 transition-all duration-300 rounded-2xl p-2 group text-xs
          ${isActive ? "bg-bg-color text-white font-medium" : "text-[#454751]/70 hover:bg-bg-color hover:text-white font-light"}
        `}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-lg transition-all duration-300 bg-gray-200 group-hover:bg-white">
                                                <span className={`text-base ${isActive ? "text-[#0f2027]" : "group-hover:text-[#0f2027] text-[#454751]"}`}>
                                                    {icon}
                                                </span>
                                            </div>
                                            <span>{label}</span>
                                        </div>
                                        {subRoutes && (isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />)}
                                    </button>

                                    {subRoutes && isOpen && (
                                        <ul className="mt-1 ml-4 space-y-1 text-xs font-light text-[#555] flex flex-col gap-2">
                                            {subRoutes.map((sub) => (
                                                <Link to={sub.path} onClick={() => setIsSidebarOpen(false)} key={sub.path}>
                                                    <li className={`py-3 px-4 flex items-center  gap-2 rounded-full hover:bg-bg-color hover:text-white ${location.pathname.startsWith(sub.path) ? "bg-bg-color text-white" : ""}`}>
                                                        <span className={`text-base`}>
                                                            {sub.icon}
                                                        </span> {sub.label}
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="px-4 py-2 space-y-1">
                    <p className="text-gray-400 text-sm">OTHERS</p>
                    {actionButtons.map(({ label, icon, bgColor, func }, index) => (
                        <div key={index} className="p-2">
                            <button
                                onClick={func}
                                className="flex w-full items-center text-[#101616] duration-500 transition-all gap-2 text-xs font-medium"
                            >
                                <div className={`p-2 ${bgColor} text-base text-white rounded-lg`}>
                                    {icon}
                                </div>
                                {label}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="p-4 flex justify-between items-center text-center font-medium text-xl">
                    <img
                        src={MainContent.logo1}
                        alt="Bionova Logo"
                        className="w-[200px] h-auto"
                    />
                </div>
            </div>
            <div
                className={`hidden md:block h-full w-28 bg-bg-color absolute top-0 ${isSidebarOpen ? "-left-full" : "left-0"
                    }`}
            >

            </div>
            <div
                className={`flex flex-col w-full h-full duration-200 ${isSidebarOpen ? "w-full" : "md:w-[calc(100%-280px)]"} flex-shrink-0`}
            >
                <main className="overflow-y-auto flex-col gap-5 flex">
                    <header className="flex items-center  justify-between bg-white p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleSidebar}
                                className={`text-lg focus:outline-none bg-bg-color text-white rounded-md p-1 ${!isSidebarOpen ? "hidden" : "block"
                                    }`}
                            >
                                <FiChevronsRight />
                            </button>
                            <button
                                onClick={toggleSidebar}
                                className={`block md:hidden text-lg focus:outline-none bg-bg-color text-white rounded-md p-1 ${isSidebarOpen ? "hidden" : "block"
                                    }`}
                            >
                                <FiChevronsRight />
                            </button>
                            <div className="flex flex-col gap-1">
                                {/* <p className="text-xs opacity-50">Pages</p> */}
                                <p className="text-bg-color md:font-bold text-sm  md:text-lg px-2">{page}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 md:gap-5">
                            <p>Welcome Company !</p>
                        </div>
                    </header>
                    <Outlet />
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default FranchiseLayout;
