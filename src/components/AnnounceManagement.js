import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";

function AnnounceManagement() {
  const [announcementList, setAnnouncementList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    nameEnText: "",
    nameArText: "",
    categoryPic: null,
  });
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/announcement/announcement/list",
        {
          startDate1,
        }
      );
      const filteredUsers = data?.results?.list?.filter(
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
      setAnnouncementList(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    setFormData({ ...formData, categoryPic: event.target.files[0] });
  };
  useEffect(() => {
    userList();
  }, []);
  const userList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/announcement/announcement/list",
      {}
    );
    setAnnouncementList(data.results.list);
    console.log(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("heading", formData.nameEn);
      data.append("pic", formData.categoryPic);
      data.append("text", formData.nameEnText);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/announcement/announcement/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token-user": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.results.saveData);
      if (!response.data.error) {
        alert("List saved!");
        handleSave();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/announcement/announcement/list",
        null,
        {
          headers: {
            "x-auth-token-user": localStorage.getItem("token"),
          },
        }
      );
      setAnnouncementList(response.data.results.list.reverse());
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSave();
  }, []);
  const handleSearch1 = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/announcement/announcement/search",
          {
            heading: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products.Data are Not Found");
        } else {
          setAnnouncementList(results.searchData);
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
      setAnnouncementList([]);
    }
  };

  return (
    <>
      <Sidebar Dash={"announcement-management"}/>
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row transaction-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Announcement Management</h2>
                      </div>
                      <div className="col-auto text-white fw-bold d-flex align-items-center">
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
                      </div>
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
                          Enter Announcement Heading (En)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          name="nameEn"
                          id="nameEn"
                          value={formData.nameEn}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-0 col-4">
                        <label htmlFor="">
                          Enter Announcement Heading (Ar)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          name="nameAr"
                          id="nameAr"
                          value={formData.nameAr}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">Enter Text Here (En)</label>
                        <textarea
                          className="form-control"
                          name="nameEnText"
                          id="nameEnText"
                          style={{ height: "120px" }}
                          value={formData.nameEnText}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">Enter Text Here (Ar)</label>
                        <textarea
                          className="form-control"
                          name="nameArText"
                          id="nameArText"
                          style={{ height: "120px" }}
                          value={formData.nameArText}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <div className="form-group col-auto mt-2 text-center">
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
                      </div>
                      <div className="form-group col-12 text-center">
                        <button className="comman_btn2 mt-4">Send</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>
                          Announcement <span>({announcementList.length})</span>
                        </h2>
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
                          {announcementList?.map((data, index) => (
                            <div
                              className="row mx-0 notification-box shadow mb-4"
                              key={index}
                            >
                              <div className="col-2">
                                <div className="notification_icon">
                                  {/* <i className="fa fa-image" style={{width:"50px", height:"50px"}}> {data.pic} </i> */}
                                  <img src={data.pic} alt="" />
                                </div>
                              </div>
                              <div className="col">
                                <div className="notification-box-content announcement-contnt position-relative">
                                  <h2>
                                    <i className="far fa-bullhorn fs-5"></i>{" "}
                                    {data?.heading}
                                  </h2>
                                  <div className="check_toggle home_toggle d-flex align-items-center'">
                                    <div className="text_home">
                                      Home Screen Banner
                                    </div>
                                    <input
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdrop"
                                      type="checkbox"
                                      defaultChecked=""
                                      name={`check${index}`}
                                      id={`check${index}`}
                                      className="d-none"
                                    />
                                    <label htmlFor={`check${index}`}></label>
                                  </div>
                                  <h2>{data._id}</h2>
                                  <span className="">
                                    {data?.createdAt?.slice(0, 10)}
                                  </span>
                                  <p>{data.text}</p>
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

export default AnnounceManagement;
