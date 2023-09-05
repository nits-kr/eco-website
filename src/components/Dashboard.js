import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";

function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [userCounts, setUserCounts] = useState(0);
  const [recentOrderList, setRecentOrderList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/dashboards/count/list";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/dashboards/count/search";
  useEffect(() => {
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/dashboards/count/userCount"
      )
      .then((response) => {
        setUserCounts(response.data.results);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Failed to fetch user count data. Please try again later.",
        });
      });
    dashBoardList();
  }, []);
  const dashBoardList = async (e) => {
    // e.preventDefault();
    props.setProgress(10);
    setLoading(true);
    axios
      .post(url)
      .then((response) => {
        setRecentOrderList(response?.data?.results?.list?.reverse());
        props.setProgress(100);
        setLoading(false);
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

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(url, {
        startDate1,
      });
      const filteredUsers = data?.results?.list?.filter(
        (user) =>
          new Date(user?.createdAt?.slice(0, 10)).toISOString().slice(0, 10) ===
          new Date(startDate1).toISOString().slice(0, 10)
      );
      if (filteredUsers.length === 0) {
        setRecentOrderList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            dashBoardList();
          }
        });
        // window.location.reload();
      } else if (filteredUsers.length > 0) {
        // setRecentOrderList([]);
        await Swal.fire({
          title: "List Found!",
          text: "list is available for the selected date.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setRecentOrderList(filteredUsers);
          }
        });
        // window.location.reload();
      }
      setRecentOrderList(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(url, {
        from: startDate,
        to: endDate,
      })
      .then((response) => {
        const list = response?.data?.results?.list?.reverse();
        if (list && list.length > 0) {
          Swal.fire({
            title: "List Found!",
            text: "list is available for the selected date.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              setRecentOrderList(list);
            }
          });
          // setRecentOrderList(list);
        } else {
          setRecentOrderList([]);
          Swal.fire({
            icon: "warning",
            title: "No data found!",
            text: "There is no list between the selected dates.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              dashBoardList();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        orderStatus: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        throw new Error("Error searching for products. Data is not found.");
      } else {
        setRecentOrderList(
          searchQuery !== "" ? results?.searchData : results?.list?.reverse()
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

  function formatTimeAgo(createdAt) {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDifferenceInSeconds = Math.floor(
      (currentDate - createdAtDate) / 1000
    );
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} sec ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} days ago`;
    }
  }

  function getStatusBackgroundColor(orderStatus) {
    switch (orderStatus) {
      case "Pending":
        return "yellow";
      case "Processing":
        return "orange";
      case "Shipped":
        return "green";
      case "Delivered":
        return "blue";
      case "Cancelled":
        return "red";
      default:
        return "gray";
    }
  }

  return (
    <>
      {loading}
      <Sidebar Dash={"dashboard"} />

      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center">
              <div className="col-12">
                <div className="row ms-3 mb-5 justify-content-center">
                  <div className="col d-flex align-items-stretch">
                    <Link
                      to="/users"
                      className="row dashboard_box box_design me-3 w-100"
                    >
                      <div className="col-auto px-0">
                        <span className="dashboard_icon">
                          <i className="fas fa-user"></i>
                        </span>
                      </div>
                      <div className="col pe-0">
                        <div className="dashboard_boxcontent">
                          <h2>Total Customers</h2>
                          <span>{userCounts.userCount}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col d-flex align-items-stretch">
                    <Link
                      to="/orders"
                      className="row dashboard_box box_design me-3 w-100"
                    >
                      <div className="col-auto px-0">
                        <span className="dashboard_icon">
                          <i className="fal fa-box-full"></i>
                        </span>
                      </div>
                      <div className="col pe-0">
                        <div className="dashboard_boxcontent">
                          <h2>Total Orders</h2>
                          <span>{userCounts.orderCount}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col d-flex align-items-stretch">
                    <Link
                      to="/offers"
                      className="row dashboard_box box_design me-3 w-100"
                    >
                      <div className="col-auto px-0">
                        <span className="dashboard_icon">
                          <i className="fal fa-gift-card"></i>
                        </span>
                      </div>
                      <div className="col pe-0">
                        <div className="dashboard_boxcontent">
                          <h2>Total Products</h2>
                          <span>{userCounts?.productCount} </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col d-flex align-items-stretch pe-0">
                    <Link
                      to="/transactions"
                      className="row dashboard_box box_design me-0 w-100"
                    >
                      <div className="col-auto px-0">
                        <span className="dashboard_icon">
                          <i className="far fa-dollar-sign"></i>
                        </span>
                      </div>
                      <div className="col pe-0">
                        <div className="dashboard_boxcontent">
                          <h2>Total Revenue</h2>
                          <span>SAR 20000</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Recent Orders</h2>
                      </div>
                      <div className="col-3">
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
                              className="fa fa-search"
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
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                      onSubmit={handleSearch}
                    >
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">From</label>
                        <input
                          type="date"
                          className="form-control"
                          id="startDate"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">To</label>
                        <input
                          type="date"
                          className="form-control"
                          id="endDate"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button
                          className="comman_btn2"
                          disabled={startDate > endDate}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="row">
                        <div className="col-12 comman_table_design px-0">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Buyer-name</th>
                                  <th>Date Placed</th>
                                  <th>Price</th>
                                  <th>Order Status</th>
                                  <th>Payment</th>
                                  {/* <th>Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {(recentOrderList || [])?.map(
                                  (order, index) => (
                                    <tr key={index}>
                                      <td> {order?._id} </td>
                                      <td> {order?.user_Id?.userName} </td>
                                      {/* <td> {order?.createdAt.slice(0,10)} </td> */}
                                      <td>
                                        <td>
                                          {order?.createdAt &&
                                            formatTimeAgo(order.createdAt)}
                                        </td>
                                      </td>
                                      <td>
                                        {" "}
                                        {
                                          order?.cartsTotal[0][0]
                                            ?.totalAfterDiscount
                                        }{" "}
                                      </td>
                                      {/* <td> {order?.orderStatus} </td> */}
                                      <td
                                        style={{
                                          backgroundColor:
                                            getStatusBackgroundColor(
                                              order?.orderStatus
                                            ),
                                        }}
                                      >
                                        {order?.orderStatus}
                                      </td>

                                      <td> {order?.paymentIntent} </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
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

export default Dashboard;
