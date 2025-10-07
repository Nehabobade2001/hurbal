import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { Routers } from "./constants/Routes";
import Layout from './layout/Layout';
import DashboardPage from './UserPanel/pages/Dashboard/DashboardPage';
import Login from './UserPanel/pages/Login/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import ScrollToTop from './Component/ScrollToTop ';
import CartPage from './Website/CartPage';
import CheckoutPage from './Website/CheckoutPage';
import MainLayout from './New_Website/layouts/MainLayout';
import HomePage from './New_Website/pages/HomePage';
import ProductDetailPage from './New_Website/pages/ProductDetailPage';
import NotFoundPage from './New_Website/pages/NotFoundPage';
import ProductsPage from './New_Website/pages/ProductsPage';
import ReturnRefundPolicy from './New_Website/pages/ReturnRefundPolicy';
import { getProfile } from './api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './Redux/Reducer/authReducer';
import ForgotPassword from './UserPanel/pages/Password/ForgotPassword';
import ChangePassword from './UserPanel/pages/Password/ChangePassword';
import TermsAndCondition from './New_Website/pages/TermsAndCondition';
import PrivacyPolicy from './New_Website/pages/PrivacyPolicy';
import Transparency from './New_Website/pages/FooterPages/Transparency';
import Brand from './New_Website/pages/FooterPages/Brand';
import Downloads from './New_Website/pages/FooterPages/Downloads';
import Grievance from './New_Website/pages/FooterPages/Grievance';
import Shipping from './New_Website/pages/FooterPages/Shipping';
import Terms from './New_Website/pages/FooterPages/Terms';
import SelfDeclaration from './New_Website/pages/FooterPages/SelfDeclaration';
import AboutUs from './New_Website/pages/FooterPages/AboutUs';
import BenefitPage from './New_Website/pages/FooterPages/BenefitPage';
import Bankers from './New_Website/pages/FooterPages/Bankers';
import MissionVisionValues from './New_Website/pages/FooterPages/MissionVissionValue';
import ContactUs from './New_Website/pages/FooterPages/ContactUs';
import Cancellation from './New_Website/pages/FooterPages/Cancellation';
import Privacy from './New_Website/pages/FooterPages/Privacy';
import Membership from './New_Website/pages/FooterPages/Membership';
import Compliances from './New_Website/pages/FooterPages/Compliances';
import Disclaimer from './New_Website/pages/FooterPages/Disclaimer';
import BusinessPlans from './New_Website/pages/FooterPages/BusinessPlans';
import DistributorPromotion from './New_Website/pages/FooterPages/DistributorPromotion';
import CodeOfConduct from './New_Website/pages/FooterPages/CodeOfConduct';
import Collection from './New_Website/pages/Collection';
import DistributorRegister from './UserPanel/pages/CreateDistributor/DistributorRegistration';
import FranchiseLayout from './layout/FranchiseLayout';
import FranchiseDashboard from './FranchisePanel/FranchiseDashboard/FranchiseDashboard';
import { getFranchiseProfile } from './api/franchise.api';
import FranchiseProfile from './FranchisePanel/FranchiseProfile/FranchiseProfile';
import FranchiseChangePassword from './FranchisePanel/FranchiseChangePassword/FranchiseChangePassword';
import FranchisePaidPayment from './FranchisePanel/FranchisePaidPayment/FranchisePaidPayment';
import E_pinPage from './UserPanel/pages/E-pin/E_pinPage';
import ProfileForm from './UserPanel/pages/Profile/Profile';
import IDCard from './UserPanel/pages/Profile/IDCard';
import ChangePassword1 from './UserPanel/pages/Profile/ChangePassword1';
import DownlineMembers from './UserPanel/pages/DownlineMembers/DownlineMembers';
import ReferralMembers from './UserPanel/pages/ReferralMembers/ReferralMembers';
import OrderHistory from './UserPanel/pages/OrderHistory/OrderHIstory';
import Legals from './New_Website/pages/FooterPages/Legals';
import SaleList from './FranchisePanel/SaleList/SaleList';
import Invoice from './FranchisePanel/Invoice/Invoice';
import SalesDispatchList from './FranchisePanel/Sales Dispatch/SalesDispatchList';
import DistributorSalesFrom from './FranchisePanel/DistributorSales/DistributorSalesFrom';
import FranchiseSaleFrom from './FranchisePanel/FranchiseSale/FranchiseSaleFrom';

