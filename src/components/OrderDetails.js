import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCheck,
  faDollarSign,
  faChartLine,
  faArrowRight,
  faCreditCard,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { useGetFileQuery, useOrderDetailsAllMutation } from "../services/Post";
function OrderDetails() {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const { id: routeId } = useParams();
  const { data } = useGetFileQuery("file-id");
  const [orderDetails] = useOrderDetailsAllMutation(routeId);
  const [details, setDetails] = useState([]);
  const [address, setAddress] = useState([]);
  const [productId, setProductId] = useState([]);

  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    const userdetailId = {
      id: routeId,
    };
    const response = await orderDetails(userdetailId);
    setDetails(response?.data?.results?.orderDetails);
    setAddress(response?.data?.results?.orderDetails?.address_Id);
    setProductId(
      response?.data?.results?.orderDetails?.products[0]?.product_Id
    );
  };

  const handleDownload = () => {
    if (data) {
      const blob = new Blob([data]);
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "file.xlsx";
      link.click();
    }
  };
  
  return (
    <>
      <Sidebar />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row offerdetails-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Order Details</h2>
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
                              <div className="carousel-inner">
                                {productId?.addVarient?.[0]?.product_Pic?.map(
                                  (item, index) => (
                                    <div
                                      className={`carousel-item ${
                                        index === 0 ? "active" : ""
                                      }`}
                                      key={index}
                                    >
                                      <img
                                        src={item}
                                        className="d-block w-100"
                                        alt={`Slide ${index + 1}`}
                                      />
                                      <span className="label_s">
                                        {item.label}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="carousel-indicators">
                                {productId?.addVarient?.[0]?.product_Pic?.map(
                                  (item, index) => (
                                    <button
                                      type="button"
                                      data-bs-target="#carouselExampleIndicators"
                                      data-bs-slide-to={index}
                                      key={index}
                                      aria-label={`Slide ${index + 1}`}
                                      className={index === 0 ? "active" : ""}
                                    >
                                      <img
                                        src={item}
                                        className="thumnail_img"
                                        alt={`Slide ${index + 1}`}
                                      />
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="offerdetails_info">
                              <div className="row mx-0">
                                {/* <div className="col-md-6">
                                  <div className="row justify-content-center">
                                    <div className="col-12 text-center mb-3">
                                      <div className="pro_name">- Seller -</div>
                                    </div>
                                    <div className="col-12">
                                      <div className="user_imgg">
                                        <img
                                          src="../assets/img/profile_img1.jpg"
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12 users_left_content text-center">
                                      <Link to="user-details.html">
                                        <strong>Ajay Sharma</strong>
                                      </Link>
                                      <div className="rating_box">
                                        <Link to="">
                                          <i className="fas fa-star"></i>
                                        </Link>
                                        <Link to="">
                                          <i className="fas fa-star"></i>
                                        </Link>
                                        <Link to="">
                                          <i className="fas fa-star"></i>
                                        </Link>
                                        <Link to="">
                                          <i className="fas fa-star"></i>
                                        </Link>
                                        <Link to="">
                                          <i className="far fa-star"></i>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                                <div className="col-md-12">
                                  <div className="col-12 text-center mb-3">
                                    <div className="pro_name">- Buyer -</div>
                                  </div>
                                  <div className="row justify-content-center">
                                    <div className="col-12">
                                      <div className="user_imgg">
                                        <img
                                          src={
                                            details?.cartsTotal?.[0]?.[0]
                                              ?.profile_Pic ||
                                            "../assets/img/profile.png"
                                          }
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12 users_left_content text-center">
                                      <Link to="user-details.html">
                                        <strong>
                                          {" "}
                                          {details?.address_Id?.fullName}{" "}
                                        </strong>
                                      </Link>
                                      {/* <div className="rating_box">
                                        <Link to="">
                                          <i className="fas fa-star"></i>
                                        </Link>
                                        <Link to="">
                                          <i className="fas fa-star"></i>
                                        </Link>
                                        <Link to="">
                                          <i className="fas fa-star"></i>
                                        </Link>
                                        <Link to="">
                                          <i className="fas fa-star"></i>
                                        </Link>
                                        <Link to="">
                                          <i className="far fa-star"></i>
                                        </Link>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 offerdetails_inner border">
                                  <Link
                                    className="download_invoice5 border"
                                    to="#"
                                    style={{ width: "100px" }}
                                    onClick={handleDownload}
                                  >
                                    <i className="fal fa-download me-1"></i>{" "}
                                    Invoice
                                  </Link>
                                  <div className="row">
                                    <div className="col-12">
                                      <h2>Product Name</h2>
                                    </div>
                                    <div className="col-md-6">
                                      <span>
                                        <i className="fas fa-list-ol me-2"></i>{" "}
                                        Status: {details?.orderStatus}
                                      </span>
                                      <span>
                                        <i className="fas fa-list-ol me-2"></i>{" "}
                                        {productId?.productName_en}
                                      </span>
                                      <span>
                                        <i className="fal fa-calendar-alt me-2"></i>{" "}
                                        Order Date:{" "}
                                        {details?.createdAt?.slice(0, 10)}
                                      </span>
                                    </div>
                                    <div className="col-md-6">
                                      <span>
                                        <i className="fal fa-edit me-2"></i>{" "}
                                        {details?._id}
                                      </span>
                                      <span>
                                        <i className="fal fa-sack-dollar me-2"></i>{" "}
                                        Price: {details?.cartsTotal?.[0]?.[0]}
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
                  <div className="col-12 ">
                    <div className="row">
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Contact Details</h2>
                          </div>
                        </div>
                        <form
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-4">
                            <label htmlFor="">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="productName"
                              id="productName"
                              defaultValue={
                                details?.address_Id?.fullName
                              }
                              // defaultValue={
                              //   details?.cartsTotal?.[0]?.[0]?.userName
                              // }
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Email Id</label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              id="title"
                              defaultValue={
                                details?.cartsTotal?.[0]?.[0]?.userEmail
                              }
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Mobile Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="code"
                              id="code"
                              defaultValue={
                                details?.cartsTotal?.[0]?.[0]?.mobileNumber
                              }
                              readOnly
                            />
                          </div>
                        </form>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Delivery Address</h2>
                          </div>
                        </div>
                        <form
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-4">
                            <label htmlFor="">Title </label>
                            <input
                              type="text"
                              className="form-control"
                              name="productName"
                              id="productName"
                              defaultValue={address?.title}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              id="title"
                              defaultValue={address?.address}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Locality</label>
                            <input
                              type="text"
                              className="form-control"
                              name="code"
                              id="code"
                              defaultValue={address?.locality}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">City</label>
                            <input
                              type="text"
                              className="form-control"
                              name="code"
                              id="code"
                              defaultValue={address?.city}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Country</label>
                            <input
                              type="text"
                              className="form-control"
                              name="discount"
                              id="discount"
                              defaultValue={address?.country}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Pin Code</label>
                            <input
                              type="text"
                              className="form-control"
                              name="discount"
                              id="discount"
                              defaultValue={address?.pinCode}
                              readOnly
                            />
                          </div>
                        </form>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Delivery Location</h2>
                          </div>
                        </div>
                        <form
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                          // onSubmit={handleSaveChanges}
                        >
                          <div className="row mx-0  product_location">
                            <div className="col-12">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429154.75849258946!2d-117.38917548361756!3d32.8248175128601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9530fad921e4b%3A0xd3a21fdfd15df79!2sSan%20Diego%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1669709877583!5m2!1sen!2sin"
                                width="100%"
                                height="350"
                                style={{ border: "0" }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Maps - San Diego, California"
                                referrerPolicy="no-referrer-when-downgrade"
                              ></iframe>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-4">
                        <div className="row me-0">
                          <div className="col-12 design_outter_comman mb-4 shadow">
                            <div className="row comman_header justify-content-between">
                              <div className="col">
                                <h2> Contact Details</h2>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <tbody style={{ textAlign: "left" }}>
                                      <tr>
                                        <td style={{ textAlign: "left" }}>
                                          Full Name:
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                          {
                                            details?.cartsTotal?.[0]?.[0]
                                              ?.userName
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: "left" }}>
                                          Email Id:
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                          {
                                            details?.cartsTotal?.[0]?.[0]
                                              ?.userEmail
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: "left" }}>
                                          Mobile Number:
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                          {
                                            details?.cartsTotal?.[0]?.[0]
                                              ?.mobileNumber
                                          }
                                        </td>
                                      </tr>
                                     
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {/* <div className="col-4">
                        <div className="row me-0">
                          <div className="col-12 design_outter_comman mb-4 shadow">
                            <div className="row comman_header justify-content-between">
                              <div className="col">
                                <h2> Delivery Address</h2>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <tbody style={{ textAlign: "left" }}>
                                      <tr>
                                        <td style={{ textAlign: "left" }}>
                                          Title
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                          {address?.title}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: "left" }}>
                                          Address
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                          {address?.address}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: "left" }}>
                                          Locality
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                          {address?.locality}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: "left" }}>
                                          City
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                          {address?.city}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ textAlign: "left" }}>
                                          country
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                          {address?.country}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {/* <div className="col-4">
                        <div className="row me-0">
                          <div className="col-12 design_outter_comman mb-4 shadow">
                            <div className="row comman_header justify-content-between">
                              <div className="col">
                                <h2> Product Location</h2>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <tbody style={{ textAlign: "left" }}>
                                      <div className="row mx-0 p-4 product_location">
                                        <div className="col-12">
                                          <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429154.75849258946!2d-117.38917548361756!3d32.8248175128601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9530fad921e4b%3A0xd3a21fdfd15df79!2sSan%20Diego%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1669709877583!5m2!1sen!2sin"
                                            width="100%"
                                            height="350"
                                            style={{ border: "0" }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            title="Google Maps - San Diego, California"
                                            referrerPolicy="no-referrer-when-downgrade"
                                          ></iframe>
                                        </div>
                                      </div>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="col-12 design_outter_comman shadow">
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
                                  <strong>Description: </strong>
                                  {productId?.Description}
                                </p>
                                <p>
                                  <strong>Care Instruction: </strong>
                                  <span>{productId?.careInstuctions}</span>
                                </p>
                                <p>
                                  <strong>Meta Description: </strong>
                                  {productId?.metaDescription}
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
                                  height="350"
                                  style={{ border: "0" }}
                                  allowFullScreen=""
                                  loading="lazy"
                                  title="Google Maps - San Diego, California"
                                  referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
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
                                          src="../assets/img/profile_img1.jpg"
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
                                          src="../assets/img/profile_img1.jpg"
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
                                          src="../assets/img/profile_img1.jpg"
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
                                          src="../assets/img/profile_img1.jpg"
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

export default OrderDetails;
