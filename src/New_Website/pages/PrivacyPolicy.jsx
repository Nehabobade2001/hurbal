import React from 'react';
import privacy_policy from '../../assets/images/privacy-policy.avif'

const PrivacyPolicy = () => {
    const policies = [
        "I am providing my personal information and interested in enrolling myself as independent Distributor with Company and the Sponsor has agreed to use his/her FCID for the same.",
        "I am also aware that the Company is not providing any job to me and also understands that the Company deals in quality products by using direct selling strategy to promote and sale of its products through its Independent Distributors. I also understand that Company never provide any investment opportunity or guaranteed income or return.",
        "I confirm that I am aware about the business opportunities with the Company where I can purchase the products in multiple tranches as per my own flexibility for self-consumption or resale.",
        "I understand that there is no joining, training or renewal fees and I have not paid any sum to anyone including the Company on account of my joining, training, or renewal as an independent Distributor of Company.",
        "Decision to do business with Company is solely vested in me and being an independent Distributor I have not been forced, misled or coerced to make any purchase of the products.",
        "I understand that my appointment as independent Distributor of Company will be on principal to principal basis and I am aware that I am neither employee nor an agent of Company.",
        "I have been Provided with and I have undergone free Orientation Program which has provided fair and accurate information on all aspects of Company’s direct selling operations, about free joining, its incentives system, policies on Return and Refund within 17 days’, Return to Origin, expected business ethics and related rights and obligations as governed under the policies of Company read with the Guidelines of Ministry of Consumer Affairs, as amended or modified from time to time.",
        "I further understand that this application and any ensuing Company Distributorship upon acceptance of this application by Company shall be subject to the above Terms and Conditions, my Independent Distributor Contract and other applicable policies of the Company including the constituent documents as amended from time to time.",
        "I confirm and undertake to keep my details updated with the Company in case of any subsequent change in future.",
        "I understand and agree that my information provided in connection herewith shall be used in accordance with applicable laws in India.",
        "I have read and understood the business guidelines and code of ethics of the Company and I shall be abiding by them.",
        "I am signing this under my own free will and the information are true and correct.",
        "I agree to sign each page of the Form and Direct Seller’s Contract for sending it alongwith self-attested copy of AADHAR, Cancelled Cheque or Bank Passbook, to the Company at address mentioned on application form within 10 days from the date of sign-up.",
        "I am aware that the Distributorship with the Company shall be subject to receipt of complete Documents and successfull verification. The Company reserves the right to reject the application for any reason and to terminate or revoke distributorship for any reasons including but not limited to provision of incomplete, inaccurate, false or misleading information.",
        "I hereby grant my consent to the Company for conducting e-KYC for authentication of my documents including AADHAR and PAN. By signing up, I expressly authorize the Company, which will override my DND registration, to send communications on my mobile."
    ];

    return (
        <div className="p-5 pt-28 pb-20 text-gray-800  bg-white flex flex-col gap-5 ">
            <div>
                <img src={privacy_policy} className="w-full h-96 object-cover" alt="" />
            </div>
            <div className="my-4 shadow rounded-md">
                <div
                    className='p-4 bg-gray-400 text-white rounded-t-md flex items-center justify-between cursor-pointer'
                >
                    <h2 className="text-lg sm:text-xl font-bold uppercase">Privacy and Policy of Company</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 p-4 bg-white border-l-4 rounded-b-md border-green-400">
                    {policies.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
