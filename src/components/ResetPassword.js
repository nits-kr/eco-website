import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useResetPasswordMutation } from "../services/Post";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function ResetPassword() {
  const emailauthecomadmin = useSelector(
    (data) => data?.local?.emailauthecomadmin
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [reset] = useResetPasswordMutation();

  const [formData, setFormData] = useState([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const [counter, setCounter] = useState(30);
  const [intervalId, setIntervalId] = useState(null);
  const navigate = useNavigate();
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const storedId = localStorage.getItem("loginId");
  const storedPic = localStorage.getItem("profilePic");

  const handleSubmit1 = (event) => {
    event.preventDefault();
    const otp =
      event.target[0].value +
      event.target[1].value +
      event.target[2].value +
      event.target[3].value;
    axios
      .post(`${process.env.REACT_APP_APIENDPOINT}admin/user/verifyOtp`, {
        userEmail: userEmail,
        otp: otp,
      })
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
            navigate("/");
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

  const storedUserEmail = localStorage.getItem("userLoginEmail");
  const emailduringotp = localStorage?.getItem("emailduringotp");

  const onSubmit = async (data) => {
    try {
      const res = await reset({
        password: data?.password,
        userEmail: emailauthecomadmin,
      });
      console.log("res", res);
      if (res) {
        Swal.fire({
          title: "Password  Reset Successfully!",
          text: "Your have been resetted password and redirected to login page.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
      setErrorMessage("");
      // Show success message
    } catch (error) {
      setErrorMessage(error?.response?.data?.results?.createPassword);
    }
  };

  return (
    <>
      {/* <Sidebar /> */}
      <section className="login_page">
        <div className="container-fluid px-0">
          <div className="row justify-content-start">
            <div className="col-4">
              <div className="login_page_form shadow">
                <div className="row">
                  <div className="col-12 formheader mb-4">
                    <div className="text-center">
                      <img src="assets/img/logo.png" alt="" />
                    </div>
                    <h1>Reset Password</h1>
                    <p>Enter New Password</p>
                  </div>
                  <div className="col-12">
                    <form
                      className="row form-design"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="form-group col-12">
                        <label htmlFor="password">New Password</label>
                        <input
                          type="password"
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          placeholder="**********"
                          name="password"
                          id="password"
                          {...register("password", {
                            required: "Password is required*",
                            minLength: {
                              value: 8,
                              message:
                                "Password must be at least 8 characters long",
                            },
                            maxLength: {
                              value: 20,
                              message:
                                "Password must be maximum 20 characters long",
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
                      <div className="form-group col-12">
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className={`form-control ${
                            errors.confirmPassword ? "is-invalid" : ""
                          }`}
                          placeholder="**********"
                          name="confirmPassword"
                          id="confirmPassword"
                          {...register("confirmPassword", {
                            required: "Please confirm your password*",
                            validate: (value) =>
                              value === watch("password", "") ||
                              "Passwords do not match",
                          })}
                        />
                        {errors.confirmPassword && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.confirmPassword.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-12">
                        <button type="submit" className="comman_btn">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                onSubmit={handleSubmit1}
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

export default ResetPassword;
