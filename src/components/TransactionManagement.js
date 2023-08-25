import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import { useGetTransactionListQuery } from "../services/Post";
// import { useGetTransactionListDetailsQuery } from "../services/Post";
import { useGetTransactionListDetailsMutation } from "../services/Post";
import Sidebar from "./Sidebar";
import { useGetFileQuery } from "../services/Post";
import { useState, useEffect } from "react";
function TransactionManagement() {
  const { data, isLoading, isError } = useGetFileQuery("file-id");
  const transactionList = useGetTransactionListQuery();
  const [transactionListItems, setTransactionListItems] = useState([]);
  const [getTransactionDetails] = useGetTransactionListDetailsMutation();
  const [startDate, setStartDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryListData, setCategoryListData] = useState([]);
  console.log("getTransactionDetails", getTransactionDetails);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  useEffect(() => {
    const reversedList =
      transactionList?.data?.results?.statusData?.slice().reverse() ?? [];
    setCategoryListData(reversedList);
  }, [transactionList]);
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/transacation/list";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/order/order/search";
  useEffect(() => {
    subTransactionList();
  }, []);
  const subTransactionList = async (e) => {
    axios
      .post(url)
      .then((response) => {
        setTransactionListItems(response?.data?.results?.statusData?.reverse());
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
  // const handleTransactionDetails = (id) => {
  //     alert(id)
  //     console.log("getTransactionDetails", id);
  //     getTransactionDetails(id);
  //   };
  // const handleDownload = () => {
  //   if (data && data.results && data.results.file) {
  //     const downloadUrl = data.results.file;
  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.download = "file.xlsx";
  //     link.click();
  //   }
  // };
  const handleDownload = () => {
    if (data) {
      const blob = new Blob([data]);
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "file.xlsx";
      link.click();
    }
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
        setTransactionListItems([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setTransactionListItems();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setTransactionListItems(
          searchQuery !== "" ? results?.orderData : results?.list?.reverse()
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
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(url, {
        from: startDate,
        to: endDate,
      })
      .then((response) => {
        const list = response?.data?.results?.statusData?.reverse();
        if (list && list.length > 0) {
          Swal.fire({
            title: "List Found!",
            text: "list is available for the selected date.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              setCategoryListData(list);
            }
          });
          // setRecentOrderList(list);
        } else {
          setCategoryListData([]);
          Swal.fire({
            icon: "warning",
            title: "No data found!",
            text: "There is no list between the selected dates.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              // dashBoardList();
              window?.location?.reload();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <>
      <Sidebar Dash={"transactions"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row transaction-management justify-content-center">
              <div className="col-12 design_outter_comman shadow">
                <div className="row comman_header justify-content-between">
                  <div className="col">
                    <h2>Transaction Management</h2>
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
                  <div className="col-auto Searchbox">
                    <button className="comman_btn2" onClick={handleDownload}>
                      <i className="fal fa-download me-2"></i>Excel
                    </button>
                  </div>
                  {/* <div className="col-auto">
                    <input type="date" className="custom_date" />
                  </div> */}
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
                          className="nav-link active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                          style={{ width: "100%" }}
                        >
                          {" "}
                          Orders{" "}
                        </button>
                        {/* <button
                          className="nav-link"
                          id="nav-profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-profile"
                          type="button"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                        >
                          {" "}
                          Donations{" "}
                        </button> */}
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <div className="row mx-0">
                          <div className="col-12">
                            <form
                              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                              action=""
                              onSubmit={handleSearch}
                            >
                              {/* <div className="form-group mb-0 col position-relative percent_mark">
                                <label htmlFor="">Commission</label>
                                <input type="text" className="form-control" />
                                <span>%</span>
                              </div> */}
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
                              {/* <div className="form-group mb-0 col-auto">
                                <button className="comman_btn2">Save</button>
                              </div> */}
                            </form>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        <th>Date</th>
                                        <th>Order ID</th>
                                        <th>Buyer Name</th>
                                        <th>Cart Total</th>
                                        <th>Payment Intent</th>
                                        <th>Order Status</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {categoryListData?.map((item, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>1</td>
                                            <td>
                                              {item?.createdAt?.slice(0, 10)}
                                            </td>

                                            <td> {item?._id} </td>
                                            <td> {item?.user_Id?.userName} </td>
                                            <td>
                                              {" "}
                                              {
                                                item?.user_Id
                                                  ?.totalAfterDiscount[0]
                                              }{" "}
                                            </td>
                                            <td> {item?.paymentIntent} </td>
                                            <td> {item?.orderStatus} </td>
                                            <td>
                                              <Link
                                                className="comman_btn2 table_viewbtn"
                                                to="/transactionDetails"
                                                onClick={() =>
                                                  getTransactionDetails(
                                                    item?._id
                                                  )
                                                }
                                              >
                                                View
                                              </Link>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            {/* <div className="row Total_amt mx-0 my-3 py-3">
                              <div className="col-6 text-end">
                                <strong>Total Revenue : </strong>
                              </div>
                              <div className="col-6 text-start">
                                <span className="fw-bold fs-6 text-white table_viewbtn bg-dark ">
                                  2000 SAR
                                </span>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      {/* <div
                        className="tab-pane fade"
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        <div className="row mx-0">
                          <div className="col-12">
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        <th>Date</th>
                                        <th>User Name</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1</td>
                                        <td>01/07/2022</td>
                                        <td>Ajay Sharma</td>
                                        <td>100 SAR</td>
                                        <td>
                                          <Link
                                            className="comman_btn2 table_viewbtn"
                                            to="/userDetails"
                                          >
                                            View
                                          </Link>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>01/07/2022</td>
                                        <td>Ajay Sharma</td>
                                        <td>100 SAR</td>
                                        <td>
                                          <Link
                                            className="comman_btn2 table_viewbtn"
                                            to="/userDetails"
                                          >
                                            View
                                          </Link>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td>01/07/2022</td>
                                        <td>Ajay Sharma</td>
                                        <td>100 SAR</td>
                                        <td>
                                          <Link
                                            className="comman_btn2 table_viewbtn"
                                            to="/userDetails"
                                          >
                                            View
                                          </Link>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>4</td>
                                        <td>01/07/2022</td>
                                        <td>Ajay Sharma</td>
                                        <td>100 SAR</td>
                                        <td>
                                          <Link
                                            className="comman_btn2 table_viewbtn"
                                            to="/userDetails"
                                          >
                                            View
                                          </Link>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>5</td>
                                        <td>01/07/2022</td>
                                        <td>Ajay Sharma</td>
                                        <td>100 SAR</td>
                                        <td>
                                          <Link
                                            className="comman_btn2 table_viewbtn"
                                            to="/userDetails"
                                          >
                                            View
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="row Total_amt mx-0 my-3 py-3">
                              <div className="col-6 text-end">
                                <strong>Total Donations : </strong>
                              </div>
                              <div className="col-6 text-start">
                                <span className="fw-bold fs-6 text-white table_viewbtn bg-dark ">
                                  500 SAR
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
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

export default TransactionManagement;
