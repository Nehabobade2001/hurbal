import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLinkedinIn,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
    FaCcAmex,
    FaCcDiscover,
    FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#1F934A] text-white text-sm py-10 flex flex-col gap-4 px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div>
                    <h3 className="font-semibold mb-2">Head Office</h3>
                    <p className="font-light">
                       Herbal India,<br />
                        H. No.04 Chamapk Nagar ,<br />
                        Bhetapara , Near Bharat Pet,<br />
                        Beltola, GMC Kamrup,<br />
                        Pincode - 781028 , ASSAM INDIA<br />
                        CIN:U14101AS2024PTC026780<br />
                        GSTIN:23ABBCA1033C1ZO<br />
                        Mobile: +91-89649 69960<br />
                        Phone No: +91-8959711143<br />
                        {/* Toll Free: 1800-572-3406<br /> */}
                        {/* Email: care@InternaciaIndia.com */}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Corporate Info</h3>
                    <ul className="space-y-1 font-light">
                        <li>Our Brand</li>
                        <li>Transparency</li>
                        <li>Incentive Plan</li>
                        <li>Rewards</li>
                        <li>Compliance Documents</li>
                        <li>Benefits of working with Internacia</li>
                        <li>About Us</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 font-light">
                        <li>FAQ</li>
                        <li>Mission, Vision & Values</li>
                        <li>Contact Us</li>
                        <li>Events</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Company Policy</h3>
                    <ul className="space-y-1 font-light">
                        <li>Business Plan</li>
                        <li>Return Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Promotion of Distributor</li>
                        <li>Code of Conduct</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Follow us on</h3>
                    <div className="flex gap-2 text-xl mb-4">
                        {/* <FaFacebookF className="text-blue-500" /> */}
                        <Link to={'https://www.instagram.com/aetheric_dynamics?igsh=ZDA5dmlxbnk2Ymlm'}>
                            <FaInstagram className="text-pink-500" />
                        </Link >
                        {/* <FaYoutube className="text-red-600" />
                        <FaTwitter className="text-blue-400" />
                        <FaLinkedinIn className="text-blue-700" /> */}
                    </div>

                    <h3 className="font-semibold mb-2">Payment Options</h3>
                    <div className="flex gap-2 text-2xl">
                        <FaCcVisa />
                        <FaCcMastercard />
                        <FaCcPaypal />
                        <FaCcAmex />
                        <FaCcDiscover />
                    </div>
                </div>
            </div>

            <div className=" border-t pt-5 border-gray-700  justify-between items-center text-center text-xs">
                <p>© 2025 Aetheric Dynamics Mkt Private Limited</p>
            </div>
        </footer>
    );
};

export default Footer;
