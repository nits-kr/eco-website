import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import CustomSwitch from "./switch/CustomSwitch";
import { useAddAgentsMutation } from "../services/Post";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Button } from "rsuite";
// import "rsuite/dist/rsuite.min.css";

function AddAgents() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [addAgent] = useAddAgentsMutation();
  const ecoAdminToken = localStorage?.getItem("token");
  const [formData, setFormData] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFormData({ ...formData, profilePic: event.target.files[0] });
  };

  const commissionType = isChecked ? "global" : "local";

  console.log("commissionType", commissionType);

  const handleSubmits = async (data) => {
    if (!formData.profilePic) {
      Swal.fire({
        title: "Please upload a profile picture!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      const formdata = new FormData();
      formdata.append("name", data?.fullName);
      formdata.append("Email", data?.email);
      formdata.append("accountNumber", data?.accountNumber);
      formdata.append("bankName", data?.bankName);
      formdata.append("password", data?.password);
      formdata.append("commisionType", commissionType);
      formdata.append("profile_Pic", formData.profilePic);
      formdata.append("mobileNumber", data?.mobileNumber);
      formdata.append("address", data?.address);
      formdata.append("accountName", data?.accountName);
      formdata.append("routingNumber", data?.routingNumber);
      formdata.append("status", "Approved");
      const response = await addAgent({
        formData: formdata,
        ecoAdminToken,
      });

      console.log("response", response);

      if (!response.data.error) {
        Swal.fire({
          title: "Agent added successfully!",
          icon: "success",
          confirmButtonText: "Confirm",
        }).then(() => {
          window.location.href = "/agents";
          setTimeout(() => {
            window.location.reload();
          }, 500);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const switchStyles = {
    "--switch-label-on": `"${"Global"}"`,
    "--switch-label-off": `"${"Local"}"`,
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
                onSubmit={handleSubmit(handleSubmits)}
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
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className={classNames(
                                "form-control  border border-secondary signup_fields",
                                { "is-invalid": errors.fullName }
                              )}
                              id="fullName"
                              name="fullName"
                              placeholder="Enter Your Full Name"
                              {...register("fullName", {
                                required: "Enter Your Full Name*",
                                pattern: {
                                  value: /^[A-Za-z\s]+$/,
                                  message:
                                    "Full Name must contain only letters",
                                },
                                minLength: {
                                  value: 3,
                                  message: "minimium 3 Charcarters",
                                },
                                maxLength: {
                                  value: 20,
                                  message: "maximum 20 Charcarters",
                                },
                              })}
                            />
                            {errors.fullName && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.fullName?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-md-6 my-2">
                            <label
                              htmlFor="mobileNumber"
                              className="form-label"
                            >
                              Mobile Number
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="number"
                              className={classNames(
                                "form-control border border-secondary signup_fields",
                                {
                                  "is-invalid": errors.mobileNumber,
                                }
                              )}
                              id="mobileNumber"
                              placeholder="mobile number"
                              {...register("mobileNumber", {
                                required: "Phone Number is Required*",
                                maxLength: {
                                  value: 10,
                                  message: "maximium 10 Charcarters",
                                },
                                minLength: {
                                  value: 10,
                                  message: "minimium 10 Charcarters",
                                },
                              })}
                            />
                            {errors.mobileNumber && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.mobileNumber?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-md-6 my-2">
                            <label htmlFor="email" className="form-label">
                              Email
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="email"
                              className={classNames(
                                "form-control border border-secondary signup_fields ",
                                {
                                  "is-invalid": errors.email,
                                }
                              )}
                              id="email"
                              placeholder="Email Address"
                              {...register("email", {
                                required: "Email is Required*",
                                pattern: {
                                  value:
                                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                            {errors.email && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.email?.message}
                              </small>
                            )}
                          </div>
                          <div className="form-group col-md-6 my-2">
                            <label htmlFor="dob">
                              D.O.B.
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="date"
                              className={classNames(
                                "form-control border border-secondary signup_fields",
                                {
                                  "is-invalid": errors.dob,
                                }
                              )}
                              id="dob"
                              placeholder="Date of Birth"
                              {...register("dob", {
                                required: "D.O.B. is required",
                              })}
                            />
                            {errors.dob && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.dob?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-md-6 my-2">
                            <label htmlFor="password" className="form-label">
                              Password
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="password"
                              className={classNames(
                                "form-control border border-secondary signup_fields",
                                {
                                  "is-invalid": errors.password,
                                }
                              )}
                              id="password"
                              placeholder="Password"
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 8,
                                  message:
                                    "Password must be at least 8 characters long",
                                },
                                pattern: {
                                  value:
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]+$/,
                                  message:
                                    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                                },
                              })}
                            />
                            {errors.password && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.password.message}
                              </small>
                            )}
                          </div>
                          <div className="col-6 my-2">
                            <label htmlFor="address" className="form-label">
                              Address
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className={classNames(
                                "form-control border border-secondary signup_fields",
                                { "is-invalid": errors.address }
                              )}
                              id="address"
                              name="address"
                              placeholder="Enter Your Address"
                              {...register("address", {
                                required: "Address is required",
                                pattern: {
                                  value: /^[A-Za-z0-9\s,'.-]+$/,
                                  message:
                                    "Address must contain only letters, numbers, and common characters",
                                },
                                minLength: {
                                  value: 3,
                                  message: "Minimum 3 characters",
                                },
                              })}
                            />
                            {errors.address && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.address?.message}
                              </small>
                            )}
                          </div>

                          <div className="col-md-6 my-2">
                            <label htmlFor="accountName" className="form-label">
                              Account Name
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              id="accountName"
                              placeholder="Account Name"
                              className={classNames(
                                "form-control border border-secondary signup_fields",
                                {
                                  "is-invalid": errors.accountName,
                                }
                              )}
                              {...register("accountName", {
                                required: "Enter Your Account Name*",
                                pattern: {
                                  value: /^[A-Za-z\s]+$/,
                                  message:
                                    "Account Name must contain only letters",
                                },
                                minLength: {
                                  value: 3,
                                  message: "minimium 3 Charcarters",
                                },
                              })}
                            />
                            {errors.accountName && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.accountName?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-md-6 my-2">
                            <label
                              htmlFor="accountNumber"
                              className="form-label"
                            >
                              Account Number
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="number"
                              className={classNames(
                                "form-control border border-secondary signup_fields ",
                                {
                                  "is-invalid": errors.accountNumber,
                                }
                              )}
                              id="mobileNumber"
                              placeholder="Enter Your Account Number"
                              {...register("accountNumber", {
                                required: "Account Number is Required*",
                                maxLength: {
                                  value: 10,
                                  message: "maximium 10 Charcarters",
                                },
                              })}
                            />
                            {errors.accountNumber && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.accountNumber?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-md-6 my-2">
                            <label htmlFor="bankName" className="form-label">
                              Bank Name
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              id="bankName"
                              placeholder="Enter Your Bank Name"
                              className={classNames(
                                "form-control border border-secondary signup_fields",
                                {
                                  "is-invalid": errors.bankName,
                                }
                              )}
                              {...register("bankName", {
                                required: "Enter Your Bank Name*",
                                pattern: {
                                  value: /^[A-Za-z\s]+$/,
                                  message:
                                    "Bank Name must contain only letters",
                                },
                                minLength: {
                                  value: 3,
                                  message: "minimium 3 Charcarters",
                                },
                              })}
                            />
                            {errors.bankName && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.bankName?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-md-6 my-2">
                            <label
                              htmlFor="routingNumber"
                              className="form-label"
                            >
                              Routing Number
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="number"
                              className={classNames(
                                "form-control border border-secondary signup_fields ",
                                {
                                  "is-invalid": errors.routingNumber,
                                }
                              )}
                              id="routingNumber"
                              placeholder="Enter Your Routing Number"
                              {...register("routingNumber", {
                                required: "Routing Number is Required*",
                                maxLength: {
                                  value: 5,
                                  message: "minimum 5 digits required",
                                },
                              })}
                            />
                            {errors.routingNumber && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.routingNumber?.message}
                              </small>
                            )}
                          </div>

                          <div className="col-md-2">
                            <label htmlFor="pinCode" className="form-label">
                              Pin Code
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="number"
                              className={classNames(
                                "form-control border border-secondary signup_fields ",
                                {
                                  "is-invalid": errors.pinCode,
                                }
                              )}
                              id="mobileNumber"
                              placeholder="Enter Your Pin Code"
                              {...register("pinCode", {
                                required: "Pincode is Required*",
                                maxLength: {
                                  value: 6,
                                  message: "maximium 6 Charcarters",
                                },
                                minLength: {
                                  value: 6,
                                  message: "minimium 6 Charcarters",
                                },
                              })}
                            />
                            {errors.pinCode && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.pinCode?.message}
                              </small>
                            )}
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
                                  defaultChecked={
                                    isChecked ? "global" : "local"
                                  }
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

                          <div className="col-12 my-3 d-flex align-items-end justify-content-end">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ height: "50px", borderRadius: "10px" }}
                            >
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
