import React, { useState } from "react";
import benefit from "../../../assets/images/benefit.png";
import { Link } from 'react-router-dom';
const benefits = [
  {
    title: "Entrepreneurship",
    points: [
      "Aetheric Dynamics is an open platform to learn, experiment and establish your career as an entrepreneur. When starting your own business, you improve on your organizational capabilities and business skills in your own way. You get a better understanding of how to lead your team for an increased business output and effectively plan and implement different strategies to bring your business to the forefront.",
      "Doing business in your social circle creates a social responsibility and helps you in building relationships, both personal and professional."
    ]
  },
  {
    title: "Mentorship",
    points: [
      "Success in direct selling has a deep correlation with mentoring. In Aetheric Dynamics you develop your career alongside assuring another person’s development. The success of your downlines is one among the many parameters that adds to your professional success. Motivating, inspiring and guiding your downlines helps you improve on your leadership skills while enhancing their personal development. Added to the personal satisfaction you acquire, you tend to learn new perspectives, building on your social responsibility."
    ]
  },
  {
    title: "Decision Making",
    points: [
      "In Aetheric Dynamics you will get to know that not all decisions end with a YES or NO. There is a lot more that goes behind especially when a critical decision has to be made. Here again, you cannot work on your intuitions but on your reasoning. Following the heart doesn’t always work well. When you are in a team, or let’s say, when you lead a team, the decision you take should be unbiased. Exactly for the same reason, you need to define the problem first to your inner self, develop and weigh the options, plan, communicate and execute."
    ]
  },
  {
    title: "Problem Solving",
    points: [
      "When you can’t control what’s happening, challenge yourself to control the way you respond to what’s happening. That’s where your power is.",
      "As an established individual in Aetheric Dynamics a direct selling company you are approaching the world out of your comfort zone. You will face problems with your customers, team members or pretty much similar the case is, with your strategies. All this affects your business.",
      "As an individual dreaming high, you obviously try to tackle and win control over the situation before it takes hold of you. Through effective analysis, research and solution you conquer the problem improving on your analytical, research and problem solving skills."
    ]
  },
  {
    title: "Critical Thinking",
    points: [
      "Aetheric Dynamics as a direct selling company boosts the tendency of critical thinking in a user as you are out in the digital market with your product. The first and foremost thing that comes to your mind is ‘How are people going to receive this?’. From this thought, and then you start to analyze ways and means by which you can conquer.",
      "Critical thinking comes with rightful observation (of the market trends and patterns), analysis (of methods to establish your ideas), and interpretation (of the impact of your actions).",
      "Self-monitoring and self-corrective thinking lets you analyze and realise your commitment towards your profession, yourself and towards a greater frame, the society."
    ]
  },
  {
    title: "Public Speaking",
    points: [
      "In Aetheric Dynamics you will come across with number of people in your daily routine which will help you in your public speaking skills helps you gain a public outlook by making new connections, helping you build on your customer base.",
      "By effectively communicating ideas and interests, you build around your credibility. Your credibility helps you to influence decisions and motivate change, and that’s how you build your team."
    ]
  },
  {
    title: "Teamwork",
    points: [
      "Aetheric Dynamics always emphasises on Team work as we all know that : \"Team work is Dream Work\"",
      "Success is always a collaboration of efforts. The benefit of selling business is that it lets you work independently but once you start building your network you have a team whose efforts count on your profits and broadly on the company’s goals too. Though not completely for the financial side of it, inspiring your team to develop workplace ethics builds empathy and rapport among individuals within the organization and makes conflict resolution and collaboration a lot more and it plays a crucial part in your career as well as it enhance your sociality."
    ]
  }
];

export default function BenefitPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen pt-24 px-10">
      {/* Banner */}
      <div className="relative w-full max-h-[500px] overflow-hidden mb-12 rounded-xl">
        <img
          src={benefit}
          alt="Benefits Banner"
          className="w-full h-[400px] object-cover object-center  shadow-xl"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-6">
          <h1 className="sm:text-4xl text-3xl md:text-5xl font-bold drop-shadow-lg">
            Benefits of Working with Aetheric Dynamics
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-medium">
            India’s Leading Direct Selling Business
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-indigo-700 mb-3">
                {index + 1}. {benefit.title}
              </h2>
              <ul className="text-gray-700 space-y-2 text-sm">
                {(expanded === index ? benefit.points : benefit.points.slice(0, 1)).map((point, i) => (
                  <li key={i} className="list-disc pl-4">{point}</li>
                ))}
              </ul>
              {benefit.points.length > 1 && (
                <button
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="mt-3 text-indigo-600 text-sm font-semibold hover:underline"
                >
                  {expanded === index ? "Read Less ▲" : "Read More ▼"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 