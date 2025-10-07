// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Star, ShoppingCart, Eye, Heart, Truck, RefreshCw, Shield, Clock } from 'lucide-react';
// import { getFeaturedProducts, getNewArrivals } from '../data/products';
// import { testimonials } from '../data/testimonials';
// import NewProductCard from '../components/ProductCard';
// import TestimonialCard from '../components/TestimonialCard';
// import CountdownTimer from '../components/CountdownTimer';
// import { getAllProducts } from '../../api/user.api';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";

// import img1 from '../../assets/slider/new-banar-2.png'
// import img2 from '../../assets/slider/1-banner.png'
// //  import img3 from '../../assets/slider/new-banar-3.png'
// // import img4 from '../../assets/slider/uds 5.png'
// // import img5 from '../../assets/slider/uds 6.png'
// // import img6 from '../../assets/slider/1 uds.png'

// import HomePageAnimation from '../../Website/HomePageAnimation';
// import PopupBanner from '../components/PopupBanner';
// import BrandSlider from '../../Website/BrandSlider';
// import CategoryGrid from '../../Website/CategoryGrid';
// import PageLoader from '../../Component/PageLoader';
// import { getEvents } from '../../api/admin.api';

// const HomePage = () => {
//   const [loading, setLoading] = useState([]);
//   const [eventList, setEventList] = useState([]);
//   const images = [
//     img1,
//     img2,
//   ];

//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const getAllProductsList = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllProducts();
//       if (response?.data) {
//         setFeaturedProducts(response?.data?.data)
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllProductsList();
//     getEventsList();
//   }, []);

//  const getEventsList = async () => {
//     try {
//       setLoading(true);
//       const response = await getEvents();
//       if(response?.success){
//         setEventList(response?.events)
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       {loading && <PageLoader />}
//       <div className="flex flex-col min-h-screen">

//         {/* <PopupBanner /> */}

//         <section className="relative w-full xl:h-[85vh] lg:h-[50vh] md:h-[25vh] sm:h-[23vh] h-[22vh] xl:mt-20 mt-16  overflow-hidden">
//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             autoplay={{ delay: 4000 }}
//             pagination={{ clickable: true }}
//             loop={true}
//             className="h-full w-full"
//           >
//             {images?.map((img, index) => (
//               <SwiperSlide key={index}>
//                 <div className="relative h-[100vh] w-full object-contain ">
//                   <img
//                     src={img}
//                     alt={`Slide ${index + 1}`}
//                     className="absolute mx-auto inset-0 h-full object-cover w-full z-0" />
                    
//     </div>
//                   {/* <div className="container-custom h-full flex flex-col justify-center relative z-10 pt-20">
//                   <div className="max-w-xl animate-fade-in">
//                     <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
//                       Elevate Your <span className="text-accent-500">Style</span> With Premium Quality
//                     </h1>
//                     <p className="text-xl text-gray-200 mb-8">
//                       Discover our curated collection of luxury goods designed for those who appreciate the finer things in life.
//                     </p>
//                     <div className="flex flex-wrap gap-4">
//                       <Link to="/products" className="btn-primary">
//                         Shop Now <ArrowRight size={18} className="ml-2" />
//                       </Link>
//                       <Link to="/collections/new-arrivals" className="btn-outline border-white text-white hover:bg-white/10">
//                         New Arrivals
//                       </Link>
//                     </div>
//                   </div>
//                 </div> */}
//                 {/* </div> */}
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </section>

//         <section className="md:py-10 py-5 bg-gray-50">
//           <div className="container-custom">
//             <div className="flex justify-between items-center md:mb-12 mb-5">
//               <h2 className="text-xl md:text-2xl font-semibold">Featured Products</h2>
//               <Link to="/products" className="text-primary-600 hover:text-primary-700 flex items-center">
//                 View all <ArrowRight size={16} className="ml-1"/>
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
//               {featuredProducts.slice().slice(0, 8).map(product => (
//                 <ProductCard key={product?.id} product={product} />
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="bg-white">
//           <div className='md:p-10 p-3 '>
//             <HomePageAnimation />
//           </div>
//         </section>

