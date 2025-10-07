import React from 'react';
import { Link } from 'react-router-dom';
const Cancellation = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 mt-16 md:mt-20">

      <div className="px-6 md:px-20 py-10 bg-white text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Cancellation And Refunds Policy{" "}
        <span className="inline-block w-10 h-1 bg-indigo-900 ml-2 align-middle"></span>
      </h1>

      <p className="mb-6">
        If you are not satisfied with your purchase, please contact us by Phone,
        we’ll solve immediately, else you can proceed further to refund policy as
        mentioned below:
      </p>

      <ol className="list-decimal space-y-6 pl-5">
        <li>
          Your item must be in its original unused condition to be returned,
          unless there is a manufacturer defect. You may request a return within
          upcoming Sunday of the receipt of the product.
        </li>

        <li>
          For each individual order, we select a shipping method that will
          provide both value and speedy delivery. Standard shipping methods like
          Private Courier services. <br />
          <strong>How To Return An Item:</strong> If unfortunately you have to
          cancel an order, please do so within 24 hours of placing the order.
          <br />
          <strong>For outright cancellations by you:</strong> To
          exchange/return the goods if they have any manufacturing defect or the
          goods purchased are not useful for the purpose it was meant, within
          upcoming Sunday from the date of purchase, provided any
          seal/protection on the goods is kept unbroken.
        </li>

        <li>
          Please send an email to{" "}
          <a
            href="mailto:uniquedirectselling@gmail.com"
            className="text-orange-500 font-medium"
          >
            uniquedirectselling@gmail.com
          </a>{" "}
          to request a refund and we will process it accordingly.
          <br />
          Also, send the Products to the company head office or authorized sale
          point as per billing conditions.
        </li>

        <li>
          Your Package should include a signed letter stating the reason for your
          return along with the original invoice or delivery challan and ID,
          ADDRESS Proof to the company with the goods. <br />
          <strong>Return Exceptions:</strong> No items can be returned if they
          are opened.
        </li>
      </ol>

      <div className="mt-8 space-y-4">
        <p>
          If you think you have received the product in a bad condition or if the
          packaging is tampered with or damaged before delivery, please refuse to
          accept the package and return it to the delivery person. Also, please
              call our customer care at +91-96693 59455 or email us at{" "}
          <a
            href="mailto:uniquedirectselling@gmail.com"
            className="text-orange-500 font-medium"
          >
            uniquedirectselling@gmail.com
          </a>{" "}
          mentioning your Customer ID.
        </p>
        <p>
          We will personally ensure that a brand new replacement is issued to you
          at no additional cost within 7 working days. Please ensure that the
          original product tag and packing is intact when you send the product
          back. Return duration is 10 days.
        </p>
        <p>
          Apart from conditions reserved herein above, the following products
          shall not be eligible for return or replacement:
        </p>

        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Any product that exhibits physical damage to the box or the product
            after receiving from delivery boy.
          </li>
          <li>
            Any product that is returned without all original packaging including
            the retail box originally included with the product at the time of
            delivery.
          </li>
          <li>
            Any product without a valid, readable, untampered serial number,
            including but not limited to products with missing, damaged, altered,
            or otherwise unreadable serial number/Batch number.
          </li>
        </ol>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Restocking Fee and Refund:</h2>
          <p>
            There are no restocking fees. But, we also do not refund the original
            shipping and handling that you paid on the order; this will be
            deducted from your refund.
          </p>
          <p>
            Refunds will be made in the same form that the payment is received
            within 10 working days from the date of return of products.
          </p>
        </div>
      </div>
    </div>

     
    </div>
    </div>
  );
};

export default Cancellation;
