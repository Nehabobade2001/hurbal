import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import product1 from "../assets/dashboard/slider/4.png";
import product2 from "../assets/dashboard/slider/5.png";

const reviews = [
    {
        name: "Emma Johnson",
        product: "Wireless Headphones",
        review: "These headphones have amazing sound quality! The bass is deep, and the noise cancellation is excellent. Highly recommend!",
        rating: 4.9,
        reviewCount: 1250,
        productImage: product1,
    },
    {
        name: "Michael Smith",
        product: "Smartwatch Pro",
        review: "This smartwatch is fantastic! The battery lasts long, and the fitness tracking features are very accurate. Worth every penny!",
        rating: 4.8,
        reviewCount: 1890,
        productImage: product2,
    },
];

const Testimonials = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6">
                Clients <span className="text-bg-color">Testimonials</span>
            </h2>
            <div className="bg-white border my-7 border-gray-200 rounded-lg  p-6">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".prev-button",
                        nextEl: ".next-button",
                    }}
                    className=""
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex items-center gap-6">
                                <div className="lg:w-2/3">
                                    <h2 className="text-xl font-semibold">
                                        What Our Buyers Say?
                                    </h2>

                                    <div className="flex items-center text-yellow-500 mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < Math.round(review.rating) ? "text-yellow-500" : "text-gray-300"} />
                                        ))}
                                        <span className="text-gray-500 text-sm ml-2">
                                            {review.rating} ({review.reviewCount} reviews)
                                        </span>
                                    </div>

                                    <p className="text-gray-700 text-sm mt-4 italic">
                                        "{review.review}"
                                    </p>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={review.productImage}
                                                alt={review.productImage}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="ml-3">
                                                <p className="font-medium">{review.name}</p>
                                                <p className="text-gray-500 text-xs">Purchased: {review.product}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button className="prev-button bg-gray-100 text-black p-2 rounded-full border hover:bg-gray-200">
                                                <FaArrowLeft />
                                            </button>
                                            <button className="next-button bg-gray-100 text-black p-2 rounded-full border hover:bg-gray-200">
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative w-1/3 lg:flex hidden items-center justify-center">
                                    <div className="h-60  w-60 overflow-hidden rounded-lg border">
                                        <img
                                            src={review.productImage}
                                            alt={review.product}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