//         <section className="">
//           <div className="md:px-10 p-3">
//             <CategoryGrid eventList={eventList}/>
//           </div>
//         </section>

//         <section className="py-5 bg-white">
//           <div className="container-custom">
//             <div className="text-center md:mb-12 mb-5">
//               <h2 className="text-xl md:text-2xl font-semibold mb-3">New Arrivals</h2>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Discover our latest additions, carefully curated to stay ahead of trends.
//               </p>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
//               {featuredProducts.slice().reverse().slice(0, 4).map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="pb-5 bg-white">
//           <div className="">
//             <BrandSlider />
//           </div>
//         </section>
//       </div>
//     </>

//   );
// };

// export default HomePage;



// src/pages/Home.jsx
import React from "react";

import { Button } from "../../New_Website/uidata/button";
import { Card, CardContent } from "../../New_Website/uidata/card";
import { Badge } from "../../New_Website/uidata/badge";
import { Leaf, Heart, Sparkles, Shield, DollarSign, Headphones } from "lucide-react";

// import soapImage from "../assets/generated_images/Herbal_soap_product_image_60ebd8f7.png";
import teaImage from "../../../attached_assets/generated_images/Green_tea_category_image_5ec69284.png";
import tabletsImage from "../../../attached_assets/generated_images/Supplement_tablets_category_image_b7f4c86c.png";
import oilImage from "../../../attached_assets/generated_images/Body_care_oil_image_2eb67096.png";
import clayMaskImage from "../../../attached_assets/generated_images/Clay_mask_product_image_6cbdb3e6.png";
import moisturizerImage from "../../../attached_assets/generated_images/Moisturizer_product_image_5a7ab516.png";
import rosemaryImage from "../../../attached_assets/generated_images/Rosemary_balm_product_image_2274a3a2.png";
import bodyCreamImage from "../../../attached_assets/generated_images/Body_cream_product_image_1eb81ca1.png";
import probioticsImage from "../../../attached_assets/generated_images/Probiotics_product_image_7bbe71f2.png";
import vitaminDImage from "../../../attached_assets/generated_images/Vitamin_D_product_image_a5fc3ad2.png";
import freshenerImage from "../../../attached_assets/generated_images/Freshener_decorative_image_b6dd186e.png";
import decorativeArrangement from "../../../attached_assets/generated_images/Decorative_herbal_products_arrangement_e57fff70.png";
import testimonial1 from "../../../attached_assets/generated_images/Female_testimonial_customer_photo_2976f324.png";
import testimonial2 from "../../../attached_assets/generated_images/Male_CEO_testimonial_photo_6835471e.png";
import testimonial3 from "../../../attached_assets/generated_images/Female_manager_testimonial_photo_68fd8ac5.png";
import blog1 from "../../../attached_assets/generated_images/Blog_post_featured_image_f33df40d.png";
import blog2 from "../../../attached_assets/generated_images/Blog_post_second_image_8ff9b77d.png";
import HeroSection from "./HeroSection";
import NewProductCard from "./NewProductCard";
import CategoryCard from "./CategoryCard";
import FeatureCard from "./FeatureCard";
import TestimonialCard from "./TestimonialCard";
import BlogCard from "./BlogCard";
import Newsletter from './Newsletter'
import Product12 from "./Product12";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <HeroSection />

      {/* Products */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
            </p>
          </div>
          <Product12 />
        </div>
      </section> */}

      {/* Categories */}
      <section className="py-4 bg-[#EFECE7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
           
          </div>
          <div className="">
            <Product12 />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-8">From the best brand</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {["BRAND", "LOGO", "PARTNER", "TRUST", "QUALITY"].map((text) => (
              <div key={text} className="text-2xl font-bold text-muted-foreground">{text}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-[#EFECE7] relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Best Seller Product</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <NewProductCard name="Purifying Clay Mask"  image={clayMaskImage} />
            <NewProductCard name="Moisturizer"  image={moisturizerImage} />
            <NewProductCard name="Rosemary Balm" image={rosemaryImage} />
            <NewProductCard name="Body Cream" price={25} image={bodyCreamImage} />
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View More Products
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold">Right Place for the right Solution</h2>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.
              </p>
              <Button variant="outline">Read More About</Button>
            </div>
            <div className="relative">
              <Card className="text-center p-8 bg-[#FCFBF8]">
                <CardContent className="space-y-4 ">
                  <h3 className="text-5xl font-bold">500+</h3>
                  <p className="text-muted-foreground">Orders Delivered</p>
                </CardContent>
              </Card>
              <img
                src={freshenerImage}
                alt="Product"
                className="absolute -bottom-8 -right-8 w-1/2 rounded-lg shadow-lg hidden md:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#EFECE7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur. Morbi cursus quis sollicitudin a dolor odio diam risus pretium.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-6">
              <NewProductCard name="Clay Mask"  image={clayMaskImage} />
              <NewProductCard name="Moisturizer"  image={moisturizerImage} />
            </div>
            <img src={decorativeArrangement} alt="Featured products" className="w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Why choose us?</h2>
          </div>
          <div className="grid md:grid-cols-3 bg-[#FCFBF8] gap-8">
            <FeatureCard icon={Leaf} title="Natural" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" />
            <FeatureCard icon={Heart} title="Body Care" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" />
            <FeatureCard icon={Sparkles} title="Self Care" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" />
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-[#EFECE7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">The Best Guarantee In The Business.</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-20 h-20 mx-auto bg-[#F9BC06]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-[#F9BC06]" />
                </div>
                <h3 className="font-bold text-xl">100% Satisfaction Guarantee</h3>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-20 h-20 mx-auto bg-[#F9BC06]/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-10 h-10 text-[#F9BC06]" />
                </div>
                <h3 className="font-bold text-xl">100% Cashback Guaranteed</h3>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-20 h-20 mx-auto bg-[#F9BC06]/10 rounded-full flex items-center justify-center">
                  <Headphones className="w-10 h-10 text-[#F9BC06]" />
                </div>
                <h3 className="font-bold text-xl">24/7 Customer Support</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-16 bg-[#1F934A] text-[#F8FBF9]-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-yellow-500 text-foreground">Best product</Badge>
              <h2 className="font-serif text-5xl text-white font-bold">Get 50% Off and Enjoy the products</h2>
              <Button className="bg-[#DFD7C5]" variant="secondary" size="lg">Discover More</Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-foreground/10 rounded-lg p-4">
                <img src={probioticsImage} alt="Probiotics" className="w-full" />
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-4">
                <img src={vitaminDImage} alt="Vitamin D" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Testimonials</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur. Morbi cursus quis sollicitudin a dolor odio diam risus pretium.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 bg-[#FCFBF8]">
            <TestimonialCard quote="Lorem ipsum dolor sit amet consectetur. Adipiscing accumsan nunc faucibus nibh at nisi nulla amet. Donec at facilisis diam ac enim nam ut." name="Ayana Sanchez" role="Herbal Expert" image={testimonial1} />
            <TestimonialCard quote="Tempor velit erat neque ut et. Amet maecenas in neque tellus nisl ac. Sagittis nibh in pellentesque dignissim tellus nibh." name="Douglas Thomas" role="CEO" image={testimonial2} />
            <TestimonialCard quote="Et leo consequat habitasse vitae amet. Enim tortor enim facilisi nulla mauris. Augue at vivamus sed nam et aliquet fames." name="Amy Gonzales" role="Manager" image={testimonial3} />
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section className="py-16 bg-[#EFECE7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Blogs</h2>
            <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <BlogCard title="Lorem Ipsum is simply dummy text of the printing." date="October 21, 2023" image={blog1} />
            <BlogCard title="Lorem Ipsum is simply dummy text of the printing." date="October 21, 2023" image={blog2} />
          </div>
        </div>
      </section>

      <Newsletter />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
