import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/reset-password/64630e21b12d35894a9bbe0c/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDYzMGUyMWIxMmQzNTg5NGE5YmJlMGMiLCJpYXQiOjE2ODQ0NzYzODMsImV4cCI6MTY4NDczNTU4M30.oUvDW8VaMBRKlwTJR5uG35q_VQbJffq_e464EA-M9iM",
        {
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      setErrorMessage("");
      Swal.fire({
        title: "Resetted Password!",
        text: "Your have been Resetted Password successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } catch (error) {
      setErrorMessage(error.response.data.results.createPassword);
    }
  };

  return (
    <>
    <Sidebar/>
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
                    <form className="row form-design" onSubmit={handleSubmit}>
                      <div className="form-group col-12">
                        <label htmlFor="password">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="**********"
                          name="password"
                          id="password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="confirmPassword">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="**********"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />
                      </div>
                      {errorMessage && (
                        <div className="form-group col-12">
                          <p className="text-danger">{errorMessage}</p>
                        </div>
                      )}
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
    </>
  );
}

export default ResetPassword;