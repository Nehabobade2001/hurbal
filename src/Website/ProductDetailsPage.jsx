import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Testimonials from "./Testimonials";
import ProductDetails from './ProductDetails';

const ProductDetailsPage = () => {
    return (
        <div className="">
            <div className="px-3 flex flex-col gap-4">
                <NavBar />
                <ProductDetails />
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetailsPage