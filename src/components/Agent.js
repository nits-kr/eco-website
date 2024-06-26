import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faDollarSign,
  faMoneyBill1Wave,
  faDownload,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import {
  useDeleteAgentListMutation,
  useGetAgentListQuery,
} from "../services/Post";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Agent(props) {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);
  const { data: userListdata, refetch: agentListData } = useGetAgentListQuery({
    ecomAdmintoken,
  });

  const [deleteAgent] = useDeleteAgentListMutation();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [agentList, setAgentList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (userListdata) {
      setAgentList(userListdata?.results?.list);
    }
  }, [userListdata]);

  const handleDeleteAgent = async (id) => {
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
        deleteAgent({ id, ecomAdmintoken });
        // agentListData();
        // toast.success("Item Deleted!");
        setTimeout(() => {
          toast.success("Item Deleted!");
          agentListData();
        }, 500);
      }
    });
  };

  return (
    <>
      {loading}
      <Sidebar Dash={"agents"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center">
              <div className="col-12">
                <div className="col-9 mb-4">
                  <div className="main_head">
                    {" "}
                    <strong>Agent List</strong>{" "}
                  </div>
                </div>
                <span
                  className="col-auto d-flex "
                  style={{
                    justifyContent: "flex-end",
                    marginTop: "-55px",
                    marginBottom: "15px",
                  }}
                >
                  <Link
                    to="#"
                    className="btn btn-secondary "
                    style={{ marginRight: "10px", height: "40px" }}
                  >
                    <FontAwesomeIcon icon={faDownload} /> Import
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-secondary "
                    style={{ marginRight: "10px", height: "40px" }}
                  >
                    <FontAwesomeIcon icon={faFileExport} /> Export
                  </Link>
                  <Link
                    to="/add-agents"
                    className="btn btn-primary"
                    style={{ height: "40px", width: "160px" }}
                  >
                    + Add New Agent
                  </Link>
                </span>
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        {/* <h2>Product List</h2> */}
                        <div className="row-md-2 d-flex">
                          <div
                            className="dataTables_length "
                            id="myDataTable_length"
                          >
                            <label
                              htmlFor="myDataTable_length"
                              style={{ marginRight: "5px", color: "white" }}
                            >
                              <strong>Filter By: </strong>
                            </label>
                            {/* <div style={{ display: "inline-block" }}>
                              <select
                                name="myDataTable_length"
                                aria-controls="myDataTable"
                                className="form-select form-select-sm"
                                fdprocessedid="lqxz4"
                                style={{ width: "auto", height: "38px" }}
                              >
                                <option value={10}>All</option>
                                <option value={25}>Action</option>
                                <option value={50}>Another Action</option>
                                <option value={100}>Something else</option>
                              </select>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <form
                          className="form-design"
                          action=""
                          // onSubmit={handleSearch}
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
                              // onClick={handleSearch1}
                            ></i>
                          </div>
                        </form>
                      </div>
                      {/* <div className="col-auto">
                        <input
                          type="date"
                          className="custom_date"
                          value={startDate1}
                          onChange={(e) => setStartDate1(e.target.value)}
                        />
                      </div> */}
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                      // onSubmit={handleSearch}
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
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Mobile Number</th>
                                  <th>Status</th>
                                  <th>Online Status</th>
                                  <th>Registered At</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(agentList || [])?.map((agent, index) => (
                                  <tr key={index}>
                                    <td> {agent.name}</td>
                                    <td> {agent.Email} </td>
                                    {/* <td> {order?.createdAt.slice(0,10)} </td> */}
                                    <td>{agent.mobileNumber}</td>
                                    <td> {agent.status} </td>
                                    <td> {agent.onlineStatus} </td>
                                    <td> {agent?.createdAt?.slice(0, 10)} </td>
                                    <td>
                                      <Link
                                        className="comman_btn table_viewbtn"
                                        to={`/agents-information/${agent._id}`}
                                      >
                                        <FontAwesomeIcon icon={faEye} />
                                      </Link>
                                      <Link
                                        className="comman_btn2 table_viewbtn ms-2"
                                        to="#"
                                        onClick={() =>
                                          handleDeleteAgent(agent?._id)
                                        }
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* <div className="row d-flex mt-2">
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
                      </div> */}
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
