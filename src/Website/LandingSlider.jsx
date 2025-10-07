import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Slider1 from "../assets/dashboard/slider/4.png";
import Slider2 from "../assets/dashboard/slider/5.png";
import Slider3 from "../assets/dashboard/slider/6.png";

const LandingSlider = () => {
    const swiperImages = [Slider1, Slider2, Slider3];
    return (
        <div className="flex flex-col gap-4">
            <div className=" w-full h-auto overflow-hidden rounded-lg">
                <Swiper
                    slidesPerView={1}
                    autoplay={{ delay: 1000, disableOnInteraction: false }}
                    loop={true}
                    speed={2000}
                    modules={[Autoplay]}
                    className="w-full lg:h-auto sm:h-[70vh] h-[50vh] "
                >
                    {swiperImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                className="w-full h-full object-cover "
                                alt={`Slide ${index + 1}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
           
        </div>
    );
};

export default LandingSlider;