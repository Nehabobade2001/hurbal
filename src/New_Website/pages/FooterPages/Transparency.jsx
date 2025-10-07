import React from "react";
import { motion } from "framer-motion";
import transparencyImg from "../../../assets/images/transparency.avif";

const faqs = [
  {
    question: "What is Aetheric Dynamics India Marketing Pvt. Ltd?",
    answer:
      "Aetheric Dynamics is a direct selling company offering fashion and lifestyle products, registered under the Companies Act, 1956. It aims to empower people to achieve success through entrepreneurship.",
  },
  {
    question: "How can you contact Aetheric Dynamics?",
    answer:
      "Contact via Chat, Email, or registered number between 9:30 AM – 6:00 PM. Email: admcare9@gmail.com. Phone: +91-89649 69960",
  },
  {
    question: "Does Aetheric Dynamics comply with the Direct Selling Rules of 2021?",
    answer:
      "Yes. Aetheric Dynamics follows all guidelines and amendments published by the Ministry of Consumer Affairs to ensure compliance.",
  },
  {
    question: "What are Aetheric Dynamics's internal compliance policies?",
    answer:
      "Aetheric Dynamics has a dedicated compliance team that verifies KYC, handles grievances, and monitors unethical online activity to maintain ethical standards.",
  },
  {
    question: "Is Aetheric Dynamics a Pyramid Scheme?",
    answer:
      "No. It follows the Direct Selling Rules issued in 2021 and is not a pyramid scheme.",
  },
  {
    question: "Does Aetheric Dynamics provide job opportunities?",
    answer:
      "Aetheric Dynamics offers business opportunities as a direct selling company. It does not misrepresent roles as job positions.",
  },
  {
    question: "Does Aetheric Dynamics allow refunds/returns?",
    answer:
      "Yes. Refunds are allowed within 15 days of invoice as per the refund policy.",
  },
  {
    question: "What action is taken against unethical distributors?",
    answer:
      "Aetheric Dynamics conducts investigations and takes strict action against distributors involved in unethical practices.",
  },
  {
    question: "Why do some people post negative info about Aetheric Dynamics?",
    answer:
      "Despite success, Aetheric Dynamics understands that not all experiences are the same. However, it continues to prioritize ethical business practices and customer satisfaction.",
  },
];

const Transparency = () => {
  return (
    <div className="px-5 md:px-10 py-8 space-y-12">
      {/* Banner */}
      <div className="w-full h-[200px] md:h-[500px] mt-10 md:mt-20 relative rounded-3xl overflow-hidden">
        <img
          src={transparencyImg}
          alt="About Us Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
            Transparency
          </h1>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-800">
          Our Transparency Policy
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We believe in clear, honest communication and building trust with
          every partner, consumer, and entrepreneur associated with Aetheric Dynamics.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {item.question}
            </h3>
            <p className="text-gray-700 text-sm">{item.answer}</p>
          </motion.div>
        ))}
      </div>

      {/* Final Note */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-100 to-purple-200 p-10 rounded-3xl text-center shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Aetheric Dynamics is built on trust, integrity, and opportunity.
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          We are proud of our mission to empower individuals through business,
          and we are committed to upholding transparent and ethical practices
          across all levels.
        </p>
      </motion.div>
    </div>
  );
};

export default Transparency;
