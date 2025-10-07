import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/user.api";
import PageLoader from "../Component/PageLoader";
import { backendConfig1 } from "../constants/mainContent";

const SkeletonCard = () => (

    <div className="bg-white p-3 rounded-xl border animate-pulse flex flex-col gap-5">
        <div className="h-44 bg-gray-300 rounded-xl"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-8 w-full bg-gray-300 rounded"></div>
    </div>
);

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])

    const getAllProductsList = async () => {
        try {
            const response = await getAllProducts();
            if (response?.data) {
                setProducts(response?.data?.data)
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProductsList();
    }, []);

    const truncateDescription = (text, wordLimit) => {
        const words = text?.split(" ");
        if (words?.length <= wordLimit) return text;
        return words?.slice(0, wordLimit).join(" ") + " ...";
    };

    return (
        <div className="py-10">
            <h2 className="text-2xl text-center font-semibold mb-6">Most Popular Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading
                    ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
                    : products?.map((product) => (
                        <div
                            key={product?._id}
                            className="bg-white p-3 rounded-xl border hover:shadow-md duration-300 transition-all relative flex flex-col justify-between gap-5"
                        >

                            <div clas sName="w-full min-h-44 flex items-center justify-center bg-gray-100 rounded-xl">
                                <img src={`${backendConfig1.origin}/${product?.defaultImage}`}
                                    alt="Product"
                                    className="w-full h-56 object-cover rounded-xl" />
                            </div>

                            <div className="flex flex-col gap-2 items-start">
                                <h3 className="font-semibold text-sm">{truncateDescription(product?.productName, 4)}</h3>
                                <p className="text-gray-600 text-xs mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html:  truncateDescription(product?.productDetails, 15) }}>
                                </p>
                                <h3 className="text-sm line-clamp-2">{product?.name}</h3>
                                <div className="flex justify-between items-center gap-5 w-full">
                                <p className="text-base font-medium">₹ {product?.price}</p>
                                <Link
                                    to={`/product/${product?._id}`}
                                    className="bg-bg-color text-white px-3 py-2 text-xs font-light rounded-lg"
                                >
                                    View Details
                                </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Products;
