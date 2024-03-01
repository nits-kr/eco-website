import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useForgetPasswordMutation } from "../services/Post";
import { useDispatch } from "react-redux";
import { setEmailauthecomadmin } from "../app/localSlice";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const [forgetPassword] = useForgetPasswordMutation();

  localStorage?.setItem("emailduringotp", email);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await forgetPassword({
      userEmail: email,
    });
    if (res) {
      navigate("/varification");
      dispatch(setEmailauthecomadmin(email));
    }
  };
  const handleInputChange = (event) => {
    setEmail(event.target.value);
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
                    <h1>Forgot Password</h1>
                    <p>
                      Please enter your registered Email Address to receive the
                      OTP
                    </p>
                  </div>
                  <div className="col-12">
                    <form className="row form-design">
                      <div className="form-group col-12">
                        <label htmlFor="">Email Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User@gmail.com"
                          name="email"
                          id="email"
                          value={email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group col-12">
                        <Link to="/varification" onClick={handleSubmit}>
                          <button className="comman_btn" type="submit">
                            Submit
                          </button>
                        </Link>
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

export default ForgetPassword;
