import { Link } from 'react-router-dom';
const SelfDeclaration = () => {
  return (
   <div className="bg-gradient-to-br from-gray-100 to-gray-200 mt-16 md:mt-20">
      {/* Header Banner */}


     <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800 leading-relaxed">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        Self Declaration
        <span className="ml-3 w-12 h-1 bg-blue-500"></span>
      </h2>

      <p>
        The team ofOrgacure India firmly declares that the company is compliant with the following:
      </p>

      <p className="mt-4">
        The company does not promote a Pyramid Scheme, as defined in the Consumer Protection Act, 2021 or enroll any person to such scheme or participate in such arrangement in any manner whatsoever in the garb of doing Ecommerce business.
      </p>

      <p className="mt-4">
       Orgacure India also does not participate in Money Circulation Scheme, as defined in Customer Protection Act, 2021 in the garb of Ecommerce or Business Opportunities.
      </p>

      <p className="mt-4">
        (c) The company is also compliant with all the remaining aspects mentioned in Consumer Protection Act - 2021 by the Department of Consumers, Ministry of Consumer Affairs, Food and Public Distribution and shall also provide such details as may be notified from time to time.
      </p>

      <div className="mt-8">
        <p>Team</p>
        <p>Orgacure India</p>
      </div>
    </div>


     
      </div>
  );
};

export default SelfDeclaration;
