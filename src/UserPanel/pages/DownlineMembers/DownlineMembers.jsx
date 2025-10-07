import React, { useEffect, useState } from 'react';
import { getDownlineMember } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';
import DownlineMemberList from './DownlineMemberList';

const DownlineMembers = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const response = await getDownlineMember();
            console.log("API Response:", response?.data);
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

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card title="Total Downline Members" member={dashboard?.count || "0"} />
                    <Card title="Active Downline Members" member={dashboard?.activeCount || "0"} />
                    <Card title="Inactive Downline Members" member={dashboard?.inactiveCount || "0"} />
                </div>
            </div>
            
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-4">Downline Members</h2>
                <DownlineMemberList referralMember={dashboard} />
            </div>

            {loading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </div>
    );
};

const Card = ({ title, member }) => (
    <div className="p-4 bg-white border-2 border-white rounded-lg flex gap-2 flex-col justify-center items-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{member}</p>
    </div>
);

export default DownlineMembers;

