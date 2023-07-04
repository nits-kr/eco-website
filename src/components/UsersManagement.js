import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useGetFileQuery } from "../services/Post";
import Spinner from "./Spinner";
function UsersManagement(props) {
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

  let gmarkers1 = [];
  let markers1 = [];
  let infowindow = new window.google.maps.InfoWindow({
    content: "",
  });

  useEffect(() => {
    initialize();
  }, []);
  const initialize = () => {
    const center = new window.google.maps.LatLng(34.593839, -98.409974);
    const mapOptions = {
      zoom: 10,
      center: center,
      mapTypeID: window.google.maps.MapTypeId.ROADMAP,
    };
    const map = new window.google.maps.Map(
      document.getElementById("map-canvas"),
      mapOptions
    );
    for (let i = 0; i < markers1.length; i++) {
      addMarker(markers1[i], map);
    }
  };
  const addMarker = (marker, map) => {
    const category = marker[4];
    const title = marker[1];
    const pos = new window.google.maps.LatLng(marker[2], marker[3]);
    const content = marker[1];
    const marker1 = new window.google.maps.Marker({
      title: title,
      position: pos,
      category: category,
      map: map,
    });
    gmarkers1.push(marker1);
    window.google.maps.event.addListener(
      marker1,
      "click",
      (function (marker1, content) {
        return function () {
          console.log("Gmarker 1 gets pushed");
          infowindow.setContent(content);
          infowindow.open(map, marker1);
          map.panTo(this.getPosition());
          map.setZoom(13);
        };
      })(marker1, content)
    );
  };
  markers1 = [
    ["0", "Total User 7", 34.593839, -98.409974, "Total User 7"],
    ["1", "Total User 10", 34.613839, -98.409974, "Total User 10"],
    ["2", "Total User 20", 34.607799, -98.396419, "Total User 20"],
    ["3", "Total User 2", 34.623425, -98.468883, "Total User 2"],
    ["4", "Total User 9", 34.593839, -98.409974, "Total User 9"],
  ];
  const handleId = (id) => {
    alert(id);
  };
  useEffect(() => {
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/userList",
        {
          page: "3",
          userName: "n",
          pageSize: "4",
        }
      )
      .then((response) => {
        setUsersList(response.data.results.createData.reverse());
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/userList",
        {
          startDate1,
        }
      );
      const filteredUsers = data?.results?.createData?.filter(
        (user) =>
          new Date(user?.createdAt?.slice(0, 10)).toISOString().slice(0, 10) ===
          new Date(startDate1).toISOString().slice(0, 10)
      );
      if (filteredUsers.length === 0) {
        Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
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

  const userList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/userList",
      {
        page: "3",
        userName: "n",
        pageSize: "4",
        startDate,
        endDate,
      }
    );
    const filteredUsers = data.results.createData.filter(
      (user) =>
        new Date(user.createdAt) >= new Date(startDate) &&
        new Date(user.createdAt) <= new Date(endDate)
    );
    setUsersList(filteredUsers);
    console.log(data);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    userList();
  };
  const handleSearch1 = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          " http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/user-search",
          {
            userName: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products.Data are Not Found");
        } else {
          setUsersList(results.userData);
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
      setUsersList([]);
    }
  };
  // const handleDownload = () => {
  //   if (data) {
  //     const blob = new Blob([data]);
  //     const downloadUrl = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = downloadUrl;
  //     link.download = 'file.txt';
  //     link.click();
  //   }
  // };
  const handleDownload = () => {
    if (data && data.results && data.results.file) {
      const downloadUrl = data.results.file;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "file.xlsx";
      link.click();
    }
  };

  return (
    <>
      {loading}
      <Sidebar />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div id="map-canvas" className="mb-5 shadow rounded"></div>
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
                            <i className="far fa-search"></i>
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
                    {/* {loading ? (
                      <Spinner />
                    ) : ( */}
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
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {usersList?.map((user, index) => (
                                <tr key={user._id}>
                                  <td>{index + 1}</td>
                                  <td>{user?.userName}</td>
                                  <td>{user?.mobileNumber}</td>
                                  {/* <td>{user?.createdAt.slice(0,10)}</td> */}
                                  <td>
                                    {" "}
                                    {user?.createdAt
                                      .slice(0, 10)
                                      .split("-")
                                      .reverse()
                                      .join("-")}{" "}
                                  </td>
                                  {/* <td>{user?.specialOffer}</td> */}
                                  <td>
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
                                  </td>
                                  <td>
                                    <Link
                                      className="comman_btn2 table_viewbtn"
                                      // to={`/userDetails`}
                                      to={`/userDetails/${user._id}`}
                                      onClick={() => handleId(user?._id)}
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
                    {/* )} */}
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
