import "./App.css";
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
import ProductManagement from "./components/ProductManagement";
import Sidebar from "./components/Sidebar";
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

function App() {

  return (
    <>
    
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route exact className="active" path="/" element={<Dashboard />} />
          <Route
            exact
            className="active"
            path="/users"
            element={<UsersManagement />}
          />
          <Route
            exact
            className="active"
            path="/agents"
            element={<Agent/>}
          />
          <Route
            exact
            className="active"
            path="/agents-details"
            element={<AgentDetails/>}
          />
          <Route
            exact
            className="active"
            path="/agents-information"
            element={<AgentInformation/>}
          />
          
          <Route
            exact
            className="active"
            path="/categories"
            element={<CategoryManagement />}
          />
          <Route
            exact
            className="active"
            path="/product-management"
            element={<ProductManagement />}
          />
          <Route
            exact
            className="active"
            path="/products"
            element={<ProductList />}
          />
          <Route
            exact
            className="active"
            path="/offers"
            element={<OfferManagement />}
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
            element={<HomeScreenBanner />}
          />
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
            element={<Informations />}
          />
          <Route
            exact
            className="active"
            path="/contact-us"
            element={<ContactUs />}
          />
          <Route exact className="active" path="/help" element={<Help />} />
          <Route exact className="active" path="/login" element={<Login />} />
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
            path="/order-details"
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
          <Route
            exact
            className="active"
            path="/userDetails"
            element={<UserDetails2 />}
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
