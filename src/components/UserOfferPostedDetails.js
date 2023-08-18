import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function UserOfferPostedDetails() {
  return (
    <>
      <Sidebar />

      <div className="admin_main">
        {/* <div className="siderbar_section">
          <div className="siderbar_inner">
            <div className="sidebar_logo">
              <Link to="javscript:;">
                <img src="assets/img/logo.png" alt="Logo" />{" "}
              </Link>
            </div>
            <div className="sidebar_menus">
              <ul className="list-unstyled ps-1 m-0">
                <li>
                  <Link to="" href="dashboard.html">
                    <i className="fal fa-home" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="" href="users-management.html">
                    <i className="fal fa-user" />
                    Users Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="category-management.html">
                    <i className="fas fa-list-ol" />
                    Category Management
                  </Link>
                </li>
                <li>
                  <Link to="active" href="offer-management.html">
                    <i className="fad fa-gift-card" />
                    Offers Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="order-management.html">
                    <i className="fal fa-box-full" />
                    Order Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="staff-management.html">
                    <i className="fal fa-clipboard-user" />
                    Staff Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="transaction-management.html">
                    <i className="far fa-repeat-1" />
                    Transaction Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="reports-management.html">
                    <i className="far fa-file-spreadsheet" />
                    Reports Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="Home-Screen-banners.html">
                    <i className="fal fa-sign-in-alt" />
                    Home Screen Banners Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="notification-management.html">
                    <i className="far fa-bell" />
                    Notification Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="announcement-management.html">
                    <i className="far fa-bullhorn" /> Announcement Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="thoughts-management.html">
                    <i className="fal fa-lightbulb-on" /> Thoughts Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="content-management.html">
                    <i className="fal fa-user-edit" />
                    Content Management
                  </Link>
                </li>
                <li>
                  <Link to="informations.html">
                    <i className="fas fa-info" />
                    Informations Management
                  </Link>
                </li>
                <li>
                  <Link to="" href="contact-us.html">
                    <i className="fas fa-cogs" />
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link to="" href="help.html">
                    <i className="fal fa-hands-heart" />
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row offerdetails-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Offer Details</h2>
                      </div>
                    </div>
                    <div className="row p-4">
                      <div className="col-12 py-2">
                        <div className="row">
                          <div className="col-6 offerdetails_product position-relative">
                            <div
                              id="carouselExampleIndicators"
                              className="carousel slide"
                              data-interval="false"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-inner gallery">
                                <a
                                  href="assets/img/product1.png"
                                  className="carousel-item active"
                                >
                                  <img
                                    src="assets/img/product1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                  <span className="label_s">Free</span>
                                </a>
                                <a
                                  href="assets/img/product2.png"
                                  className="carousel-item"
                                >
                                  <img
                                    src="assets/img/product2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                  <span className="label_s">Fixed</span>
                                </a>
                                <a
                                  href="assets/img/product3.png"
                                  className="carousel-item"
                                >
                                  <img
                                    src="assets/img/product3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                  <span className="label_s">Auctions</span>
                                </a>
                                <a
                                  href="assets/img/product1.png"
                                  className="carousel-item"
                                >
                                  <img
                                    src="assets/img/product1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                  <span className="label_s">Free</span>
                                </a>
                              </div>
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#carouselExampleIndicators"
                                  data-bs-slide-to={0}
                                  className="active"
                                  aria-current="true"
                                  aria-label="Slide 1"
                                >
                                  <img
                                    src="assets/img/product1.png"
                                    className="thumnail_img"
                                    alt="..."
                                  />
                                </button>
                                <button
                                  type="button"
                                  data-bs-target="#carouselExampleIndicators"
                                  data-bs-slide-to={1}
                                  aria-label="Slide 2"
                                >
                                  <img
                                    src="assets/img/product2.png"
                                    className="thumnail_img"
                                    alt="..."
                                  />
                                </button>
                                <button
                                  type="button"
                                  data-bs-target="#carouselExampleIndicators"
                                  data-bs-slide-to={2}
                                  aria-label="Slide 3"
                                >
                                  <img
                                    src="assets/img/product3.png"
                                    className="thumnail_img"
                                    alt="..."
                                  />
                                </button>
                                <button
                                  type="button"
                                  data-bs-target="#carouselExampleIndicators"
                                  data-bs-slide-to={3}
                                  aria-label="Slide 4"
                                >
                                  <img
                                    src="assets/img/product1.png"
                                    className="thumnail_img"
                                    alt="..."
                                  />
                                </button>
                              </div>
                            </div>
                            <div className="check_toggle">
                              <input
                                type="checkbox"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                defaultChecked=""
                                name="check1"
                                id="check1"
                                className="d-none"
                              />
                              <label htmlFor="check1" />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="offerdetails_info">
                              <div className="row justify-content-center">
                                <div className="col-12">
                                  <div className="user_imgg">
                                    <img
                                      src="assets/img/profile_img1.jpg"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="col-12 users_left_content text-center">
                                  <Link to="user-details.html">
                                    <strong>Ajay Sharma</strong>
                                  </Link>
                                  <div className="rating_box">
                                    <Link to="javascript:;">
                                      <i className="fas fa-star" />
                                    </Link>
                                    <Link to="javascript:;">
                                      <i className="fas fa-star" />
                                    </Link>
                                    <Link to="javascript:;">
                                      <i className="fas fa-star" />
                                    </Link>
                                    <Link to="javascript:;">
                                      <i className="fas fa-star" />
                                    </Link>
                                    <Link to="javascript:;">
                                      <i className="far fa-star" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="row mx-0">
                                <div className="col-12 offerdetails_inner border">
                                  <h2>Product Name</h2>
                                  <div className="category_edit d-flex align-items-center">
                                    <span>
                                      <i className="fas fa-list-ol me-2" />{" "}
                                      Category Name
                                    </span>{" "}
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdrop1"
                                      className="edit_cate"
                                      href="javascript:;"
                                    >
                                      <i className="far fa-edit" />
                                    </a>
                                  </div>
                                  <span>
                                    <i className="far fa-clock me-2" /> Posted
                                    15 days
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row">
                      <div className="col-12 px-0">
                        <nav>
                          <div
                            className="nav nav-tabs comman_tabs"
                            id="nav-tab"
                            role="tablist"
                          >
                            <button
                              className="nav-link active"
                              id="nav-home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-home"
                              type="button"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                            >
                              Product Description
                            </button>
                            <button
                              className="nav-link"
                              id="nav-profile-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-profile"
                              type="button"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false"
                            >
                              Product Location
                            </button>
                            <button
                              className="nav-link"
                              id="nav-contact-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-contact"
                              type="button"
                              role="tab"
                              aria-controls="nav-contact"
                              aria-selected="false"
                            >
                              Comments
                            </button>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                          >
                            <div className="row mx-0 p-4 product_description">
                              <div className="col-12">
                                <p>
                                  Lorem ipsum dolor sit amet consectetur,
                                  adipisicing elit. Quibusdam consectetur magnam
                                  ex voluptates nisi architecto temporibus at
                                  alias, ut cupiditate molestiae quia voluptatum
                                  nesciunt possimus enim reiciendis natus
                                  facilis minima!
                                </p>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur,
                                  adipisicing elit. Quibusdam consectetur magnam
                                  ex voluptates nisi architecto temporibus at
                                  alias, ut cupiditate molestiae quia voluptatum
                                  nesciunt possimus enim reiciendis natus
                                  facilis minima!
                                </p>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur,
                                  adipisicing elit. Quibusdam consectetur magnam
                                  ex voluptates nisi architecto temporibus at
                                  alias, ut cupiditate molestiae quia voluptatum
                                  nesciunt possimus enim reiciendis natus
                                  facilis minima!
                                </p>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur,
                                  adipisicing elit. Quibusdam consectetur magnam
                                  ex voluptates nisi architecto temporibus at
                                  alias, ut cupiditate molestiae quia voluptatum
                                  nesciunt possimus enim reiciendis natus
                                  facilis minima!
                                </p>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur,
                                  adipisicing elit. Quibusdam consectetur magnam
                                  ex voluptates nisi architecto temporibus at
                                  alias, ut cupiditate molestiae quia voluptatum
                                  nesciunt possimus enim reiciendis natus
                                  facilis minima!
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="nav-profile"
                            role="tabpanel"
                            aria-labelledby="nav-profile-tab"
                          >
                            <div className="row mx-0 p-4 product_location">
                              <div className="col-12">
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429154.75849258946!2d-117.38917548361756!3d32.8248175128601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9530fad921e4b%3A0xd3a21fdfd15df79!2sSan%20Diego%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1669709877583!5m2!1sen!2sin"
                                  width="100%"
                                  height={350}
                                  style={{ border: 0 }}
                                  allowFullScreen=""
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="nav-contact"
                            role="tabpanel"
                            aria-labelledby="nav-contact-tab"
                          >
                            <div className="row mx-0 p-4 Comments_main">
                              <div className="col-12 py-2">
                                <div className="row mx-0 Comments_box align-items-center mb-4">
                                  <div className="col">
                                    <div className="Comments_top d-flex align-items-center">
                                      <span className="Comments_prfile">
                                        <img
                                          src="assets/img/profile_img1.jpg"
                                          alt=""
                                        />
                                      </span>
                                      <strong>Ajay Sharma</strong>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <span className="date_comment">
                                      15 days ago
                                    </span>
                                  </div>
                                  <div className="col-12 mt-3">
                                    <p>
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Ratione ipsa, qui
                                      expedita magnam facere explicabo
                                      architecto cum soluta distinctio possimus.
                                      Natus commodi perspiciatis, fugiat dicta
                                      et pariatur. Placeat, suscipit
                                      consequatur.....
                                    </p>
                                  </div>
                                </div>
                                <div className="row mx-0 Comments_box align-items-center mb-4">
                                  <div className="col">
                                    <div className="Comments_top d-flex align-items-center">
                                      <span className="Comments_prfile">
                                        <img
                                          src="assets/img/profile_img1.jpg"
                                          alt=""
                                        />
                                      </span>
                                      <strong>Ajay Sharma</strong>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <span className="date_comment">
                                      15 days ago
                                    </span>
                                  </div>
                                  <div className="col-12 mt-3">
                                    <p>
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Ratione ipsa, qui
                                      expedita magnam facere explicabo
                                      architecto cum soluta distinctio possimus.
                                      Natus commodi perspiciatis, fugiat dicta
                                      et pariatur. Placeat, suscipit
                                      consequatur.....
                                    </p>
                                  </div>
                                </div>
                                <div className="row mx-0 Comments_box align-items-center mb-4">
                                  <div className="col">
                                    <div className="Comments_top d-flex align-items-center">
                                      <span className="Comments_prfile">
                                        <img
                                          src="assets/img/profile_img1.jpg"
                                          alt=""
                                        />
                                      </span>
                                      <strong>Ajay Sharma</strong>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <span className="date_comment">
                                      15 days ago
                                    </span>
                                  </div>
                                  <div className="col-12 mt-3">
                                    <p>
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Ratione ipsa, qui
                                      expedita magnam facere explicabo
                                      architecto cum soluta distinctio possimus.
                                      Natus commodi perspiciatis, fugiat dicta
                                      et pariatur. Placeat, suscipit
                                      consequatur.....
                                    </p>
                                  </div>
                                </div>
                                <div className="row mx-0 Comments_box align-items-center mb-4">
                                  <div className="col">
                                    <div className="Comments_top d-flex align-items-center">
                                      <span className="Comments_prfile">
                                        <img
                                          src="assets/img/profile_img1.jpg"
                                          alt=""
                                        />
                                      </span>
                                      <strong>Ajay Sharma</strong>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <span className="date_comment">
                                      15 days ago
                                    </span>
                                  </div>
                                  <div className="col-12 mt-3">
                                    <p>
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Ratione ipsa, qui
                                      expedita magnam facere explicabo
                                      architecto cum soluta distinctio possimus.
                                      Natus commodi perspiciatis, fugiat dicta
                                      et pariatur. Placeat, suscipit
                                      consequatur.....
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Update_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-4">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="row">
                <div className="col-12 Update_modal_content py-4">
                  <h2>Update</h2>
                  <p>Are you sure you want to disable this offer?</p>
                  <Link to="comman_btn mx-2" href="javscript:;">
                    Yes
                  </Link>
                  <Link to="comman_btn2 mx-2 bg-red" href="javscript:;">
                    NO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Edit_modal change_category"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Change Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body p-0">
              <form
                className="form-design py-4 px-3 mx-0 help-support-form row align-items-end justify-content-between"
                action=""
              >
                <div className="form-group col-6">
                  <label htmlFor="">Select Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name=""
                    id=""
                  >
                    <option selected="" value={1}>
                      Lorem
                    </option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                    <option value={1}>Lorem</option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Select Sub Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name=""
                    id=""
                  >
                    <option selected="" value={1}>
                      Lorem
                    </option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                    <option value={1}>Lorem</option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                  </select>
                </div>
                <div className="form-group col-4">
                  <label htmlFor="">Select Sub Sub Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name=""
                    id=""
                  >
                    <option selected="" value={1}>
                      Lorem
                    </option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                    <option value={1}>Lorem</option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                  </select>
                </div>
                <div className="form-group col-4">
                  <label htmlFor="">Select Attribute</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name=""
                    id=""
                  >
                    <option selected="" value={1}>
                      Lorem
                    </option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                    <option value={1}>Lorem</option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                  </select>
                </div>
                <div className="form-group col-4">
                  <label htmlFor="">Select Value</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name=""
                    id=""
                  >
                    <option selected="" value={1}>
                      Lorem
                    </option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                    <option value={1}>Lorem</option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                  </select>
                </div>
                <div className="form-group mb-0 col-12 text-center">
                  <button className="comman_btn2">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOfferPostedDetails;
