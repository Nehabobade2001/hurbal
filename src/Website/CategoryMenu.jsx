import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';

const categoryData = {
  "Men & Women": {
    "Clothing": ["Men Jeans", "Women Jeggings", "Trousers"],
    "Grooming": ["Perfumes", "Deodrants", "Hair Groom"],
    "Footware": ["Casual", "Boots", "Slippers"]
  },
  "Electronics": {
    "Mobiles": ["Smartphones", "Feature Phones"],
    "Computers": ["Laptops", "Desktops", "Monitors"],
    "Accessories": ["Chargers", "Headphones", "Cables"]
  },
  "Home & Furniture": {
    "Living Room": ["Sofas", "Tables", "Chairs"],
    "Kitchen": ["Cookware", "Storage", "Appliances"],
    "Bedroom": ["Beds", "Wardrobes", "Mattresses"]
  },
  "Sport & Fitness": {
    "Fitness Equipment": ["Treadmills", "Dumbbells", "Yoga Mats"],
    "Outdoor Sports": ["Cricket", "Football", "Badminton"],
    "Clothing": ["Tracksuits", "Sports Shoes", "Socks"]
  },
  "Kids Store": {
    "Toys": ["Action Figures", "Educational", "Remote Cars"],
    "Clothing": ["T-Shirts", "Shorts", "Sweaters"],
    "School Supplies": ["Bags", "Bottles", "Stationery"]
  }
};

const tabs = Object.keys(categoryData);

const CategoryMenu = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize(); // initialize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTab = (tab) => {
    setActiveTab(prev => prev === tab ? null : tab);
    setActiveSubcategory(null);
  };

  const toggleSubcategory = (sub) => {
    setActiveSubcategory(prev => prev === sub ? null : sub);
  };

  return (
    <div className="relative w-full bg-bg-color rounded">
      {/* Top Tabs */}
      <div className="flex flex-wrap gap-4 px-4 py-2 border-b">
        {tabs.map(tab => (
          <div
            key={tab}
            className="cursor-pointer text-bg-color1 flex items-center gap-2"
            onClick={() => isMobile && toggleTab(tab)}
            onMouseEnter={() => !isMobile && setActiveTab(tab)}
          >
            {tab}
            <span>{(isMobile && activeTab === tab) ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
          </div>
        ))}
      </div>

      {/* Dropdown (Desktop: hover, Mobile: click) */}
      {(activeTab && categoryData[activeTab]) && (
        <div
          className={`w-full ${isMobile ? 'block' : 'absolute left-0'} bg-white shadow-md z-50 px-4 py-4 border-t border-bg-color1`}
          onMouseLeave={() => !isMobile && setActiveTab(null)}
        >
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
            {Object.entries(categoryData[activeTab]).map(([sub, items]) => (
              <div key={sub}>
                <div
                  className="text-md font-semibold text-bg-color flex justify-between items-center cursor-pointer"
                  onClick={() => isMobile && toggleSubcategory(sub)}
                >
                  {sub}
                  {isMobile && (
                    <span>{activeSubcategory === sub ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                  )}
                </div>

                {/* Subcategory Items */}
                {(!isMobile || activeSubcategory === sub) && (
                  <ul className="mt-2 space-y-1">
                    {items.map(item => (
                      <li key={item} className="text-sm text-bg-color flex items-center gap-1 cursor-pointer">
                        <IoIosArrowForward /> {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;
