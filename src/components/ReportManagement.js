import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom"
import axios from "axios";
import { Link } from "react-router-dom";
import ProductReports from "./ProductReports";
import UserReports from "./UserReports";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useGetReportListQuery } from "../services/Post";

function ReportManagement() {
  const reportListItems = useGetReportListQuery();
  const [descriptionEn2, setDescriptionEn2] = useState("");
  const [descriptionEn21, setDescriptionEn21] = useState("");
  const [descriptionEn22, setDescriptionEn22] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const fetchStaffList = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/reporter/reporter/list"
      );
      console.log("API Response:", response.data); // Log the response
      if (response.data.error === false) {
        setProductList(response.data.results.list);
      } else {
        console.error("Error fetching data:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchStaffList();
    console.log("useEffect for product list ran");
  }, []);

  const fetchStaffList2 = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/user/user/user/user-reports-list"
      );
      setCustomerList(response?.data?.results?.reportsList?.reverse());
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchStaffList2();
  }, []);

  const fetchStaffList3 = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/user/user/user/order-reports-list"
      );
      setOrderList(response?.data?.results?.reportsList?.reverse());
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchStaffList3();
  }, []);

  const handleItem = (item) => {
    setDescriptionEn2(item?.description || "");
  };
  const handleItem2 = (item) => {
    setDescriptionEn21(item?.description || "");
  };
  const handleItem3 = (item) => {
    setDescriptionEn22(item?.description || "");
  };
  return (
    <>
      <Sidebar Dash={"reports"} />
      {/* <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row transaction-management justify-content-center">
              <div className="col-12 design_outter_comman shadow">
                <div className="row comman_header justify-content-between">
                  <div className="col">
                    <h2>Reports Management</h2>
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
                    <input type="date" className="custom_date" />
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
                          className="nav-link active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          {" "}
                          User{" "}
                        </button>
                        <button
                          className="nav-link active"
                          id="nav-profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-profile"
                          type="button"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                          // style={{ width: "100%" }}
                        >
                          {" "}
                          Products{" "}
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <UserReports searchQuery={searchQuery} />
                      <ProductReports />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div
        className="modal fade Edit_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Staff Member
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-start justify-content-center"
                action=""
              >
                <div className="form-group col-6">
                  <label htmlFor="">Staff Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Ajay Sharma"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="user@gmail.com"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="">Select Module</label>
                  <select
                    className="select form-control"
                    multiple
                    name=""
                    id=""
                  >
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="asdasd123123"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="asdasd123123"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  {" "}
                  <button className="comman_btn2">Save</button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row transaction-management justify-content-center">
              <div className="col-12 design_outter_comman shadow">
                <div className="row comman_header justify-content-between">
                  <div className="col">
                    <h2>Reports Management</h2>
                  </div>
                  <div className="col-3 Searchbox">
                    <form className="form-design" action="">
                      <div className="form-group mb-0 position-relative icons_set">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          name="name"
                          id="name"
                        />
                        <i className="far fa-search" />
                      </div>
                    </form>
                  </div>
                  <div className="col-auto">
                    <input type="date" className="custom_date" />
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
                          className="nav-link active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          {" "}
                          Customer{" "}
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
                          {" "}
                          Order{" "}
                        </button>
                        <button
                          className="nav-link"
                          id="nav-products-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-products"
                          type="button"
                          role="tab"
                          aria-controls="nav-products"
                          aria-selected="false"
                        >
                          {" "}
                          Products{" "}
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
                        <div className="row mx-0">
                          <div className="col-12">
                            <form
                              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                              action=""
                            >
                              <div className="form-group mb-0 col-4">
                                <label htmlFor="">From</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-4">
                                <label htmlFor="">To</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-auto">
                                <button className="comman_btn2">Search</button>
                              </div>
                              <div className="col-auto">
                                <button
                                  className="comman_btn"
                                  // onClick={handleDownload}
                                >
                                  <i className="fal fa-download me-2"></i>
                                  Customer
                                </button>
                              </div>
                            </form>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        <th>Reporter</th>
                                        <th>Email</th>
                                        <th>mobileNumber</th>
                                        <th>Reported Against</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {customerList?.map((item, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.userEmail}</td>
                                            <td>{item.mobileNumber}</td>
                                            <td></td>
                                            <td>{item.description}</td>
                                            <td>
                                              <Link
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop7"
                                                className="comman_btn table_viewbtn me-2"
                                                to="#"
                                                onClick={() => {
                                                  handleItem3(item);
                                                }}
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
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        <div className="row mx-0">
                          <div className="col-12">
                            <form
                              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                              action=""
                            >
                              <div className="form-group mb-0 col-4">
                                <label htmlFor="">From</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-4">
                                <label htmlFor="">To</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-auto">
                                <button className="comman_btn2">Search</button>
                              </div>
                              <div className="col-auto">
                                <button
                                  className="comman_btn"
                                  // onClick={handleDownload}
                                >
                                  <i className="fal fa-download me-2"></i>Order
                                </button>
                              </div>
                            </form>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        <th>Reporter</th>
                                        <th>Email</th>
                                        <th>MobileNumber</th>
                                        <th>Product Name</th>
                                        <th>Reported Against</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {orderList?.map((item, index) => (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{item.userName}</td>
                                          <td>{item.userEmail}</td>
                                          <td>{item.mobileNumber}</td>
                                          <td>
                                            {
                                              item?.order_Id?.products[0]
                                                ?.product_Id
                                            }
                                          </td>
                                          <td>Reported Against</td>
                                          <td>{item.description}</td>
                                          <td>
                                            <Link
                                              data-bs-toggle="modal"
                                              data-bs-target="#staticBackdrop6"
                                              className="comman_btn table_viewbtn me-2"
                                              to="#"
                                              onClick={() => {
                                                handleItem2(item);
                                              }}
                                            >
                                              View
                                            </Link>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-products"
                        role="tabpanel"
                        aria-labelledby="nav-products-tab"
                      >
                        <div className="row mx-0">
                          <div className="col-12">
                            <form
                              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                              action=""
                            >
                              <div className="form-group mb-0 col-4">
                                <label htmlFor="">From</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-4">
                                <label htmlFor="">To</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-auto">
                                <button className="comman_btn2">Search</button>
                              </div>
                              <div className="col-auto">
                                <button
                                  className="comman_btn"
                                  // onClick={handleDownload}
                                >
                                  <i className="fal fa-download me-2"></i>
                                  Product
                                </button>
                              </div>
                            </form>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        <th>Product Name</th>
                                        <th> Reporter Name</th>
                                        <th> Number</th>
                                        <th> Email</th>
                                        <th>Reason</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {console.log("productList", productList)}
                                      {productList.map((item, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                              {item?.product_Id?.productName_en}
                                            </td>
                                            <td>{item.reporterName}</td>
                                            <td>{item.reporterNumber}</td>
                                            <td>{item.reporterEmail}</td>
                                            <td>{item.reason}</td>
                                            <td>
                                              {item?.description?.slice(0, 20)}
                                              ...
                                            </td>
                                            <td>
                                              <Link
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop5"
                                                className="comman_btn table_viewbtn me-2"
                                                to="#"
                                                onClick={() => {
                                                  handleItem(item);
                                                }}
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
      </div>
      {/* Modal */}
      <div
        className="modal fade Edit_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Staff Member
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-start justify-content-center"
                action=""
              >
                <div className="form-group col-6">
                  <label htmlFor="">Staff Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Ajay Sharma"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="user@gmail.com"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="">Select Module</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name=""
                    id=""
                  >
                    <option selected="" value={1}>
                      Lorem
                    </option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                    <option value={1}>Lorem</option>
                    <option value={2}>ipsum</option>
                    <option value={3}>Lorem</option>
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="asdasd123123"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="asdasd123123"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  {" "}
                  <button className="comman_btn2">Save</button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade reply_modal"
        id="staticBackdrop5"
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
                <p>{descriptionEn2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade reply_modal"
        id="staticBackdrop6"
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
                <p>{descriptionEn21}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade reply_modal"
        id="staticBackdrop7"
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
                <p>{descriptionEn22}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportManagement;
