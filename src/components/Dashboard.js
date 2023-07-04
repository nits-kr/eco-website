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
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  useEffect(() => {
    props.setProgress(10);
    setLoading(true);
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/dashboards/count/userCount"
      )
      .then((response) => {
        setUserCounts(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
    props.setProgress(50);
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/agent/agent/order-list"
      )
      .then((response) => {
        setRecentOrderList(response.data.results.orderList.reverse());
      })

      .catch((error) => {
        console.log(error.response.data);
      });
    props.setProgress(100);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/agent/agent/order-list",
        {
          startDate,
          endDate,
        }
      )
      .then((response) => {
        const filteredData = response.data.results.orderList.filter(
          (data) =>
            new Date(data.createdAt) >= new Date(startDate) &&
            new Date(data.createdAt) <= new Date(endDate)
        );
        console.log("filteredData dashboard", filteredData);
        setRecentOrderList(filteredData.reverse());
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleSearch1 = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/dashboards/count/search",
          {
            orderStatus: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products. Data is not found.");
        } else {
          setRecentOrderList(results?.searchData);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      setRecentOrderList([]);
    }
  };
  return (
    <>
      {loading}
      <Sidebar />
      {loading ? (
        <Spinner />
      ) : (
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
                            <h2>Total Revenue</h2>
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
                            <h2>Total Customers</h2>
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
                              <i className="fa fa-search"></i>
                            </div>
                          </form>
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
                                      <td> {order.products[0].product_Id} </td>
                                      <td> {order?.user_Id?.userName} </td>
                                      {/* <td> {order?.createdAt.slice(0,10)} </td> */}
                                      <td>
                                        {" "}
                                        {order?.createdAt
                                          .slice(0, 10)
                                          .split("-")
                                          .reverse()
                                          .join("-")}{" "}
                                      </td>
                                      <td> {order?.cartsTotal} </td>
                                      <td> {order?.orderStatus} </td>
                                      <td> {order?.paymentIntent} </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
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
      )}
    </>
  );
}

export default Dashboard;
