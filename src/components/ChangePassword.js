import React, { useState } from "react";
import Sidebar from "./Sidebar";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../services/Post";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function ChangePassword() {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const [loader, setLoader] = useState(false);
  const [changePass] = useChangePasswordMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const pass = {
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await changePass(pass);
    console.log("res", res);
    if (res?.data?.message === "Password Updated Successfully") {
      Swal.fire({
        title: "Password Changed Successfully!",
        text: "Your password has been successfully changed. You will now be redirected to the login page.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage?.removeItem("ecoAdmintoken");
          localStorage?.removeItem("ecomadminloginId");
          navigate("/");
        }
      });
    } else if (res?.data?.message === "Old Password not matched") {
      Swal.fire({
        title: "Password Change Failed",
        text: "The entered old password does not match our records. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };
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
                    <h2>Change Password</h2>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <form
                      className="row form-design justify-content-center position-relative mx-0 p-4"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="form-group col-12">
                        <label htmlFor>
                          Old Password<span className="text-danger">*</span>
                        </label>
                        <input
                          className={classNames("form-control mb-1", {
                            "is-invalid": errors.oldPassword,
                          })}
                          type="password"
                          defaultValue=""
                          placeholder="Enter Your Old Password"
                          {...register("oldPassword", {
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
                        {errors?.oldPassword && (
                          <small className="errorText mx-0 fw-bold text-danger">
                            {errors?.oldPassword?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor>
                          New Password<span className="text-danger">*</span>
                        </label>
                        <input
                          className={classNames("form-control mb-1", {
                            "is-invalid": errors.newPassword,
                          })}
                          type="password"
                          defaultValue=""
                          placeholder="Enter Your New Password"
                          {...register("newPassword", {
                            required: "New Password is required*",
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
                        {errors?.newPassword && (
                          <small className="errorText mx-0 fw-bold text-danger">
                            {errors?.newPassword?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor>
                          Confirm New Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className={classNames("form-control", {
                            "is-invalid": errors.confirmPassword,
                          })}
                          type="password"
                          defaultValue=""
                          placeholder="Confirm New Password"
                          {...register("confirmPassword", {
                            required: "Please confirm your password*",
                            validate: (value) =>
                              value === watch("newPassword", "") ||
                              "Passwords do not match",
                          })}
                        />
                        {errors.confirmPassword && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.confirmPassword.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-12 text-center">
                        <button className="comman_btn" type="submit">
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
      </div>
    </>
  );
}

export default ChangePassword;
