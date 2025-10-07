import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainContent } from "../constants/mainContent";
import { Routers } from "../constants/Routes";
import { useSelector } from "react-redux";
import { FaBars, FaCartPlus, FaSearch, FaTimes } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowRoundForward, IoMdHome } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [openSubCategory, setOpenSubCategory] = useState(null);
    const user = useSelector((state) => state.auth);
    const isLoggedIn = user?.token;
    const role = user?.role;

    const handleAuthAction = () => {
        if (isLoggedIn) {
            navigate("/user-dashboard");
        } else {
            navigate(Routers.Login);
        }
    };

    const categories = [
        {
            title: "Men",
            img: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            sub: [
                {
                    name: "Casual wear",
                    items: [
                        "Denim",
                        "Casual Shirts",
                        "T-shirt",
                        "Joggers",
                        "New Collar T-shirt",
                        "Men Capri",
                        "Mens Bermuda",
                        "Half Sleeves Check Shirt",
                        "Men's Cargo Pant",
                        "Men's Denim Shirt",
                        "Denim Check Shirt"
                    ]
                },
                { name: "Ethnic wear" },
                { name: "Formal wear" },
                { name: "Men's Accessories" },
                { name: "Winter Clothing" }
            ]
        },
        {
            title: "Women",
            img: "https://images.unsplash.com/photo-1615233500570-c5d7576b4262?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            sub: [
                {
                    name: "Casual wear",
                    items: ["Women Denim", "Jegging", "Women's T - SHIRT", "Denim Shirt", "Women's Lower"]
                },
                { name: "Ethnic wear" },
                { name: "Formal wear" },
                { name: "Western wear" },
                { name: "Women's Accessories" }
            ]
        },
        {
            title: "Accessories",
            img: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=1482&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            sub: [
                { name: "Bags" },
                { name: "Watches" },
                { name: "Belts" },
                { name: "Sunglasses" }
            ]
        },
        {
            title: "Footwear",
            img: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=1482&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            sub: [
                {
                    name: "Shoes",
                    items: ["Men's Formal Shoes", "Women's Formal Shoes"]
                },

            ]
        },
        {
            title: "Kids",
            img: "https://plus.unsplash.com/premium_photo-1701984401514-a32a73eac549?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            sub: [
                {
                    name: "Bottoms",
                    items: ["Men's Formal Shoes", "Women's Formal Shoes", "Men's Formal Shoes", "Women's Formal Shoes"]
                },
                {
                    name: "Clothes set",
                    items: ["Men's Formal Shoes", "Women's Formal Shoes", "Men's Formal Shoes", "Women's Formal Shoes", "Men's Formal Shoes", "Women's Formal Shoes"]
                },
                {
                    name: "Uppers",
                    items: ["Men's Formal Shoes", "Women's Formal Shoes", "Men's Formal Shoes", "Women's Formal Shoes"]
                },

            ]
        },
    ];

    return (
        <div className="flex justify-between items-center py-2 w-full my-4">
            <div className="flex items-center gap-2">
                <button onClick={() => setSidebarOpen(true)} className="md:hidden block">
                    <FaBars className="text-lg text-gray-800" />
                </button>
                <Link to={"/"}>
                    <img src={MainContent.logo1} alt="logo" className="lg:w-48 md:w-32 w-24" />
                </Link>
            </div>

            <div className="hidden lg:flex items-center gap-2 border border-bg-color rounded-md">
                <input
                    type="text"
                    className="px-4 py-2 min-w-96 border-r outline-none text-xs"
                    placeholder="Search the product"
                />
                <div className="px-2">
                    <FaSearch />
                </div>
            </div>

            <div className="flex items-center md:gap-4 gap-2">
                <Link to={'/cart'}>
                <button className="p-2 rounded-full">
                    <FaCartPlus className="text-lg text-bg-color" />
                </button>
                </Link>
                <button
                    onClick={handleAuthAction}
                    className="text-white md:text-sm text-xs flex items-center gap-3 bg-bg-color px-3  md:px-4 py-2 rounded-md"
                >
                    {isLoggedIn ? (
                        <>
                            Dashboard <IoMdHome className="md:text-2xl  text-lg" />
                        </>
                    ) : (
                        <>
                            Login <IoIosArrowRoundForward className="md:text-2xl  text-lg" />
                        </>
                    )}
                </button>
            </div>

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black bg-opacity-50"
                        onClick={() => setSidebarOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white w-[80%] max-w-xs h-full p-4 overflow-y-auto"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Menu</h2>
                                <button onClick={() => setSidebarOpen(false)} className="text-xl">
                                    <FaTimes />
                                </button>
                            </div>

                            <ul className="space-y-4">
                                {categories.map((cat, index) => (
                                    <li key={index}>
                                        <div
                                            onClick={() => {
                                                setOpenCategory(openCategory === index ? null : index);
                                                setOpenSubCategory(null);
                                            }}
                                            className="font-normal text-gray-800 mb-1 flex justify-between items-center cursor-pointer transition-all duration-300"
                                        >
                                            <span>{cat.title}</span>
                                            <span>{openCategory === index ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                                        </div>

                                        <AnimatePresence>
                                            {openCategory === index && cat.sub && (
                                                <motion.div
                                                    className="pl-3 space-y-2"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {cat.sub.map((subCat, subIndex) => (
                                                        <div key={subIndex}>
                                                            <div
                                                                onClick={() =>
                                                                    setOpenSubCategory(
                                                                        openSubCategory === subIndex ? null : subIndex
                                                                    )
                                                                }
                                                                className="text-gray-700 font-normal cursor-pointer flex justify-between"
                                                            >
                                                                <span className="">{subCat.name}</span>
                                                                {subCat.items && (
                                                                    <span>
                                                                        {openSubCategory === subIndex ? (
                                                                            <IoIosArrowUp />
                                                                        ) : (
                                                                            <IoIosArrowDown />
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <AnimatePresence>
                                                                {subCat.items && openSubCategory === subIndex && (
                                                                    <motion.ul
                                                                        className="pl-4 list-disc text-sm text-gray-600 space-y-2"
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: "auto" }}
                                                                        exit={{ opacity: 0, height: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                    >
                                                                        {subCat.items.map((item, itemIndex) => (
                                                                            <li key={itemIndex}>{item}</li>
                                                                        ))}
                                                                    </motion.ul>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NavBar;
