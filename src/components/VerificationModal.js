import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";

function VerificationModal() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const [counter, setCounter] = useState(30);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const handleSubmit = (event) => {
    event.preventDefault();
    const otp = event.target[0].value + event.target[1].value + event.target[2].value + event.target[3].value;
    axios
      .post("http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/user/verifyOtp", {
        userEmail: "ankita2@gmail.com",
        otp: otp,
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          title: "OTP submitted!",
          text: "Your have been Submitted OTP successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/reset";
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
    <Sidebar/>
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
                    Didn't receive the OTP?{" "}
                    <Link to="/forget-password">
                      Request again
                    </Link>
                  </label>
                </div>
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn">
                    Confirm & Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerificationModal;
