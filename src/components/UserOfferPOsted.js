import React from "react";
import Sidebar from "./Sidebar";

function UserOfferPOsted() {
  return (
    <>
      <Sidebar />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  {/* <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>User's Information</h2>
                      </div>
                      <div className="col-auto">
                        <a className="download_icon" href="javascript:;">
                          <i className="fas fa-download" />
                        </a>
                      </div>
                    </div>
                    <div className="row users-information position-relative align-items-center justify-content-center">
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
                      <div className="col-4">
                        <div className="users_left">
                          <div className="row">
                            <div className="col-12">
                              <div className="user_imgg">
                                <img src="assets/img/profile_img1.jpg" alt="" />
                              </div>
                            </div>
                            <div className="col-12 users_left_content">
                              <strong>
                                Ajay Sharma{" "}
                                <img src="assets/img/Group 3678.png" alt="" />
                              </strong>
                              <div className="rating_box">
                                <a href="javascript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javascript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javascript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javascript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javascript:;">
                                  <i className="far fa-star" />
                                </a>
                              </div>
                              <div className="socialmedia_icon mt-3">
                                <a href="javascript:;">
                                  <i className="fab fa-instagram" />
                                </a>
                                <a href="javascript:;">
                                  <i className="fab fa-snapchat-ghost" />
                                </a>
                                <a href="javascript:;">
                                  <i className="fab fa-facebook-f" />
                                </a>
                                <a href="javascript:;">
                                  <i className="fab fa-twitter" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-7 pe-5">
                        <div className="users_right pe-2">
                          <form
                            action="#"
                            className="form-design row position-relative"
                          >
                            <div className="form-group col-12">
                              <label htmlFor="">Mobile Number</label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="+966 9876543210"
                                name="name"
                                id="name"
                              />
                            </div>
                            <div className="form-group col-12">
                              <label htmlFor="">Email Id </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="user@gmail.com"
                                name="name"
                                id="name"
                              />
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="">Registration Date</label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="01/07/2022"
                                name="name"
                                id="name"
                              />
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="">Followers</label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={500}
                                name="name"
                                id="name"
                              />
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="">Following</label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={200}
                                name="name"
                                id="name"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <div className="row user_bottom">
                          <div className="col-4">
                            <div className="user_verified_main px-4">
                              <a className="verified_icon" href="javascript:;">
                                Phone Number
                                <span>
                                  <i className="fas fa-check" />
                                </span>
                              </a>
                            </div>
                          </div>
                          <div className="col-4 border-start border-end">
                            <div className="user_verified_main px-4">
                              <a className="verified_icon" href="javascript:;">
                                Email Address
                                <span>
                                  <i className="fas fa-check" />
                                </span>
                              </a>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="user_verified_main px-4">
                              <a className="verified_icon" href="javascript:;">
                                OfferYard Account
                                <span>
                                  <i className="fas fa-check" />
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row Absher_box border">
                      <h2 className="Absher_head border border-bottom-0">
                        Absher Details :
                      </h2>
                      <div className="col-12">
                        <form
                          className="form-design row position-relative"
                          action=""
                        >
                          <div className="form-group mb-0 col-4 border-end">
                            <label htmlFor="">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Ajay Sharma"
                              name="Name"
                              id="name"
                            />
                          </div>
                          <div className="form-group mb-0 col-4 border-end">
                            <label htmlFor="">ID / Iqama Number</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={2172323137}
                              name="name"
                              id="name"
                            />
                          </div>
                          <div className="form-group mb-0 col-4">
                            <label htmlFor="">Date Of Birth</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="27-09-2001"
                              name="name"
                              id="name"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Offers Posted</h2>
                      </div>
                    </div>
                    <div className="row products_posted">
                      <div className="col-4 mb-4">
                        <a
                          href="/users-offer-details"
                          className="products_posted_box"
                        >
                          <img
                            className="main_img"
                            src="assets/img/product_img1.png"
                            alt=""
                          />
                          <div className="img_bx">
                            <img src="assets/img/free.svg" alt="" />
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-4">
                        <a
                          href="/users-offer-details"
                          className="products_posted_box"
                        >
                          <img
                            className="main_img"
                            src="assets/img/product_img2.png"
                            alt=""
                          />
                          <div className="img_bx">
                            <img src="assets/img/price.svg" alt="" />
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-4">
                        <a
                          href="/users-offer-details"
                          className="products_posted_box"
                        >
                          <img
                            className="main_img"
                            src="assets/img/product_img3.png"
                            alt=""
                          />
                          <div className="img_bx">
                            <img src="assets/img/auction.svg" alt="" />
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-4 mt-2">
                        <a
                          href="/users-offer-details"
                          className="products_posted_box"
                        >
                          <img
                            className="main_img"
                            src="assets/img/product_img1.png"
                            alt=""
                          />
                          <div className="img_bx">
                            <img src="assets/img/free.svg" alt="" />
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-4 mt-2">
                        <a
                          href="/users-offer-details"
                          className="products_posted_box"
                        >
                          <img
                            className="main_img"
                            src="assets/img/product_img2.png"
                            alt=""
                          />
                          <div className="img_bx">
                            <img src="assets/img/price.svg" alt="" />
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-4 mt-2">
                        <a
                          href="/users-offer-details"
                          className="products_posted_box"
                        >
                          <img
                            className="main_img"
                            src="assets/img/product_img3.png"
                            alt=""
                          />
                          <div className="img_bx">
                            <img src="assets/img/auction.svg" alt="" />
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-4 mt-2">
                        <a
                          href="/users-offer-details"
                          className="products_posted_box"
                        >
                          <img
                            className="main_img"
                            src="assets/img/product_img1.png"
                            alt=""
                          />
                          <div className="img_bx">
                            <img src="assets/img/free.svg" alt="" />
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-4 mt-2">
                        <a
                          href="/users-offer-details"
                          className="products_posted_box"
                        >
                          <img
                            className="main_img"
                            src="assets/img/product_img2.png"
                            alt=""
                          />
                          <div className="img_bx">
                            <img src="assets/img/price.svg" alt="" />
                          </div>
                        </a>
                      </div>
                      <div className="col-4 mb-4 mt-2">
                        <a
                          href="/users-offer-details"
                          className="products_posted_box"
                        >
                          <img
                            className="main_img"
                            src="assets/img/product_img3.png"
                            alt=""
                          />
                          <div className="img_bx">
                            <img src="assets/img/auction.svg" alt="" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Offers</h2>
                      </div>
                    </div>
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
                              As a Seller
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
                              As a Buyer
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
                            <div className="row p-4 mx-0">
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img1.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_pending">
                                      Pending
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Highest Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Requests :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              5 Offers
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img2.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_accepted">
                                      Accepted
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Highest Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Buyer Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img3.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_Sold">
                                      Sold
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Sold For :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Buyer Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
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
                            className="tab-pane fade"
                            id="nav-profile"
                            role="tabpanel"
                            aria-labelledby="nav-profile-tab"
                          >
                            <div className="row p-4 mx-0">
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img1.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_pending">
                                      Pending
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Offer Sent :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img2.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_accepted">
                                      Accepted
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Offer Sent :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img3.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_declained">
                                      Offer Declined
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Offer Sent :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <del>1500 SAR</del>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Trials Left :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              5 Offers
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img1.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_Sold">
                                      Sold
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Sold For :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img2.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag deleted">
                                      Deleted
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Offer Sent :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img1.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_new">
                                      New Offer
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Offer Sent :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img1.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag deleted">
                                      New Offer Expired
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              New Offer :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <del>1500 SAR</del>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Expires In:
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              EXPIRED
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Trials Left :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              5 Offers
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
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
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Auctions &amp; Bids</h2>
                      </div>
                    </div>
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
                              id="nav-home1-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-home1"
                              type="button"
                              role="tab"
                              aria-controls="nav-home1"
                              aria-selected="true"
                            >
                              Auctions
                            </button>
                            <button
                              className="nav-link"
                              id="nav-profile1-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-profile1"
                              type="button"
                              role="tab"
                              aria-controls="nav-profile1"
                              aria-selected="false"
                            >
                              Bids
                            </button>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-home1"
                            role="tabpanel"
                            aria-labelledby="nav-home1-tab"
                          >
                            <div className="row p-4 mx-0">
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img1.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_pending">
                                      Pending
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Highest Bid :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Time Left :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              3d 20h / 5 Bids
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img2.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_accepted">
                                      Approved
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Highest Bid :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Time Left :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              Open Auction / 5 Bids
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Buyer Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img3.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_pending">
                                      Pending
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Actual Price :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Highest Bid :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Time Left :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              3d 20h / 5 Bids
                                            </span>
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
                            className="tab-pane fade"
                            id="nav-profile1"
                            role="tabpanel"
                            aria-labelledby="nav-profile1-tab"
                          >
                            <div className="row p-4 mx-0">
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img1.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_declained">
                                      Outbid
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Your Bid :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Current Bid :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Time Left :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              3d 20h / 5 Bids
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img2.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_Sold">
                                      Sold
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Your Bid :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Sold For :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              1500 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img3.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_pending">
                                      Highest
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Your Bid :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Time Left :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              3d 20h / 5 Bids
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img1.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag deleted">
                                      Deleted
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Your Bid :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 my-3 d-flex align-items-stretch">
                                <div className="Offers_box w-100">
                                  <div className="Offers_box_img">
                                    <img
                                      src="assets/img/product_img2.png"
                                      alt=""
                                    />
                                    <span className="month_tag">
                                      1 Month Ago
                                    </span>
                                    <div className="offer_tag offer_accepted">
                                      Won
                                    </div>
                                  </div>
                                  <div className="content_offer">
                                    <h2>Product Name</h2>
                                    <div className="row mt-2">
                                      <div className="col-12">
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Your Bid :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              2000 SAR
                                            </span>
                                          </div>
                                        </div>
                                        <div className="row content_offer_inner">
                                          <div className="col-6 text-end">
                                            <strong className="box_tag_left">
                                              Seller Name :
                                            </strong>
                                          </div>
                                          <div className="col-6">
                                            <span className="box_tag_left">
                                              <a href="user-details.html">
                                                Ajay Sharma
                                              </a>
                                            </span>
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
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOfferPOsted;
