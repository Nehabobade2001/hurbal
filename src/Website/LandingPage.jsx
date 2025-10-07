import React from "react";
import Footer from "./Footer";
import HomePageAnimation from "./HomePageAnimation";
import LandingSlider from "./LandingSlider";
import NavBar from "./NavBar";
import Testimonials from "./Testimonials";

import Products from "./Products";
import CategoryMenu from "./CategoryMenu";
import CategoryGrid from "./CategoryGrid";
import UpcomingExperiences from "./UpcomingExperiences";
import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";
import BrandSlider from "./BrandSlider";
import NavigationMenu from "./NavigationMenu";

const LandingPage = () => {
    return (
        <div className=" flex flex-col gap-4">
            <div className="px-3 flex flex-col gap-4">
                <NavBar />
                <div className="md:block hidden">
                    <NavigationMenu />
                </div>
                <LandingSlider />
                {/* <CategoryMenu /> */}
                <NewArrivals />
                <HomePageAnimation />
                <CategoryGrid />
                <Products />
                <BestSellers />
                <UpcomingExperiences />
                <BrandSlider />
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