import OrderForm from './UserPanel/pages/OrderForm';
import E_pinList from './UserPanel/pages/E-pin/E_pinList';
import WalletPage from './UserPanel/pages/Wallet/WalletPage';
import Events from './UserPanel/pages/Events/Events';

  
import ApproveDistributorsOrder from './FranchisePanel/DistributorSales/ApproveDistributorsOrder';
import SaleDelivered from "./FranchisePanel/DistributorSales/SaleDelivered"

import ApproveFranchiseOrder from "./FranchisePanel/Sale/ApproveFranchiseOrder"
import FranchiseSale from "./FranchisePanel/Sale/FranchiseSale"
import FranchiseSaleDelivery from "./FranchisePanel/Sale/FranchiseSaleDelivery"
import FranchiseSaleDispatch from "./FranchisePanel/Sale/FranchiseSaleDispatch"
import FranchiseSalesList from "./FranchisePanel/Sale/FranchiseSalesList"

import MyPurchaseReport from "./FranchisePanel/StockDetail/MyPurchaseReport"
import StockOrderForm from "./FranchisePanel/StockDetail/StockOrderForm"

import OrderReport from "./FranchisePanel/StockDetail/OrderReport"
import ProductSaleReport from "./FranchisePanel/StockDetail/ProductSaleReport"
import ProductWiseStock from "./FranchisePanel/StockDetail/ProductWiseStock"
import StockReport from "./FranchisePanel/StockDetail/StockReport"
import Tree from './UserPanel/pages/DownlineMembers/Tree';
import FranchiseList from './Website/FranchiseList';
import PriceList from './Website/PriceList';
import FranchiseOrderHistory from './UserPanel/pages/Dashboard/FranchiseOrderHistory';
import Product12 from './New_Website/pages/Product12';

