import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  useForgetPasswordMutation,
  useVerifyOtpMutation,
} from "../services/Post";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Varification() {
  const emailauthecomadmin = useSelector(
    (data) => data?.local?.emailauthecomadmin
  );

  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const [verifyOtp] = useVerifyOtpMutation();

  const [forgetPassword] = useForgetPasswordMutation();

  const navigate = useNavigate();

  const [counter, setCounter] = useState(60);
  const [intervalId, setIntervalId] = useState(null);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const emailduringotp = localStorage?.getItem("emailduringotp");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const otp =
      event.target[0].value +
      event.target[1].value +
      event.target[2].value +
      event.target[3].value;

    const res = await verifyOtp({
      userEmail: emailduringotp,
      otp: otp,
    });
    if (res) {
      navigate("/reset");
    }
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => prevCounter - 1);
  //   }, 1000);
  //   setIntervalId(interval);
  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const resendOtp = async (e) => {
    setOtp(["", "", "", ""]);
    setCounter(60);
    e.preventDefault();

    try {
      const res = await forgetPassword({
        userEmail: emailauthecomadmin,
      });
      console.log("res", res);
      if (res) {
        toast.success(`Your OTP is: ${res?.data?.results?.otp}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
                    <h1>Verification</h1>
                    <p>Please enter the OTP received on your Email Address </p>
                  </div>
                  <div className="col-12">
                    <form className="row form-design" onSubmit={handleSubmit}>
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
                          {/* {counter > 0
                            ? `00:${counter.toString().padStart(2, "0")}`
                            : "Time's up!"} */}
                          {counter ? <p>00:{counter}</p> : null}
                        </span>
                      </div>
                      <div className="form-group col-12 text-center">
                        <label className="text-center" htmlFor="">
                          Didn't receive the OTP?{" "}
                          <Link to="#" onClick={(e) => resendOtp(e)}>
                            Request again
                          </Link>
                        </label>
                      </div>
                      <div className="form-group col-12">
                        <button type="submit" className="comman_btn">
                          Confirm
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
    </>
  );
}

export default Varification;
