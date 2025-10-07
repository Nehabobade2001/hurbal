import React from 'react';
import { Link } from 'react-router-dom';
const certificates = [
  {
    id: 1,
    src: 'https://hippocorporation.in/images/legals/5.jpg', // Replace with your actual image paths
    alt: 'Certificate of Registration',
  },
  {
    id: 2,
    src: 'https://hippocorporation.in/images/legals/5.jpg',
    alt: 'Agreement Document',
  },
  {
    id: 3,
    src: 'https://hippocorporation.in/images/legals/5.jpg',
    alt: 'FSSAI License',
  },
    {
    id: 3,
    src: 'https://hippocorporation.in/images/legals/5.jpg',
    alt: 'FSSAI License',
  },
    {
    id: 3,
    src: 'https://hippocorporation.in/images/legals/5.jpg',
    alt: 'FSSAI License',
  },
    {
    id: 3,
    src: 'https://hippocorporation.in/images/legals/5.jpg',
    alt: 'FSSAI License',
  },
];

const Downloads = () => {
  return (
    <div>
      {/* Hero Section */}
         <div className="bg-gradient-to-br from-gray-100 to-gray-200 mt-16 md:mt-20">
      <div
        className="relative bg-cover bg-center h-[250px] flex items-center justify-center"
        style={{
          backgroundImage: `url('/assets/bg-vision.png')`, // Update with your image path
        }}
      >
        <div className="absolute inset-0 bg-[#151875]/90"></div>

        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
         Downloads <span className="block w-12 h-1 bg-orange-500 mx-auto mt-2"></span>
          </h1>
          <div className="text-sm mt-4 text-orange-400">
            <span className="cursor-pointer hover:underline"><Link to="/" className="cursor-pointer hover:underline text-blue-600">
  Home
</Link></span> &gt;{' '}
            <span className="text-white">Downloads</span>
          </div>
        </div>
      </div>

      {/* Legal Certificates Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#151875] mb-10 border-b-2 inline-block border-[#151875] pb-1">
       Downloads
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {certificates.map((cert) => (
            <div key={cert.id} className="shadow-lg border rounded-md overflow-hidden">
              <img
                src={cert.src}
                alt={cert.alt}
                className="w-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Downloads;
