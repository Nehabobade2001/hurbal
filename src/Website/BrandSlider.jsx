import React from 'react';
import brand1 from "../assets/slider/shampu.jpg";
import brand2 from "../assets/slider/banar.jpg";



const BrandSlider = () => {
  const data = [brand1, brand2, brand1,brand1, brand2, brand1,brand1, brand2, brand1];

  return (
    <div className="overflow-hidden w-full py-4 ">
      {/* <h2 className="text-2xl font-semibold mb-6 text-center"><span className="text-bg-color">Brands</span></h2> */}
      <div className="flex animate-scroll w-max">
        {[...data, ...data].map((el, idx) => (
          <div
            key={idx}
            className="bg-white w-52  border rounded-lg flex items-center justify-center mx-2 shrink-0"
          >
            <img src={el} alt={`brand-${idx}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSlider;
