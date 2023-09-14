import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTrash,
  faDollarSign,
  faMoneyBill1Wave,
  faDownload,
  faFileExport,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ Dash }) {
  const storedPic = localStorage.getItem("profilePic");
  return (
    <>
      <div className="admin_main">
        <div className="siderbar_section">
          <div className="siderbar_inner">
            <div className="sidebar_logo">
              <Link to="javscript:;">
                <img src="../assets/img/logo1.png" alt="Logo" />
              </Link>
            </div>
            <div className="sidebar_menus">
              <ul className="list-unstyled ps-1 m-0">
                {/* <li
                  className={
                    Dash === "dashboard" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link className="" to="/dashboard">
                    <i className="fal fa-home"></i>Dashboard
                  </Link>
                </li> */}
                <li
                  className={
                    Dash === "dashboard" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link className="" to="/dashboard">
                    <i className="fal fa-box-full"></i>Dashboard
                  </Link>
                </li>
                <li
                  className={Dash === "users" ? "nav-link active" : "nav-link"}
                >
                  <Link className="" to="/users">
                    <i className="fal fa-user"></i>Users Management
                  </Link>
                </li>
                <li
                  className={
                    Dash === "categories" ? "nav-link active" : "nav-link"
                  }
                >
                  <div className="d-flex">
                    <Link to="/categories">
                      <i className="fas fa-list-ol"></i>
                      Category Management
                    </Link>
                    {/* <Link
                      className={
                        Dash === "products" ? "nav-link active" : "nav-link"
                      }
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        const subMenu = document.querySelector("#menu-product");
                        const icon = e.currentTarget.querySelector("i");
                        subMenu.classList.toggle("collapse");
                        if (subMenu.classList.contains("collapse")) {
                          icon.classList.replace(
                            "fa-chevron-up",
                            "fa-chevron-down"
                          );
                        } else {
                          icon.classList.replace(
                            "fa-chevron-down",
                            "fa-chevron-up"
                          );
                        }
                      }}
                      style={{ borderRadius: "20px 0px 0px 0px" }}
                    >
                      <i
                        className="fa fa-chevron-down text-end fs-6"
                        style={{ fontSize: "6px", marginRight: "4px" }}
                      ></i>
                    </Link> */}
                  </div>
                </li>
                {/* <ul className="sub-menu collapse" id="menu-product"> */}
                {/* <li
                    className={
                      Dash === "products" ? "nav-link active" : "nav-link"
                    }
                  >
                    <Link
                      className="ms-link"
                      to="/products"
                      // onClick={() => handleItemClick("products")}
                    >
                      <i className="fas fa-check-square"></i>
                      <span> Product List</span>
                    </Link>
                  </li> */}
                {/* </ul> */}
                <li
                  className={
                    Dash === "product-management"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <Link className="ms-link " to="/product-management">
                    <i className="fas fa-cogs"></i>
                    <span>Add New Product</span>
                  </Link>
                </li>
                <li
                  className={
                    Dash === "products" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link
                    className="ms-link"
                    to="/products"
                    // onClick={() => handleItemClick("products")}
                  >
                    <i className="fas fa-check-square"></i>
                    <span> Product List</span>
                  </Link>
                </li>
                <li
                  className={
                    Dash === "brand-management" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link className="ms-link " to="/brand-management">
                    <i className="fas fa-cogs"></i>
                    <span>Brand Management</span>
                  </Link>
                </li>
                <li
                  className={Dash === "offers" ? "nav-link active" : "nav-link"}
                >
                  <Link className="" to="/offers">
                    <i className="fad fa-gift-card"></i>Offers Management
                  </Link>
                </li>
                <li
                  className={Dash === "orders" ? "nav-link active" : "nav-link"}
                >
                  <Link className="" to="/orders">
                    <i className="fal fa-box-full"></i>Order Management
                  </Link>
                </li>
                <li
                  className={Dash === "agents" ? "nav-link active" : "nav-link"}
                >
                  <Link className="" to="/agents">
                    <i className="fal fa-users"></i>Agent Management
                  </Link>
                </li>
                <li
                  className={Dash === "staff" ? "nav-link active" : "nav-link"}
                >
                  <Link className="" to="/staff">
                    <i className="fal fa-clipboard-user"></i>Staff Management
                  </Link>
                </li>
                <li
                  className={
                    Dash === "transactions" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link className=" " to="/transactions">
                    <i className="far fa-repeat-1"></i>Transaction Management
                  </Link>
                </li>
                {/* <li
                  className={
                    Dash === "reports" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link className="" to="/reports">
                    <i className="far fa-file-spreadsheet"></i>Reports
                    Management
                  </Link>
                </li> */}
                <li
                  className={
                    Dash === "Home-Screen-banners"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <Link className="" to="/Home-Screen-banners">
                    <i className="fal fa-sign-in-alt"></i>Home Screen Banners
                    Management
                  </Link>
                </li>
                <li
                  className={
                    Dash === "notification-management"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <Link className="" to="/notification-management">
                    <i className="far fa-bell"></i>Notification Management
                  </Link>
                </li>
                <li
                  className={
                    Dash === "announcement-management"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <Link className="" to="/announcement-management">
                    <i className="far fa-bullhorn"></i> Announcement Management
                  </Link>
                </li>
                {/* <li
                  className={
                    Dash === "thoughts-management"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <Link className="" to="/thoughts-management">
                    <i className="fal fa-lightbulb-on"></i> Thoughts Management
                  </Link>
                </li> */}
                <li
                  className={
                    Dash === "content-management"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <Link className="" to="/content-management">
                    <i className="fal fa-user-edit"></i>Content Management
                  </Link>
                </li>
                <li
                  className={
                    Dash === "coupanList" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link className="" to="/coupanList">
                    <i className="fal fa-user-edit"></i>Coupan Management
                  </Link>
                </li>
                <li
                  className={
                    Dash === "informations" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link to="/informations">
                    <i className="fas fa-info"></i>Informations Management
                  </Link>
                </li>
                <li
                  className={
                    Dash === "contact-us" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link className="" to="/contact-us">
                    <i className="fas fa-cogs"></i>Contact us
                  </Link>
                </li>
                <li>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle w-100 d-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faCog} className="mx-2" />
                      Configurations
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark w-100">
                      <li>
                        <Link className="dropdown-item active" to="#">
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Theme Settings
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/store-settings">
                          Store Setting
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className={Dash === "help" ? "nav-link active" : "nav-link"}
                >
                  <Link className="" to="/help">
                    <i className="fal fa-hands-heart"></i>Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="admin_main_inner">
          <div className="admin_header shadow">
            <div className="row align-items-center mx-0 justify-content-between w-100">
              <div className="col">
                <Link className="sidebar_btn" to="#">
                  <i className="far fa-bars"></i>
                </Link>
              </div>

              <div className="col-auto d-flex align-items-center">
                {/* <div className="row me-2">
                    <div className="notification_icon5">
                      <i className="far fa-bell"></i>
                    </div>
                </div> */}
                <Link className="change_language" to="">
                  <img src="../assets/img/saudi_flag1.png" alt="" />
                  عربى
                </Link>
                <div className="dropdown Profile_dropdown">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* <img src="../assets/img/profile_img1.jpg" alt="" /> */}
                    {storedPic ? (
                      <img src={storedPic} alt="" />
                    ) : (
                      <img src="../assets/img/profile_img1.jpg" alt="" />
                    )}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item" to="/editProfile">
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/reset">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
