import React, { useState } from 'react';

const AgreementSection = ({ title, points }) => {
    const [showAllPoints, setShowAllPoints] = useState(false);

    const togglePoints = () => {
        setShowAllPoints(prev => !prev);
    };

    return (
        <div className="my-4 shadow rounded-md">
            <div
                className='p-2 bg-gray-400 text-white rounded-t-md flex items-center justify-between cursor-pointer'
            >
                <h2 className="text-lg  font-bold uppercase">{title}</h2>
            </div>

            <div className="bg-white p-4 border-l-4 rounded-b-md border-green-400">
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2 text-sm leading-relaxed">
                    {points.slice(0, showAllPoints ? points.length : 3).map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>

                {points.length > 5 && (
                    <button
                        onClick={togglePoints}
                        className="text-teal-600 mt-3 font-medium hover:underline"
                    >
                        {showAllPoints ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AgreementSection;
