import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
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
import { useAgentDetailsAllMutation } from "../services/Post";
import { useDeleteOrderMutation } from "../services/Post";
import { useBlockUserMutation } from "../services/Post";

function AgentDetailsAll() {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const { id: routeId } = useParams();
  const [
    agentDetails,
    isError,
    isLoading,
    isSuccess,
    isUninitialized,
    originalArgs,
    error,
  ] = useAgentDetailsAllMutation(routeId);
  const [deleteOrder] = useDeleteOrderMutation();
  const [blockUser, res] = useBlockUserMutation();
  const [address, setAddress] = useState([]);
  const [order, setOrder] = useState([]);
  const [review, setReview] = useState([]);
  const [details, setDetails] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    const userdetailId = {
      id: routeId,
    };
    const response = await agentDetails(userdetailId);
    setAddress(response?.data?.results?.address);
    setOrder(response?.data?.results?.details);
    setReview(response?.data?.results?.review);
    setDetails(response?.data?.results?.userDetail);
    setTotalOrder(response?.data?.results);
    console.log("response details", response);
  };

  const deleteOrderList = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
      if (result.isConfirmed) {
        await deleteOrder(orderId);
        userDetail();
      }
    } catch (error) {
      console.log("Error deleting order:", error);
    }
  };

  const handleBlockUser = async (e) => {
    const newStatus = status;
    const confirmationResult = await Swal.fire({
      title: "Confirm Status Change",
      text: "Do you want to Block the User?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (confirmationResult.isConfirmed) {
      const editStatus = {
        id: routeId,
        status: newStatus,
      };
      try {
        await blockUser(editStatus);
        Swal.fire({
          title: "Changes Saved",
          text: "The user has been blocked successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } catch (error) {}
    }
  };

  function formatDateString(dateString) {
    if (!dateString) return "";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [year, month, day] = dateString.split("-");
    const formattedDate = ` ${day}/${months[parseInt(month) - 1]}/${year}`;
    return formattedDate;
  }

  return (
    <>
      <Sidebar Dash={"agents"} />
      {isLoading ? (
        <div>Loading! Please wait...</div>
      ) : (
        <div className="admin_main">
          <div className="admin_main_inner">
            <div className="admin_panel_data height_adjust">
              <div className="row offer-management justify-content-center">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4">
                      <div className="row me-0">
                        <div className="col-12 design_outter_comman mb-4 shadow">
                          <div className="row">
                            <div
                              className="col-12 profile-bg"
                              style={{
                                backgroundImage:
                                  "url('../assets/img/profile_img2.jpeg')",
                                height: "130px",
                                width: "100%",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            ></div>
                            <div className=" col-12 d-flex">
                              <div
                                className="row-5 user_imgg ms-4"
                                style={{ marginTop: "-25px" }}
                              >
                                <img src={details?.profile_Pic} alt="" />
                              </div>
                              <div className="col-7 mt-3 users_left_content">
                                {/* <h5> {details?.userName} </h5> */}
                                <h5>{details?.userName?.split(" ")[0]}</h5>
                              </div>
                            </div>
                            <div className="col-12 d-flex">
                              <div className="col-6">
                                {/* <strong>
                                  {details?.createdAt
                                    ? details.createdAt
                                        .slice(0, 10)
                                        .replace(/-/g, "/")
                                    : ""}
                                </strong> */}
                                <strong>
                                  {details?.createdAt
                                    ? formatDateString(
                                        details.createdAt.slice(0, 10)
                                      )
                                    : ""}
                                </strong>

                                <div>
                                  <strong style={{ color: "grey" }}>
                                    Member Since
                                  </strong>
                                </div>
                              </div>
                              <div className="col-3">
                                <strong>
                                  {details?.status === true
                                    ? "Active"
                                    : "Inactive"}
                                </strong>
                                <div>
                                  <strong style={{ color: "grey" }}>
                                    Status
                                  </strong>
                                </div>
                              </div>
                              <div className="col-3 ms-4">
                                <FontAwesomeIcon
                                  icon={faStar}
                                  style={{ color: "#f5c724" }}
                                />
                                <strong>0/5</strong>
                                <div>
                                  <strong style={{ color: "grey" }}>
                                    Rating
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 my-3 d-flex">
                              <div className="col-6">
                                {details?.status === false ? (
                                  <Link
                                    className="comman_btn2 table_viewbtn bg-light text-secondary border border-none"
                                    to="#"
                                    style={{ cursor: "not-allowed" }}
                                    disabled
                                  >
                                    Approved
                                  </Link>
                                ) : (
                                  <>
                                    <Link
                                      className="comman_btn2 table_viewbtn danger"
                                      to=""
                                      onClick={(e) => {
                                        setStatus(e.target.value);
                                        setTimeout(() => {
                                          handleBlockUser();
                                        }, 1000);
                                      }}
                                    >
                                      Approve
                                    </Link>
                                    <Link
                                      className="comman_btn2 table_viewbtn danger ms-2"
                                      to=""
                                      onClick={(e) => {
                                        setStatus(e.target.value);
                                        setTimeout(() => {
                                          handleBlockUser();
                                        }, 1000);
                                      }}
                                    >
                                      Reject
                                    </Link>
                                  </>
                                )}
                              </div>
                              <div className="col-6 text-danger">
                                <strong>Transactions</strong>
                                <FontAwesomeIcon
                                  icon={faArrowRight}
                                  className="me-1 mt-1 ms-2"
                                />
                                <Link
                                  className="comman_btn2 table_viewbtn  ms-2"
                                  to=""
                                >
                                  <FontAwesomeIcon icon={faCreditCard} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 design_outter_comman mb-4 shadow">
                          <div className="row comman_header justify-content-between">
                            <div className="col">
                              <h2>Personal Information</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 comman_table_design px-0">
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <tbody style={{ textAlign: "left" }}>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Full Name
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Mobile Number
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.mobileNumber}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Email Id
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.Email}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Bank Name:
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.bankName}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Account Number:
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.accountNumber}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Account Name:
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.accountName}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Routing Number:
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.routingNumber}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Wallet Amount
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        $ 50
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 design_outter_comman mb-4 shadow">
                          <div className="row comman_header justify-content-between">
                            <div className="col">
                              <h2>
                                {" "}
                                 Address
                              </h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 comman_table_design px-0">
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <tbody style={{ textAlign: "left" }}>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Address:
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.address}
                                      </td>
                                    </tr>
                                    {/* <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Address
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.address_Id?.address}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Locality
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.address_Id?.locality}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        City
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.address_Id?.city}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        country
                                      </td>
                                      <td style={{ textAlign: "left" }}>
                                        {details?.address_Id?.country}
                                      </td>
                                    </tr> */}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* {address?.map((item, index) => {
                          return (
                            <div
                              className="col-12 design_outter_comman mb-4 shadow"
                              key={index}
                            >
                              <div className="row comman_header justify-content-between">
                                <div className="col">
                                  <h2>Address ({item?.title})</h2>
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
                                            {item?.title}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style={{ textAlign: "left" }}>
                                            Address
                                          </td>
                                          <td style={{ textAlign: "left" }}>
                                            {item?.address}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style={{ textAlign: "left" }}>
                                            Locality
                                          </td>
                                          <td style={{ textAlign: "left" }}>
                                            {item?.locality}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style={{ textAlign: "left" }}>
                                            City
                                          </td>
                                          <td style={{ textAlign: "left" }}>
                                            {item?.city}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style={{ textAlign: "left" }}>
                                            Country
                                          </td>
                                          <td style={{ textAlign: "left" }}>
                                            {item?.country}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })} */}
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="row ms-3 mb-5 justify-content-center">
                        <div className="col d-flex align-items-stretch">
                          <Link
                            to="/users"
                            className="row dashboard_box box_design me-3 w-100"
                          >
                            <div className="col-auto px-0">
                              <span className="dashboard_icon">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="complete-order-icon"
                                />
                              </span>
                            </div>
                            <div className="col pe-0">
                              <div className="dashboard_boxcontent">
                                <h2>Completed Orders</h2>
                                <span> {totalOrder?.compltedOrder} </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="col d-flex align-items-stretch">
                          <Link
                            to="/orders"
                            className="row dashboard_box box_design me-3 w-100"
                          >
                            <div className="col-auto px-0">
                              <span className="dashboard_icon">
                                <FontAwesomeIcon
                                  icon={faDollarSign}
                                  className="total-spent-icon"
                                />
                              </span>
                            </div>
                            <div className="col pe-0">
                              <div className="dashboard_boxcontent">
                                <h2>Total Earning</h2>
                                <span>{totalOrder?.totalearning}</span>
                              </div>
                            </div>
                          </Link>
                        </div>
                        {/* <div className="col d-flex align-items-stretch">
                          <Link
                            to="/offers"
                            className="row dashboard_box box_design me-3 w-100"
                          >
                            <div className="col-auto px-0">
                              <span className="dashboard_icon">
                                <FontAwesomeIcon
                                  icon={faChartLine}
                                  className="average-order-icon"
                                />
                              </span>
                            </div>
                            <div className="col pe-0">
                              <div className="dashboard_boxcontent">
                                <h2>Total Average Value</h2>
                                <span>{totalOrder?.orderValue}</span>
                              </div>
                            </div>
                          </Link>
                        </div> */}
                      </div>
                      <div className="row ms-0">
                        <div className="col-12 design_outter_comman mb-4 shadow">
                          <div className="row comman_header justify-content-between">
                            <div className="col">
                              <h2>
                                My Order ({order?.length ? order?.length : "0"})
                              </h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 comman_table_design px-0">
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <thead>
                                    <tr>
                                      <th>Order Id</th>
                                      <th>Cost</th>
                                      <th>Status</th>
                                      <th>Created At</th>
                                      <th>Offer Type</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order
                                      ?.slice()
                                      ?.reverse()
                                      ?.map((item, ind) => {
                                        return (
                                          <tr key={ind}>
                                            <td> {item?._id} </td>
                                            <td>
                                              {
                                                item?.cartsTotal[0][0]
                                                  ?.totalAfterDiscount[0]
                                              }
                                            </td>
                                            <td> {item?.orderStatus} </td>
                                            <td>
                                              {item?.createdAt?.slice(0, 10)}{" "}
                                            </td>
                                            <td>Free</td>
                                            <td>
                                              <button
                                                className="comman_btn2 table_viewbtn"
                                                onClick={() =>
                                                  deleteOrderList(item._id)
                                                }
                                              >
                                                <FontAwesomeIcon
                                                  icon={faTrash}
                                                />
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row ms-0">
                        <div className="col-12 design_outter_comman mb-4 shadow">
                          <div className="row comman_header justify-content-between">
                            <div className="col">
                              <h2>Reviews</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 comman_table_design px-0">
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <thead>
                                    <tr>
                                      <th>S.No.</th>
                                      <th>Product Id</th>
                                      <th>Review By</th>
                                      <th>Rating</th>
                                      <th>Review</th>
                                      <th>Created At</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {review?.map((item, index) => {
                                      return (
                                        <tr key={index}>
                                          <td> {item?.product_Id} </td>
                                          <td> {item?.yourName} </td>
                                          <td> {item?.rating} </td>
                                          <td>
                                            {" "}
                                            {item?.reviewTitle?.slice(
                                              0,
                                              20
                                            )}{" "}
                                          </td>
                                          <td>
                                            {" "}
                                            {item?.createdAt?.slice(0, 10)}{" "}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
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
      )}
    </>
  );
}

export default AgentDetailsAll;
