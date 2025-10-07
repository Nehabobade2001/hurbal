import React from "react";

const DistributorPromotion = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-10 mt-20">
      {/* Banner */}
      <div className="bg-orange-500 text-white text-center py-6 rounded-xl shadow-md mb-6">
        <h1 className="text-2xl font-semibold">
          Promotions of Distributors for Business With Company
        </h1>
        <p className="text-sm mt-1">Transparency • Performance • Growth</p>
      </div>

      {/* Container */}
      <div className=" bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Section 1 */}
        <section>
          <h2 className="text-blue-700 text-xl font-semibold mb-2">
            Initial Distributor Promotions
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              The distributor having <span className="text-green-600 font-semibold">19% distributorship</span> must refer 4 people for shopping on the same terms to explain the company’s plan.
            </li>
            <li>
              After 4 referrals, the distributor becomes eligible for <span className="text-green-600 font-semibold">28% discount</span> and gains <strong>Team Leader</strong> rank.
            </li>
            <li>
              The distributor having <span className="text-green-600 font-semibold">28% distributorship</span> must refer 3 new people for shopping.
            </li>
            <li>
              After 3 referrals, they become eligible for <span className="text-green-600 font-semibold">37% discount</span> and earn the <strong>Bronze Rank</strong>.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-blue-700 text-xl font-semibold mb-2">
            Marquis Distributor Promotion
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Promotion to <strong>Marquis Distributor</strong> will be granted by the company after evaluating performance of Team Leader or Bronze Distributor.</li>
            <li>Must not pressurize anyone for signup without explaining company policy.</li>
            <li>No signup or shopping should happen on false promises.</li>
            <li>Must operate training centers with <strong>transparency, honesty, and dignity</strong>.</li>
            <li>Must not keep any funds received from new people personally.</li>
            <li>Maintain training center data manually and share with the company when asked.</li>
            <li>Manage training center expenditures and report them monthly.</li>
            <li>Never keep company money personally.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-blue-700 text-xl font-semibold mb-2">
            Business Promotion Responsibility
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Marquis, Team Leader, and Bronze Distributors will actively promote the business of the company.</li>
          </ul>
        </section>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500 italic pt-4 border-t">
          *All promotions are subject to the company’s discretion and performance evaluation.
        </div>
      </div>
    </div>
  );
};

export default DistributorPromotion;
