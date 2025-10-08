import React from 'react'
import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { FaAddressCard, FaHome, FaSignOutAlt, FaUser, FaWallet } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MainContent } from "../constants/mainContent";
import defaultProfile from "../assets/manageMembers/defaultProfile.png";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Reducer/authReducer';
import { persistor } from '../Redux/store';
import { Routers } from '../constants/Routes';
import Swal from 'sweetalert2';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GoIssueClosed } from 'react-icons/go';
import Footer from '../Component/Footer';
import { FaUserGroup } from 'react-icons/fa6';
import { CgAdd, CgProfile } from 'react-icons/cg';
import { BiHistory, BiWallet } from 'react-icons/bi';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { MdAccountBalance, MdEmojiEvents } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import { RiExchangeLine, RiUserFill } from 'react-icons/ri';

const Layout = () => {
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

  const userInfo = useSelector((state) => state.auth);
  const fullName = `${userInfo.user.name.firstName || ""} ${userInfo.user.name.middleName || ""} ${userInfo.user.name.lastName || ""}`;


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
    { path: Routers.UserPanel, label: "Dashboard", icon: <FaHome /> },
    {
      label: "My Profile",
      icon: <FaUser />,
      subRoutes: [
        { path: Routers.Profile, label: "Profile", icon: <RiUserFill /> },
        { path: Routers.IdCard, label: "ID Card", icon: <FaAddressCard /> },
        { path: Routers.ResetPassword, label: "Change Password", icon: <RiExchangeLine /> },
      ],
    },
    {
      label: "Downline",
      icon: <FaUserGroup />,
      subRoutes: [
        // { path: Routers.Tree, label: "Tree", icon: <TiGroup /> },
        { path: Routers.Member, label: "My Downline", icon: <TiGroup /> },
        { path: Routers.Downline, label: "Downline Team", icon: <TiGroup /> },
      ],
    },
    // {
    //   label: "Reports",
    //   icon: <FaUserGroup />,
    //   subRoutes: [
    //     { path: Routers.OrderHistory, label: "My Order List", icon: <FaHome /> },
    //     // { path: Routers.News, label: "News", icon: <FaHome /> },
    //   ],
    // },
        {
          label: "Fund Manager", icon: <FaWallet />,
      subRoutes: [
        { path: Routers.AddFund, label: "Add Fund", icon: <CgAdd /> },
        { path: Routers.FundHistory, label: "Fund History", icon: <BiHistory/> },
      ],
    },
    {
      label: "Order Panel", icon: <PiShoppingCartSimpleFill />,
      subRoutes: [
        { path: Routers.order_form, label: "Order Form", icon: <CgAdd /> },
        { path: Routers.OrderHistory, label: "Order List", icon: <BiHistory/> },
        { path: Routers.FranchiseOrderHistory, label: "Franchise Order List", icon: <BiHistory/> },
      ],
    },
    { path: Routers.Epin, label: "Wallet Balance", icon: <MdAccountBalance /> },
    { path: Routers.Events, label: "Events", icon: <MdEmojiEvents /> },
    {
      label: "All Plan",
      icon: <FaUserGroup />,
      subRoutes: [
        { path: Routers.MePage, label: "Instant Benefits", icon: <TiGroup /> },
        { path: Routers.SalaryPlan, label: "Salary Plan", icon: <TiGroup /> },
        { path: Routers.FranchiseeIncome, label: "Franchisee Income", icon: <TiGroup /> },
        // { path: Routers.TravelRewards, label: "Travel Rewards", icon: <TiGroup /> },
        { path: Routers.WalletBalance, label: "Travel Rewards", icon: <TiGroup /> },
      ],
    },
    // { path: Routers.CreateDistributor, label: "Create Distributor", icon: <FaHome /> },
    // { path: Routers.Wallet, label: "Income History", icon: <FaHome /> },
  ];

  const actionButtons = [
    {
      label: "Logout",
      icon: <FaSignOutAlt />,
      bgColor: "bg-[#F04B4B]",
      func: handleLogout,
    },
  ];


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
                  src={userInfo?.user?.picture || defaultProfile}
                  alt="profile"
                  className="h-full object-cover w-full overflow-hidden rounded-md "
                />
                {userInfo?.user?.isActive ? (
                    <div className='w-5 h-5 rounded-full bg-green-500 flex items-center justify-center absolute -top-1 -right-1'>
                      <GoIssueClosed className='text-white text-xs' />
                    </div>
                  ) : (
                    <div className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-1 -right-1'>
                      <AiOutlineCloseCircle className='text-white text-xs' />
                    </div>
                  )}
              </div>
              <div className="text-xs">
                <p className="whitespace-wrap capitalize">{fullName}</p>
                <p className="text-xs opacity-50 capitalize"></p>
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
            className="w-[120px] h-[100px] object-contain"
          />
        </div>
      </div>
      <div className={`hidden md:block h-full w-2 bg-bg-color absolute top-0 ${isSidebarOpen ? "-left-full" : "left-0"
          }`} >

      </div>

      <div className={`flex flex-col w-full h-full duration-200 ${isSidebarOpen ? "w-full" : "md:w-[calc(100%-280px)]"} flex-shrink-0`}>
        <main className="overflow-y-auto flex-col flex gap-5">
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
              <div className="flex flex-col gap-2">
                <p className="text-xs opacity-50">Pages</p>
                <p className="text-bg-color md:font-bold text-sm  md:text-lg px-2">{page}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-5">
              <Link to={Routers.webiste}>
                <button className='px-2 py-2 md:py-2 md:px-4 bg-bg-color text-white text-xs md:text-sm rounded-md'>Continue shopping</button>
              </Link>
            </div>
          </header>
          <div className='px-3 md:p-0'>
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
