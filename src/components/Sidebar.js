import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [sidebarVisible, setSidebarVisible] = useState(true);
  const handleClick = () => {
    setSidebarVisible(false);
    // Perform desired action when the icon is clicked
    console.log("Icon clicked!");
    // You can add your own logic here
  };
  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
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
                <li className={activeItem === "dashboard" ? "active" : ""}>
                  <Link
                    className=""
                    to="/"
                    onClick={() => handleItemClick("dashboard")}
                  >
                    <i className="fal fa-home"></i>Dashboard
                  </Link>
                </li>
                <li className={activeItem === "users" ? "active" : ""}>
                  <Link
                    className=""
                    to="/users"
                    onClick={() => handleItemClick("users")}
                  >
                    <i className="fal fa-user"></i>Users Management
                  </Link>
                </li>
                <li className={activeItem === "agents" ? "active" : ""}>
                  <Link
                    className=""
                    to="/agents"
                    onClick={() => handleItemClick("agents")}
                  >
                    <i className="fal fa-users"></i>Agent Management
                  </Link>
                </li>

                <li className={activeItem === "categories" ? "active" : ""}>
                  <div className="d-flex">
                    <Link
                      to="/categories"
                      onClick={() => handleItemClick("categories")}
                    >
                      <i className="fas fa-list-ol"></i>
                      Category Management
                    </Link>
                    <Link
                      className={activeItem === "products" ? "active" : ""}
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
                    </Link>
                  </div>
                </li>
                <ul className="sub-menu collapse" id="menu-product">
                  <li className={activeItem === "products" ? "active" : ""}>
                    <Link
                      className="ms-link"
                      to="/products"
                      onClick={() => handleItemClick("products")}
                    >
                      <i className="fas fa-check-square"></i>
                      <span> Product List</span>
                    </Link>
                  </li>
                </ul>

                <li
                  className={activeItem === "productManagement" ? "active" : ""}
                >
                  <Link
                    className="ms-link "
                    to="/product-management"
                    onClick={() => handleItemClick("productManagement")}
                  >
                    <i className="fas fa-cogs"></i>
                    <span>Product Management</span>
                  </Link>
                </li>
                <li className={activeItem === "offers" ? "active" : ""}>
                  <Link
                    className=""
                    to="/offers"
                    onClick={() => handleItemClick("offers")}
                  >
                    <i className="fad fa-gift-card"></i>Offers Management
                  </Link>
                </li>
                <li className={activeItem === "orders" ? "active" : ""}>
                  <Link
                    className=""
                    to="/orders"
                    onClick={() => handleItemClick("orders")}
                  >
                    <i className="fal fa-box-full"></i>Order Management
                  </Link>
                </li>
                <li className={activeItem === "staff" ? "active" : ""}>
                  <Link
                    className=""
                    to="/staff"
                    onClick={() => handleItemClick("staff")}
                  >
                    <i className="fal fa-clipboard-user"></i>Staff Management
                  </Link>
                </li>
                <li className={activeItem === "transactions" ? "active" : ""}>
                  <Link
                    className=" "
                    to="/transactions"
                    onClick={() => handleItemClick("transactions")}
                  >
                    <i className="far fa-repeat-1"></i>Transaction Management
                  </Link>
                </li>
                <li className={activeItem === "reports" ? "active" : ""}>
                  <Link
                    className=""
                    to="/reports"
                    onClick={() => handleItemClick("reports")}
                  >
                    <i className="far fa-file-spreadsheet"></i>Reports
                    Management
                  </Link>
                </li>
                <li
                  className={
                    activeItem === "Home-Screen-banners" ? "active" : ""
                  }
                >
                  <Link
                    className=""
                    to="/Home-Screen-banners"
                    onClick={() => handleItemClick("Home-Screen-banners")}
                  >
                    <i className="fal fa-sign-in-alt"></i>Home Screen Banners
                    Management
                  </Link>
                </li>
                <li
                  className={
                    activeItem === "notification-management" ? "active" : ""
                  }
                >
                  <Link
                    className=""
                    to="/notification-management"
                    onClick={() => handleItemClick("notification-management")}
                  >
                    <i className="far fa-bell"></i>Notification Management
                  </Link>
                </li>
                <li
                  className={
                    activeItem === "announcement-management" ? "active" : ""
                  }
                >
                  <Link
                    className=""
                    to="/announcement-management"
                    onClick={() => handleItemClick("announcement-management")}
                  >
                    <i className="far fa-bullhorn"></i> Announcement Management
                  </Link>
                </li>
                <li
                  className={
                    activeItem === "thoughts-management" ? "active" : ""
                  }
                >
                  <Link
                    className=""
                    to="/thoughts-management"
                    onClick={() => handleItemClick("thoughts-management")}
                  >
                    <i className="fal fa-lightbulb-on"></i> Thoughts Management
                  </Link>
                </li>
                <li
                  className={
                    activeItem === "content-management" ? "active" : ""
                  }
                >
                  <Link
                    className=""
                    to="/content-management"
                    onClick={() => handleItemClick("content-management")}
                  >
                    <i className="fal fa-user-edit"></i>Content Management
                  </Link>
                </li>
                <li className={activeItem === "coupanList" ? "active" : ""}>
                  <Link
                    className=""
                    to="/coupanList"
                    onClick={() => handleItemClick("coupanList")}
                  >
                    <i className="fal fa-user-edit"></i>Coupan Management
                  </Link>
                </li>
                <li className={activeItem === "informations" ? "active" : ""}>
                  <Link
                    to="/informations"
                    onClick={() => handleItemClick("informations")}
                  >
                    <i className="fas fa-info"></i>Informations Management
                  </Link>
                </li>
                <li className={activeItem === "contact-us" ? "active" : ""}>
                  <Link
                    className=""
                    to="/contact-us"
                    onClick={() => handleItemClick("contact-us")}
                  >
                    <i className="fas fa-cogs"></i>Contact us
                  </Link>
                </li>
                <li className={activeItem === "help" ? "active" : ""}>
                  <Link
                    className=""
                    to="/help"
                    onClick={() => handleItemClick("help")}
                  >
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
                <Link className="sidebar_btn" to="#" onClick={handleClick}>
                  <i className="far fa-bars"></i>
                </Link>
              </div>

              <div className="col-auto d-flex align-items-center">
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
                    <img src="../assets/img/profile_img1.jpg" alt="" />
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
                      <Link className="dropdown-item" to="/changePassword">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
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
