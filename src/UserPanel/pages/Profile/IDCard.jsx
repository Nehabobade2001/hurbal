import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import defaultProfile from "../../../assets/manageMembers/defaultProfile.png";
import idcardlogo from '../../../assets/images/idcardlogo.png';
import { MainContent } from '../../../constants/mainContent';

const IDCard = () => {
    const cardRef = useRef();
    const user = useSelector((state) => state.auth);
    const userDetails = user?.user;
    const fullName = `${userDetails?.name?.firstName || ""} ${userDetails?.name?.lastName || ""}`.trim();

    const handleDownload = () => {
        if (cardRef.current) {
            html2canvas(cardRef.current).then((canvas) => {
                const link = document.createElement('a');
                link.download = `${fullName || "IDCard"}.png`;
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <div ref={cardRef} className="w-80 mx-auto bg-white shadow-xl rounded-xl flex flex-col gap-1 overflow-hidden border border-gray-200"
            style={{ backgroundImage: 'linear-gradient(to right, #4e65ab, #323d87)' }}>
                <div className='w-full py-5  flex flex-col gap-4 items-center justify-center'>
                    <div className='w-20 h-4 rounded-full bg-bg-color1'></div>
                    <div className='w-full flex items-center gap-2 justify-center px-4 text-white'>
                        <div className='bg-bg-color1 p-1 rounded-md'>
                            <img src={MainContent.logo1} className='h-10 object-contain' alt="ID Logo" />
                        </div>
                    </div>
                </div>

                {/* <div className='bg-bg-color h-1 w-full'></div> */}

                <div className="flex flex-col p-3 items-center bg-white">
                    <div className="w-32 h-28 rounded-lg overflow-hidden border-2 border-primary-500 mb-3">
                        <img
                            src={userDetails?.picture || defaultProfile}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-lg font-semibold">
                        {fullName || "No Name"}{" "}
                        <span className='text-xs text-gray-500'>
                            ({userDetails?.profession || "No Profession"})
                        </span>
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">User Id: {userDetails?.userId || "N/A"}</p>
                    <p className="text-sm text-gray-400 mt-1">Gender: {userDetails?.gender || "N/A"}</p>
                    <p className="text-sm text-gray-400 mt-1">
                        DOB: {userDetails?.dob ? new Date(userDetails.dob).toLocaleDateString() : "N/A"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Mobile: {userDetails?.mobileNo || "N/A"}</p>
                </div>

                <div className='w-full h-10  text-white text-sm flex items-center justify-center'
                style={{ backgroundImage: 'linear-gradient(to right, #67af37, #356734)' }}>
                    <p>https://uniquedirectselling.in/</p>
                </div>
            </div>

            <button
                onClick={handleDownload}
                className='mt-4 bg-bg-color text-white px-4 py-2 rounded-md hover:bg-bg-color1 transition-all duration-200'
            >
                Download ID Card
            </button>
        </div>
    );
};

export default IDCard;
