import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faDollarSign,
  faMoneyBill1Wave,
  faDownload,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { useDeleteHelpThoughtListMutation } from "../services/Post";
function ThoughtsManagement() {
  const [deleteThought, response] = useDeleteHelpThoughtListMutation();
  const [thoughts, setThoughts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    nameEnText: "",
    nameArText: "",
    categoryPic: null,
  });
  const [loginId, setLoginId] = useState("");

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  useEffect(() => {
    const storedLoginId = localStorage.getItem("loginId");
    setLoginId(storedLoginId);
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    setFormData({ ...formData, categoryPic: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.nameEn);
      data.append("title_ar", formData.nameAr);
      data.append("thougth_Pic", formData.categoryPic);
      data.append("description", formData.nameEnText);
      data.append("description_ar", formData.nameArText);
      data.append("user_Id", loginId);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/thougth/thougth/createThougth",
        data
      );

      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Thought Created!",
          confirmButtonText: "OK",
        });
        userList();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while saving the list.",
      });
    }
  };
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/thougth/thougth/list";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/thougth/thougth/thougthSearch";

  useEffect(() => {
    userList();
  }, []);
  const userList = async () => {
    const { data } = await axios.post(url);
    setThoughts(data?.results?.list?.reverse());
    console.log(data);
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
        setThoughts([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            userList();
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
            setThoughts(filteredUsers);
          }
        });
      }
      setThoughts(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        title: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setThoughts([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            userList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setThoughts(
          searchQuery !== "" ? results?.searchData : results?.list?.reverse()
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

  return (
    <>
      <Sidebar Dash={"thoughts-management"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row transaction-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Thought Management</h2>
                      </div>
                      {/* <div className="col-auto text-white fw-bold d-flex align-items-center">
                        <strong className="me-2 d-inline">Edit :</strong>
                        <button className="edit_buton" onClick="markUp('bold')">
                          <strong>B</strong>
                        </button>
                        <button
                          className="edit_buton"
                          onClick="markUp('italic')"
                        >
                          <em>I</em>
                        </button>
                        <button
                          className="edit_buton"
                          onClick="markUp('italic')"
                        >
                          <em>A</em>
                        </button>
                        <button
                          className="edit_buton"
                          onClick="markUp('italic')"
                        >
                          <em>a</em>
                        </button>
                        <button className="edit_buton" id="underline">
                          <u>U</u>
                        </button>
                      </div> */}
                    </div>
                    <form
                      className="form-design help-support-form py-4 px-3 row align-items-start justify-content-center"
                      action=""
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group col-4 choose_file position-relative announce_Upload">
                        <span>Upload Image</span>
                        <label htmlFor="upload_video">
                          <i className="fal fa-camera me-1"></i>Choose File{" "}
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          defaultValue=""
                          name="upload_video"
                          id="upload_video"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="form-group mb-0 col-4">
                        <label htmlFor="">
                          Enter Thought Heading (En)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          name="nameEn"
                          id="nameEn"
                          value={formData.nameEn}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-0 col-4">
                        <label htmlFor="">
                          Enter Thought Heading (Ar)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          name="nameAr"
                          id="nameAr"
                          value={formData.nameAr}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">
                          Enter Text Here (En)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          name="nameEnText"
                          id="nameEnText"
                          style={{ height: "120px" }}
                          value={formData.nameEnText}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">
                          Enter Text Here (Ar)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          name="nameArText"
                          id="nameArText"
                          style={{ height: "120px" }}
                          value={formData.nameArText}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                      {/* <div className="form-group col-auto mt-2 text-center">
                        <div className="check_radio">
                          <input
                            type="checkbox"
                            name="table1"
                            id="table1"
                            className="d-none"
                          />
                          <label htmlFor="table1">
                            Set as home screen banner
                          </label>
                        </div>
                      </div> */}
                      <div className="form-group col-12 text-center">
                        <button className="comman_btn2 mt-4">Create</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>
                          Thoughts Management <span>({thoughts?.length})</span>
                        </h2>
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
                        <input
                          type="date"
                          className="custom_date"
                          value={startDate1}
                          onChange={(e) => setStartDate1(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row p-4">
                      <div className="col-12">
                        <div className="category_btns_main">
                          {thoughts?.map((thought, index) => (
                            <div
                              className="row mx-0 notification-box shadow mb-4"
                              key={thought._id}
                            >
                              <div className="col-2">
                                <div className="notification_icon notification-imgg">
                                  <div>
                                    <img src={thought?.thougth_Pic} alt="" />
                                    <strong>
                                      <Link to="/userDetails">Ajay Sharma</Link>
                                    </strong>
                                  </div>
                                </div>
                              </div>
                              <div className="col">
                                <div className="notification-box-content announcement-contnt position-relative">
                                  <h2>{thought?.title}</h2>
                                  <Link
                                    className="check_toggle home_toggle d-flex align-items-center text-light table_viewbtn ms-2"
                                    onClick={() => {
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
                                          deleteThought(thought?._id);
                                          Swal.fire(
                                            "Deleted!",
                                            `${thought?.title}  item has been deleted.`,
                                            "success"
                                          ).then(() => {
                                            userList();
                                          });
                                        }
                                      });
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Link>
                                  <span className="">
                                    {thought?.createdAt?.slice(0, 10)}
                                  </span>
                                  <p>{thought.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
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

export default ThoughtsManagement;
