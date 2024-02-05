import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import CustomSwitch from "./switch/CustomSwitch";

function AddAgents() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  console.log("isChecked", isChecked);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFormData({ ...formData, profilePic: event.target.files[0] });
  };
  const switchStyles = {
    "--switch-label-on": `"${"Global"}"`, // Content for "YES", "TRUE", or "MILES", etc.
    "--switch-label-off": `"${"Private"}"`, // Content for "NO", "FALSE", "KM", etc.
  };
  return (
    <>
      <Sidebar Dash={"agents"} />
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
            <div
              className="row comman_header justify-content-between"
              style={{ borderRadius: "10px 10px 0px 0px" }}
            >
              <div className="col">
                <h2>Add Ajent</h2>
              </div>
            </div>
            <div className="row dashboard_part justify-content-center">
              <form
                action="#"
                className="col-12 d-flex shadow"
                style={{ backgroundColor: "#fff" }}
                // onSubmit={handleSubmit}
              >
                <div className="col-12 row ms-2" style={{ margin: "auto" }}>
                  <div className="col-12 mt-2">
                    <div className="users_right mt-3">
                      <div className="row justify-content-between">
                        <div
                          action="#"
                          className="form-design row position-relative"
                        >
                          <div className="col-md-12 d-flex justify-content-center mb-5">
                            <div className="users_left">
                              <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-center">
                                  {/* <div className="profile-bg">
                                    <strong className="">Profile Image</strong>
                                  </div> */}
                                  <div className="user_imgg">
                                    {selectedImage ? (
                                      <img src={selectedImage} alt="" />
                                    ) : (
                                      <img
                                        src="assets/img/profile_img1.jpg"
                                        alt=""
                                      />
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="col-1 users_left_content"
                                  style={{
                                    marginTop: "-27px",
                                    marginLeft: "200px",
                                  }}
                                >
                                  <label htmlFor="upload-image">
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      style={{
                                        color: "#144881",
                                      }}
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
                          <div className="col-md-6 my-2">
                            <label htmlFor="fullName" className="form-label">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="fullName"
                            />
                          </div>
                          <div className="col-md-6 my-2">
                            <label htmlFor="fullName" className="form-label">
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="fullName"
                            />
                          </div>
                          <div className="col-md-6 my-2">
                            <label htmlFor="inputEmail4" className="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail4"
                            />
                          </div>
                          <div className="col-md-6 my-2">
                            <label
                              htmlFor="inputPassword4"
                              className="form-label"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword4"
                            />
                          </div>
                          <div className="col-12 my-2">
                            <label
                              htmlFor="inputAddress"
                              className="form-label"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputAddress"
                              placeholder="1234 Main St"
                            />
                          </div>
                          <div className="col-md-6 my-2">
                            <label htmlFor="inputCity" className="form-label">
                              Account Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputCity"
                            />
                          </div>
                          <div className="col-md-6 my-2">
                            <label htmlFor="inputCity" className="form-label">
                              Account Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputCity"
                            />
                          </div>
                          <div className="col-md-6 my-2">
                            <label htmlFor="inputCity" className="form-label">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputCity"
                            />
                          </div>
                          <div className="col-md-6 my-2">
                            <label htmlFor="inputCity" className="form-label">
                              Routing Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputCity"
                            />
                          </div>

                          <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">
                              Pin Code
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputZip"
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">
                              Status
                            </label>
                            <input
                              type="text"
                              className="form-control bg-danger text-light "
                              id="inputZip"
                              value={"Approved"}
                              style={{ width: "65%", fontWeight: "bold" }}
                            />
                          </div>
                          <div className="col-md-2">
                            {/* <label htmlFor="inputZip" className="form-label">
                              Status
                            </label> */}
                            <div className="container" style={switchStyles}>
                              <label
                                htmlFor="Status"
                                style={{ textAlign: "left" }}
                              >
                                Commission
                              </label>
                              <div
                                className="toggle-switch"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  name="status"
                                  id="status"
                                  defaultChecked={isChecked}
                                  onChange={toggleSwitch}
                                />
                                <label
                                  className="label"
                                  htmlFor="status"
                                  style={{ margin: "0px" }}
                                >
                                  <span className="inner" />
                                  <span className="switch" />
                                </label>
                              </div>
                            </div>
                            {/* <CustomSwitch
                              label="Commission"
                              onContent="Global"
                              offContent="Private"
                            /> */}
                          </div>

                          <div className="col-12 my-3 d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-primary">
                              Save Agent
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAgents;