const RouterPages = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    const token = user?.token;
    const role = user?.role;

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getProfile();
            if (userData?.data) {
                dispatch(loginSuccess({
                    token: userData?.data?.token,
                    role: userData?.data?.role,
                    user: userData?.data?.data
                }));
            }
        };

        const fetchFranchiseData = async () => {
            const franchiseData = await getFranchiseProfile();
            if (franchiseData?.success) {
                dispatch(loginSuccess({
                    token: franchiseData?.token,
                    role: franchiseData?.role,
                    user: franchiseData?.data
                }));
            }
        };

        fetchUserData();
        fetchFranchiseData();
    }, [dispatch]);

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path={Routers.Login} element={<Login />} />
                <Route path={Routers.register} element={<DistributorRegister />} />
                <Route path={Routers.forgotPassword} element={<ForgotPassword />} />
                <Route path={Routers.ChangePassword} element={<ChangePassword />} />
                <Route path={Routers.webiste} element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                   

                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products12" element={<Product12 />} />
                    <Route path="products/:id" element={<ProductDetailPage />} />
                    <Route path="collections" element={<Collection />} />
                    <Route path={Routers.Cart} element={<CartPage />} />

                    <Route path={Routers.FranchiseList} element={<FranchiseList/>} />
                    <Route path={Routers.PriceList} element={<PriceList/>} />
                    
                    <Route path={Routers.Checkout} element={<CheckoutPage />} />
                    <Route path={Routers.ReturnRefundPolicy} element={<ReturnRefundPolicy />} />
                    <Route path={Routers.TermsAndCondition} element={<TermsAndCondition />} />
                    <Route path={Routers.PrivacyPolicy} element={<PrivacyPolicy />} />
                    <Route path={Routers.Transparency} element={<Transparency />} />
                    <Route path={Routers.Brand} element={<Brand />} />
                    <Route path={Routers.benefitPage} element={<BenefitPage />} />
                    {/* <Route path={Routers.aboutUs} element={<AboutUs />} /> */}
                    <Route path={Routers.aboutUs} element={<AboutUs />} />
                    <Route path={Routers.bankers} element={<Bankers />} />
                    <Route path={Routers.legals} element={<Legals />} />
                    <Route path={Routers.downloads} element={<Downloads />} />
                    <Route path={Routers.cancellation} element={<Cancellation />} />
                    <Route path={Routers.membership} element={<Membership />} />
                    <Route path={Routers.disclaimer} element={<Disclaimer />} />
                    <Route path={Routers.privacy} element={<Privacy />} />
                    <Route path={Routers.grievance} element={<Grievance />} />
                    <Route path={Routers.shipping} element={<Shipping />} />
                    <Route path={Routers.terms} element={<Terms />} />
                    <Route path={Routers.compliances} element={<Compliances />} />
                    <Route path={Routers.selfdeclaration} element={<SelfDeclaration />} />
                    {/* <Route path={Routers.legals} element={<Legals />} /> */}
                    <Route path={Routers.missionVissionValues} element={<MissionVisionValues />} />
                    <Route path={Routers.contact} element={<ContactUs />} />
                    <Route path={Routers.businessPlan} element={<BusinessPlans />} />

                    <Route path={Routers.distributorPromotion} element={<DistributorPromotion />} />
                    <Route path={Routers.codeConduct} element={<CodeOfConduct />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                {token && role === "user" && (
                    <Route path={Routers.UserPanel} element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<DashboardPage />} />
                        <Route path={Routers.Epin} element={<WalletPage/>} />
                        <Route path={Routers.Events} element={<Events />} />
                        <Route path={Routers.AddFund} element={<E_pinPage />} />
                        <Route path={Routers.FundHistory} element={<E_pinList/>} />
                        <Route path={Routers.Profile} element={<ProfileForm />} />
                        <Route path={Routers.IdCard} element={<IDCard />} />
                        <Route path={Routers.ResetPassword} element={<ChangePassword1 />} />
                        <Route path={Routers.Member} element={<ReferralMembers />} />
                        <Route path={Routers.Downline} element={<DownlineMembers />} />
                        <Route path={Routers.Tree} element={<Tree/>} />
                        
                        <Route path={Routers.OrderHistory} element={<OrderHistory />} />
                        <Route path={Routers.FranchiseOrderHistory} element={<FranchiseOrderHistory />} />
                        <Route path={Routers.order_form} element={<OrderForm />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                )}

                {token && role === "franchise" && (
                    <Route path={Routers.FranchisePanel} element={<FranchiseLayout />}>
                        <Route index element={<FranchiseDashboard />} />
                        <Route path={Routers.FranchiseProfile} element={<FranchiseProfile />} />
                        <Route path={Routers.FranchiseChangePassword} element={<FranchiseChangePassword />} />
                        <Route path={Routers.FranchisePaidPayment} element={<FranchisePaidPayment />} />
                        <Route path={Routers.FranchiseSaleList} element={<SaleList />} />
                        <Route path={Routers.FranchiseInvoice} element={<Invoice />} />
                        <Route path={`${Routers.FranchiseInvoice}/:id`} element={<Invoice />} />
                        <Route path={Routers.FranchiseSalesDispatchList} element={<SalesDispatchList />} />
                        <Route path={Routers.FranchiseDistributorSales} element={<DistributorSalesFrom />} />
                        <Route path={Routers.FranchiseFranchiseSale} element={<FranchiseSaleFrom />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path={Routers.ApproveDistributorsOrder} element={<ApproveDistributorsOrder/>} />
                        <Route path={Routers.SaleDelivered} element={<SaleDelivered/>} />
                        <Route path={Routers.FranchiseWallet} element={<WalletPage/>} />
                    
                    {/* sale routes  */}
                        <Route path={Routers.FranchiseSale} element={<FranchiseSale/>} />
                        <Route path={Routers.ApproveFranchiseOrder} element={<ApproveFranchiseOrder/>} />
                        <Route path={Routers.FranchiseSalesList} element={<FranchiseSalesList/>}/>
                        <Route path={Routers.FranchiseSaleDispatch} element={<FranchiseSaleDispatch/>} />
                        <Route path={Routers.FranchiseSaleDelivery} element={<FranchiseSaleDelivery/>} />


                        <Route path={Routers.MyPurchaseReport} element={<MyPurchaseReport/>} />

                        <Route path={Routers.StockOrderForm} element={<StockOrderForm />} />
                        
                       <Route path={Routers.OrderReport} element={<OrderReport/>} />
                        <Route path={Routers.ProductSaleReport} element={<ProductSaleReport/>} />
                        <Route path={Routers.ProductWiseStock} element={<ProductWiseStock/>} />
                        <Route path={Routers.StockReport} element={<StockReport/>} />
                    </Route>
                )}
            </Routes>
        </>
    );
};

export default RouterPages;
