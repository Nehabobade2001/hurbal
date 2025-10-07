import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
// import banner from '../../assets/slider/.png'

const PopupBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={handleClose}
                    className="fixed top-0 left-0 w-full z-50 h-screen bg-black/50 text-white p-4 shadow-md flex items-center justify-center"
                >
                    <div className="w-auto h-60 relative">
                        <img src={banner} alt=""  className="w-full h-full object-contain"/>
                        <button
                            onClick={handleClose}
                            className="text-white absolute top-2 right-2 text-2xl p-1 bg-red-500 hover:text-gray-300 transition-colors"
                        >
                            <IoClose />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PopupBanner;
