import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faDollarSign,
  faMoneyBill1Wave,
  faDownload,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { useDeleteNotificationListMutation } from "../services/Post";

function NotificationManagement() {
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
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/notification/notification/list";
  const url2 =
    " http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/notification/notification/search-notification";
  useEffect(() => {
    subNotificationList();
  }, []);
  const subNotificationList = async (e) => {
    await axios
      .post(url)
      .then((response) => {
        setNotificationList(response?.data?.results?.listData?.reverse());
      })
      .catch((error) => {
        console.log(error.response.data);
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Failed to fetch recent order list data. Please try again later.",
        });
      });
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(url, {
  //       from: startDate,
  //       to: endDate,
  //     })
  //     .then((response) => {
  //       const list = response?.data?.results?.list?.reverse();
  //       if (list && list.length > 0) {
  //         setNotificationList(list);
  //       } else {
  //         setNotificationList([]);
  //         Swal.fire({
  //           icon: "warning",
  //           title: "No data found!",
  //           text: "There is no list between the selected dates.",
  //           confirmButtonText: "OK",
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             subOrderList();
  //           }
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
  // };

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(url, {
        startDate1,
      });
      const filteredUsers = data?.results?.listData?.filter(
        (user) =>
          new Date(user?.createdAt?.slice(0, 10)).toISOString().slice(0, 10) ===
          new Date(startDate1).toISOString().slice(0, 10)
      );
      if (filteredUsers.length === 0) {
        setNotificationList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subNotificationList();
          }
        });
      } else if (filteredUsers.length > 0) {
        await Swal.fire({
          title: "List Found!",
          text: "list is available for the selected date.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setNotificationList(filteredUsers);
          }
        });
      }
      setNotificationList(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        text_en: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setNotificationList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subNotificationList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setNotificationList(
          searchQuery !== "" ? results?.listData : results?.listData?.reverse()
        );
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: error.response.data,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (error.request) {
        Swal.fire({
          title: "Error!",
          text: "Network error. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReportNotification({ ...reportNotification, [name]: value });
  };
  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setCustomNotification({ ...customNotification, [name]: value });
  };
  // useEffect(() => {
  //   userList();
  // }, []);
  // const userList = async () => {
  //   const { data } = await axios.post(
  //     "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/notification/notification/list",
  //     {}
  //   );
  //   setNotificationList(data?.results?.listData?.reverse());
  //   console.log(data);
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/notification/notification/createReport",
        {
          text_en: reportNotification.reports,
        }
      );
      console.log(response.data.results.reportData);
      if (!response.data.error) {
        alert("Saved!");
      }
    } catch (error) {
      console.error(error);
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
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row transaction-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  {/* <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Notifications</h2>
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
                                className="form-design help-support-form row align-items-end justify-content-between"
                                action=""
                                onSubmit={handleSubmit}
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
                                    name="reports"
                                    id="reports"
                                    style={{ height: "120px" }}
                                    value={reportNotification.reports}
                                    onChange={handleInputChange}
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
                                    name="reportsAr"
                                    id="reportsAr"
                                    style={{ height: "120px" }}
                                    value={reportNotification.reportsAr}
                                    onChange={handleInputChange}
                                    required
                                  ></textarea>
                                </div>
                                <div className="form-group mb-0 col-auto">
                                  <button className="comman_btn2">Save</button>
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
                  </div> */}
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>
                          Report Notification{" "}
                          <span> ({notificationList?.length}) </span>
                        </h2>
                      </div>
                      <div className="col-3 Searchbox">
                        <form
                          className="form-design"
                          action=""
                          onSubmit={handleSearch1}
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
                              onClick={handleSearch1}
                            ></i>
                          </div>
                        </form>
                      </div>
                      <div className="col-auto">
                        <input
                          type="date"
                          className="custom_date"
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
                                          deleteNotification(data?._id);
                                          Swal.fire(
                                            "Deleted!",
                                            `${data?._id}  item has been deleted.`,
                                            "success"
                                          ).then(() => {
                                            subNotificationList();
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
                                  <p>
                                    {data?.text_en ? data?.text_en : data?.text}
                                  </p>
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
