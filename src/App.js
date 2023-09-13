import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import ReportManagement from "./components/ReportManagement";
import RecentOrderDetails from "./components/RecentOrderDetails";
import OrderDetails from "./components/OrderDetails";
import OfferManagementEnable from "./components/OfferManagementEnable";
import OfferManagementDisable from "./components/OfferManagementDisable";
import OfferManagement from "./components/OfferManagement";
import OrderManagement from "./components/OrderManagement";
import OfferDetails from "./components/OfferDetails";
import NotificationManagement from "./components/NotificationManagement";
import Login from "./components/Login";
import LanguageSelection from "./components/LanguageSelection";
import Informations from "./components/Informations";
import HomeScreenBanner from "./components/HomeScreenBanner";
import HelpView from "./components/HelpView";
import Help from "./components/Help";
import ForgetPassword from "./components/ForgetPassword";
import EditProfile from "./components/EditProfile";
import Dashboard from "./components/Dashboard";
import ContentManagement from "./components/ContentManagement";
import ContactUs from "./components/ContactUs";
import ChangePassword from "./components/ChangePassword";
import CategoryManagement from "./components/CategoryManagement";
import AnnounceManagement from "./components/AnnounceManagement";
import ProductList from "./components/ProductList";
import Varification from "./components/Varification";
import UsersManagement from "./components/UsersManagement";
import UserDetails2 from "./components/UserDetails2";
import TransactionManagement from "./components/TransactionManagement";
import TransactionDetails from "./components/TransactionDetails";
import ThoughtsManagement from "./components/ThoughtsManagement";
import StaffManagement from "./components/StaffManagement";
import EditValues from "./components/EditValues";
import CoupanList from "./components/CoupanList";
import CreatCoupan from "./components/CreatCoupan";
import VerificationModal from "./components/VerificationModal";
import Agent from "./components/Agent";
import AgentDetails from "./components/AgentDetails";
import AgentInformation from "./components/AgentInformation";
import LoadingBar from "react-top-loading-bar";
import SubCategory from "./components/SubCategory";
import ProductManagement2 from "./components/ProductManagement2";
import ProductList2 from "./components/ProductList2";
import ProductManagementEdit from "./components/ProductManagementEdit";
import HomeScreenBanner2 from "./components/HomeScreenBanner2";
import GoogleMap from "./components/GoogleMap";
import BrandManagement from "./components/brand/BrandManagement";
import UserOfferPOsted from "./components/UserOfferPOsted";
import UserOfferPostedDetails from "./components/UserOfferPostedDetails";
import UserDetailsAll from "./components/UserDetailsAll";
import AgentDetailsAll from "./components/AgentDetailsAll";
import Dashboard2 from "./components/Dashboard2";
import ProductManagementEdit2 from "./components/ProductManagementEdit2";
import DashboardNew from "./components/DashboardNew";
import StoreSettings from "./components/configurations/StoreSettings";

