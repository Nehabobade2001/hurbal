import React, { useEffect, useState } from 'react'
import PayoutComponent from './PayoutComponent '
import Footer1 from '../../../Component/Footer1'
import PageLoader from '../../../Component/PageLoader';
import { getDashboradData } from '../../../api/user.api';

const PayoutPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await getDashboradData();
      setDashboard(response?.data || {});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <PageLoader/>
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-5'>
        <PayoutComponent dashboard={dashboard} isLoading={isLoading}/>
        <Footer1/>
    </div>
  )
}

export default PayoutPage