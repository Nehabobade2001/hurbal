import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLoader from '../../../Component/PageLoader';
import { getAdminBankDetails } from '../../../api/admin.api';
const Bankers = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [bankers, setBankers] = useState(null);

  const fetchBankersData = async () => {
    try {
      setIsLoading(true);
      const response = await getAdminBankDetails();
      setBankers(response?.legal);
      console.log(response?.legal);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBankersData();
  }, [])

  return (
    <>
      {isLoading ? <PageLoader /> : (
        <div>
          {/* Hero Section */}
          <div className="bg-gradient-to-br mt-16 md:mt-20">

            {/* Bank Detail Section */}
            <div className="max-w-3xl mx-auto px-4 py-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#151875] mb-6 border-b-2 inline-block border-[#151875] pb-1">
                Bank Detail
              </h2>

              <p className="italic font-medium text-lg text-gray-800 mb-4">{bankers?.bankName}</p>

              <div className="mb-4">
                <img
                  src={bankers?.bankImage} // replace with your logo image path
                  alt="Bank of Baroda Bank Logo"
                  className="w-[200px] mb-4"
                />
                <p className="italic font-bold">
                  <span className="font-medium">Account Holder Name:</span> {bankers?.accountHolderName}
                </p>
                <p className="italic font-bold">
                  <span className="font-medium">A/C No.:</span> {bankers?.accountNumber}
                </p>
                <p className="italic font-bold">
                  <span className="font-medium">IFSC Code:</span> {bankers?.ifscCode}
                </p>
                <p className="italic font-bold">
                  <span className="font-medium">Branch:</span> {bankers?.branchName}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Bankers;
