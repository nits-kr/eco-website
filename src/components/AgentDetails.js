import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function AgentDetails() {
  return (
    <>
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
          <h6 className="breadcrumb">
              <Link to="/" className="breadcrumb_link text-danger">
                <strong>
                Agents /
                </strong>
              </Link>{" "}
              <Link to="/" className="breadcrumb_link text-secondary">
              <strong>
                Add
                </strong>
              </Link>{" "}
            </h6>
            <div className="row dashboard_part justify-content-center">
              <div className="col-12 d-flex shadow">
                <div className="col-6 row">
                  <div className="col-12 mt-2">
                    <div className="users_right mt-3">
                      <div className="row justify-content-between">
                        <form
                          action="#"
                          className="form-design row position-relative"
                        >
                          <div className="form-group col-12">
                            <div className="col-12">
                              <label htmlFor="fullNme">Full Name:</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="karan"
                                name="fullName"
                                id="fullName"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="name@example.com"
                            />
                          </div>

                          <div className="form-group col-12">
                            <div className="col-12">
                              <label htmlFor="account">Account Number:</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue=""
                                name="account"
                                id="account"
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <div className="col-4">
                              <label htmlFor="bankName">Bank Name:</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue=""
                                name="bankName"
                                id="bankName"
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <div className="col-4">
                              <label htmlFor="password">Password:</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="password"
                                className="form-control"
                                defaultValue="**********"
                                name="password"
                                id="password"
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <div className="col-4">
                              <label htmlFor="commision">
                                Commision Types:
                              </label>
                            </div>
                            <div className="col-6">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="global"
                                name="commision"
                                id="commision"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="row users-information position-relative align-items-center justify-content-center">
                    <div className="col-12">
                      <div className="users_left">
                        <div className="row">
                          <div className="col-12">
                            <div className="profile-bg">
                              {" "}
                              <strong className="d-flex justify-content-flex-start">
                                {" "}
                                Profile Image{" "}
                              </strong>{" "}
                            </div>
                            <div className="user_imgg ms-0">
                              <img src="assets/img/profile_img1.jpg" alt="" />
                            </div>
                          </div>
                          <div className="col-1 users_left_content" style={{marginTop:"-45px", marginLeft:"80px"}} >
                            <Link to="#">
                            <FontAwesomeIcon
                              icon={faEdit}
                              style={{ color: "red" }}
                            />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 row">
                  <div className="col-12 mt-2">
                    <div className="users_right mt-3">
                      <div className="row justify-content-between">
                        <form
                          action="#"
                          className="form-design row position-relative"
                        >
                          <div className="form-group col-12">
                            <div className="col-12">
                              <label htmlFor="">Mobile Number:</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue=""
                                name="name"
                                id="name"
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <div className="col-12">
                              <label htmlFor="address">Address:</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                // defaultValue="type address"
                                placeholder="type address..."
                                name="address"
                                id="address"
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <div className="col-12">
                              <label htmlFor="accountName">Account Name:</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue=""
                                name="accountName"
                                id="accountName"
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <div className="col-4">
                              <label htmlFor="routing">Routing Number:</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue=""
                                name="routing"
                                id="routing"
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <div className="col-4">
                              <label htmlFor="status">Status:</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="approved"
                                name="status"
                                id="status"
                              />
                            </div>
                          </div>
                        </form>
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

export default AgentDetails;
