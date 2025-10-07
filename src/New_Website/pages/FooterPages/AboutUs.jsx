import React from "react";
import banner from "../../../assets/footer/about.png";
import ceoImg from "../../../assets/images/boys-1.jpg";
import cmdImg from "../../../assets/images/boys-1.jpg";
import advisorImg from "../../../assets/images/boys-1.jpg";

const AboutUs = () => {

  const leaders = [
    {
      img: ceoImg,
      name: "Mrs. Sri Pawar",
      role: "CEO, Orgacure India",
      description:
        "10 वर्षों से अधिक का अनुभव, नेटवर्क मार्केटिंग में उत्कृष्ट प्रदर्शन। आपकी सोच और नेतृत्व ने कई संस्थानों की सफलता में योगदान दिया है। कृषि और ऑनलाइन शिक्षा में विशेषज्ञता रखती हैं।",
    },
    {
      img: cmdImg,
      name: "Mr. Amit Rajput",
      role: "CMD, Orgacure India",
      description:
        "15 वर्षों से अधिक का अनुभव, डायरेक्ट सेलिंग, रियल एस्टेट, बैंकिंग, IT जैसे क्षेत्रों में कार्य किया। तकनीकी एकीकरण और नवाचार में विशेषज्ञता के साथ सफल उद्यम स्थापित किए।",
    },
    {
      img: advisorImg,
      name: "Mr. Rakesh Maheshvari",
      role: "Advisor, Organization Head",
      description:
        "पुलिस विभाग में 42 वर्षों की सेवा के बाद सामाजिक उत्थान में कार्यरत। पुरस्कारों से सम्मानित, अब लोगों को सशक्त बनाने की दिशा में कार्यरत हैं।",
    },
  ];


  return (
    <div className="bg-gray-50 mt-16 md:mt-20">
      {/* Hero Section */}
      <div className="relative w-full h-72">
        <img
          src={banner}
          alt="About Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold">हमारे बारे में</h1>
        </div>
      </div>

      {/* Company Introduction */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">ऑर्गाक्योर इंडिया – प्राकृतिक स्किनकेयर और वेलनेस समाधान</h2>
        <p className="text-lg leading-7 text-gray-700 text-justify">
          {/* आज के समय में जब मिलावटी उत्पादों और बढ़ती बीमारियों ने हमारे जीवन को प्रभावित किया है, ऐसे में यूनिक डायरेक्ट 
          सेलिंग एक अत्यंत आवश्यक और समयानुकूल पहल बन जाती है। यह केवल एक व्यवसायिक मॉडल नहीं, बल्कि एक स्वस्थ भारत,
          आत्मनिर्भर समाज और आर्थिक रूप से सशक्त नागरिकों के निर्माण की दिशा में चल रहा आंदोलन है। */}
          कृति की खूबसूरती का अनुभव करें ऑर्गाक्योर इंडिया के प्रीमियम ब्यूटी और स्किनकेयर उत्पादों के साथ। हमारे उत्पाद नारियल, आवश्यक तेलों और हर्बल एक्सट्रैक्ट जैसी प्राकृतिक सामग्रियों से बनाए जाते हैं, जो आपकी त्वचा को पोषण, सुरक्षा और निखार प्रदान करते हैं। चाहे कोमल फेस क्रीम हो, हाइड्रेटिंग सीरम या सुकून देने वाले तेल – हम आपको सुंदरता का एक सुरक्षित, प्रभावी और पर्यावरण-अनुकूल तरीका प्रदान करते हैं।
        </p>
        <p className="text-xl font-semibold text-center mt-6 text-indigo-600">"Right Place to Good Health & Good Wealth"</p>
      </section>
      {/* Leadership Team */}
      <section className="bg-white py-12 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">हमारी लीडरशिप टीम</h2>
          {/* CEO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow-md text-center"
            >
              <img
                src={leader.img}
                alt={leader.name}
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-indigo-700">{leader.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{leader.role}</p>
              <p className="text-gray-700 text-sm leading-6">{leader.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-12 bg-indigo-50 px-6 md:px-16 text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">हमारा उद्देश्य</h2>
        <ul className="list-disc list-inside text-lg space-y-3 max-w-5xl mx-auto">
          <li>स्वस्थ, आत्मनिर्भर भारत का निर्माण।</li>
          <li>शुद्ध पोषण व गुणवत्तापूर्ण उत्पादों की पहुंच हर परिवार तक।</li>
          <li>रोजगार, शिक्षा व महिला सशक्तिकरण को बढ़ावा देना।</li>
          <li>व्यावसायिक अवसर देकर लोगों को आर्थिक स्वतंत्रता प्रदान करना।</li>
          <li>हर व्यक्ति को अपना खुद का व्यवसाय शुरू करने का मंच देना।</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
