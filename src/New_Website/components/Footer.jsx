import { Link, Router } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Routers } from '../../constants/Routes';
import { MainContent } from '../../constants/mainContent';

const Footer = () => {
  return (
    <footer className="bg-[#1F934A] text-gray-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-8 gap-5">
          <div className="space-y-2">
            <Link to="/" className="md:text-xl text-lg font-bold text-white">
              Herbal India
            </Link>
            {/* <p className="text-gray-400 mt-2">
              H. No.04 Chamapk Nagar ,
              Bhetapara , Near Bharat Pet,
              Beltola, GMC Kamrup,
              Pincode - 781028 , ASSAM INDIA
            </p> */}

            <p className="text-gray-400 mt-2">Herbal INDIA was born out of a powerful vision—led by leaders, innovators, philanthropists, and entrepreneurs who believed in one core idea: to give the common man a platform for true empowerment. A place where dignity is upheld, choices are celebrated, and the greatest dream of all—financial freedom—becomes possible.

            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61575750372570" className="text-gray-400 hover:text-white transition text-sm md:text-base">
                <Facebook size={20} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition text-sm md:text-base">
                <Twitter size={20} />
              </a> */}
              {/* <a
  href="https://www.instagram.com/aetheric_dynamics?igsh=ZDA5dmlxbnk2Ymlm"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-white transition text-sm md:text-base"
>
  <Instagram size={20} />
</a> */}

              {/* <a href="#" className="text-gray-400 hover:text-white transition text-sm md:text-base">
                <Youtube size={20} />
              </a> */}
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Corporate Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to={Routers.cancellation} className="text-gray-400 hover:text-white transition text-sm md:text-base">

                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to={Routers.membership} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Membership Terms & Conditions
                </Link>
              </li>
              {/* <li>
                <a
                  href="/pdfs/adm ppt.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition text-sm md:text-base"
                >
                  Incentive Plan
                </a>
              </li> */}
              {/* <li>
                <a
                  href="/pdfs/adm ppt.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition text-sm md:text-base"
                >
                  Rewards
                </a>
              </li> */}

              {/* <li>
                <a
                  href="/pdfs/Certificates.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition text-sm md:text-base"
                >
                  Compliance Documents
                </a>
              </li> */}

              <li>
                <Link to={Routers.disclaimer} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to={Routers.privacy} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={Routers.shipping} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to={Routers.terms} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to={Routers.selfdeclaration} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Self Declaration
                </Link>
              </li>
              {/* <li>
                <Link to={Routers.compliances} className="text-gray-400 hover:text-white transition text-sm md:text-base">
     Compliances Documents
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to={Routers.bankers} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Bankers
                </Link>
              </li>
              <li>
                <Link to={Routers.missionVissionValues} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Mission, Vision & Values
                </Link>
              </li>
              <li>
                <Link to={Routers.legals} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Legals
                </Link>
              </li>
              <li>
                {/* <Link to={Routers.downloads} className="text-gray-400 hover:text-white transition text-sm md:text-base">
           Downloads
                </Link> */}
              </li>
              <li>
                <Link to={Routers.grievance} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Grievance
                </Link>
              </li>
              <li>
                <Link to={Routers.contact} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white"> Get in Touch</h3>
            <div className=" text-gray-400 hover:text-white transition text-sm md:text-base">

              <p className='text-gray-400  text-sm md:text-base'>
                566 Floor,<br />
                404 B, prifix Complex<br />
                RNT Marg, Indore<br />
                City/Town/Village: Bhopal<br />
                District: Bhopal<br />
                State: Madhya Pradesh<br />
                PIN Code: 4520676
              </p>
              <p className="text-gray-400  text-sm md:text-base">
                {/* CIN:U14101AS2024PTC026780 <br />
              GSTIN:23ABBCA1033C1ZO <br /> */}
                Mobile: +91-9520501840 <br />
                Email: {MainContent.email}<br />
              </p>
            </div>
          </div>
        </div>


        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Herbal India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
