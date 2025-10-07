import React from "react";

const CodeOfConduct = () => {
  const sections = [
    {
      title: "1. Integrity:",
      points: [
        "Associates must work with honesty and one should have strong moral principles, he/she should and does right thing for himself/herself and for the people or team relying on them.",
        "Associates must not indulge in fraudulent activities or sales and shall take reasonable steps to ensure that participants do not indulge in false or misleading representations or any other form of fraud, coercion, harassment, or unconscionable or unlawful means.",
        "Shall not engage in, or cause or permit, any conduct that is misleading or likely to mislead with regard to any material particulars relating to its direct selling business, or to the goods or services being sold by itself or by the direct seller."
      ]
    },
    {
      title: "2. Objectivity:",
      points: [
        "Company always maintains its non-bias nature towards gender, race, colour and caste.",
        "Any judgement or prejudicial behaviour of any associate will not be accepted by the company in any means or instance.",
        "There must be reality, truth and reliability shown in everyone and person must respect each other's individuality and underlined set of rules of the company.",
        "The foundation of direct sales is personal contact with users. It allows representatives to use an individual approach to every user and build long-lasting relationships with them."
      ]
    },
    {
      title: "3. Deceptive or Unlawful Consumer or Recruiting Practices:",
      points: [
        "We are transparent towards our plans and policies and so we expect from our associates as well. We work on a Zero Tolerance Policy where the direct actions will be taken on the people who will caught offering job to the new user or doing money laundering in the name of company.",
        "No member company or independent salesperson for a member company shall engage in any deceptive, false, unethical or unlawful consumer or recruiting practice.",
        "Information provided by independent distributor to prospective or current independent salespeople concerning the opportunity and related rights and obligations shall be accurate and complete. Distributor shall not make any factual representation to prospective that cannot be verified or make any promise that cannot be fulfilled.",
        "Associates shall not present any selling opportunity to any prospective independent salesperson in a false, deceptive or misleading manner."
      ]
    },
    {
      title: "4. Terms of Sale:",
      points: [
        "Should not be indulge in mis-selling of products or services to consumers, use, or cause or permit to be used, for fraud, harassment, or unconscionable or unlawful means in promoting its direct selling business or to the goods or services being sold by itself or by the direct seller.",
        "Distributor must be bold and upfronted and should mention clear offering and prices of the product which must match with the product prices offered on the platform.",
        "Signup must be a free of cost deal and any distributor will not ask the new user to pay anything for signup in Aetheric Dynamics."
      ]
    },
    {
      title: "5. Identification and Privacy:",
      points: [
        "Fake commitments/promises towards the company and its associate will not be entertained.",
        "At the beginning of sales presentations independent distributor shall truthfully and clearly identify themselves, company, the nature of their company's products and services, and the reason for the solicitation.",
        "Contact with the user shall be made in a polite manner and during reasonable hours.",
        "Company and independent distributor will take appropriate steps to safeguard the protection of all private information provided by a user, irrespective of their age, caste, race and gender."
      ]
    },
    {
      title: "Other ethical and moral codes of conduct:",
      points: [
        "Women empowerment is our utmost priority and defaming, misbehaving and bearing in the success of our feminine entrepreneurs will lead to strict actions.",
        "Company will only entertain the professional bonds and understanding among the team members.",
        "No associate will entitled to take money from the user in their own account or to take cash from the user without prior distributor.",
        "Non-compliance of the rules and regulations of the company shall not be entertained and will turn out as the terminated business tenure between company and the direct seller."
      ]
    }
  ];

  return (
    <div className="px-6 py-10 md:px-10 text-gray-800 mt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Code of Conduct</h1>
      <p className="mb-4 text-justify">
      Orgacure India, (<strong>"Company"</strong> or <strong>"Aetheric"</strong>) is glad for you to be a part of our community and having a shopping experience on our platform.
        The Company is registered under the Company Act 2013 with the Government of India. Company is working on the basis of its code of conduct which fall under as below:
      </p>

      {sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">{section.title}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {section.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CodeOfConduct;









