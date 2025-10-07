import React, { useEffect, useState } from 'react';
import OrderTable from '../../../Component/OrderTable.jsx';
import Footer1 from '../../../Component/Footer1';
import { getOrders } from '../../../api/user.api.js';
import { useSelector } from 'react-redux';
import PageLoader from '../../../Component/PageLoader.jsx';

const OrderHistory = () => {
    const user = useSelector(store => store?.auth);
    const userId = user?.user?._id;
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await getOrders(userId);
            setOrders(response?.data.orders || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    

    return (
        <div className='flex flex-col gap-5'>
            <h2 className="text-base font-medium text-black/80 ">All Orders History</h2>
            <OrderTable data={orders} isLoading={isLoading} />
            {isLoading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
