import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faDollarSign,
  faMoneyBill1Wave,
  faDownload,
  faFileExport,
  faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";

function HomeScreenBanner2() {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [imageUrl1, setImageUrl1] = useState("");
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [imageUrl2, setImageUrl2] = useState("");
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [imageUrl3, setImageUrl3] = useState("");
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [imageUrl4, setImageUrl4] = useState("");
  const [selectedImage5, setSelectedImage5] = useState(null);
  const [imageUrl5, setImageUrl5] = useState("");
  const [formData, setFormData] = useState({
    bannerPic1: null,
    bannerPic2: null,
    bannerPic3: null,
    bannerPic4: null,
    bannerPic5: null,
  });
  const handleImageUpload1 = (event) => {
    const file = event.target.files[0];
    setSelectedImage1(URL.createObjectURL(file));
    setFormData({ ...formData, bannerPic1: event.target.files[0] });
    setImageUrl1(URL.createObjectURL(file));
  };
  const handleImageUpload2 = (event) => {
    const file = event.target.files[0];
    setSelectedImage2(URL.createObjectURL(file));
    setFormData({ ...formData, bannerPic2: event.target.files[0] });
    setImageUrl2(URL.createObjectURL(file));
  };
  const handleImageUpload3 = (event) => {
    const file = event.target.files[0];
    setSelectedImage3(URL.createObjectURL(file));
    setFormData({ ...formData, bannerPic3: event.target.files[0] });
    setImageUrl3(URL.createObjectURL(file));
  };
  const handleImageUpload4 = (event) => {
    const file = event.target.files[0];
    setSelectedImage4(URL.createObjectURL(file));
    setFormData({ ...formData, bannerPic4: event.target.files[0] });
    setImageUrl4(URL.createObjectURL(file));
  };
  const handleImageUpload5 = (event) => {
    const file = event.target.files[0];
    setSelectedImage5(URL.createObjectURL(file));
    setFormData({ ...formData, bannerPic5: event.target.files[0] });
    setImageUrl5(URL.createObjectURL(file));
  };
  const handleOnSave1 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("homeScreenOne", formData.bannerPic1);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenOne",
        data
      );
      console.log(response?.data?.results?.bannersData);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response?.data?.results?.bannersData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnSave2 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("homeScreenTwo", formData.bannerPic2);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenTwo",
        data
      );
      console.log(response?.data?.results?.bannersData);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response?.data?.results?.bannersData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnSave3 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("homeScreenThree", formData.bannerPic3);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenThree",
        data
      );
      console.log(response?.data?.results?.bannersData);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response?.data?.results?.bannersData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnSave4 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("homeScreenFour", formData.bannerPic4);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenFour",
        data
      );
      console.log(response?.data?.results?.bannersData);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response?.data?.results?.bannersData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnSave5 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("homeScreenFive", formData.bannerPic5);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenFive",
        data
      );
      console.log(response?.data?.results?.bannersData);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response?.data?.results?.bannersData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
  };
  return (
    <>
      <Sidebar Dash={"Home-Screen-banners"} />
      <h2> Single Item</h2>
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row signup_management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Home Screen Banners</h2>
                      </div>
                      {/* <div className="col-auto">
                        <button
                          className="comman_btn2 mx-2"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop4"
                        >
                          Preview
                        </button>
                        <button className="comman_btn2">Save</button>
                      </div> */}
                    </div>
                    <form
                      className="form-design banner_sliders py-5 px-5 row mx-0 align-items-end justify-content-between"
                      action=""
                    >
                      <Slider {...settings}>
                        <div>
                          <div className="banner_sliders_box me-2">
                            <div className="row Onboarding_box mb-4 mx-0">
                              <span className="head_spann">Home Screen 1</span>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop2"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  defaultChecked=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexSwitchCheckChecked"
                                ></label>
                              </div>
                              <div className="form-group mb-0 col-12">
                                <div className="banner-profile position-relative">
                                  <div className="banner-Box bg-dark">
                                    {selectedImage1 ? (
                                      <img
                                        src={selectedImage1}
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    ) : (
                                      <img
                                        src="assets/img/Group 3994.png"
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    )}
                                  </div>
                                  <div className="p-image">
                                    <label htmlFor="file1">
                                      <i className="upload-button fas fa-camera" />
                                    </label>
                                    {/* <FontAwesomeIcon icon={faCameraRetro} /> */}
                                    <input
                                      className="form-control d-none"
                                      type="file"
                                      accept="image/*"
                                      name="file1"
                                      id="file1"
                                      onChange={(e) =>
                                        handleImageUpload1(e, "file1")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className=""
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // marginLeft: "15px",
                                // width: "550px",
                              }}
                            >
                              <div className="col-9">
                                <div className="form-group mb-0">
                                  <label htmlFor="">Upload Url</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={imageUrl1}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-3 mt-4">
                                <div className="form-group mb-0">
                                  <Link
                                    className="comman_btn2 table_viewbtn2 ms-2 mt-1"
                                    to="#"
                                    style={{ height: "50px", color: "white" }}
                                    onClick={handleOnSave1}
                                  >
                                    Save
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="banner_sliders_box me-2">
                            <div className="row Onboarding_box mb-4 mx-0">
                              <span className="head_spann">Home Screen 2</span>
                              {/* <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check1"
                                  id="check1"
                                  className="d-none"
                                />
                                <label htmlFor="check1" />
                              </div> */}
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop2"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  defaultChecked=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexSwitchCheckChecked"
                                ></label>
                              </div>
                              <div className="form-group mb-0 col-12">
                                <div className="banner-profile position-relative">
                                  <div className="banner-Box bg-dark">
                                    {selectedImage2 ? (
                                      <img
                                        src={selectedImage2}
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    ) : (
                                      <img
                                        src="assets/img/Group 3994.png"
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    )}
                                  </div>
                                  <div className="p-image">
                                    <label htmlFor="file2">
                                      <i className="upload-button fas fa-camera" />
                                    </label>
                                    <input
                                      className="form-control d-none"
                                      type="file"
                                      accept="image/*"
                                      name="file2"
                                      id="file2"
                                      onChange={(e) =>
                                        handleImageUpload2(e, "file2")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className=""
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // marginLeft: "15px",
                                // width: "550px",
                              }}
                            >
                              <div className="col-9">
                                <div className="form-group mb-0">
                                  <label htmlFor="">Upload Url</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={imageUrl2}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-3 mt-4">
                                <div className="form-group mb-0">
                                  <Link
                                    className="comman_btn2 table_viewbtn2 ms-2 mt-1"
                                    to="#"
                                    style={{ height: "50px", color: "white" }}
                                    onClick={handleOnSave2}
                                  >
                                    Save
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="banner_sliders_box me-2">
                            <div className="row Onboarding_box mb-4 mx-0">
                              <span className="head_spann">Home Screen 3</span>
                              {/* <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check1"
                                  id="check1"
                                  className="d-none"
                                />
                                <label htmlFor="check1" />
                              </div> */}
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop2"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  defaultChecked=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexSwitchCheckChecked"
                                ></label>
                              </div>
                              <div className="form-group mb-0 col-12">
                                <div className="banner-profile position-relative">
                                  <div className="banner-Box bg-dark">
                                    {selectedImage3 ? (
                                      <img
                                        src={selectedImage3}
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    ) : (
                                      <img
                                        src="assets/img/Group 3994.png"
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    )}
                                  </div>
                                  <div className="p-image">
                                    <label htmlFor="file3">
                                      <i className="upload-button fas fa-camera" />
                                    </label>
                                    <input
                                      className="form-control d-none"
                                      type="file"
                                      accept="image/*"
                                      name="file3"
                                      id="file3"
                                      onChange={(e) =>
                                        handleImageUpload3(e, "file3")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className=""
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // marginLeft: "15px",
                                // width: "550px",
                              }}
                            >
                              <div className="col-9">
                                <div className="form-group mb-0">
                                  <label htmlFor="">Upload Url</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={imageUrl3}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-3 mt-4">
                                <div className="form-group mb-0">
                                  <Link
                                    className="comman_btn2 table_viewbtn2 ms-2 mt-1"
                                    to="#"
                                    style={{ height: "50px", color: "white" }}
                                    onClick={handleOnSave3}
                                  >
                                    Save
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="banner_sliders_box me-2">
                            <div className="row Onboarding_box mb-4 mx-0">
                              <span className="head_spann">Home Screen 4</span>
                              {/* <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check1"
                                  id="check1"
                                  className="d-none"
                                />
                                <label htmlFor="check1" />
                              </div> */}
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop2"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  defaultChecked=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexSwitchCheckChecked"
                                ></label>
                              </div>
                              <div className="form-group mb-0 col-12">
                                <div className="banner-profile position-relative">
                                  <div className="banner-Box bg-dark">
                                    {selectedImage4 ? (
                                      <img
                                        src={selectedImage4}
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    ) : (
                                      <img
                                        src="assets/img/Group 3994.png"
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    )}
                                  </div>
                                  <div className="p-image">
                                    <label htmlFor="file4">
                                      <i className="upload-button fas fa-camera" />
                                    </label>
                                    <input
                                      className="form-control d-none"
                                      type="file"
                                      accept="image/*"
                                      name="file4"
                                      id="file4"
                                      onChange={(e) =>
                                        handleImageUpload4(e, "file4")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className=""
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // marginLeft: "15px",
                                // width: "550px",
                              }}
                            >
                              <div className="col-9">
                                <div className="form-group mb-0">
                                  <label htmlFor="">Upload Url</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={imageUrl4}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-3 mt-4">
                                <div className="form-group mb-0">
                                  <Link
                                    className="comman_btn2 table_viewbtn2 ms-2 mt-1"
                                    to="#"
                                    style={{ height: "50px", color: "white" }}
                                    onClick={handleOnSave4}
                                  >
                                    Save
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="banner_sliders_box me-2">
                            <div className="row Onboarding_box mb-4 mx-0">
                              <span className="head_spann">Home Screen 5</span>
                              {/* <div className="check_toggle">
                                <input
                                  type="checkbox"
                                  defaultChecked=""
                                  name="check1"
                                  id="check1"
                                  className="d-none"
                                />
                                <label htmlFor="check1" />
                              </div> */}
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop2"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  defaultChecked=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexSwitchCheckChecked"
                                ></label>
                              </div>
                              <div className="form-group mb-0 col-12">
                                <div className="banner-profile position-relative">
                                  <div className="banner-Box bg-dark">
                                    {selectedImage5 ? (
                                      <img
                                        src={selectedImage5}
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    ) : (
                                      <img
                                        src="assets/img/Group 3994.png"
                                        alt=""
                                        style={{ height: "150px" }}
                                      />
                                    )}
                                  </div>
                                  <div className="p-image">
                                    <label htmlFor="file5">
                                      <i className="upload-button fas fa-camera" />
                                    </label>
                                    <input
                                      className="form-control d-none"
                                      type="file"
                                      accept="image/*"
                                      name="file5"
                                      id="file5"
                                      onChange={(e) =>
                                        handleImageUpload5(e, "file5")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="mb-2"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                // marginLeft: "15px",
                                // width: "550px",
                              }}
                            >
                              <div className="col-9">
                                <div className="form-group mb-0">
                                  <label htmlFor="">Upload Url</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={imageUrl5}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-3 mt-4">
                                <div className="form-group mb-0">
                                  <Link
                                    className="comman_btn2 table_viewbtn2 ms-2 mt-2"
                                    to="#"
                                    style={{ height: "50px", color: "white" }}
                                    onClick={handleOnSave5}
                                  >
                                    Save
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Slider>
                    </form>
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

export default HomeScreenBanner2;
