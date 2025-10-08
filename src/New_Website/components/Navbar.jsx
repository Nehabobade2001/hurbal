import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Heart } from 'lucide-react';
import { MainContent } from '../../constants/mainContent';
import { IoIosArrowRoundForward, IoMdHome } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Routers } from '../../constants/Routes';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(open => !open);

  const user = useSelector((state) => state.auth);
  const isLoggedIn = user?.token;
  const role = user?.role;
  const userID = user?.user?.username

  const handleAuthAction = () => {
    if (isLoggedIn) {
      if (role === 'user') {
        navigate(Routers.UserPanel);
      } else if (role === 'franchise') {
        navigate(Routers.FranchisePanel);
      } else {
        console.warn('Unrecognized role:', role);
      }
    } else {
      navigate(Routers.Login);
    }
  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* <Link to="/" className="text-2xl font-bold text-primary-800">
            LuxeMarket
          </Link> */}

          <Link to={"/"}>
            <img src={MainContent.logo1} alt="logo" className="lg:w-32  md:w-28 w-20 h-32" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {[
                // { to: '/', label: 'Home', end: true },
                // { to: '/products', label: 'Shop' },
                // { to: '/collections', label: 'Collections' },
                // { to: Routers.aboutUs, label: 'About' },
                // {to: Routers.FranchiseList, label:' Franchise List'},
                // {to: Routers.PriceList, label:' Price List'},
                // { to: Routers.contact, label: 'Contact Us' },
              ].map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `font-medium hover:text-primary-600 transition ${isActive || isScrolled ? 'text-primary-600' : 'text-gray-800'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* {[{ Icon: Search, label: 'Search' },
            { Icon: Heart, label: 'Wishlist' },
            { Icon: User, label: 'Account' }].map(({ Icon, label }) => (
              <button
                key={label}
                className="hover:text-primary-600 transition-colors text-gray-700"
                aria-label={label}
              >
                <Icon size={20} />
              </button>
            ))} */}
            <Link to={'/cart'}>
              <button
                className="hover:text-primary-600 transition-colors relative text-gray-700"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {/* <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span> */}
              </button>
            </Link>
            {/* <button className="md:hidden" onClick={toggleMenu} aria-label="Menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button> */}

            <button
              onClick={handleAuthAction}
              className="text-white md:text-sm text-xs flex items-center gap-3"
            >
              {isLoggedIn ? (
                <>
                  <div
                    className={`flex items-center gap-2  px-3  md:px-4 py-2 rounded-md
                        bg-bg-color`}
                  >
                    {userID}
                    <FaRegUserCircle className="md:text-2xl text-lg" />
                  </div>
                </>
              ) : (
                <>
                  <div className='flex items-center gap-2 bg-primary-500 px-3  md:px-4 py-2 rounded-md'>
                    Login <IoIosArrowRoundForward className="md:text-2xl  text-lg" />
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 py-4' : 'max-h-0'
          }`}
      >
        <div className="container-custom bg-white">
          <ul className="space-y-4 py-2">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/aboutUs', label: 'About' },
              {to: '/franchise-list', label:' Franchise List'},
              {to: '/price-list', label:' Price List'},
              { to: '/products', label: 'Shop' },
              { to: '/collections', label: 'Collections' },
            ].map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `block font-medium py-2 ${isActive ? 'text-primary-600' : 'text-gray-800'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
