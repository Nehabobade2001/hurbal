import React from "react";
import Swal from "sweetalert2";

const Coupon = ({ data }) => {
  const coupons = data?.totalCoupons || [];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    Swal.fire({
      title: "Coupon Copied!",
      text: `Your code "${code}" has been copied to clipboard.`,
      icon: "success",
      confirmButtonColor: "#90479B",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {coupons.length > 0 ? (
        coupons.map((coupon, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex flex-col"
          >
            <div className="bg-gray-100 p-2 flex gap-4 justify-between items-center border-b">
              <span className="text-sm font-medium text-gray-600">Special Offer</span>
              <span className="text-gray-500 text-sm">
                Date: {new Date(coupon?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="p-4 text-center flex-1 flex items-center justify-center">
              <h2
                className={`text-2xl font-medium tracking-wider text-gray-800 ${
                  coupon.isUsed ? "line-through text-gray-400" : ""
                }`}
              >
                {coupon.code}
              </h2>
            </div>
            <div className="p-4 bg-gray-100 text-center">
              <div className="flex items-center gap-2">
                <button
                  className="w-full bg-bg-color text-sm text-white py-2 cursor-pointer rounded-md font-semibold hover:bg-bg-color transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={() => handleCopy(coupon.code)}
                  disabled={coupon.isUsed}
                >
                  Copy
                </button>
                <button
                  className="w-full bg-green-500 text-sm text-white py-2 cursor-pointer rounded-md font-semibold hover:bg-green-600 transition"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="lg:h-96 md:h-60 h-fit flex-col gap-5 flex items-center justify-center w-full col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4  rounded-lg bg-gray-100 text-gray-900">
          {/* <img className="h-40 mix-blend-multiply" src="https://static.vecteezy.com/system/resources/thumbnails/010/856/652/small_2x/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg" alt="" /> */}
          Data not found
        </div>
      )}
    </div>
  );
};

export default Coupon;
