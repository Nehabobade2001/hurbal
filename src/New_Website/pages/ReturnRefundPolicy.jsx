import React from "react";
import BANNER_RETURN from '../../assets/images/BANNER_RETURN.png'

const ReturnRefundPolicy = () => {
    return (
        <div className="p-5 bg-white text-gray-800  space-y-8 pt-28 pb-20" >
            <div>
                <img src={BANNER_RETURN} className="w-full h-full object-cover" alt="" />
            </div>

            <section className="border border-red-300 bg-red-100 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Return and Refund Policy</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                   Herbal India ("<strong>Company</strong>" or "<strong>Aetheric</strong>") is glad for you to be part of our community and for having a shopping experience on https://admfashion.com (hereinafter referred to as the "<strong>Platform</strong>").
                    </li>
                    <li>
                        It is Completely understood that company is not taking any charge except the amount on shopping which is taken and the product is provided to the Person in return and after the shopping the incentive is generated on the basis of reference or purchasing from the company and all the taxes have been paid to the government of India.
                    </li>
                    <li>
                        This policy describes our user friendly Return and refund policy and each refund and return matter will be dealt on the basis of this policy only.
                    </li>
                    <li>To get updated kindly, please visit website frequently.</li>
                </ul>
            </section>

            <section className="border border-red-300 bg-red-100 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Policy is as under:</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        The company does not accept any amount except the amount of purchasing/shopping. Goods sold will only be refunded under 15 days of generation of invoice.
                    </li>
                    <li>
                        If any person/distributor placed online order and made the payment in the account of the company using the digital payment modes available on the platform, then he/she can ask for the refund of money from the company.
                    </li>
                    <li>
                        The person who placed the order and made the payment to the company is eligible for full refund against the goods.
                    </li>
                    <li>
                        That after raising the invoice and dispatching the goods, the person who raised the refund will be entitled for refund after the deduction of shipping charges for the purchase made by him/her within 15 days from raising the invoice.
                    </li>
                    <li>
                        That no person can ask for refund from the company after expiry of 15 days from placing the order with the company and it is made clear company will not return the money or exchange the product.
                    </li>
                    <li>
                        If any person made a request for return of his/her money after receipt of goods within 15 days from placing the order, he will return the goods to the company in unused and intact condition as delivered by the company, in case any discrepancy has been found in the goods, than the company will not accept the goods and company will not return any amount.
                    </li>
                </ul>
            </section>

            <section className="border border-red-300 bg-red-100 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Return Initiate:</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        You are requested to raise a refund and return request to your Marquis in the first place.
                    </li>
                    <li>
                        You must write us on our given whatsapp number <strong>+91-89649 69960</strong> or may mail us at <a href="mailto:admcare9@gmail.com">admcare9@gmail.com</a>
                    </li>
                    <li>
                        Only the written complaints will get registered with us obliging the above mentioned set of rules for the refund and return.
                    </li>
                </ul>
            </section>

            <section className="border border-red-300 bg-red-100 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Refund Initiate:</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Refund will be initiate only after receiving the goods in intact condition.</li>
                    <li>Refund will be only given according to the policy and it will be initiated only for the counted products received by the company.</li>
                    <li>Refund will be given to the original person in the registered account on the name of the person, no third party account will be accepted by the company.</li>
                    <li>
                        Company is only liable for the refund if the user have purchased the goods from the platform and have their invoice visible at the panel.
                    </li>
                    <li>Company will not entertain any return or refund request if you have paid any amount in someone’s personal account.</li>
                </ul>
            </section>
        </div>
    );
};

export default ReturnRefundPolicy;
