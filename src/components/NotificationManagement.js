import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  useCreateNotificationMutation,
  useDeleteNotificationListMutation,
  useGetNotificationListMutation,
  useGetNotificationListQuery,
} from "../services/Post";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";

function NotificationManagement() {
  const [loader, setLoader] = useState(false);
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const loginId = useSelector((data) => data?.local?.ecomadminloginId);
  const ml = useSelector((data) => data?.local?.header);

  // const { data: notificationListData } = useGetNotificationListQuery({
  //   ecomAdmintoken,
  // });

  const [notificationListData] = useGetNotificationListMutation();
  const [createNotification] = useCreateNotificationMutation();

  const [deleteNotification, response] = useDeleteNotificationListMutation();
  const [startDate1, setStartDate1] = useState("");
  const [notificationList, setNotificationList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reportNotification, setReportNotification] = useState({
    reports: "",
    reportsAr: "",
    categoryId: "",
  });
  const [customNotification, setCustomNotification] = useState({
    custom: "",
    customAr: "",
    categoryId: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (ecomAdmintoken) {
      handleNotificationList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleNotificationList = async () => {
    const data = {
      from: startDate1,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await notificationListData(data);
    setNotificationList(res?.data?.results?.list);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReportNotification({ ...reportNotification, [name]: value });
  };
  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setCustomNotification({ ...customNotification, [name]: value });
  };

  const onSubmit = async (data) => {
    try {
      const alldata = {
        title: data.titleEn,
        message: data.reports,
        user: [loginId],

        ecomAdmintoken: ecomAdmintoken,
      };
      console.log(data);
      setLoader(true);
      const res = await createNotification(alldata);
      console.log("res", res);
      setLoader(false);
      if (res?.data?.message === "Success") {
        Swal.fire({
          title: "Notification Created!",
          text: "Your have been created notification successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleNotificationList();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/notification/notification/createCustom",
        {
          text_en: customNotification.custom,
        }
      );
      console.log(response.data.results.customData);
      if (!response.data.error) {
        alert("Saved!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sidebar Dash={"notification-management"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row transaction-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Notifications</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 px-0">
                        {/* <nav>
                          <div
                            className="nav nav-tabs comman_tabs"
                            id="nav-tab"
                            role="tablist"
                          >
                            <button
                              className="nav-link active w-100"
                              id="nav-home-tab"
                              // data-bs-toggle="tab"
                              // data-bs-target="#nav-home"
                              type="button"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                            >
                              Report Notification
                            </button>
                            <button
                              className="nav-link"
                              id="nav-profile-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-profile"
                              type="button"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false"
                            >
                              Custom Notification
                            </button>
                          </div>
                        </nav> */}
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                          >
                            <div className="row p-4 mx-0">
                              <form
                                className="form-design help-support-form row align-items-end justify-content-between"
                                onSubmit={handleSubmit(onSubmit)}
                              >
                                <div className="form-group mb-2 col-6">
                                  <label htmlFor="titleEn">
                                    Title (En)
                                    <span className="required-field text-danger">
                                      *
                                    </span>
                                  </label>
                                  <input
                                    {...register("titleEn", { required: true })}
                                    className={`form-control ${
                                      errors.titleEn ? "is-invalid" : ""
                                    }`}
                                  />
                                  {errors.titleEn && (
                                    <span className="invalid-feedback">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                                <div className="form-group mb-2 col-6">
                                  <label htmlFor="titleAr">
                                    Title (Ar)
                                    <span className="required-field text-danger">
                                      *
                                    </span>
                                  </label>
                                  <input
                                    {...register("titleAr", {
                                      required: true,
                                    })}
                                    className={`form-control ${
                                      errors.titleAr ? "is-invalid" : ""
                                    }`}
                                  />
                                  {errors.titleAr && (
                                    <span className="invalid-feedback">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                                <div className="form-group mb-2 col-6">
                                  <label htmlFor="reports">
                                    Enter Text Here (En)
                                    <span className="required-field text-danger">
                                      *
                                    </span>
                                  </label>
                                  <textarea
                                    {...register("reports", { required: true })}
                                    className={`form-control ${
                                      errors.reports ? "is-invalid" : ""
                                    }`}
                                    style={{ height: "120px" }}
                                  />
                                  {errors.reports && (
                                    <span className="invalid-feedback">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                                <div className="form-group mb-2 col-6">
                                  <label htmlFor="reportsAr">
                                    Enter Text Here (Ar)
                                    <span className="required-field text-danger">
                                      *
                                    </span>
                                  </label>
                                  <textarea
                                    {...register("reportsAr", {
                                      required: true,
                                    })}
                                    className={`form-control ${
                                      errors.reportsAr ? "is-invalid" : ""
                                    }`}
                                    style={{ height: "120px" }}
                                  />
                                  {errors.reportsAr && (
                                    <span className="invalid-feedback">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                                <div className="form-group my-3 d-flex align-items-center justify-content-center">
                                  <button
                                    type="submit"
                                    className="comman_btn2"
                                    disabled={loader ? true : false}
                                    style={{
                                      cursor: loader
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                  >
                                    {loader ? (
                                      <Spinner
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                      />
                                    ) : (
                                      "Create"
                                    )}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="nav-profile"
                            role="tabpanel"
                            aria-labelledby="nav-profile-tab"
                          >
                            <div className="row p-4 mx-0">
                              <form
                                className="form-design help-support-form row align-items-end justify-content-between"
                                action=""
                                onSubmit={handleSubmit1}
                              >
                                <div className="form-group mb-0 col">
                                  <label htmlFor="">
                                    Enter Text Here (En)
                                    <span className="required-field text-danger">
                                      *
                                    </span>
                                  </label>
                                  <textarea
                                    className="form-control"
                                    name="custom"
                                    id="custom"
                                    style={{ height: "120px" }}
                                    value={customNotification.custom}
                                    onChange={handleInputChange1}
                                    required
                                  ></textarea>
                                </div>
                                <div className="form-group mb-0 col">
                                  <label htmlFor="">
                                    Enter Text Here (Ar)
                                    <span className="required-field text-danger">
                                      *
                                    </span>
                                  </label>
                                  <textarea
                                    className="form-control"
                                    name="customAr"
                                    id="customAr"
                                    style={{ height: "120px" }}
                                    value={customNotification.customAr}
                                    onChange={handleInputChange1}
                                    required
                                  ></textarea>
                                </div>
                                <div className="form-group mb-0 col-auto">
                                  <button className="comman_btn2">Send</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>
                          Notifications{" "}
                          <span> ({notificationList?.length}) </span>
                        </h2>
                      </div>
                      <div className="col-3 Searchbox">
                        <form
                          className="form-design"
                          action=""
                          // onSubmit={handleSearch1}
                        >
                          <div className="form-group mb-0 position-relative icons_set">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                              name="name"
                              id="name"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i
                              className="far fa-search"
                              // onClick={handleSearch1}
                            ></i>
                          </div>
                        </form>
                      </div>
                      <div className="col-auto">
                        <input
                          type="date"
                          className="custom_date d-block"
                          value={startDate1}
                          onChange={(e) => setStartDate1(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row p-4">
                      <div className="col-12">
                        <div className="category_btns_main">
                          <div className="row mb-5">
                            {/* <div className="col">
                              <Link className="category_btns active" to="#">
                                All <span>(100)</span>
                              </Link>
                            </div>
                            <div className="col">
                              <Link className="category_btns" to="#">
                                Category <span>1</span>
                              </Link>
                            </div>
                            <div className="col">
                              <Link className="category_btns" to="#">
                                Category <span>2</span>
                              </Link>
                            </div>
                            <div className="col">
                              <Link className="category_btns" to="#">
                                Category <span>3</span>
                              </Link>
                            </div>
                            <div className="col">
                              <Link className="category_btns" to="#">
                                Category <span>4</span>
                              </Link>
                            </div> */}
                          </div>

                          {(notificationList || []).map((data, index) => (
                            <div
                              className="row mx-0 notification-box shadow mb-4"
                              key={index}
                            >
                              <div className="col-2">
                                <div className="notification_icon">
                                  <i className="far fa-bell"></i>
                                </div>
                              </div>
                              <div className="col">
                                <div className="notification-box-content announcement-contnt position-relative">
                                  <h2>{data._id}</h2>
                                  <Link
                                    className="check_toggle home_toggle d-flex align-items-center text-light table_viewbtn ms-2"
                                    onClick={() => {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, delete it!",
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          deleteNotification({
                                            id: data?._id,
                                            ecomAdmintoken,
                                          });
                                          Swal.fire(
                                            "Deleted!",
                                            `${data?._id}  item has been deleted.`,
                                            "success"
                                          ).then(() => {
                                            handleNotificationList();
                                          });
                                        }
                                      });
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Link>
                                  <span className="">
                                    {data?.createdAt?.slice(0, 10)}
                                  </span>
                                  <p>{data?.title}</p>
                                </div>
                              </div>
                            </div>
                          ))}
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

export default NotificationManagement;
