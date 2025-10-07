// NavigationMenu.jsx
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

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


export default function NavigationMenu() {
    const [hovered, setHovered] = useState(null);
    const [subHovered, setSubHovered] = useState(null);

    return (
        <nav className="relative z-40 bg-bg-color/10 rounded-lg">
            <ul className="flex items-center gap-5 justify-around p-4">
                {categories.map((cat, i) => (
                    <li
                        key={i}
                        className="relative flex items-center justify-center flex-col"
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => {
                            setHovered(null);
                            setSubHovered(null);
                        }}
                    >
                        <div className="w-20 h-20 border border-bg-color bg-bg-color rounded-full overflow-hidden mb-2">
                            <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
                        </div>
                        <button className="font-medium hover:text-bg-color flex items-center gap-2">{cat.title} <IoIosArrowDown /></button>

                        {hovered === i && (
                            <div className="absolute left-0 top-full bg-white rounded shadow-lg p-4 min-w-[250px]">
                                {cat.sub.map((sub, j) => (
                                    <div
                                        key={j}
                                        className="relative group"
                                        onMouseEnter={() => setSubHovered(j)}
                                    >
                                        <div className="hover:text-bg-color cursor-pointer p-1">
                                            {sub.name}
                                        </div>

                                        {sub.items && subHovered === j && (
                                            <div
                                                className={`absolute top-0 bg-white rounded shadow-lg p-4 min-w-[250px] 
                ${i > categories.length / 2 ? 'right-full' : 'left-full'}`}
                                            >
                                                {sub.items.map((item, k) => (
                                                    <div key={k} className="hover:text-bg-color cursor-pointer p-1">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
