import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
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
import { useBlockUserMutation } from "../services/Post";

function UserDetails2() {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const { id } = useParams();
  const [userListDetails, setUserListDetails] = useState([]);
  console.log("userListDetails", userListDetails);
  const [orderList, setOrderList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [status, setStatus] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockUser, res] = useBlockUserMutation();
  console.log(isBlocked);
  console.log(res?.data?.results?.statusupdate?.status);
  useEffect(() => {
    if (res?.data?.results?.statusupdate?.status === false) {
      setIsBlocked(true);
    }
  }, [res.isSuccess]);
  useEffect(() => {
    userDetails();
  }, []);
  const userDetails = async () => {
    const { data } = await axios.post(
      `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/details/${id}`
    );
    setUserListDetails(data?.results);
    setOrderList(data?.results?.order);
    setReviewList(data?.results?.review);
    console.log("order list", data?.results?.order);
    console.log("User List Details", data.results);
    console.log("id", id);
  };
  const deleteOrder = async (_id) => {
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
        await axios.delete(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/order/order/delete-order/${_id}`
        );
        console.log("delete Order", _id);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error deleting order:", error);
    }
  };
  const handleCheckboxChange = async (e) => {
    // e.preventDefault();
    console.log("handleSaveChanges1", id);
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
        id: id,
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

  return (
    <>
      <Sidebar Dash={"users"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <h5 style={{ marginTop: "-30px", marginBottom: "20px" }}>
              <Link>Customers</Link>/Profile
            </h5>
            <div className="row dashboard_part justify-content-center">
              <div className="col-4">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row users-information position-relative align-items-center justify-content-center">
                      <div className="col-12">
                        <div className="users_left">
                          <div className="row">
                            <div className="col-12">
                              <div
                                className="profile-bg"
                                style={{
                                  backgroundImage:
                                    "url('../assets/img/profile_img2.jpeg')",
                                  height: "100px",
                                  width: "130%",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  marginLeft: "-42px",
                                  marginTop: "-40px",
                                }}
                              ></div>
                              <div
                                className="user_imgg"
                                style={{
                                  marginTop: "-30px",
                                  marginLeft: "0px",
                                }}
                              >
                                <img
                                  src={userListDetails?.list?.profile_Pic}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div
                              className="col-12 users_left_content ms-5"
                              style={{ marginTop: "-80px" }}
                            >
                              <h5> {userListDetails?.list?.userName} </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 d-flex">
                        <div className="col-4">
                          <strong>06/May/2023</strong>
                          <div>
                            {" "}
                            <strong style={{ color: "grey" }}>
                              Member Since
                            </strong>{" "}
                          </div>
                        </div>
                        <div className="col-4">
                          <strong>Active</strong>
                          <div>
                            {" "}
                            <strong style={{ color: "grey" }}>
                              Status
                            </strong>{" "}
                          </div>
                        </div>
                        <div className="col-4">
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#f5c724" }}
                          />
                          <strong>0/5</strong>
                          <div>
                            {" "}
                            <strong style={{ color: "grey" }}>
                              Rating
                            </strong>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group my-2 ">
                      {userListDetails?.list?.status === false ? (
                        <Link
                          className="comman_btn2 table_viewbtn bg-light text-secondary border border-none"
                          to="#"
                          style={{ cursor: "not-allowed" }}
                          disabled
                        >
                          Blocked
                        </Link>
                      ) : (
                        <Link
                          className="comman_btn2 table_viewbtn danger"
                          to=""
                          onClick={(e) => {
                            setStatus(e.target.value);
                            setTimeout(() => {
                              handleCheckboxChange();
                            }, 1000);
                          }}
                        >
                          Block
                        </Link>
                      )}
                      <div
                        className="d-flex align-items-start "
                        style={{ justifyContent: "end", marginTop: "-31px" }}
                      >
                        <label htmlFor="">
                          {" "}
                          <Link>
                            <strong>Transactions</strong>
                          </Link>{" "}
                        </label>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="me-1 mt-1 ms-2"
                        />
                        <Link
                          // data-bs-toggle="modal"
                          // data-bs-target="#staticBackdrop"
                          className="comman_btn2 table_viewbtn  ms-2"
                          to=""
                        >
                          <FontAwesomeIcon icon={faCreditCard} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 pe-5 mt-2 shadow"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <div
                      className="users_right pe-2 mt-3"
                      style={{ width: "115%" }}
                    >
                      <div className="row justify-content-between">
                        <div className="col-auto">
                          <h5>Personal Information</h5>
                        </div>
                      </div>
                      <form
                        action="#"
                        className="form-design row position-relative"
                      >
                        <div
                          className="form-group col-12"
                          style={{
                            width: "97%",
                          }}
                        >
                          <div
                            className="row"
                            style={{
                              border: "1px solid #e3e3e1",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <div className="col-4">
                              <label htmlFor="" style={{ marginTop: "15px" }}>
                                Full Name:
                              </label>
                            </div>
                            <div className="col-8 mt-2">
                              {userListDetails?.list?.userName}
                            </div>
                          </div>
                        </div>
                        <div
                          className="form-group col-12"
                          style={{
                            width: "97%",
                          }}
                        >
                          <div
                            className="row"
                            style={{
                              border: "1px solid #e3e3e1",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <div className="col-4">
                              <label htmlFor="" style={{ marginTop: "15px" }}>
                                Mobile Number:
                              </label>
                            </div>
                            <div className="col-8">
                              <div className="col-8 mt-2">
                                {userListDetails?.list?.mobileNumber}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="form-group col-12"
                          style={{
                            width: "97%",
                          }}
                        >
                          <div
                            className="row"
                            style={{
                              border: "1px solid #e3e3e1",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <div className="col-4">
                              <label htmlFor="" style={{ marginTop: "15px" }}>
                                Email Id:
                              </label>
                            </div>
                            <div className="col-8">
                              <div className="col-8 mt-2">
                                {userListDetails?.list?.userEmail}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="form-group col-12"
                          style={{
                            width: "97%",
                          }}
                        >
                          <div
                            className="row"
                            style={{
                              border: "1px solid #e3e3e1",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <div className="col-4">
                              <label htmlFor="" style={{ marginTop: "15px" }}>
                                Wallet Amounts:
                              </label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="$0"
                                name="name"
                                id="name"
                                style={{ border: "none" }}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="col-12 pe-5 mt-5 shadow"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <div
                      className="users_right pe-2 mt-3"
                      style={{ width: "115%" }}
                    >
                      <div className="row justify-content-between">
                        <div className="col-auto">
                          <h5>Address</h5>
                        </div>
                      </div>
                      <form
                        action="#"
                        className="form-design row position-relative"
                      >
                        <div
                          className="form-group col-12"
                          style={{
                            width: "97%",
                          }}
                        >
                          <div
                            className="row"
                            style={{
                              border: "1px solid #e3e3e1",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <div className="col-4">
                              <label htmlFor="" style={{ marginTop: "15px" }}>
                                Title:
                              </label>
                            </div>
                            <div className="col-8 mt-2">
                              {userListDetails?.list?.address_Id !== 0 ? (
                                userListDetails?.list?.address_Id?.title || (
                                  <span className="text-danger">
                                    No Title Available
                                  </span>
                                )
                              ) : (
                                <span className="text-danger">
                                  No Address Available
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className="form-group col-12"
                          style={{
                            width: "97%",
                          }}
                        >
                          <div
                            className="row"
                            style={{
                              border: "1px solid #e3e3e1",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <div className="col-4">
                              <label htmlFor="" style={{ marginTop: "15px" }}>
                                Address:
                              </label>
                            </div>
                            <div className="col-8">
                              <div className="col-8 mt-2">
                                {userListDetails?.list?.address_Id ? (
                                  userListDetails?.list?.address_Id
                                    ?.address || (
                                    <span className="text-danger">
                                      No Address Available
                                    </span>
                                  )
                                ) : (
                                  <span className="text-danger">
                                    No Address Available
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="form-group col-12"
                          style={{
                            width: "97%",
                          }}
                        >
                          <div
                            className="row"
                            style={{
                              border: "1px solid #e3e3e1",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <div className="col-4">
                              <label htmlFor="" style={{ marginTop: "15px" }}>
                                Locality:
                              </label>
                            </div>
                            <div className="col-8">
                              <div className="col-8 mt-2">
                                {userListDetails?.list?.address_Id ? (
                                  userListDetails?.list?.address_Id
                                    ?.locality || (
                                    <span className="text-danger">
                                      No Locality Available
                                    </span>
                                  )
                                ) : (
                                  <span className="text-danger">
                                    No Locality Available
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="form-group col-12"
                          style={{
                            width: "97%",
                          }}
                        >
                          <div
                            className="row"
                            style={{
                              border: "1px solid #e3e3e1",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <div className="col-4">
                              <label htmlFor="" style={{ marginTop: "15px" }}>
                                City:
                              </label>
                            </div>
                            <div className="col-8">
                              <div className="col-8 mt-2">
                                {userListDetails?.list?.address_Id ? (
                                  userListDetails?.list?.address_Id?.city || (
                                    <span className="text-danger">
                                      No City Available
                                    </span>
                                  )
                                ) : (
                                  <span className="text-danger">
                                    No City Available
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="form-group col-12"
                          style={{
                            width: "97%",
                          }}
                        >
                          <div
                            className="row"
                            style={{
                              border: "1px solid #e3e3e1",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <div className="col-4">
                              <label htmlFor="" style={{ marginTop: "15px" }}>
                                Country:
                              </label>
                            </div>
                            <div className="col-8">
                              <div className="col-8 mt-2">
                                {userListDetails?.list?.address_Id ? (
                                  userListDetails?.list?.address_Id
                                    ?.country || (
                                    <span className="text-danger">
                                      No Country Available
                                    </span>
                                  )
                                ) : (
                                  <span className="text-danger">
                                    No Country Available
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="row mx-0">
                  <div
                    className="col-3 design_outter_comman shadow mb-4"
                    style={{ width: "32%" }}
                  >
                    <div className=" w-100 my-5">
                      <h5>
                        {" "}
                        <Link>Completed Orders</Link>{" "}
                      </h5>
                      <div className="row mt-2">
                        <div className="col-12">
                          <div className="row content_offer_inner">
                            <div className="col-6 text-start">
                              <strong
                                className="box_tag_left ms-5"
                                style={{ fontSize: "30px" }}
                              >
                                {userListDetails?.compltedOrder}
                              </strong>
                            </div>
                            <div className="col-6">
                              <span className="box_tag_left">
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  className="comman_btn2 table_viewbtn"
                                  to=""
                                >
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="complete-order-icon"
                                    style={{ fontSize: "30px" }}
                                  />
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-4 design_outter_comman shadow mb-4 "
                    style={{ marginLeft: "10px", width: "32%" }}
                  >
                    <div className="w-100 my-5">
                      <Link>
                        <h5>Total Spent</h5>
                      </Link>
                      <div className="row mt-2">
                        <div className="col-12">
                          <div className="row content_offer_inner">
                            <div className="col-6 text-end">
                              <strong
                                className="box_tag_left"
                                style={{ fontSize: "30px" }}
                              >
                                ${userListDetails?.totalSpent}
                              </strong>
                            </div>
                            <div className="col-6">
                              <span className="box_tag_left">
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  className="comman_btn2 table_viewbtn"
                                  to=""
                                >
                                  <FontAwesomeIcon
                                    icon={faDollarSign}
                                    className="total-spent-icon"
                                    style={{ fontSize: "30px" }}
                                  />
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-4 design_outter_comman shadow mb-4"
                    style={{ marginLeft: "10px", width: "32%" }}
                  >
                    <div className="w-100 my-5">
                      <Link>
                        <h5>Average Order Value</h5>
                      </Link>
                      <div className="row mt-2">
                        <div className="col-12">
                          <div className="row content_offer_inner">
                            <div className="col-6 text-end">
                              <strong
                                className="box_tag_left"
                                style={{ fontSize: "30px" }}
                              >
                                {userListDetails?.orderValue}
                              </strong>
                            </div>
                            <div className="col-6">
                              <span className="box_tag_left">
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  className="comman_btn2 table_viewbtn"
                                  to=""
                                >
                                  <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="average-order-icon"
                                    style={{ fontSize: "30px" }}
                                  />
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row  justify-content-between mt-3">
                      <div className="col-auto">
                        <h4>
                          {" "}
                          <strong>My Orders</strong>{" "}
                        </h4>
                      </div>
                      <div className="col-auto mx-3">
                        <Link
                          to="/users-offer"
                          style={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <strong> View</strong>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table
                            className="table  ms-4 my-5"
                            style={{
                              backgroundColor: "#f2efe4",
                              width: "95%",
                            }}
                          >
                            <thead
                              style={{
                                backgroundColor: "#f71010",
                                color: "white !important",
                              }}
                            >
                              <tr>
                                <th>Order Id</th>

                                <th>Cost</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {orderList?.map((order, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{order?._id}</td>
                                    <td>
                                      {
                                        order?.cartsTotal[0][0]
                                          ?.totalAfterDiscount[0]
                                      }
                                    </td>
                                    <td>{order?.orderStatus}</td>
                                    <td>{order?.createdAt?.slice(0, 10)}</td>

                                    <td>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <button
                                          className="comman_btn2 table_viewbtn"
                                          onClick={() => deleteOrder(order._id)}
                                        >
                                          <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                      </div>
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
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row  justify-content-between mt-3">
                      <div className="col-auto">
                        <h4>
                          {" "}
                          <strong>Reviews</strong>{" "}
                        </h4>
                      </div>
                      <div className="col-auto mx-3">
                        <Link
                          style={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <strong> View All</strong>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table
                            className="table my-5 ms-4"
                            style={{
                              backgroundColor: "#f2efe4",
                              width: "95%",
                            }}
                          >
                            <thead
                              style={{
                                backgroundColor: "#f71010",
                                color: "white !important",
                              }}
                            >
                              <tr>
                                <th>Product Id</th>
                                <th>Review By</th>
                                <th>Rating</th>
                                <th>Review</th>
                                <th>Created At</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reviewList?.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td> {item?.product_Id} </td>
                                    <td> {item?.yourName} </td>
                                    <td> {item?.rating} </td>
                                    <td> {item?.reviewTitle?.slice(0, 20)} </td>
                                    <td> {item?.createdAt?.slice(0, 10)} </td>
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
    </>
  );
}

export default UserDetails2;
