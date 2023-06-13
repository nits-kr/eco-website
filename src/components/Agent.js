import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faDollarSign,
  faMoneyBill1Wave,
  faDownload,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";

function Agent() {
  return (
    <>
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="body d-flex">
              <div className="container-xxl" style={{ marginTop: "-50px" }}>
                <div className=" mb-4">
                  <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between  flex-wrap">
                    <h3 className="fw-bold mb-0">Agents</h3>
                  </div>
                </div>
                {/* Row end  */}
                <div className="row g-3 mb-3 shadow">
                  <div className="col-md-12">
                    <div className="">
                      <div className="card-body">
                        <div
                          id="myDataTable_wrapper"
                          className="dataTables_wrapper dt-bootstrap5 no-footer"
                        >
                          <div className="row-12 d-flex">
                            <div className="col-md-2 d-flex">
                              <div
                                className="dataTables_length "
                                id="myDataTable_length"
                              >
                                <label
                                  htmlFor="myDataTable_length"
                                  style={{ marginRight: "5px" }}
                                >
                                  Filter By
                                </label>
                                <div style={{ display: "inline-block" }}>
                                  <select
                                    name="myDataTable_length"
                                    aria-controls="myDataTable"
                                    className="form-select form-select-sm"
                                    fdprocessedid="lqxz4"
                                    style={{ width: "auto" }}
                                  >
                                    <option value={10}>All</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="search-box col-sm-4">
                              <div className="input-group">
                                <input
                                  type="search"
                                  className="form-control"
                                  placeholder="I'm searching for..."
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                />
                                <button
                                  className="btn"
                                  type="button"
                                  id="button-addon2"
                                  fdprocessedid="b7cmd"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-search"
                                  >
                                    <circle cx={11} cy={11} r={8} />
                                    <line
                                      x1={21}
                                      y1={21}
                                      x2="16.65"
                                      y2="16.65"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-4 ms-auto">
                              <div className="button-group">
                                <button className="btn btn-muted border me-1">
                                  <FontAwesomeIcon icon={faDownload} /> Import
                                </button>
                                <button className="btn btn-muted border mx-1">
                                  <FontAwesomeIcon icon={faFileExport} /> Export
                                </button>
                                <Link to="/agents-details">
                                  <button className="btn btn-danger ms-1">
                                    {" "}
                                    + Add New Agent
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="row my-3">
                            <div className="col-sm-12">
                              <table
                                id="myDataTable"
                                className="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline"
                                style={{ width: "100%" }}
                                role="grid"
                                aria-describedby="myDataTable_info"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Id: activate to sort column ascending"
                                    >
                                      <input type="checkbox" />
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Products: activate to sort column ascending"
                                    >
                                      Name
                                    </th>
                                    <th
                                      className="sorting_asc"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Category: activate to sort column descending"
                                      aria-sort="ascending"
                                    >
                                      Email
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Date Added: activate to sort column ascending"
                                    >
                                      Mobile
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Stock: activate to sort column ascending"
                                    >
                                      Status
                                    </th>
                                    <th
                                      className="dt-body-right sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="In Stock: activate to sort column ascending"
                                    >
                                      Online Status
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Color: activate to sort column ascending"
                                    >
                                      Balance
                                    </th>
                                    <th
                                      className="dt-body-right sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Status: activate to sort column ascending"
                                    >
                                      Registered At
                                    </th>
                                    <th
                                      className="dt-body-right sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Status: activate to sort column ascending"
                                    >
                                      Action
                                    </th>
                                    <th
                                      className="dt-body-right sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Status: activate to sort column ascending"
                                    ></th>
                                    <th
                                      className="dt-body-right sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Status: activate to sort column ascending"
                                    ></th>
                                    <th
                                      className="dt-body-right sorting"
                                      tabIndex={0}
                                      aria-controls="myDataTable"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Status: activate to sort column ascending"
                                    ></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td className="text-warning">Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td>Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td>Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td>Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td>Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td>Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td>Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td>Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td>Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                  <tr role="row" className="odd">
                                    <td tabIndex={0} className="">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ayed</td>
                                    <td className="sorting_1">
                                      ayed@gmail.com
                                    </td>
                                    <td>9856344232</td>
                                    <td>Created</td>
                                    <td className=" dt-body-right">Online</td>
                                    <td>$0</td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-secondary">
                                        7 june 2023
                                      </span>
                                    </td>
                                    <td className="dt-body-right">
                                      <Link to="/agents-information">
                                        <span className="badge text-dark">
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </Link>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon icon={faDollarSign} />
                                      </span>
                                    </td>
                                    <td className=" dt-body-right">
                                      <span className="badge text-dark">
                                        <FontAwesomeIcon
                                          icon={faMoneyBill1Wave}
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-sm-12 col-md-3">
                              <div
                                className="dataTables_info"
                                id="myDataTable_info"
                                role="status"
                                aria-live="polite"
                              >
                                Showing 1 to 8 of 8 entries
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-9">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="myDataTable_paginate"
                              >
                                <ul
                                  className="pagination"
                                  style={{ marginLeft: "75%" }}
                                >
                                  <li
                                    className="paginate_button page-item previous disabled"
                                    id="myDataTable_previous"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="myDataTable"
                                      data-dt-idx={0}
                                      tabIndex={0}
                                      className="page-link"
                                    >
                                      Previous
                                    </a>
                                  </li>
                                  <li className="paginate_button page-item active">
                                    <a
                                      href="#"
                                      aria-controls="myDataTable"
                                      data-dt-idx={1}
                                      tabIndex={0}
                                      className="page-link"
                                    >
                                      1
                                    </a>
                                  </li>
                                  <li
                                    className="paginate_button page-item next disabled"
                                    id="myDataTable_next"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="myDataTable"
                                      data-dt-idx={2}
                                      tabIndex={0}
                                      className="page-link"
                                    >
                                      Next
                                    </a>
                                  </li>
                                </ul>
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
    </>
  );
}

export default Agent;
