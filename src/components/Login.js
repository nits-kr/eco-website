import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import axios from "axios";
import { useUserLoginMutation } from "../services/Post";
import { useDispatch, useSelector } from "react-redux";
import { setLoginType, setModules, setToken } from "../app/localSlice";
import { useForm } from "react-hook-form";
import classNames from "classnames";

function Login() {
  const modules = useSelector((data) => data?.local?.modules);
  const loginType = useSelector((data) => data?.local?.loginType);
  const [loginData, res] = useUserLoginMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAccessAllowed = (accessItem) => {
    return modules?.includes(accessItem);
  };

  console.log("loginType", loginType);
  console.log("modules", modules);

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
      if (response?.data?.message === "Logged in") {
        dispatch(setModules(response?.data?.results?.admin?.modules));
        dispatch(setLoginType(response?.data?.results?.admin?.type));
        dispatch(setToken(response?.data?.results?.token));
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          text: "You have successfully logged in.",
          showConfirmButton: false,
          timer: 500,
        }).then(() => {
          if (response?.data?.results?.admin?.type === "Staff") {
            const modules = response?.data?.results?.admin?.modules;
            if (modules[0] === "dashboard") {
              navigate("/dashboard");
            } else if (modules[0] === "user") {
              navigate("/users");
            } else if (modules[0] === "category") {
              navigate("/categories");
            } else if (modules[0] === "offer") {
              navigate("/offers");
            } else if (modules[0] === "order") {
              navigate("/orders");
            } else if (modules[0] === "staff") {
              navigate("/staff");
            } else if (modules[0] === "transaction") {
              navigate("/transactions");
            } else if (modules[0] === "addproduct") {
              navigate("/product-management");
            } else if (modules[0] === "productlist") {
              navigate("/products");
            } else if (modules[0] === "banners") {
              navigate("/Home-Screen-banners");
            } else if (modules[0] === "brand") {
              navigate("/brand-management");
            } else if (modules[0] === "agent") {
              navigate("/agents");
            } else if (modules[0] === "notification") {
              navigate("/notification-management");
            } else if (modules[0] === "announcement") {
              navigate("/announcement-management");
            } else if (modules[0] === "thoughts") {
              navigate("/thoughts-management");
            } else if (modules[0] === "content") {
              navigate("/content-management");
            } else if (modules[0] === "coupan") {
              navigate("/coupanList");
            } else if (modules[0] === "information") {
              navigate("/informations");
            } else if (modules[0] === "configure") {
              navigate("/store-settings");
            } else if (modules[0] === "help") {
              navigate("/help");
            }
          } else {
            navigate("/dashboard");
          }
        });
      } else if (response?.data?.message === "Wrong Password") {
        Swal.fire({
          title: "Wrong Password!",
          icon: "error",
          text: "You have entered wrong password.",
          showConfirmButton: false,
          timer: 500,
        });
      }
    } catch (error) {
      console.error("Login error:", error);

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
