import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function ProductReports() {
  const [reporterList, setReporterList] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const fetchStaffList = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/reporter/reporter/list"
      );
      setReporterList(response?.data?.results?.list?.reverse());
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, []);
  const userList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/reporter/reporter/list",
      {
        from: startDate,
        to: endDate,
      }
    );
    // const filteredUsers = data.results.list.filter(
    //   (user) =>
    //     new Date(user.createdAt) >= new Date(startDate) &&
    //     new Date(user.createdAt) <= new Date(endDate)
    // );
    setReporterList(data?.results?.list?.reverse());
    console.log(data);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    userList();
  };
  return (
    <>
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
              onSubmit={handleSearch}
            >
              <div className="form-group mb-0 col-5">
                <label htmlFor="">From</label>
                <input
                  type="date"
                  className="form-control"
                  name="fromDate"
                  id="fromDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group mb-0 col-5">
                <label htmlFor="">To</label>
                <input
                  type="date"
                  className="form-control"
                  name="toDate"
                  id="toDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="form-group mb-0 col-auto">
                <button
                  type="submit"
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
                        <th>S.No.</th>
                        <th>Reporter</th>
                        <th>Reported Against</th>
                        <th>Reason</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(reporterList || []).map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.reporter}</td>
                          <td>{data.reporterAgainst}</td>
                          <td>{data.reason}</td>
                          <td>
                            <Link
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              className="comman_btn table_viewbtn me-2"
                              to="#"
                              // onClick={() => {
                              //   handleItem(data);
                              //   setItemId(data?._id);
                              // }}
                            >
                              View
                            </Link>
                            {/* <Link
                              className="comman_btn ms-1 table_viewbtn"
                              to=""
                            >
                              Notify
                            </Link> */}
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
    </>
  );
}
