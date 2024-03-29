import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useGetAdminDataQuery } from "../services/Post";
import { setHeader, setProductId } from "../app/localSlice";

function Sidebar({ Dash }) {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  const modules = useSelector((data) => data?.local?.modules);
  const loginType = useSelector((data) => data?.local?.loginType);

  const { data: adminData } = useGetAdminDataQuery({ ecomAdmintoken });

  const [adminDetails, setAdminDetails] = useState("");

  useEffect(() => {
    if (adminData) {
      setAdminDetails(adminData?.results?.admin);
    }
  }, [adminData]);

  const storedPic = localStorage.getItem("profilePic");

  const isAccessAllowed = (accessItem) => {
    return modules?.includes(accessItem);
  };

  const handleLogout = () => {
    localStorage.removeItem("ecoAdmintoken");
    localStorage.removeItem("admin-data");
    localStorage.removeItem("ecomadminloginId");
    localStorage.removeItem("loginType");
    localStorage.removeItem("adminModules");
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    dispatch(setHeader("ml"));
    setShow(false);
  };
  const toggleSidebarcol = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    dispatch(setHeader(""));
    setShow(true);
  };
  const toggleSidebar1 = () => {
    dispatch(setHeader(""));
  };

  const handleLinkDoubleClick = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={`admin_main ${sidebarCollapsed ? "admin_full" : ""}`}>
        <div
          className={`siderbar_section ${
            sidebarCollapsed ? "hide_sidebar" : ""
          }`}
        >
          <div className="siderbar_inner">
            <div className="sidebar_logo">
              <Link to="javscript:;">
                <img src="../assets/img/logo1.png" alt="Logo" />
              </Link>
            </div>
            <div className="sidebar_menus">
              <ul className="list-unstyled ps-1 m-0">
                {loginType === "Admin" ? (
                  <>
                    <li
                      className={
                        Dash === "dashboard" ? "nav-link active" : "nav-link"
                      }
                    >
                      <Link
                        className=""
                        to="/dashboard"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fal fa-box-full"></i>Dashboard
                      </Link>
                    </li>

                    <li
                      className={
                        Dash === "users" ? "nav-link active" : "nav-link"
                      }
                    >
                      <Link
                        className=""
                        to="/users"
                        onClick={() => {
                          toggleSidebar1();
                          setTimeout(() => {
                            window.location.reload();
                          }, 500);
                        }}
                      >
                        <i className="fal fa-user"></i>Users Management
                      </Link>
                    </li>

                    <li
                      className={
                        Dash === "orders" ? "nav-link active" : "nav-link"
                      }
                    >
                      <Link
                        className=""
                        to="/orders"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fal fa-box-full"></i>Order Management
                      </Link>
                    </li>

                    <li
                      className={
                        Dash === "categories" ? "nav-link active" : "nav-link"
                      }
                    >
                      <div className="d-flex">
                        <Link to="/categories" onClick={() => toggleSidebar1()}>
                          <i className="fas fa-list-ol"></i>
                          Category Management
                        </Link>
                      </div>
                    </li>

                    <li
                      className={
                        Dash === "product-management"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <Link
                        className="ms-link "
                        to="/product-management"
                        onClick={() => {
                          toggleSidebar1();
                          dispatch(setProductId(""));
                        }}
                      >
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
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fas fa-check-square"></i>
                        <span> Product List</span>
                      </Link>
                    </li>

                    <li
                      className={
                        Dash === "Home-Screen-banners"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <Link
                        className=""
                        to="/Home-Screen-banners"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fal fa-sign-in-alt"></i>Banner Management
                      </Link>
                    </li>

                    <li
                      className={
                        Dash === "brand-management"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <Link
                        className="ms-link "
                        to="/brand-management"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fas fa-cogs"></i>
                        <span>Brand Management</span>
                      </Link>
                    </li>

                    <li
                      className={
                        Dash === "agents" ? "nav-link active" : "nav-link"
                      }
                    >
                      <Link
                        className=""
                        to="/agents"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fal fa-users"></i>Agent Management
                      </Link>
                    </li>

                    <li
                      className={
                        Dash === "staff" ? "nav-link active" : "nav-link"
                      }
                    >
                      <Link
                        className=""
                        to="/staff"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fal fa-clipboard-user"></i>Staff
                        Management
                      </Link>
                    </li>

                    <li
                      className={
                        Dash === "transactions" ? "nav-link active" : "nav-link"
                      }
                    >
                      <Link
                        className=" "
                        to="/transactions"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="far fa-repeat-1"></i>Transaction
                        Management
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

                    {/* <li
                  className={
                    Dash === "Home-Screen-banners"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle w-100 d-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ marginLeft: "-8px" }}
                    >
                      <i className="fal fa-sign-in-alt me-2"></i>
                      Banners Management
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark w-100">
                      <li
                        className={
                          Dash === "category-banners"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className="dropdown-item active"
                          to="/Home-Screen-banners"
                        >
                          Category Banners
                        </Link>
                      </li>
                      <li
                        className={
                          Dash === "product-banners"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className="dropdown-item"
                          to="/Home-Screen-banners-product"
                        >
                          Product Banners
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li> */}
                    <li
                      className={
                        Dash === "notification-management"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <Link
                        className=""
                        to="/notification-management"
                        onClick={() => toggleSidebar1()}
                      >
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
                      <Link
                        className=""
                        to="/announcement-management"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="far fa-bullhorn"></i> Announcement
                        Management
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
                      <Link
                        className=""
                        to="/content-management"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fal fa-user-edit"></i>Content Management
                      </Link>
                    </li>
                    <li
                      className={
                        Dash === "coupanList" ? "nav-link active" : "nav-link"
                      }
                    >
                      <Link
                        className=""
                        to="/coupanList"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fal fa-user-edit"></i>Coupan Management
                      </Link>
                    </li>
                    <li
                      className={
                        Dash === "informations" ? "nav-link active" : "nav-link"
                      }
                    >
                      <Link to="/informations" onClick={() => toggleSidebar1()}>
                        <i className="fas fa-info"></i>Informations Management
                      </Link>
                    </li>
                    <li
                      className={
                        Dash === "contact-us" ? "nav-link active" : "nav-link"
                      }
                    >
                      <Link
                        className=""
                        to="/contact-us"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fas fa-cogs"></i>Useful Information
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
                            <Link
                              className="dropdown-item"
                              to="/store-settings"
                            >
                              Store Setting
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      className={
                        Dash === "help" ? "nav-link active" : "nav-link"
                      }
                    >
                      {/* <Link
                        className=""
                        to="/help"
                        onClick={() => toggleSidebar1()}
                      >
                        <i className="fal fa-hands-heart"></i>Help
                      </Link> */}
                    </li>
                  </>
                ) : (
                  <>
                    {isAccessAllowed("dashboard") && (
                      <li
                        className={
                          Dash === "dashboard" ? "nav-link active" : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/dashboard"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fal fa-box-full"></i>Dashboard
                        </Link>
                      </li>
                    )}

                    {isAccessAllowed("user") && (
                      <li
                        className={
                          Dash === "users" ? "nav-link active" : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/users"
                          // onClick={() => toggleSidebar1()}
                          onClick={() => {
                            toggleSidebar1();
                            setTimeout(() => {
                              window.location.reload();
                            }, 500);
                          }}
                        >
                          <i className="fal fa-user"></i>Users Management
                        </Link>
                      </li>
                    )}

                    {isAccessAllowed("order") && (
                      <li
                        className={
                          Dash === "orders" ? "nav-link active" : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/orders"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fal fa-box-full"></i>Order Management
                        </Link>
                      </li>
                    )}

                    {isAccessAllowed("category") && (
                      <li
                        className={
                          Dash === "categories" ? "nav-link active" : "nav-link"
                        }
                      >
                        <div className="d-flex">
                          <Link
                            to="/categories"
                            onClick={() => toggleSidebar1()}
                          >
                            <i className="fas fa-list-ol"></i>
                            Category Management
                          </Link>
                        </div>
                      </li>
                    )}

                    {isAccessAllowed("addproduct") && (
                      <li
                        className={
                          Dash === "product-management"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className="ms-link "
                          to="/product-management"
                          onClick={() => {
                            toggleSidebar1();
                            dispatch(setProductId(""));
                          }}
                        >
                          <i className="fas fa-cogs"></i>
                          <span>Add New Product</span>
                        </Link>
                      </li>
                    )}

                    {isAccessAllowed("productlist") && (
                      <li
                        className={
                          Dash === "products" ? "nav-link active" : "nav-link"
                        }
                      >
                        <Link
                          className="ms-link"
                          to="/products"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fas fa-check-square"></i>
                          <span> Product List</span>
                        </Link>
                      </li>
                    )}

                    {isAccessAllowed("banners") && (
                      <li
                        className={
                          Dash === "Home-Screen-banners"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/Home-Screen-banners"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fal fa-sign-in-alt"></i>Banner
                          Management
                        </Link>
                      </li>
                    )}

                    {isAccessAllowed("brand") && (
                      <li
                        className={
                          Dash === "brand-management"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className="ms-link "
                          to="/brand-management"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fas fa-cogs"></i>
                          <span>Brand Management</span>
                        </Link>
                      </li>
                    )}

                    {isAccessAllowed("agent") && (
                      <li
                        className={
                          Dash === "agents" ? "nav-link active" : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/agents"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fal fa-users"></i>Agent Management
                        </Link>
                      </li>
                    )}

                    {isAccessAllowed("staff") && (
                      <li
                        className={
                          Dash === "staff" ? "nav-link active" : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/staff"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fal fa-clipboard-user"></i>Staff
                          Management
                        </Link>
                      </li>
                    )}

                    {isAccessAllowed("transaction") && (
                      <li
                        className={
                          Dash === "transactions"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className=" "
                          to="/transactions"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="far fa-repeat-1"></i>Transaction
                          Management
                        </Link>
                      </li>
                    )}
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

                    {/* <li
                  className={
                    Dash === "Home-Screen-banners"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle w-100 d-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ marginLeft: "-8px" }}
                    >
                      <i className="fal fa-sign-in-alt me-2"></i>
                      Banners Management
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark w-100">
                      <li
                        className={
                          Dash === "category-banners"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className="dropdown-item active"
                          to="/Home-Screen-banners"
                        >
                          Category Banners
                        </Link>
                      </li>
                      <li
                        className={
                          Dash === "product-banners"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className="dropdown-item"
                          to="/Home-Screen-banners-product"
                        >
                          Product Banners
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li> */}
                    {isAccessAllowed("notification") && (
                      <li
                        className={
                          Dash === "notification-management"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/notification-management"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="far fa-bell"></i>Notification Management
                        </Link>
                      </li>
                    )}
                    {isAccessAllowed("announcement") && (
                      <li
                        className={
                          Dash === "announcement-management"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/announcement-management"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="far fa-bullhorn"></i> Announcement
                          Management
                        </Link>
                      </li>
                    )}
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
                    {isAccessAllowed("content") && (
                      <li
                        className={
                          Dash === "content-management"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/content-management"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fal fa-user-edit"></i>Content Management
                        </Link>
                      </li>
                    )}
                    {isAccessAllowed("coupan") && (
                      <li
                        className={
                          Dash === "coupanList" ? "nav-link active" : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/coupanList"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fal fa-user-edit"></i>Coupan Management
                        </Link>
                      </li>
                    )}
                    {isAccessAllowed("information") && (
                      <li
                        className={
                          Dash === "informations"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <Link
                          to="/informations"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fas fa-info"></i>Informations Management
                        </Link>
                      </li>
                    )}
                    {isAccessAllowed("contactus") && (
                      <li
                        className={
                          Dash === "contact-us" ? "nav-link active" : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/contact-us"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fas fa-cogs"></i>Useful Information
                        </Link>
                      </li>
                    )}
                    {isAccessAllowed("configure") && (
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
                              <Link
                                className="dropdown-item"
                                to="/store-settings"
                              >
                                Store Setting
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    )}
                    {/* {isAccessAllowed("help") && (
                      <li
                        className={
                          Dash === "help" ? "nav-link active" : "nav-link"
                        }
                      >
                        <Link
                          className=""
                          to="/help"
                          onClick={() => toggleSidebar1()}
                        >
                          <i className="fal fa-hands-heart"></i>Help
                        </Link>
                      </li>
                    )} */}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="admin_main_inner">
          <div className="admin_header shadow">
            <div className="row align-items-center mx-0 justify-content-between w-100">
              <div className="col">
                {show ? (
                  <Link
                    className="sidebar_btn"
                    to="#"
                    onClick={() => toggleSidebar()}
                  >
                    <i className="far fa-bars"></i>
                  </Link>
                ) : (
                  <Link
                    className="sidebar_btn"
                    to="#"
                    onClick={() => toggleSidebarcol()}
                  >
                    <i className="far fa-bars"></i>
                  </Link>
                )}
              </div>

              <div className="col-auto d-flex align-items-center">
                {/* <Link to="/notification-management" className="row me-2">
                  <div
                    className="notification_icon5"
                    style={{ color: "#ffff", backgroundColor: "#144881" }}
                  >
                    <i className="far fa-bell"></i>
                    <span
                      className="badge text-bg-danger"
                      style={{
                        fontSize: "x-small",
                        marginTop: "-30px",
                        marginLeft: "-10px",
                      }}
                    >
                      1
                    </span>
                  </div>
                </Link> */}
                {/* <Link className="change_language" to="">
                  <img src="../assets/img/saudi_flag1.png" alt="" />
                  عربى
                </Link> */}
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
                      <img
                        src={
                          adminDetails
                            ? adminDetails?.profile_Pic
                            : "../assets/img/profile_img1.jpg"
                        }
                        alt=""
                      />
                      // <img src="../assets/img/profile_img1.jpg" alt="" />
                    )}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/editProfile"
                        onClick={() =>
                          setTimeout(() => {
                            window.location.reload();
                          }, 500)
                        }
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/change-password">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={handleLogout}
                      >
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
