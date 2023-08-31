import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faDollarSign,
  faArrowRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

function AgentInformation() {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const { id } = useParams();
  const [agentDetails, setAgentDetails] = useState("");
  const [agentDetails2, setAgentDetails2] = useState("");
  const [agentDetailsList, setAgentDetailsList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  useEffect(() => {
    userList();
  }, []);
  const userList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/agent/agent/user-List"
    );
    setAgentList(data.results.list.reverse());
    console.log("Agent List", data);
  };
  useEffect(() => {
    userDetails();
  }, []);
  const userDetails = async () => {
    const { data } = await axios.post(
      `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/agent/agent/user-details/${id}`
    );
    setAgentDetails(data.results.userDetail);
    setAgentDetails2(data.results);
    setAgentDetailsList(data?.results?.details);
    console.log("Agent Details", data.results.userDetail);
  };

  return (
    <>
      <Sidebar Dash={"agents"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center">
              <div className="col-12 d-flex">
                <div className="col-4 row mx-0">
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
                                  src={agentDetails?.profile_Pic}
                                  // src="../assets/img/profile_img1.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div
                              className="col-12 users_left_content"
                              style={{ marginTop: "-80px" }}
                            >
                              <h5 style={{ marginLeft: "10px" }}>
                                {agentDetails && agentDetails.name
                                  ? agentDetails.name.split(" ")[0]
                                  : ""}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 d-flex">
                        <div className="col-4">
                          <strong>
                            {agentDetails?.createdAt?.slice(0, 10)}{" "}
                          </strong>
                          <div>
                            {" "}
                            <strong style={{ color: "grey" }}>
                              Member Since
                            </strong>{" "}
                          </div>
                        </div>
                        <div className="col-4">
                          <strong>{agentDetails?.status} </strong>
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
                      <Link
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        className="comman_btn2 table_viewbtn danger"
                        to=""
                      >
                        Approved
                      </Link>
                      <Link
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        className="comman_btn2 table_viewbtn danger ms-2 disabled"
                        to=""
                      >
                        Reject
                      </Link>
                      <span className="ms-5 text-danger">
                        <label htmlFor="">
                          {" "}
                          <Link>
                            <strong className="text-danger ms-5">
                              Transactions
                            </strong>
                          </Link>{" "}
                        </label>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="mt-1 mx-1"
                        />
                      </span>
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
                        <div className="col-auto mx-3">
                          <Link
                            style={{
                              color: "red",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
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
                              <label htmlFor="" style={{ marginTop: "10px" }}>
                                Full Name:
                              </label>
                            </div>
                            <div className="col-8 mt-2">
                              {agentDetails.name}
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
                              <label htmlFor="" style={{ marginTop: "10px" }}>
                                Mobile Number:
                              </label>
                            </div>
                            <div className="col-8 mt-2">
                              {agentDetails.mobileNumber}
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
                              <label htmlFor="" style={{ marginTop: "10px" }}>
                                Email Id:
                              </label>
                            </div>
                            <div className="col-8 mt-2">
                              {agentDetails.Email}
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
                              <label htmlFor="" style={{ marginTop: "10px" }}>
                                Location:
                              </label>
                            </div>
                            <div className="col-8 mt-2">
                              {agentDetails.address}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-12 design_outter_comman shadow mb-4 mt-5 w-100">
                    <div className="users_right pe-2">
                      <form
                        action="#"
                        className="form-design row position-relative"
                      >
                        <div className="form-group  ">
                          <div className="d-flex align-items-center justify-content-between mt-2">
                            <label htmlFor="">Documents:</label>
                          </div>
                        </div>
                        <div className="form-group ">
                          <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="">Vehicle Informations:</label>
                            <div className="d-flex">
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                className="comman_btn2 table_viewbtn mx-2"
                                to=""
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between my-2">
                            <label htmlFor="">KYC Details:</label>
                            <div className="d-flex">
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                className="comman_btn2 table_viewbtn mx-2"
                                to=""
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-8 mx-5">
                  <div className="row">
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
                                  {agentDetails2.compltedOrder}
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
                          <h5>Total Earning</h5>
                        </Link>
                        <div className="row mt-2">
                          <div className="col-12">
                            <div className="row content_offer_inner">
                              <div className="col-6 text-end">
                                <strong
                                  className="box_tag_left"
                                  style={{ fontSize: "30px" }}
                                >
                                  ${agentDetails2.totalearning}
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
                            style={{
                              color: "red",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <strong> View All</strong>
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
                              <thead>
                                <tr>
                                  <th>Order Id</th>
                                  <th>Customers</th>
                                  <th>Earning</th>
                                  <th>Cost</th>
                                  <th>Status</th>
                                  <th>Created At</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {agentDetailsList?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td> {item?._id} </td>
                                      <td></td>
                                      <td>{item?.shippingPrice} </td>
                                      <td>{item?.cartsTotal} </td>
                                      <td> {item?.orderStatus} </td>
                                      <td>{item?.createdAt.slice(0, 10)} </td>
                                      <td></td>
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
                              <thead>
                                <tr>
                                  <th>Order Id</th>
                                  <th>Review By</th>
                                  <th>Rating</th>
                                  <th>Review</th>
                                  <th>Created At</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
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
    </>
  );
}

export default AgentInformation;
