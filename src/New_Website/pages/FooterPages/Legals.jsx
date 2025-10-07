import React from 'react';
import { Link } from 'react-router-dom';
const certificates = [
  {
    link: "https://ik.imagekit.io/anubhavmaithil24/UDS-Legals/TaxReport.jpeg",
    image: "https://ik.imagekit.io/anubhavmaithil24/UDS-Legals/TaxReport.jpeg",
    alt: "TaxReport",
  },
  {
    link: "https://ik.imagekit.io/anubhavmaithil24/UDS-Legals/Registration.pdf",
    image: "https://ik.imagekit.io/anubhavmaithil24/UDS-Legals/RegPhoto.png",
    alt: "Registration",
  },
  {
    link: "https://ik.imagekit.io/anubhavmaithil24/UDS-Legals/PanCard.jpeg",
    image: "https://ik.imagekit.io/anubhavmaithil24/UDS-Legals/PanCard.jpeg",
    alt: "PanCard",
  },
  {
    link: "https://ik.imagekit.io/anubhavmaithil24/UDS-Legals/Udyam.pdf",
    image: "https://ik.imagekit.io/anubhavmaithil24/UDS-Legals/UdyamImg.png",
    alt: "Udyam",
  },

];

const Legals = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 mt-16 md:mt-20">

        {/* Legal Certificates Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#151875] mb-10 border-b-2 inline-block border-[#151875] pb-1">
            Legal Certificates
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {certificates.map((cert) => (
              <Link to={cert.link} target="_blank" rel="noopener noreferrer" key={cert.id} className="h-fit shadow-lg border-2 border-black rounded-md overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.alt}
                  className="w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legals;
