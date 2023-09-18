import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import axios from "axios";
import { useUserLoginMutation } from "../services/Post";
function Login() {
  const [loginData, res] = useUserLoginMutation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (res.isSuccess) {
      localStorage.setItem("loginId", res.data?.results?.login?._id);
      localStorage.setItem("token", res.data?.results?.token);
      localStorage.setItem(
        "userLoginEmail",
        res.data?.results?.login?.userEmail
      );
      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        text: "You have successfully logged in.",
        showConfirmButton: false,
        timer: 500,
      }).then(() => {
        navigate("/dashboard");
      });
    } else if (res.isError && res.error?.data?.error) {
      Swal.fire({
        title: "Incorrect Password!",
        icon: "error",
        text: res.error?.data?.message || "Unknown error occurred.",
      });
    }
  }, [res, navigate]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setUserNameError("");
    setPasswordError("");

    if (userName.trim() === "") {
      setUserNameError("Username is required.");
      return;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      return;
    }

    try {
      const response = await loginData({
        userEmail: userName,
        password: password,
      });
      console.log("response login", response);
    } catch (error) {
      console.error("Login error:", error);
      // Show a generic error message if something goes wrong
      Swal.fire({
        title: "Login Failed!",
        icon: "error",
        text: "An error occurred during login.",
      });
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
                      <img src="../assets/img/logo1.png" alt="" />
                    </div>
                    <h1>Login for Admin Panel</h1>
                    <p>Please enter your email and password</p>
                  </div>
                  <div className="col-12">
                    <form className="row form-design">
                      <div className="form-group col-12">
                        <label htmlFor="userEmail">User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User@gmail.com"
                          name="userEmail"
                          id="userEmail"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        {userNameError && (
                          <span className="error-message text-danger">
                            {userNameError}
                          </span>
                        )}
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="**********"
                          name="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                          <span className="error-message text-danger">
                            {passwordError}
                          </span>
                        )}
                      </div>
                      <div className="form-group col-12">
                        <Link className="for_got" to="/forget-password">
                          Forgot Password?
                        </Link>
                      </div>
                      <Link to="#">
                        <div className="form-group col-12">
                          <button
                            type="submit"
                            className="comman_btn"
                            onClick={handleSaveChanges}
                          >
                            Submit
                          </button>
                        </div>
                      </Link>
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

export default Login;
