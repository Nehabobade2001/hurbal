import React from 'react';
import { FaTshirt, FaShoppingCart } from 'react-icons/fa';
import { GiShoppingBag, GiDress } from 'react-icons/gi';
import brandimg from "../../../assets/images/brand.avif";
import { Link } from 'react-router-dom';
const Brand = () => {
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-12 text-gray-800">
      {/* Banner Image */}
      <div className=" ">
        <img
          src={brandimg}
          alt="Aetheric Dynamics Brand Banner"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Brand Description */}
      <div className="bg-white  p-4 sm:p-8">
        <p className="text-base sm:text-lg leading-relaxed">
        Orgacure India has its own brand namely <strong className="text-rose-600">The Fashion Maker Yhelo India</strong>.
          <br /><br />
          We are the manufacturer of our products displayed on our website, allowing us to maintain top-notch quality at the best price.
          Be it clothing or accessories, Aetheric Dynamics offers the ideal fusion of fashion and functionality for both men and women.
        </p>

        <ul className="mt-6 space-y-6">
          <li className="flex items-start gap-4">
            <FaTshirt className="text-indigo-600 w-6 h-6 mt-1" />
            <p><strong>Smart Men's Clothing:</strong> Formal shirts, trousers, cool T-shirts, jeans, and traditional kurtas for every occasion.</p>
          </li>
          <li className="flex items-start gap-4">
            <GiDress className="text-pink-500 w-6 h-6 mt-1" />
            <p><strong>Trendy Women’s Clothing:</strong> Comfort meets fashion with chinos, elegant dresses, and eye-catching ethnic wear for events and daily wear.</p>
          </li>
          <li className="flex items-start gap-4">
            <GiShoppingBag className="text-yellow-600 w-6 h-6 mt-1" />
            <p><strong>Stylish Accessories:</strong> Belts, ties, bags, backpacks, and wallets to elevate your look with style and practicality.</p>
          </li>
        </ul>
      </div>

      {/* Highlight Section */}
      <div className="bg-white rounded-2xl shadow-md max-w-5xl mx-auto mt-10 overflow-hidden">
        <div className="bg-rose-200 px-6 py-4 text-lg font-semibold text-gray-800 flex items-center gap-3">
          <FaShoppingCart className="text-rose-700" />
          Affordable fashion at your fingertips
        </div>
        <div className="px-6 py-5 bg-gray-50 text-base sm:text-lg leading-relaxed">
          Aetheric Dynamics is one of the few online shopping destinations in India where fashion is truly accessible to all.
          Browse our new arrivals and stay ahead of the curve with every season's latest styles.
        </div>
      </div>
    </div>
  );
};

export default Brand;
