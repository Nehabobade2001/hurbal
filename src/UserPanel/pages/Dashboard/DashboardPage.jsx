import React, { useEffect, useState } from 'react';
import HeaderCard from './HeaderCard';
import Footer1 from '../../../Component/Footer1';
import NewMembers from './NewMembers';
import OrderHistoryReport from './OrderHistoryReport';
import { getDashboradData, getProfile } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';
import PersonalDetails from './PersonalDetails';
import MonthlySaleReport from './MonthlySaleReport';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../Redux/Reducer/authReducer';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import ChairmanStatusTable from './ChairmanStatusTable';
import { CiLocationOn } from 'react-icons/ci';
import { FaPhoneAlt } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await getDashboradData();
      setDashboard(response?.data || {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const getUserData = async () => {
      const data = await getProfile();
      if (data) {
        dispatch(loginSuccess({
          token: data?.data?.token,
          role: data?.data?.role,
          user: data?.data?.data
        }));
      }
    };
    getUserData();
  }, []);

  const user = useSelector((state) => state.auth);
  const userDetails = user?.user || {};
  const referralLink = user?.user?.userId;
  const userName = `${user?.user?.name?.firstName || ''} ${user?.user?.name?.middleName || ''} ${user?.user?.name?.lastName || ''}`.trim() || 'Company ID';
  const location = window.location.origin;
  const referCode = `${location}/register?referral=${referralLink}&username=${userName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referCode).then(() => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Referral link copied!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }).catch(err => {
      console.error("Copy failed", err);
    });
  };

   const chairmanStatusData = [
    {
      Leg1: 0.0,
      Leg2: 0.0,
      Leg3: 0.0,
      Nonambassador: 0.0,
    },
  ];
  // const userdetail= {
  //   location: "Bhattiyan pipalgoan, Khargone, Madhya Pradesh",
  //   phone: "7067647336",
  //   lastPayment: 3921.0,
  //   totalPayment: 17658.16,
  // };
  return (
    <div className="flex flex-col gap-5">
      <div className='bg-green-300 py-6 px-5 flex gap-1 items-center rounded-lg'>
        <p className='p-2 bg-white rounded-full px-6 text-sm break-all'>{referCode}</p>
        <button
          onClick={handleCopy}
          className='bg-bg-color px-6 text-sm py-2 rounded-full text-white'
        >
          Copy
        </button>
      </div>

      <HeaderCard data={dashboard} />
      <div>
        <PersonalDetails />
      </div>
       {/* <ChairmanStatusTable data={chairmanStatusData} /> */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card icon={<CiLocationOn />} title="My Location" member={userDetails?.address} />
        <Card icon={<FaPhoneAlt />} title="My Phone No." member={userDetails?.mobileNo} />
        <Card icon={<RiSecurePaymentLine />} title="Last Payment" member={userDetails.lastPayment || 0} />
        <Card icon={<RiSecurePaymentLine />} title="Total Payment" member={userDetails.totalPayment || 0} />
       </div>
    </div>
  );
};
const Card = ({icon, title, member }) => (
    <div className="p-4 bg-white border-2 border-white rounded-lg flex gap-2 flex-col justify-center items-center">
        <p className="text-gray-500 text-sm flex gap-2 items-center">{icon}<span>{title}</span></p>
        <p className="text-md font-bold text-center">{member}</p>
    </div>
);
export default DashboardPage;
