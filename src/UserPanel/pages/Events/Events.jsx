import React, { useEffect, useState } from 'react';
import { getDashboradData, getEvents } from '../../../api/user.api';
import PageLoader from '../../../Component/PageLoader';
import WalletComponentCard from '../E-pin/Wallet_Component';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Events = () => {
    const [events, setEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const response = await getEvents();
            setEvents(response?.data?.data || {});
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <>
            {isLoading && <PageLoader />}
            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'>
                {events?.map((event, index) => {
                    return (
                        <div
                            key={index}
                            className="break-inside-avoid bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                        >
                            <h1 href="#" className='w-full'>
                                <img className="rounded-t-lg w-full object-cover" src={event.image} alt="" />
                            </h1>
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.description}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    );
};

export default Events;

// const EventCard = ({ title, image, date }) => {
//     return (
//         <div className="bg-gray-100 text-black rounded-xl shadow-lg p-4 flex flex-col items-start w-full md:max-w-xs gap-2">
//             <div className="relative w-full h-auto overflow-hidden rounded-lg">
//                 <Swiper
//                     slidesPerView={1}
//                     autoplay={{ delay: 3000, disableOnInteraction: false }}
//                     loop={true}
//                     speed={3000}
//                     spaceBetween={10}
//                     modules={[Autoplay, Pagination, Navigation]}
//                     navigation={{
//                         nextEl: '.swiper-button-next-custom',
//                         prevEl: '.swiper-button-prev-custom',
//                     }}
//                     pagination={{ clickable: true }}
//                     className="w-full"
//                 >
//                     {image.map((image, index) => (
//                         <SwiperSlide key={index}>
//                             <img
//                                 src={image}
//                                 className="w-full h-full object-cover pointer-events-none"
//                                 alt={`Slide ${index + 1}`}
//                             />
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//                 {/* <div className="swiper-button-prev-custom absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white md:text-3xl text-sm p-2 bg-bg-color rounded-full" onClick={() => swiper.slidePrev()}>
//             <IoIosArrowBack />
//           </div>
//           <div className="swiper-button-next-custom absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white md:text-3xl text-sm p-2 bg-bg-color rounded-full"
//             onClick={() => swiper.slideNext()}>
//             <IoIosArrowForward />
//           </div> */}
//             </div>
//             <p className="text-2xl mt-2 capitalize">
//                 {title} <span className='text-xs text-black/45 ml-2'>{dateFormat(date)}</span>
//             </p>
//         </div>
//     );
// };
