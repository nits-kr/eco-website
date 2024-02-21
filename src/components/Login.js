import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import axios from "axios";
import { useUserLoginMutation } from "../services/Post";
import { useDispatch } from "react-redux";
import { setModules, setToken } from "../app/localSlice";
import { useForm } from "react-hook-form";
import classNames from "classnames";

function Login() {
  const [loginData, res] = useUserLoginMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const handleSaveChanges = async (data) => {
    // e.preventDefault();

    try {
      const response = await loginData({
        userEmail: data?.email,
        password: data?.password,
      });
      console.log("response login", response);
      if (response?.data?.message === "Successs") {
        dispatch(setModules(response?.data?.results?.login?.modules));
        dispatch(setToken(response?.data?.results?.token));
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          text: "You have successfully logged in.",
          showConfirmButton: false,
          timer: 500,
        }).then(() => {
          navigate("/dashboard");
        });
      }
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
                    <form
                      className="row form-design"
                      action=""
                      onSubmit={handleSubmit(handleSaveChanges)}
                    >
                      <div className="form-group col-12">
                        <label htmlFor="email">User Email</label>
                        <input
                          type="email"
                          className={classNames("form-control signup_fields ", {
                            "is-invalid": errors.email,
                          })}
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
                          <small className="errorText d-flex mx-1 fw-bold text-danger">
                            {errors.email?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className={classNames("form-control", {
                            "is-invalid": errors.password,
                          })}
                          id="password"
                          placeholder="Password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 7,
                              message:
                                "Password must be at least 7 characters long",
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
                          <small className="errorText d-flex mx-1 fw-bold text-danger">
                            {errors.password.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-12">
                        <Link className="for_got" to="/forget-password">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="form-group col-12">
                        <button
                          type="submit"
                          className="comman_btn"
                          // onClick={handleSaveChanges}
                        >
                          Submit
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

export default Login;
