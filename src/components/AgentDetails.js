import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

function AgentDetails() {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  // const [formData, setFormData] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "karan",
    email: "",
    accountNumber: "",
    bankName: "",
    password: "**********",
    mobileNumber: "",
    address: "",
    accountName: "",
    routing: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFormData({ ...formData, profilePic: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.fullName);
      data.append("Email", formData.email);
      data.append("accountNumber", formData.accountNumber);
      data.append("bankName", formData.bankName);
      data.append("password", formData.password);
      data.append("commisionType", "global");
      data.append("profile_Pic", formData.profilePic);
      data.append("mobileNumber", formData.mobileNumber);
      data.append("address", formData.address);
      data.append("accountName", formData.accountName);
      data.append("routingNumber", formData.routing);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/agent/agent/addUser",
        data
      );
      console.log(response.data.results.saveUser);

      if (!response.data.error) {
        alert("List saved!");
        //handleSave();
        setFormData(response.data.results.saveUser);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <Sidebar/>
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <h6 className="breadcrumb">
              <Link to="/" className="breadcrumb_link text-danger">
                <strong>Agents /</strong>
              </Link>{" "}
              <Link to="/" className="breadcrumb_link text-secondary">
                <strong>Add</strong>
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
                                name="fullName"
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
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
                              id="email"
                              placeholder="name@example.com"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
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
                                name="accountNumber"
                                id="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleInputChange}
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
                                name="bankName"
                                id="bankName"
                                value={formData.bankName}
                                onChange={handleInputChange}
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
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <div className="col-4">
                              <label htmlFor="commision">
                                Commision Types:
                              </label>
                            </div>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic checkbox toggle button group"
                            >
                              <input
                                type="checkbox"
                                className="btn-check"
                                id="btncheck1"
                                autoComplete="off"
                              />
                              <label
                                className="btn btn-outline-danger bg-danger text-light"
                                htmlFor="btncheck1"
                              >
                                Global
                              </label>
                              <input
                                type="checkbox"
                                className="btn-check"
                                id="btncheck2"
                                autoComplete="off"
                              />
                              <label
                                className="btn btn-outline-danger"
                                htmlFor="btncheck2"
                              >
                                {" "}
                              </label>
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
                              <strong className="d-flex justify-content-flex-start">
                                Profile Image
                              </strong>
                            </div>
                            <div className="user_imgg ms-0">
                              {selectedImage ? (
                                <img src={selectedImage} alt="" />
                              ) : (
                                <img src="assets/img/profile_img1.jpg" alt="" />
                              )}
                            </div>
                          </div>
                          <div
                            className="col-1 users_left_content"
                            style={{ marginTop: "-45px", marginLeft: "80px" }}
                          >
                            <label htmlFor="upload-image">
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{ color: "red" }}
                              />
                            </label>
                            <input
                              id="upload-image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: "none" }}
                            />
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
                                name="mobileNumber"
                                id="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
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
                                value={formData.address}
                                onChange={handleInputChange}
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
                                name="accountName"
                                id="accountName"
                                value={formData.accountName}
                                onChange={handleInputChange}
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
                                name="routing"
                                id="routing"
                                value={formData.routing}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <div className="col-4">
                              <label htmlFor="status">Status:</label>
                            </div>
                            <div className="col-12">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleSubmit}
                              >
                                Approved
                              </button>
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
