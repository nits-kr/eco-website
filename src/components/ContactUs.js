import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import {
  useCreateUseFullInfoMutation,
  useDeleteContactMutation,
  useGetContactListQuery,
  useGetUseFuldataMutation,
  useGetUseFuldataQuery,
  useUpdateContactMutation,
} from "../services/Post";
import { useCreateContactMutation } from "../services/Post";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Spinner } from "react-bootstrap";

function ContactUs() {
  const [loader, setLoader] = useState(false);
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);

  const [deleteContact] = useDeleteContactMutation();
  const [createContact] = useCreateUseFullInfoMutation();
  const [updateContact] = useUpdateContactMutation();
  const { data: getContact, refetch: fetchContactData } = useGetUseFuldataQuery(
    { ecomAdmintoken }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (getContact) {
      const response = getContact?.results?.details?.[0];
      reset({
        mobileNumber: response?.mobileNumber,
        email: response?.email,
        facebookLink: response?.facebookLink,
        instagramLink: response?.instagramLink,
        telegramLink: response?.telegramLink,
        youtubeLink: response?.youtubeLink,
        linkedinLink: response?.linkedInLink,
        appstoreLink: response?.appStoreLink,
        playstoreLink: response?.playStoreLink,
      });
    }
  }, [getContact]);

  const resData = getContact?.results?.details?.[0];

  const handleSaveChanges = async (data) => {
    // e.preventDefault();
    const alldata = {
      mobileNumber: data?.mobileNumber,
      email: data?.email,
      ...(data?.facebookLink && { facebookLink: data.facebookLink }),
      ...(data?.telegramLink && { telegramLink: data.telegramLink }),
      ...(data?.instagramLink && { instagramLink: data.instagramLink }),
      ...(data?.linkedinLink && { linkedInLink: data.linkedinLink }),
      ...(data?.youtubeLink && { youtubeLink: data.youtubeLink }),
      ...(data?.playstoreLink && { playStoreLink: data.playstoreLink }),
      ...(data?.appstoreLink && { appStoreLink: data.appstoreLink }),
    };
    setLoader(true);
    const res = resData
      ? await updateContact({ alldata, id: resData?._id, ecomAdmintoken })
      : await createContact({ alldata, ecomAdmintoken });
    setLoader(false);
    if (res) {
      Swal.fire({
        title: resData ? "Contact Updated!" : "Contact Saved",
        text: `The Contact has been ${
          resData ? "updated" : "created"
        }  successfully.`,
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchContactData();
        }
      });
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <Sidebar Dash={"contact-us"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row help&support-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman mb-4 shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2 className="capitalize">
                          Save your contact information
                        </h2>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      onSubmit={handleSubmit(handleSaveChanges)}
                    >
                      <div className="form-group col-4 mt-3">
                        <label htmlFor="mobileNumber">
                          Mobile Number
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control border border-secondary signup_fields",
                            {
                              "is-invalid": errors.mobileNumber,
                            }
                          )}
                          id="mobileNumber"
                          placeholder="Mobile Number"
                          {...register("mobileNumber", {
                            required: "Phone Number is Required*",
                            maxLength: {
                              value: 10,
                              message: "Maximum 10 characters",
                            },
                            minLength: {
                              value: 10,
                              message: "Minimum 10 characters",
                            },
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Invalid mobile number",
                            },
                          })}
                        />
                        {errors.mobileNumber && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.mobileNumber?.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-4 mt-3">
                        <label htmlFor="email">
                          Email
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className={classNames(
                            "form-control border border-secondary signup_fields ",
                            {
                              "is-invalid": errors.email,
                            }
                          )}
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
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.email?.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-4 mt-3">
                        <label htmlFor="facebookLink">
                          Facebook Link
                          {/* <span className="required-field text-danger">*</span> */}
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control border border-secondary signup_fields",
                            {
                              "is-invalid": errors.facebookLink,
                            }
                          )}
                          name="facebookLink"
                          id="facebookLink"
                          {...register("facebookLink", {
                            // required: "Facebook link is required!*",
                            minLength: 3,
                            pattern: {
                              value: /^(https?:\/\/)?(www\.)?facebook.com\/.+$/,
                              message: "Invalid Facebook Link",
                            },
                          })}
                        />
                        {errors.facebookLink && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.facebookLink?.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-6 mt-3">
                        <label htmlFor="telegramLink">
                          Telegram Link
                          {/* <span className="required-field text-danger">*</span> */}
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control border border-secondary signup_fields",
                            {
                              "is-invalid": errors.telegramLink,
                            }
                          )}
                          name="telegramLink"
                          id="telegramLink"
                          {...register("telegramLink", {
                            // required: "Telegram link is required!*",
                            minLength: 3,
                            pattern: {
                              value: /^(https?:\/\/)?t\.me\/.+$/,
                              message: "Invalid Telegram Link",
                            },
                          })}
                        />
                        {errors.telegramLink && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.telegramLink?.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-6 mt-3">
                        <label htmlFor="instagramLink">
                          Instagram Link
                          {/* <span className="required-field text-danger">*</span> */}
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control border border-secondary signup_fields",
                            {
                              "is-invalid": errors.instagramLink,
                            }
                          )}
                          name="instagramLink"
                          id="instagramLink"
                          {...register("instagramLink", {
                            // required: "Instagram link is required!*",
                            minLength: 3,
                            pattern: {
                              value:
                                /^(https?:\/\/)?(www\.)?instagram.com\/.+$/,
                              message: "Invalid Instagram Link",
                            },
                          })}
                        />
                        {errors.instagramLink && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.instagramLink?.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-6 mt-3">
                        <label htmlFor="youtubeLink">
                          YouTube Link
                          {/* <span className="required-field text-danger">*</span> */}
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control border border-secondary signup_fields",
                            {
                              "is-invalid": errors.youtubeLink,
                            }
                          )}
                          name="youtubeLink"
                          id="youtubeLink"
                          {...register("youtubeLink", {
                            // required: "YouTube link is required!*",
                            minLength: 3,
                            pattern: {
                              value: /^(https?:\/\/)?(www\.)?youtube.com\/.+$/,
                              message: "Invalid YouTube Link",
                            },
                          })}
                        />
                        {errors.youtubeLink && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.youtubeLink?.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-6 mt-3">
                        <label htmlFor="linkedinLink">
                          LinkedIn Link
                          {/* <span className="required-field text-danger">*</span> */}
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control border border-secondary signup_fields",
                            {
                              "is-invalid": errors.linkedinLink,
                            }
                          )}
                          name="linkedinLink"
                          id="linkedinLink"
                          {...register("linkedinLink", {
                            // required: "LinkedIn link is required!*",
                            minLength: 3,
                            pattern: {
                              value: /^(https?:\/\/)?(www\.)?linkedin.com\/.+$/,
                              message: "Invalid LinkedIn Link",
                            },
                          })}
                        />
                        {errors.linkedinLink && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.linkedinLink?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-6 mt-3">
                        <label htmlFor="playstoreLink">
                          Play Store Link
                          {/* <span className="required-field text-danger">*</span> */}
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control border border-secondary signup_fields",
                            {
                              "is-invalid": errors.playstoreLink,
                            }
                          )}
                          name="playstoreLink"
                          id="playstoreLink"
                          {...register("playstoreLink", {
                            // required: "Play store link is required!*",
                            minLength: 3,
                            pattern: {
                              value:
                                /^(https?:\/\/)?play\.google\.com\/store\/apps\/details\?id=.+$/,
                              message: "Invalid Play Store Link",
                            },
                          })}
                        />
                        {errors.playstoreLink && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.playstoreLink?.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-6 mt-3">
                        <label htmlFor="appstoreLink">
                          App Store Link
                          {/* <span className="required-field text-danger">*</span> */}
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control border border-secondary signup_fields",
                            {
                              "is-invalid": errors.appstoreLink,
                            }
                          )}
                          name="appstoreLink"
                          id="appstoreLink"
                          {...register("appstoreLink", {
                            // required: "App store link is required!*",
                            minLength: 3,
                            pattern: {
                              value: /^(https?:\/\/)?apps\.apple\.com\/.+$/,
                              message: "Invalid App Store Link",
                            },
                          })}
                        />
                        {errors.appstoreLink && (
                          <small className="errorText mx-1 fw-bold text-danger">
                            {errors.appstoreLink?.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group mb-0 mt-4 d-flex align-items-center justify-content-center">
                        <button
                          className="comman_btn2"
                          // style={{ marginLeft: "72vh" }}
                          type="submit"
                          disabled={loader ? true : ""}
                          style={{
                            cursor: loader ? "not-allowed" : "pointer",
                          }}
                        >
                          {loader ? <Spinner /> : resData ? "Update" : "Save"}
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

      {/* <!-- Modal --> */}
      <div
        className="modal fade reply_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                DESCRIPTION
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-4">
              <div className="chatpart_main">
                {/* <p>{viewContact?.description}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade Update_modal"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-4">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="row">
                <div className="col-12 Update_modal_content py-4">
                  <h2>Update</h2>
                  <p>Are you sure, Want to update this?</p>
                  <Link
                    className="comman_btn mx-2"
                    data-bs-dismiss="modal"
                    to="javscript:;"
                  >
                    Yes
                  </Link>
                  <Link
                    className="comman_btn2 mx-2 bg-red"
                    data-bs-dismiss="modal"
                    to="javscript:;"
                  >
                    NO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
