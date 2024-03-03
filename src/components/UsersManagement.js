import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import {
  useGetFileQuery,
  useGetFileUserMutation,
  useGetUserListAllQuery,
  useGetUserListAllSearchMutation,
  useGetUserListQuery,
} from "../services/Post";
import Spinner from "./Spinner";
import GoogleMap from "./GoogleMap";
import ReactGoogleMap from "./ReactGoogleMap";
import { useCreateMapMutation } from "../services/Post";
import { useGetLatLongitudeQuery } from "../services/Post";
import { useSelector } from "react-redux";
function UsersManagement(props) {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);
  console.log("ml", ml);

  const [createMap, res] = useCreateMapMutation();
  const [userListdata] = useGetUserListAllSearchMutation();
  // const { data: userListdata } = useGetUserListAllQuery({ ecomAdmintoken });

  // const { data: download } = useGetFileQuery({ ecomAdmintoken });

  const [getFiles] = useGetFileUserMutation();

  const [loading, setLoading] = useState(false);

  const [usersList, setUsersList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    const data = {
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await getFiles(data);

    // if (res) {
    //   const blob = new Blob([res]);
    //   const downloadUrl = URL.createObjectURL(blob);
    //   const link = document.createElement("a");
    //   link.href = downloadUrl;
    //   link.download = "file.xlsx";
    //   link.click();
    // }
    if (res) {
      const link = document.createElement("a");
      link.href = res;
      link.target = "_blank";
      link.download = "file.pdf";
      link.click();
    }
  };
  useEffect(() => {
    if (ecomAdmintoken) {
      handleUserList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleUserList = async () => {
    const data = {
      from: startDate,
      to: endDate,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await userListdata(data);
    console.log("res brand cate", res);
    setUsersList(res?.data?.results?.userData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleUserList();
  };

  // const handleDownload = (e) => {
  //   e.preventDefault();
  //   if (download) {
  //     const blob = new Blob([download]);
  //     const downloadUrl = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.download = "file.xlsx";
  //     link.click();
  //   }
  // };

  return (
    <>
      {loading}
      <Sidebar Dash={"users"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  {/* <div id="map-canvas" className="mb-5 shadow rounded"></div> */}
                  {/* <GoogleMap latitude={latitude} longitude={longitude} /> */}
                  <ReactGoogleMap />
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Users Management</h2>
                      </div>
                      <div className="col-3">
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
                        <button
                          className="comman_btn2"
                          onClick={(e) => handleDownload(e)}
                        >
                          <i className="fal fa-download me-2"></i>Excel
                        </button>
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
                        <label htmlFor="startDate">From</label>
                        <input
                          type="date"
                          className="form-control"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="endDate">To</label>
                        <input
                          type="date"
                          className="form-control"
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
                                  <th>S.No.</th>
                                  <th>User Name</th>
                                  <th>Mobile Number</th>
                                  <th>Registration Date</th>
                                  {/* <th>Special Offers</th> */}
                                  {/* <th>Status</th> */}
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(usersList || [])?.map((user, index) => (
                                  <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user?.userName}</td>
                                    <td>{user?.mobileNumber}</td>
                                    {/* <td>{user?.createdAt.slice(0,10)}</td> */}
                                    <td> {user?.createdAt.slice(0, 10)} </td>
                                    {/* <td>{user?.specialOffer}</td> */}
                                    {/* <td>
                                      <form className="table_btns d-flex align-items-center">
                                        <div className="check_toggle">
                                          <input
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            type="checkbox"
                                            defaultChecked=""
                                            name={`check${user._id}`}
                                            id={`check${user._id}`}
                                            className="d-none"
                                          />
                                          <label
                                            htmlFor={`check${user._id}`}
                                          ></label>
                                        </div>
                                      </form>
                                    </td> */}
                                    <td>
                                      <Link
                                        className="comman_btn2 table_viewbtn"
                                        // to={`/userDetails`}
                                        to={`/userDetails/${user._id}`}
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Update_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-4">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="row">
                <div className="col-12 Update_modal_content py-4">
                  <h2>Update</h2>
                  <p>Are you sure you want to disable this user?</p>
                  <Link className="comman_btn mx-2" to="javscript:;">
                    Yes
                  </Link>
                  <Link className="comman_btn2 mx-2 bg-red" to="javscript:;">
                    NO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersManagement;
