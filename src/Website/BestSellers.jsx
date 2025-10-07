import React from "react";
import img1 from '../assets//images/lady-1-BRiBcX1g.png'

const products = [
  {
    id: 1,
    title: "Hybrid Soul - Black",
    description:
      "Stylish, More Comfort Wireless earbuds provide a superior fit to offer a pleasant experience...",
    price: "₹2549",
    image: img1, 
    badge: "25% OFF",
  },
  {
    id: 2,
    title: "Kuefit AIR MESH Series Peach",
    description:
      "Introducing the Kuefit AIR MESH Series Lace-Up Sports Shoes for Women, where style meets comfort...",
    price: "₹2699",
    image: img1,
  },
  {
    id: 3,
    title: "Ifazone Men Mid Green Light Wash Jeans",
    description:
      "Add a dash of style to your off-duty look with this pair of denim from the house of Ifazone...",
    price: "₹2199",
    image: img1,
  },
  {
    id: 4,
    title: "Zengen Men Classic Comfort Underwear",
    description:
      "Our Zengen underwear is crafted from a premium blend of 93% modal and 7% spandex...",
    price: "₹399",
    image: img1,
  },
  
];


const truncateDescription = (text, wordLimit) => {
    const words = text?.split(" ");
    if (words?.length <= wordLimit) return text;
    return words?.slice(0, wordLimit).join(" ") + " ...";
};

const BestSellers = () => {
  return (
    <section className="">
      <h2 className="text-2xl font-semibold mb-6 text-center">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative flex flex-col justify-between">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              {product.badge && (
                <div className="absolute top-2 left-2 bg-white text-bg-color font-bold text-xs px-2 py-1 rounded-full shadow-md">
                  {product.badge}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm">{truncateDescription(product?.title, 4)}</h3>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">
              {truncateDescription(product?.description, 15)}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-bg-color font-bold">{product.price}</span>
                <button className="bg-bg-color text-white text-sm px-4 py-1 rounded ">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
