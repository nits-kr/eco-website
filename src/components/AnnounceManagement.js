import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
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
import {
  useCreateAnnouncementMutation,
  useDeleteAnnouncementListMutation,
  useGetAnnounceListMutation,
  useGetAnnounceListQuery,
} from "../services/Post";
import { useSelector } from "react-redux";

function AnnounceManagement() {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);

  const [deleteAnnounce, response] = useDeleteAnnouncementListMutation();
  const [getAnnouncement] = useGetAnnounceListMutation();
  const [createAnnounce] = useCreateAnnouncementMutation();

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

  useEffect(() => {
    if (ecomAdmintoken) {
      handleAnnounceList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleAnnounceList = async () => {
    const data = {
      from: startDate1,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await getAnnouncement(data);
    console.log("res brand cate", res);
    setAnnouncementList(res?.data?.results?.announcements);
  };

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
      const alldata = new FormData();
      alldata.append("heading_en", formData.nameEn);
      alldata.append("heading_ar", formData.nameAr);
      alldata.append("image", formData.categoryPic);
      alldata.append("text_en", formData.nameEnText);
      alldata.append("type", "All");
      alldata.append("text_ar", formData.nameArText);
      // users:["65d73df67c6a31ca3e728c85","65d86782da9210fd5d0bcbdf"]
      const response = await createAnnounce({ alldata, ecomAdmintoken });

      console.log("response", response);
      if (response?.data?.message === "Success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Announcement Created!",
          confirmButtonText: "OK",
        });
        handleAnnounceList();
      } else if (
        response?.data?.message === "Please provide announcement type!"
      ) {
        Swal.fire({
          icon: "error",
          title: "Type Error",
          text: "Please provide announcement type!",
          confirmButtonText: "OK",
        });
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

  return (
    <>
      <Sidebar Dash={"announcement-management"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
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
                          Enter Announcement Heading (En)
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
                          Enter Announcement Heading (Ar)
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
                          id="nameArTextAr"
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
                        <button className="comman_btn2 mt-4">Send</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>
                          Announcement <span>({announcementList?.length})</span>
                        </h2>
                      </div>
                      <div className="col-3 Searchbox">
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
                                  <img src={data?.image} alt="" />
                                </div>
                              </div>
                              <div className="col">
                                <div className="notification-box-content announcement-contnt position-relative">
                                  <h2>
                                    <i className="far fa-bullhorn fs-5"></i>{" "}
                                    {data?.heading_en}
                                  </h2>
                                  {/* <div className="check_toggle home_toggle d-flex align-items-center'">
                                    <div className="text_home">
                                      Home Screen Banner
                                    </div>
                                    <input
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdrop2"
                                      type="checkbox"
                                      defaultChecked={data?.status}
                                      name={`check${index}`}
                                      id={`check${index}`}
                                      className="d-none"
                                    />
                                    <label htmlFor={`check${index}`}></label>
                                  </div> */}
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
                                          deleteAnnounce({
                                            id: data?._id,
                                            ecomAdmintoken,
                                          });
                                          Swal.fire(
                                            "Deleted!",
                                            "item has been deleted.",
                                            "success"
                                          ).then(() => {
                                            handleAnnounceList();
                                          });
                                        }
                                      });
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Link>
                                  <h2>{data._id}</h2>
                                  <span className="">
                                    {data?.createdAt?.slice(0, 10)}
                                  </span>
                                  <p>{data?.text_en}</p>
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

export default AnnounceManagement;
