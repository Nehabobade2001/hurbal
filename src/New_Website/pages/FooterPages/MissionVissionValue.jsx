import React from "react";
import { FaBullseye, FaEye, FaHandshake } from "react-icons/fa";
import img from "../../../assets/footer/missionbanner.png";
import mission from "../../../assets/footer/mission.jpg";
import vission from "../../../assets/footer/vission.jpg";

const MissionVisionValues = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 mt-16 md:mt-20">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-80">
        <img
          src={img}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl text-white font-bold text-center">
            हमारा मिशन और विज़न
          </h1>
        </div>
      </div>

      {/* Vision Section */}
      <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto py-12 px-6 gap-10">
        <div className="md:w-1/2 transform hover:scale-105 transition duration-300">
          <img src={vission} alt="Vision" className="rounded-2xl shadow-lg w-full" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700 text-center md:text-left">
            <FaEye className="inline-block mr-2" /> हमारा विज़न
          </h2>
          <p className="text-lg leading-7 mb-4">
            “हमारा लक्ष्य है भारत को एक स्वस्थ, खुशहाल और आत्मनिर्भर राष्ट्र बनाना, जहाँ हर व्यक्ति को मिले शुद्ध पोषण, ज़हर-मुक्त जीवन और एक बेहतर भविष्य।”
          </p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>लाखों लोगों को व्यवसायिक अवसर देकर उन्हें आर्थिक रूप से मजबूत और स्वतंत्र बनाना।</li>
            <li>"एक स्वस्थ जीवन, एक खुशहाल समाज और एक आत्मनिर्भर भारत – यही है यूनिक डायरेक्ट सेलिंग का विज़न!"</li>
            <li>भारत को ज़हर-मुक्त और स्वस्थ-समृद्ध राष्ट्र बनाना।</li>
            <li>लोगों को शुद्ध न्यूट्रिशन और जागरूकता प्रदान करना।</li>
          </ul>
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto py-12 px-6 gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700 text-center md:text-left">
            <FaBullseye className="inline-block mr-2" /> हमारा मिशन
          </h2>
          <p className="text-lg leading-7 mb-4">
            "हमारा संकल्प है — वर्ष 2027 तक 1 लाख भारतीयों को रोजगार प्रदान करना और उन्हें आत्मनिर्भरता की राह पर अग्रसर करना।"
          </p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>भारत के हर कोने तक विश्वसनीय और गुणवत्तापूर्ण उत्पादों के माध्यम से एक स्वस्थ जीवनशैली को बढ़ावा देना।</li>
            <li>लोगों को यूनिक डायरेक्ट सेलिंग बिजनेस मॉडल के माध्यम से आय बढ़ाने और वित्तीय स्वतंत्रता प्राप्त करने का अवसर देना।</li>
            <li>युवाओं, गृहिणियों, छात्रों और हर महत्वाकांक्षी व्यक्ति को एक ऐसा मंच देना जहाँ वे खुद का व्यवसाय शुरू कर सकें बिना किसी बड़ी पूंजी के।</li>
            <li>एक ऐसा आंदोलन खड़ा करना जो भारत को स्वस्थ, समृद्ध और आत्मनिर्भर राष्ट्र बनाए।</li>
          </ul>
          <p className="text-lg mt-6 text-center font-semibold text-indigo-800">
            “स्वस्थ भारत, समृद्ध भारत – यही है हमारा मिशन 2027!”
          </p>
        </div>
        <div className="md:w-1/2 transform hover:scale-105 transition duration-300">
          <img src={mission} alt="Mission" className="rounded-2xl shadow-lg w-full" />
        </div>
      </div>
    </div>
  );
};

export default MissionVisionValues;
