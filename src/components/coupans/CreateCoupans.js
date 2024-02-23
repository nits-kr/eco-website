import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Sidebar from "../Sidebar";
import { useCreateCoupanMutation } from "../../services/Post";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export default function CreatCoupans() {
  const [loader, setLoader] = useState(false);
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const [discountType, setDiscountType] = useState("");
  const [show, setShow] = useState(false);
  const [createCoupan] = useCreateCoupanMutation();

  console.log("discountType", discountType);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const alldata = {
        coupanTitle_en: data.coupanTitle,
        coupanTitle_ar: data.coupanTitleAr,
        coupanCode: data.coupanCode,
        startdate: data.startDate,
        enddate: data.endDate,
        quantity: data.quantity,
        DiscountType: discountType,
        status: data.c1,
        ecomAdmintoken: ecomAdmintoken,
        discount: data.discount,
      };
      console.log(data);
      setLoader(true);
      const res = await createCoupan(alldata);
      console.log("res", res);
      setLoader(false);
      if (res?.data?.message === "Success") {
        Swal.fire({
          title: "Coupan Created!",
          text: "Your have been created coupan successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/coupanList");
            // window.location.href = "/coupanList";
          }
        });
      }
    } catch (error) {
      // Display error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleDiscountTypeChange = (event) => {
    setDiscountType(event.target.value);
    setShow(true);
  };

  return (
    <>
      <Sidebar />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row coupan_page justify-content-center">
              <div className="col-12 design_outter_comman shadow mb-4">
                <div className="row comman_header justify-content-between">
                  <div className="col-auto">
                    <h2>Create Coupon</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 px-0">
                    <nav>
                      <div
                        className="nav nav-tabs comman_tabs"
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          className="nav-link active w-100"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          General
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <div className="row p-4 mx-0">
                          <form
                            className="form-design help-support-form row align-items-end"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <div className="form-group col-4">
                              <label htmlFor="coupanTitle">
                                Coupon Title(EN)
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.coupanTitle ? "is-invalid" : ""
                                }`}
                                {...register("coupanTitle", { required: true })}
                                id="coupanTitle"
                              />
                              {errors.coupanTitle && (
                                <span className="invalid-feedback">
                                  This field is required
                                </span>
                              )}
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="coupanTitleAr">
                                Coupon Title(AR)
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.coupanTitleAr ? "is-invalid" : ""
                                }`}
                                {...register("coupanTitleAr", {
                                  required: true,
                                })}
                                id="coupanTitleAr"
                              />
                              {errors.coupanTitleAr && (
                                <span className="invalid-feedback">
                                  This field is required
                                </span>
                              )}
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="coupanCode">
                                Coupon Code
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.coupanCode ? "is-invalid" : ""
                                }`}
                                {...register("coupanCode", { required: true })}
                                id="coupanCode"
                              />
                              {errors.coupanCode && (
                                <span className="invalid-feedback">
                                  This field is required
                                </span>
                              )}
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="startDate">
                                Start Date
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="date"
                                className={`form-control pe-4 ${
                                  errors.startDate ? "is-invalid" : ""
                                }`}
                                {...register("startDate", { required: true })}
                                id="startDate"
                              />
                              {errors.startDate && (
                                <span className="invalid-feedback">
                                  This field is required
                                </span>
                              )}
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="endDate">
                                End Date
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="date"
                                className={`form-control pe-4 ${
                                  errors.endDate ? "is-invalid" : ""
                                }`}
                                {...register("endDate", { required: true })}
                                id="endDate"
                              />
                              {errors.endDate && (
                                <span className="invalid-feedback">
                                  This field is required
                                </span>
                              )}
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="quantity">
                                Quantity
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.quantity ? "is-invalid" : ""
                                }`}
                                {...register("quantity", { required: true })}
                                id="quantity"
                              />
                              {errors.quantity && (
                                <span className="invalid-feedback">
                                  This field is required
                                </span>
                              )}
                            </div>

                            <div className="form-group col-6">
                              <label htmlFor="discountType">
                                Discount Type
                              </label>
                              <select
                                className={classNames("select form-control", {
                                  "is-invalid":
                                    errors.discountType && !discountType,
                                })}
                                // className={`select form-control ${
                                //   errors.discountType && !discountType
                                //     ? "is-invalid"
                                //     : ""
                                // }`}
                                {...register("discountType", {
                                  required: true,
                                })}
                                onChange={handleDiscountTypeChange}
                                id="discountType"
                              >
                                <option value="">Select Discount Type</option>
                                <option value="Fixed">Fixed</option>
                                <option value="Percent">Percentage</option>
                              </select>
                              {errors.discountType && (
                                <span className="invalid-feedback">
                                  This field is required
                                </span>
                              )}
                            </div>

                            <div
                              className="form-group col-6"
                              style={{ display: show ? "" : "none" }}
                            >
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.discount ? "is-invalid" : ""
                                }`}
                                placeholder="Discount Value"
                                aria-label="Discount Value"
                                aria-describedby="button-addon2"
                                {...register("discount", {
                                  required: true,
                                })}
                              />
                            </div>
                            {errors.discount && (
                              <span className="invalid-feedback">
                                This field is required
                              </span>
                            )}

                            <div className="form-group col-4 coupon_checkbox">
                              <div className="check_radio">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="c1"
                                  id="c1"
                                  className="d-none"
                                  // className={`form-control pe-4 ${
                                  //   errors.endDate ? "is-invalid" : ""
                                  // }`}
                                  {...register("c1")}
                                  // id="endDate"
                                />

                                <label htmlFor="c1">Enable the Coupon </label>
                              </div>
                            </div>

                            <div className="form-group mb-0 mt-3 col-12 text-center">
                              <button
                                type="submit"
                                className="comman_btn2"
                                disabled={loader ? true : false}
                                style={{
                                  cursor: loader ? "not-allowed" : "pointer",
                                }}
                              >
                                {loader ? (
                                  <Spinner
                                    style={{ height: "20px", width: "20px" }}
                                  />
                                ) : (
                                  "Create"
                                )}
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
          </div>
        </div>
      </div>
    </>
  );
}
