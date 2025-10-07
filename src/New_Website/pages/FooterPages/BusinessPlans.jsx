import React from "react";
import banner from "../../../assets/images/businessplan.avif";
import { FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    title: "Business Plan of the Company",
    description:
      "The person who signs up with the company has five business plans to work with:",
  },
  {
    title: "Fashion Consultant (FC) – 10%",
    description:
      "In the Free Sign Up Aetheric Dynamics Membership, the user will get a 10% discount on their first purchase. They will be referred to as a Fashion Consultant (FC).",
  },
  {
    title: "Aetheric Dynamics Business Coordinator (IBC) – 15%",
    description:
      "By purchasing goods worth Rs. 4,500 online, the user becomes an IBC and receives a 15% discount on all future purchases. Customer support is also available.",
    note: "NOTE – Shopping can continue based on the user's previous rank, and the discount will be applied accordingly.",
  },
  {
    title: "Fashion Influencer (FI) – 15%",
    description:
      "To become an FI, purchase Rs. 8,100 worth of goods online. Receive 15% discount on future purchases and full customer support.",
  },
  {
    title: "Business Developer (BD) – 25%",
    description:
      "To become a BD, purchase Rs. 29,050 worth of goods online. Receive 25% discount on future purchases along with full customer care support.",
  },
  {
    title: "BRONZE – 28%",
    description:
      "Purchase Rs. 48,600 worth of goods to qualify for Bronze. Get 28% discount and premium support. The company disclaims any false representation or fraud; legal action may be taken if necessary.",
  },
];

const BusinessPlans = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen mt-20">
      {/* Banner Section */}
      <div
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-lg">
            Our Business Plan
          </h1>
        </div>
      </div>

      {/* Plans Content */}
      <div className="md:p-10 p-4">
        <p className="mb-4 text-lg md:text-xl font-medium text-gray-800">
          Explore our growth plans and discounts as you move forward with us:
        </p>
        <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2 text-base">
          <li><FaCheckCircle className="inline text-green-500 mr-1" /> 10% Free Sign Up (Fashion Consultant)</li>
          <li><FaCheckCircle className="inline text-green-500 mr-1" /> 15% Aetheric Dynamics Business Coordinator (IBC)</li>
          <li><FaCheckCircle className="inline text-green-500 mr-1" /> 15% Fashion Influencer (FI)</li>
          <li><FaCheckCircle className="inline text-green-500 mr-1" /> 25% Business Developer (BD)</li>
          <li><FaCheckCircle className="inline text-green-500 mr-1" /> 28% Bronze</li>
        </ul>

        {/* Accordion Section */}
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <details
              key={index}
              className="group bg-white border-l-4 border-blue-500 shadow-md rounded-lg p-4 transition-all duration-300"
            >
              <summary className="text-lg font-semibold text-blue-700 cursor-pointer group-open:text-blue-900 group-open:font-bold">
                {plan.title}
              </summary>
              <p className="mt-2 text-gray-700">{plan.description}</p>
              {plan.note && (
                <p className="mt-1 text-sm text-red-600 font-medium">
                  {plan.note}
                </p>
              )}
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessPlans;
