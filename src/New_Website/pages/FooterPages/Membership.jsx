// ✅ Correct way
import { Link } from 'react-router-dom';
const Membership = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 mt-16 md:mt-20">

        <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Membership Terms and Conditions
        <span className="inline-block w-8 h-1 bg-purple-600 ml-3 align-middle"></span>
      </h1>

      <p className="text-gray-700 mb-6">
        Welcome toOrgacure India! Please ensure that you have read and understood these Membership terms and conditions (Membership Terms). These Terms and Conditions govern your use of theOrgacure India service (Site) as a member.
      </p>
      <p className="text-gray-700 mb-6">
        Once your registration process is complete, you, by virtue of your membership ID generation, agree to the Membership Terms as a legally binding contract between you andOrgacure India.
      </p>

      {/* Section 1 */}
      <div className="mb-8">
        <h2 className="text-orange-600 font-extrabold text-lg mb-2">
          1. NO MEMBERSHIP FEE :-
        </h2>
        <p className="text-gray-700 mb-2">
         Orgacure India levies zero membership fee on its member.
        </p>
        <p className="text-gray-700">
          If at any point or place a membership fee is asked by a third party to provide membership toOrgacure India, the member is directed to bring the third party (website or Ad) to the attention ofOrgacure India immediately.
        </p>
      </div>

      {/* Section 2 */}
      <div className="mb-8">
        <h2 className="text-orange-600 font-extrabold text-lg mb-2">
          2. MEMBERSHIP TERMS :-
        </h2>
        <ul className="text-gray-700 list-disc pl-5 space-y-2">
          <li>To become a member ofOrgacure India, you should be age 18 years and above.</li>
          <li>The membership is transferable under certain cases (refer article 3)</li>
          <li>
            Refusal, suspension, and termination rights of membership are under the sole discretion ofOrgacure India (refer to article 4 for Refusal, suspension, and termination terms and conditions).
          </li>
          <li>
            Sharing of membership ID and password is strictly against the terms of membership.
          </li>
        </ul>
      </div>

      {/* Section 3 */}
      <div className="mb-8">
        <h2 className="text-orange-600 font-extrabold text-lg mb-2">
          3. TRANSFER OF MEMBERSHIP :-
        </h2>
        <p className="text-gray-700 mb-4">
          The transfer of membership to another name can be possible under the following conditions:
        </p>
        <ul className="text-gray-700 list-disc pl-5 space-y-2">
          <li>If the new member is a blood relative up to three generations of the current member.</li>
          <li>If the new member is the spouse of the current member.</li>
          <li>
            The transfer of membership is the discretion ofOrgacure India and can be refused according to changes in the membership policy.
          </li>
          <li>
            Members are advised to visit theOrgacure India website to stay updated on any such changes.
          </li>
        </ul>
      </div>

      {/* Section 4 */}
      <div>
        <h2 className="text-orange-600 font-extrabold text-lg mb-2">
          4. REFUSAL, SUSPENSION, AND TERMINATION :-
        </h2>
        <p className="text-gray-700 mb-4">
         Orgacure India has full discretion to deny, suspend, or terminate membership on a case-by-case basis if members violate the terms or other company policies.
        </p>
        <p className="text-gray-700 mb-2">Action may be taken in the following situations:</p>
        <ul className="text-gray-700 list-disc pl-5 space-y-2">
          <li>Member is found to be of unsound mind.</li>
          <li>Member’s actions harm the image or reputation ofOrgacure India.</li>
          <li>
            Member acts against the ethics and values or does not conform to the mission and vision of the corporation.
          </li>
        </ul>
      </div>
    </div>
      </div>
  );
};

export default Membership;
