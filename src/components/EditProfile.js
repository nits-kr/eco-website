import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";

function EditProfile() {
  const [formData, setFormData] = useState([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [selectedImage1, setSelectedImage1] = useState(null);

  const [counter, setCounter] = useState(30);
  const [intervalId, setIntervalId] = useState(null);
  const navigate = useNavigate();
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const handleFileChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.files[0] });
  };
  const handleImageUpload1 = (event) => {
    const file = event.target.files[0];
    setSelectedImage1(URL.createObjectURL(file));
    setFormData({ ...formData, bannerPic1: event.target.files[0] });
    // setImageUrl1(URL.createObjectURL(file));
  };
  const storedId = localStorage.getItem("loginId");
  const storedPic = localStorage.getItem("profilePic");
  const handleOnSave = () => {
    const data = new FormData();
    data.append("userName", userName);
    data.append("userEmail", userEmail);
    data.append("profile_Pic", formData.uploadImage);
    axios
      .post(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/editProfile/${storedId}`,
        data
      )
      .then((response) => {
        setFormData(response.data.results);
        localStorage.setItem(
          "profilePic",
          response?.data?.results?.profileData?.profile_Pic
        );
        console.log(response.data.results);
        Swal.fire({
          title: "Profile Updated!",
          text: "Your Profile has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard");
          }
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const otp =
      event.target[0].value +
      event.target[1].value +
      event.target[2].value +
      event.target[3].value;
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/verifyOtp",
        {
          userEmail: userEmail,
          otp: otp,
        }
      )
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          title: "OTP submitted!",
          text: "Your have been Submitted OTP successfully and your Profile pic has been Edited.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });
    if (value.length === 1 && index < 3) {
      refs[index + 1].current.focus();
    }
    if (value.length === 1 && index === 3) {
      clearInterval(intervalId);
      setIntervalId(null);
      setCounter(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);
    setIntervalId(interval);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Sidebar />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row">
              <div className="col-12 editprofile design_outter_comman shadow">
                <div className="row comman_header justify-content-between">
                  <div className="col-auto">
                    <h2>Edit Profile</h2>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <form className="row form-design justify-content-center position-relative mx-0 p-4">
                      <div className="form-group col-auto">
                        <div className="account_profile position-relative">
                          <div className="circle">
                            {/* <img
                              className="profile-pic"
                              src="assets/img/profile_img1.jpg"
                              alt=""
                            /> */}
                            {/* {storedPic ? (
                              <img src={storedPic} alt="" />
                            ) : (
                              <img src="../assets/img/saudi_flag1.png" alt="" />
                            )} */}
                            {selectedImage1 ? (
                              <img
                                src={selectedImage1}
                                alt=""
                                style={{ height: "150px" }}
                              />
                            ) : storedPic ? (
                              <img src={storedPic} alt="" />
                            ) : (
                              <img src="../assets/img/profile_img1.jpg" alt="" />
                            )}
                          </div>
                          <div className="p-image">
                            <i className="upload-button fas fa-camera"></i>
                            <input
                              className="file-upload"
                              type="file"
                              accept="image/*"
                              name="upload-image"
                              id="upload-image"
                              onChange={(e) =>
                                handleImageUpload1(e, "uploadImage")
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Ajay Sharma"
                          name="nameEn"
                          id="nameEn"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          defaultValue=""
                          name="email"
                          id="email"
                          placeholder="user@gmail.com"
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-12 mt-2 text-center">
                        <Link
                          className="comman_btn"
                          // data-bs-toggle="modal"
                          // data-bs-target="#staticBackdrop"
                          to=""
                          onClick={handleOnSave}
                        >
                          Save
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade Edit_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Verification
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
                onSubmit={handleSubmit}
              >
                <div className="form-group col-12 text-center">
                  <p className="mb-0">
                    Please enter the OTP received on your Email Address
                  </p>
                </div>
                <div className="form-group col-12 otp_input d-flex">
                  <input
                    type="text"
                    className="form-control me-3 px-1 text-center"
                    maxLength="1"
                    placeholder="2"
                    name="name"
                    id="name"
                    ref={refs[0]}
                    value={otp[0]}
                    onChange={(event) => handleInputChange(event, 0)}
                  />
                  <input
                    type="text"
                    className="form-control me-3 px-1 text-center"
                    maxLength="1"
                    placeholder="4"
                    name="name"
                    id="name"
                    ref={refs[1]}
                    value={otp[1]}
                    onChange={(event) => handleInputChange(event, 1)}
                  />
                  <input
                    type="text"
                    className="form-control me-3 px-1 text-center"
                    maxLength="1"
                    placeholder="6"
                    name="name"
                    id="name"
                    ref={refs[2]}
                    value={otp[2]}
                    onChange={(event) => handleInputChange(event, 2)}
                  />
                  <input
                    type="text"
                    className="form-control me-3 px-1 text-center"
                    maxLength="1"
                    placeholder="8"
                    name="name"
                    id="name"
                    ref={refs[3]}
                    value={otp[3]}
                    onChange={(event) => handleInputChange(event, 3)}
                  />
                </div>
                <div className="form-group col-12 text-center">
                  <span className="count_Sec">
                    {counter > 0
                      ? `00:${counter.toString().padStart(2, "0")}`
                      : "Time's up!"}
                  </span>
                </div>
                <div className="form-group col-12 text-center">
                  <label className="text-center" htmlFor="">
                    Didn't received the OTP?{" "}
                    <Link to="/varification">Request again</Link>
                  </label>
                </div>
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn">Confirm & Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