function App() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Increment the progress value
      setProgress(100);
    }, 500); // Change the timeout duration as needed

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route exact className="active" path="/" element={<Login />} />
          <Route
            exact
            className="active"
            path="/dashboard"
            element={<DashboardNew setProgress={setProgress} />}
          />
          {/* <Route
            exact
            className="active"
            path="/dashboard"
            element={<Dashboard setProgress={setProgress} />}
          /> */}
         {/* <Dashboard2/> */}
         {/* <DashboardNew/> */}
          <Route
            exact
            className="active"
            path="/users"
            element={<UsersManagement setProgress={setProgress} />}
          />
          <Route
            exact
            className="active"
            path="/users-offer"
            element={<UserOfferPOsted setProgress={setProgress} />}
          />
          <Route
            exact
            className="active"
            path="/users-offer-details"
            element={<UserOfferPostedDetails setProgress={setProgress} />}
          />
          <Route exact className="active" path="/map" element={<GoogleMap />} />
          <Route
            exact
            className="active"
            path="/agents"
            element={<Agent setProgress={setProgress} />}
          />
          <Route
            exact
            className="active"
            path="/agents-details"
            element={<AgentDetails />}
          />
          <Route
            exact
            className="active"
            path="/agents-information/:id"
            element={<AgentDetailsAll />}
          />
          {/* <Route
            exact
            className="active"
            path="/agents-information/:id"
            element={<AgentInformation />}
          /> */}

          <Route
            exact
            className="active"
            path="/categories"
            element={<CategoryManagement setProgress={setProgress} />}
          />
          <Route
            exact
            className="active"
            path="/sub-categories"
            element={<SubCategory setProgress={setProgress} />}
          />
          <Route
            exact
            className="active"
            path="/product-management"
            element={<ProductManagement2 setProgress={setProgress} />}
          />
          <Route
            exact
            className="active"
            path="/brand-management"
            element={<BrandManagement />}
          />

          <Route
            exact
            className="active"
            path="/product-management-edit/:id"
            element={<ProductManagementEdit2 setProgress={setProgress}/>}
          />
          {/* <Route
            exact
            className="active"
            path="/product-management-edit/:id"
            element={<ProductManagementEdit />}
          /> */}
          {/* <ProductManagement2/> */}
          {/* <ProductManagementEdit2/> */}

          <Route
            exact
            className="active"
            path="/products"
            element={<ProductList2 setProgress={setProgress} />}
          />
          {/* <ProductList2/> */}
          <Route
            exact
            className="active"
            path="/offers"
            element={<OfferManagement setProgress={setProgress} />}
          />
          <Route
            exact
            className="active"
            path="/orders"
            element={<OrderManagement />}
          />
          <Route
            exact
            className="active"
            path="/staff"
            element={<StaffManagement />}
          />
          <Route
            exact
            className="active"
            path="/transactions"
            element={<TransactionManagement />}
          />
          <Route
            exact
            className="active"
            path="/reports"
            element={<ReportManagement />}
          />
          <Route
            exact
            className="active"
            path="/Home-Screen-banners"
            element={<HomeScreenBanner2 />}
          />
          {/* <HomeScreenBanner2/> */}
          <Route
            exact
            className="active"
            path="/notification-management"
            element={<NotificationManagement />}
          />
          <Route
            exact
            className="active"
            path="/announcement-management"
            element={<AnnounceManagement />}
          />
          <Route
            exact
            className="active"
            path="/thoughts-management"
            element={<ThoughtsManagement />}
          />
          <Route
            exact
            className="active"
            path="/content-management"
            element={<ContentManagement />}
          />
          <Route
            exact
            className="active"
            path="/informations"
            element={<Informations setProgress={setProgress} />}
          />
          <Route
            exact
            className="active"
            path="/contact-us"
            element={<ContactUs />}
          />
          <Route exact className="active" path="/help" element={<Help />} />

          <Route
            exact
            className="active"
            path="/reset"
            element={<ResetPassword />}
          />
          <Route
            exact
            className="active"
            path="/recent-order"
            element={<RecentOrderDetails />}
          />
          <Route
            exact
            className="active"
            path="/help-view"
            element={<HelpView />}
          />
          <Route
            exact
            className="active"
            path="/forget-password"
            element={<ForgetPassword />}
          />
          <Route
            exact
            className="active"
            path="/order-details/:id"
            element={<OrderDetails />}
          />
          <Route
            exact
            className="active"
            path="/offerManagementEnable"
            element={<OfferManagementEnable />}
          />
          <Route
            exact
            className="active"
            path="/offerManagementDisable"
            element={<OfferManagementDisable />}
          />
          <Route
            exact
            className="active"
            path="/languageSelection"
            element={<LanguageSelection />}
          />
          <Route
            exact
            className="active"
            path="/editProfile"
            element={<EditProfile />}
          />
          <Route
            exact
            className="active"
            path="/changePassword"
            element={<ChangePassword />}
          />
          <Route
            exact
            className="active"
            path="/varification"
            element={<Varification />}
          />
          {/* <Route
            exact
            className="active"
            path="/userDetails/:id"
            element={<UserDetails2 />}
          /> */}
          <Route
            exact
            className="active"
            path="/userDetails/:id"
            element={<UserDetailsAll />}
          />

          <Route
            exact
            className="active"
            path="/transactionDetails"
            element={<TransactionDetails />}
          />
          <Route
            exact
            className="active"
            path="/offerDetails"
            element={<OfferDetails />}
          />
          <Route
            exact
            className="active"
            path="/editValues"
            element={<EditValues />}
          />
          <Route
            exact
            className="active"
            path="/coupanList"
            element={<CoupanList />}
          />
          <Route
            exact
            className="active"
            path="/creatCoupan"
            element={<CreatCoupan />}
          />
          <Route
            exact
            className="active"
            path="/verificationModal"
            element={<VerificationModal />}
          />
          <Route
            exact
            className="active"
            path="/store-settings"
            element={<StoreSettings/>}
          />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
