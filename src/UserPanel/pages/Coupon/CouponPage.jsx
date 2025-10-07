import React, { useEffect, useState } from 'react';
import Coupon from './Coupon';
import Footer1 from '../../../Component/Footer1';
import { getDashboradData } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';

const CouponPage = () => {
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
      <Coupon data={dashboard} />
      <Footer1 />
    </div>
  );
};

export default CouponPage;
