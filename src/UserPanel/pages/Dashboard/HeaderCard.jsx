import React from 'react';
import { Routers } from '../../../constants/Routes';
import { Link, useNavigate } from 'react-router-dom';

const HeaderCard = ({ data }) => {
  const navigate = useNavigate();


  console.log("HeaderCard Data:", data);

  let CurrentMonthSP = data?.user?.tree?.monthlyLeftSP + data?.user?.tree?.monthlyRightSP || 0;
 let CurrentMonthPV =  data?.user?.tree?.monthlyLeftPV + data?.user?.tree?.monthlyRightPV || 0;

  const cards = [
    {
      title: "Total self SP",
      value: data?.user?.incomeDetails?.selfSP ?? 0,
      img: "https://img.icons8.com/3d-fluency/94/group--v2.png",
      color: "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400",
      route: Routers.Member,
      pathstate: "All",
    },
    {
      title: "Current Month SP",
      value: CurrentMonthSP ?? 0,
      img: "https://img.icons8.com/3d-fluency/94/group--v2.png",
      color: "bg-gradient-to-r from-blue-400 via-teal-400 to-green-400",
      route: Routers.Downline,
    },
    {
      title: "Total self PV",
      value: data?.user?.incomeDetails?.selfPV ?? 0,
      img: "https://img.icons8.com/3d-fluency/94/group--v2.png",
      color: "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400",
      route: Routers.Member,
      pathstate: "All",
    },
    {
      title: "Current Month PV",
      value: CurrentMonthPV ?? 0,
      img: "https://img.icons8.com/3d-fluency/94/group--v2.png",
      color: "bg-gradient-to-r from-blue-400 via-teal-400 to-green-400",
      route: Routers.Downline,
    },
    // {
    //   title: "Total self SP",
    //   value: data?.incomeDetails?.monthlySP ?? 0,
    //   img: "https://img.icons8.com/3d-fluency/94/stack-of-coins.png",
    //   color: "bg-gradient-to-r from-green-400 via-lime-400 to-yellow-300",
    //   route: Routers.Member,
    //   pathstate: "Active",
    // },
    // {
    //   title: "Total SP",
    //   value: ((data?.tree?.leftSP ?? 0) + (data?.tree?.rightSP ?? 0)),
    //   img: "https://img.icons8.com/3d-fluency/94/money-bag.png",
    //   color: "bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400",
    //   route: Routers.Member,
    //   pathstate: "Inactive",
    // },
    // {
    //   title: "Wallet Balance",
    //   value: `₹ ${data?.wallets?.purchaseWallet?.toFixed(2) ?? "0.00"}`,
    //   img: "https://img.icons8.com/3d-fluency/94/receive-cash.png",
    //   color: "bg-gradient-to-r from-pink-400 via-rose-400 to-red-300",
    // }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((stat, index) => (
        <div
          onClick={() => stat.route && navigate(stat.route, { state: stat.pathstate })}
          key={index}
          className={`px-4 py-3 relative cursor-pointer overflow-hidden text-white ${stat.color} border-2 border-white rounded-xl flex gap-2 justify-between items-center`}
        >
          <div className="space-y-2">
            <h4 className="text-lg font-bold">
              {stat.title}
            </h4>
            <h3 className="text-xl font-light">
              {stat.value}
            </h3>
          </div>
          <div>
            <div>
              <img src={stat.img} alt={stat.title} className="w-20 h-20" />
            </div>
          </div>

          <div className='w-32 h-32 bg-white/10 rounded-full absolute top-10 left-5 '></div>
          <div className='w-32 h-32 bg-white/10 rounded-full absolute bottom-10 right-5 '></div>
        </div>
      ))}
    </div>
  );
};

export default HeaderCard;