import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useGetFileQuery } from "../services/Post";
import Spinner from "./Spinner";
import GoogleMap from "./GoogleMap";
import ReactGoogleMap from "./ReactGoogleMap";
import { useCreateMapMutation } from "../services/Post";
import { useGetLatLongitudeQuery } from "../services/Post";
function UsersManagement(props) {
  const [createMap, res] = useCreateMapMutation();
  const { data, isLoading, isError } = useGetFileQuery("file-id");
  const [loading, setLoading] = useState(false);
  console.log("down load data of user management", data);
  const [usersList, setUsersList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const handleId = (id) => {};
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/userList";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/user-search";
  useEffect(() => {
    userManagementList();
  }, []);
  const userManagementList = () => {
    props.setProgress(10);
    setLoading(true);
    axios
      .post(url)
      .then((response) => {
        setUsersList(response?.data?.results?.createData?.reverse());
        props.setProgress(100);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(url, {
        startDate1,
      });
      const filteredUsers = data?.results?.createData?.filter(
        (user) =>
          new Date(user?.createdAt?.slice(0, 10)).toISOString().slice(0, 10) ===
          new Date(startDate1).toISOString().slice(0, 10)
      );
      if (filteredUsers.length === 0) {
        setUsersList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            userManagementList();
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
            setUsersList(filteredUsers);
          }
        });
      }
      setUsersList(filteredUsers);
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
        const list = response?.data?.results?.createData?.reverse();
        if (list && list.length > 0) {
          Swal.fire({
            title: "List Found!",
            text: "list is available for the selected date.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              setUsersList(list);
            }
          });
          // setUsersList(list);
        } else {
          setUsersList([]);
          Swal.fire({
            icon: "warning",
            title: "No data found!",
            text: "There is no list between the selected dates.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              userManagementList();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  // console.log("search query", searchQuery);
  // useEffect(() => {
  //   handleSearch1();
  // }, [searchQuery]);
  // const handleSearch1 = async (e) => {
  //   // e.preventDefault();
  //   if (searchQuery) {
  //     try {
  //       const response = await axios.post(
  //         "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/user-search",
  //         {
  //           userName: searchQuery,
  //         }
  //       );
  //       const { error, results } = response?.data;
  //       if (error) {
  //         throw new Error("Error searching for products. Data are Not Found");
  //       } else {
  //         setUsersList(results?.userData);
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         title: "Error!",
  //         text: error.message,
  //         icon: "error",
  //         confirmButtonText: "OK",
  //       });
  //       setUsersList([]); // Set usersList to empty when there is an error in the search
  //     }
  //   } else {
  //     setUsersList([]); // Set usersList to empty when searchQuery is empty
  //   }
  // };
  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        userName: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setUsersList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            userManagementList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setUsersList(
          searchQuery !== ""
            ? results?.userData
            : results?.createData?.reverse()
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
  // const handleDownload = () => {
  //   if (data && data.results && data.results.file) {
  //     const downloadUrl = data.results.file;
  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.download = "file.xlsx";
  //     link.click();
  //   }
  // };
  // const handleSaveMap = (latitude, longitude) => {
  //   const newAddress = {
  //     longitude: latitude,
  //     latitude: longitude,
  //   };
  //   createMap(newAddress);
  // };
  // usersList.forEach(user => {
  //   const { latitude, longitude } = user;
  //   handleSaveMap(latitude, longitude);
  // });

  return (
    <>
      {loading}
      <Sidebar Dash={"users"} />
      <div className="admin_main">
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
                        <button
                          className="comman_btn2"
                          onClick={handleDownload}
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
                        <label htmlFor="">From</label>
                        <input
                          type="date"
                          className="form-control"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">To</label>
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
