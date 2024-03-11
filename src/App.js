import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import ReportManagement from "./components/ReportManagement";
// import RecentOrderDetails from "./components/RecentOrderDetails";
import OrderDetails from "./components/OrderDetails";
import OfferManagement from "./components/OfferManagement";
import OrderManagement from "./components/OrderManagement";
import OfferDetails from "./components/OfferDetails";
import NotificationManagement from "./components/NotificationManagement";
import Login from "./components/Login";
import LanguageSelection from "./components/LanguageSelection";
import Informations from "./components/Informations";
import HelpView from "./components/HelpView";
import Help from "./components/Help";
import ForgetPassword from "./components/ForgetPassword";
import EditProfile from "./components/EditProfile";
import ContentManagement from "./components/ContentManagement";
import ContactUs from "./components/ContactUs";
import CategoryManagement from "./components/CategoryManagement";
import AnnounceManagement from "./components/AnnounceManagement";
// import ProductList from "./components/ProductList";
import Varification from "./components/Varification";
import UsersManagement from "./components/UsersManagement";
import TransactionManagement from "./components/TransactionManagement";
import TransactionDetails from "./components/TransactionDetails";
import ThoughtsManagement from "./components/ThoughtsManagement";
import StaffManagement from "./components/StaffManagement";
import CoupanList from "./components/CoupanList";
import CreatCoupan from "./components/CreatCoupan";
import VerificationModal from "./components/VerificationModal";
import Agent from "./components/Agent";
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
import ProductManagementEdit2 from "./components/ProductManagementEdit2";
import DashboardNew from "./components/DashboardNew";
import StoreSettings from "./components/configurations/StoreSettings";
import Banners from "./components/banners/Banners";
// import ProductBanner from "./components/banners/ProductBanner";
import AddAgents from "./components/AddAgents";
import Staff from "./components/staffs/Staff";
import CreatCoupans from "./components/coupans/CreateCoupans";
import Products from "./components/productmanagements/Products";
import ProductEdit from "./components/productmanagements/ProductEdit";
import ProductList from "./components/productmanagements/ProductList";
import CoupanLists from "./components/coupans/CoupanLists";
import { useSelector } from "react-redux";
import ChangePassword from "./components/ChangePassword";

function App() {
  const modules = useSelector((data) => data?.local?.modules);
  const loginType = useSelector((data) => data?.local?.loginType);
  const [progress, setProgress] = useState(0);

  const isAccessAllowed = (accessItem) => {
    return modules?.includes(accessItem);
  };

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
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("dashboard") ? (
                  <DashboardNew setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <DashboardNew setProgress={setProgress} />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/users"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("user") ? (
                  <UsersManagement setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <UsersManagement setProgress={setProgress} />
              )
            }
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
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("agent") ? (
                  <Agent setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <Agent setProgress={setProgress} />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/add-agents"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("agent") ? (
                  <AddAgents setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <AddAgents setProgress={setProgress} />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/agents-information/:id"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("agent") ? (
                  <AgentDetailsAll />
                ) : (
                  <Login />
                )
              ) : (
                <AgentDetailsAll />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/categories"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("category") ? (
                  <CategoryManagement setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <CategoryManagement setProgress={setProgress} />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/sub-categories"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("category") ? (
                  <SubCategory setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <SubCategory setProgress={setProgress} />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/product-management"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("addproduct") ? (
                  <Products setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <Products setProgress={setProgress} />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/brand-management"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("brand") ? (
                  <BrandManagement />
                ) : (
                  <Login />
                )
              ) : (
                <BrandManagement />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/product-management-edit/:id"
            element={<ProductEdit setProgress={setProgress} />}
          />

          <Route
            exact
            className="active"
            path="/products"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("productlist") ? (
                  <ProductList setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <ProductList setProgress={setProgress} />
              )
            }
          />

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
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("order") ? (
                  <OrderManagement />
                ) : (
                  <Login />
                )
              ) : (
                <OrderManagement />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/staff"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("staff") ? (
                  <Staff />
                ) : (
                  <Login />
                )
              ) : (
                <Staff />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/transactions"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("transaction") ? (
                  <TransactionManagement />
                ) : (
                  <Login />
                )
              ) : (
                <TransactionManagement />
              )
            }
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
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("banners") ? (
                  <Banners setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <Banners setProgress={setProgress} />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/notification-management"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("notification") ? (
                  <NotificationManagement />
                ) : (
                  <Login />
                )
              ) : (
                <NotificationManagement />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/announcement-management"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("announcement") ? (
                  <AnnounceManagement />
                ) : (
                  <Login />
                )
              ) : (
                <AnnounceManagement />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/thoughts-management"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("thoughts") ? (
                  <ThoughtsManagement />
                ) : (
                  <Login />
                )
              ) : (
                <ThoughtsManagement />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/content-management"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("content") ? (
                  <ContentManagement />
                ) : (
                  <Login />
                )
              ) : (
                <ContentManagement />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/informations"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("information") ? (
                  <Informations setProgress={setProgress} />
                ) : (
                  <Login />
                )
              ) : (
                <Informations setProgress={setProgress} />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/contact-us"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("contactus") ? (
                  <ContactUs />
                ) : (
                  <Login />
                )
              ) : (
                <ContactUs />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/help"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("help") ? (
                  <Help />
                ) : (
                  <Login />
                )
              ) : (
                <Help />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/help-view"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("help") ? (
                  <HelpView />
                ) : (
                  <Login />
                )
              ) : (
                <HelpView />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/reset"
            element={<ResetPassword />}
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
            path="/change-password"
            element={<ChangePassword />}
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
            path="/varification"
            element={<Varification />}
          />

          <Route
            exact
            className="active"
            path="/userDetails/:id"
            element={<UserDetailsAll />}
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
            path="/verificationModal"
            element={<VerificationModal />}
          />

          <Route
            exact
            className="active"
            path="/transactionDetails/:id"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("transaction") ? (
                  <TransactionDetails />
                ) : (
                  <Login />
                )
              ) : (
                <TransactionDetails />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/coupanList"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("coupan") ? (
                  <CoupanLists />
                ) : (
                  <Login />
                )
              ) : (
                <CoupanLists />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/creatCoupan"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("coupan") ? (
                  <CreatCoupans />
                ) : (
                  <Login />
                )
              ) : (
                <CreatCoupans />
              )
            }
          />

          <Route
            exact
            className="active"
            path="/store-settings"
            element={
              loginType !== "Admin" ? (
                isAccessAllowed("configure") ? (
                  <StoreSettings />
                ) : (
                  <Login />
                )
              ) : (
                <StoreSettings />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
