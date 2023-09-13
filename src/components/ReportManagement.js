import React, { useState } from "react";
//import { Link } from "react-router-dom"
import axios from "axios";
import ProductReports from "./ProductReports";
import UserReports from "./UserReports";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useGetReportListQuery } from "../services/Post";

function ReportManagement() {
  const reportListItems = useGetReportListQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [reportList, setReportList] = useState([]);
  const handleSearch1 = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/reporter/reporter/search",
          {
            reporter: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products.Data are Not Found");
        } else {
          setReportList(results?.repoterData);
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
      setReportList([]);
    }
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
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="">From</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="">To</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-auto">
                                <button className="comman_btn2">Search</button>
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
                                        <th>Reported Against</th>
                                        <th>Reason</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1</td>
                                        <td>Ajay Sharma</td>
                                        <td>Ram Jain</td>
                                        <td>Inappropriate</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="user-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>Ajay Sharma</td>
                                        <td>Ram Jain</td>
                                        <td>Spam</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="user-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td>Ajay Sharma</td>
                                        <td>Ram Jain</td>
                                        <td>Inappropriate</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="user-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>4</td>
                                        <td>Ajay Sharma</td>
                                        <td>Ram Jain</td>
                                        <td>Spam</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="user-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
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
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="">From</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="">To</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-auto">
                                <button className="comman_btn2">Search</button>
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
                                        <th>Product Name</th>
                                        <th>Reported Against</th>
                                        <th>Reason</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1</td>
                                        <td>Ajay Sharma</td>
                                        <td>Lorem</td>
                                        <td>Ram Jain</td>
                                        <td>Inappropriate</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="offer-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>Ajay Sharma</td>
                                        <td>Lorem</td>
                                        <td>Ram Jain</td>
                                        <td>Spam</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="offer-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td>Ajay Sharma</td>
                                        <td>Lorem</td>
                                        <td>Ram Jain</td>
                                        <td>Inappropriate</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="offer-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>4</td>
                                        <td>Ajay Sharma</td>
                                        <td>Lorem</td>
                                        <td>Ram Jain</td>
                                        <td>Spam</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="offer-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
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
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="">From</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="">To</label>
                                <input type="date" className="form-control" />
                              </div>
                              <div className="form-group mb-0 col-auto">
                                <button className="comman_btn2">Search</button>
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
                                        <th>Product Name</th>
                                        <th>Reported Against</th>
                                        <th>Reason</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1</td>
                                        <td>Ajay Sharma</td>
                                        <td>Lorem</td>
                                        <td>Ram Jain</td>
                                        <td>Inappropriate</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="offer-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td>Ajay Sharma</td>
                                        <td>Lorem</td>
                                        <td>Ram Jain</td>
                                        <td>Spam</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="offer-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td>Ajay Sharma</td>
                                        <td>Lorem</td>
                                        <td>Ram Jain</td>
                                        <td>Inappropriate</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="offer-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>4</td>
                                        <td>Ajay Sharma</td>
                                        <td>Lorem</td>
                                        <td>Ram Jain</td>
                                        <td>Spam</td>
                                        <td>
                                          <a
                                            className="comman_btn2 table_viewbtn"
                                            href="offer-details.html"
                                          >
                                            View
                                          </a>
                                          <a
                                            className="comman_btn ms-1 table_viewbtn"
                                            href="javascript:;"
                                          >
                                            Notify
                                          </a>
                                        </td>
                                      </tr>
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
    </>
  );
}

export default ReportManagement;
