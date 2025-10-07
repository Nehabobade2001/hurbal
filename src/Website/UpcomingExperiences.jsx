import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import img1 from '../assets/UpcomingExperiences/img1.png'
import img2 from '../assets/UpcomingExperiences/img2.png'
import img3 from '../assets/UpcomingExperiences/img3.png'
import img4 from '../assets/UpcomingExperiences/img4.png'

const experiences = [
    {
        title: "Earning Model and Business Planning",
        speaker: "ACE SHALU GAUTAM",
        price: "₹ 79",
        spotsLeft: "194",
        image: img1,
    },
    {
        title: "Invitation - ACE",
        speaker: "RAMANDEEP",
        price: "₹ 79",
        spotsLeft: "142",
        image: img2,
    },
    {
        title: "CYB Ghaziabad (ACE Ashu...)",
        speaker: "GHZ GROWTH EVENT",
        price: "₹ 400",
        spotsLeft: "33",
        image: img3,
    },
    {
        title: "TOE Goa",
        speaker: "TIMEOUT - GOA",
        price: "₹ 4149",
        spotsLeft: "17",
        image: img4,
    },
];

const UpcomingExperiences = () => {
    return (
        <div className="">
            <h2 className="text-3xl font-bold text-center mb-6">
                Upcoming experiences with <span className="text-bg-color">Asort</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {experiences.map((exp, index) => (
                    <div key={index} className="bg-white rounded-lg border overflow-hidden  transition-shadow">
                        <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-full h-40 object-cover"
                        />

                        <div className="p-4">
                            <h3 className="text-md font-semibold truncate">{exp.title}</h3>
                            <p className="text-sm text-black mt-1">{exp.spotsLeft} spots left</p>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold text-bg-color">{exp.price}</span>

                                <div className="flex items-center gap-2">
                                    <FaShareAlt className="text-bg-color cursor-pointer" />
                                    <button className="bg-bg-color text-white px-4 py-1.5 rounded-md font-medium hover:bg-bg-color transition">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingExperiences;
