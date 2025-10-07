import React, { useEffect, useState } from 'react';
import ReferralMemberList from './ReferralMemberList';
import {  getMyDownlineMember } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';

const ReferralMembers = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const response = await getMyDownlineMember();
            setDashboard(response?.data || {});
            console.log(response.data);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);


    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card title="Total Referral Members" member={dashboard?.data?.total || "0"} />
                </div>
            </div>
            <ReferralMemberList referralMember={dashboard} />

            {loading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </div>
    );
};

const Card = ({ title, member }) => (
    <div className="p-4 bg-white/30 border-2 border-white rounded-lg flex gap-2 flex-col justify-center items-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{member}</p>
    </div>
);

export default ReferralMembers;
