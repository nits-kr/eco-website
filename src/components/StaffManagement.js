import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditStaffMember from "./EditStaffMember";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useUpdateStaffMutation } from "../services/Post";
import { useGetStaffListQuery } from "../services/Post";

function StaffManagement() {
  const StaffListItems = useGetStaffListQuery();
  const [updateStaff] = useUpdateStaffMutation();
  const [staffList, setStaffList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [itemId, setItemId] = useState("");
  const [email, setEmail] = useState("");
  const [staffName2, setStaffName2] = useState("");
  const [module2, setModule2] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmPassword2, setConfirmPassword2] = useState("");
  const [staffName, setStaffName] = useState("");
  const [module, setModule] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [staff, setStaff] = useState({
    nameEn: "",
    email: "",
    modules: "",
    password: "",
    confirmPassword: "",
    categoryId: "",
  });

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/staff/staff/list";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/staff/staff/staffSearch";
  useEffect(() => {
    subStaffList();
  }, []);
  const subStaffList = async (e) => {
    axios
      .post(url)
      .then((response) => {
        setStaffList(response?.data?.results?.list?.reverse());
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

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(url, {
        startDate1,
      });
      const filteredUsers = data?.results?.list?.filter(
        (user) =>
          new Date(user?.createdAt?.slice(0, 10)).toISOString().slice(0, 10) ===
          new Date(startDate1).toISOString().slice(0, 10)
      );
      if (filteredUsers.length === 0) {
        setStaffList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subStaffList();
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
            setStaffList(filteredUsers);
          }
        });
      }
      setStaffList(filteredUsers);
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
        const list = response?.data?.results?.list?.reverse();
        if (list && list.length > 0) {
          Swal.fire({
            title: "List Found!",
            text: "list is available for the selected date.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              setStaffList(list);
            }
          });
          // setStaffList(list);
        } else {
          setStaffList([]);
          Swal.fire({
            icon: "warning",
            title: "No data found!",
            text: "There is no list between the selected dates.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              subStaffList();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        staffName: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setStaffList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subStaffList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setStaffList(
          searchQuery !== "" ? results?.staffData : results?.list?.reverse()
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/staff/staff/createStaff",
        {
          staffName: staff.nameEn,
          userEmail: staff.email,
          modules: staff.modules,
          password: staff.password,
          confirm_password: staff.confirmPassword,
        }
      );

      console.log(response.data.results.saveData);

      if (!response.data.error) {
        // Display SweetAlert2 popup
        Swal.fire({
          icon: "success",
          title: "Saved!",
          showConfirmButton: true,
        }).then(() => {
          // Reload the page
          window.location.reload();
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editOffer = {
      id: itemId,
      staffName: staffName,
      userEmail: email,
      modules: module,
      // password: password,
      // confirm_password: confirmPassword
    };
    try {
      await updateStaff(editOffer);
      Swal.fire({
        title: "Changes Saved",
        text: "The offer has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {}
  };
  const handleItem = (item) => {
    setStaffName2(item?.staffName || "");
    setModule2(item?.modules[0] || "");
    setEmail2(item?.userEmail || "");
    setPassword2(item?.password || "");
    setConfirmPassword2(item?.confirm_password || "");
  };

  return (
    <>
      <Sidebar Dash={"staff"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row staff-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Add New Staff Member</h2>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group col-4">
                        <label htmlFor="">
                          Staff Name
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="nameEn"
                          id="nameEn"
                          value={staff.nameEn}
                          onChange={handleInputChange}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group col-4">
                        <label htmlFor="">
                          Module
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="modules"
                          id="modules"
                          value={staff.modules}
                          onChange={handleInputChange}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group col-4">
                        <label htmlFor="email">
                          Email
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          value={staff.email}
                          onChange={handleInputChange}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">
                          Password
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          value={staff.password}
                          onChange={handleInputChange}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">
                          Confirm Password
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={staff.confirmPassword}
                          onChange={handleInputChange}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button type="submit" className="comman_btn2">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Staff Management</h2>
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
                    <div className="row">
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Date</th>
                                <th>Staff Name</th>
                                <th>Email</th>
                                <th>Modules</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {staffList?.map((data, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{data?.createdAt?.slice(0, 10)}</td>
                                  <td>{data?.staffName}</td>
                                  <td>{data?.userEmail}</td>
                                  <td>{data?.modules[0]}</td>
                                  <td>
                                    <form className="table_btns d-flex align-items-center">
                                      <div className="check_toggle">
                                        <input
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdrop2"
                                          defaultChecked
                                          type="checkbox"
                                          name={`check${index}`}
                                          id={`check${index}`}
                                          className="d-none"
                                        />
                                        <label
                                          htmlFor={`check${index}`}
                                        ></label>
                                      </div>
                                    </form>
                                  </td>
                                  <td>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdrop"
                                      className="comman_btn2 table_viewbtn"
                                      to=""
                                      // onClick={() => setItemId(data?._id)}
                                      onClick={() => {
                                        handleItem(data);
                                        setItemId(data?._id);
                                      }}
                                    >
                                      Edit
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
            </div>
          </div>
        </div>
      </div>
      {/* <EditStaffMember /> */}
      <div
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
                onSubmit={handleSaveChanges1}
              >
                <div className="form-group col-6">
                  <label htmlFor="">Staff Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameEn"
                    id="nameEn"
                    // value={staff ? staff.nameEn : ""}
                    defaultValue={staffName2}
                    onChange={(e) => setStaffName(e.target.value)}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    // value={email}
                    defaultValue={email2}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="">Module</label>
                  <input
                    type="text"
                    className="form-control"
                    name="modules"
                    id="modules"
                    // value={staff.modules}
                    defaultValue={module2}
                    onChange={(e) => setModule(e.target.value)}
                  />
                </div>
                {/* <div className="form-group col-6">
                  <label htmlFor="">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={staff ? staff.password : ""}
                    defaultValue={password2}
                    // onChange={handleInputChange}
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={staff ? staff.confirmPassword : ""}
                    defaultValue={confirmPassword2}
                    // onChange={handleInputChange}
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div> */}
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
        className="modal fade Update_modal"
        id="staticBackdrop2"
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
                  <p>Are you sure, Want to update this?</p>
                  <Link
                    className="comman_btn mx-2"
                    data-bs-dismiss="modal"
                    to="javscript:;"
                  >
                    Yes
                  </Link>
                  <Link
                    className="comman_btn2 mx-2 bg-red"
                    data-bs-dismiss="modal"
                    to="javscript:;"
                  >
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

export default StaffManagement;
