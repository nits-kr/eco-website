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

  const position = {
    lat: +details?.location?.latitude ? +details?.location?.latitude : 50,
    lng: +details?.location?.longitude ? +details?.location?.longitude : 50,
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
      <Sidebar Dash={"orders"} />
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
                                        Price: {details?.cartsTotal}
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
                              defaultValue={details?.address_Id?.fullName}
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
                              defaultValue={details?.address_Id?.mobileNumber}
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
                    <div className="row"></div>
                  </div>
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
