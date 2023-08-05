import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import SlickSlider from "./SlickSlider";
import Sidebar from "./Sidebar";

function HomeScreenBanner() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    profilePic: null,
    profilePic1: null,
    profilePic2: null,
    profilePic3: null,
    profilePic4: null,
  });

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
    const handleFileChange = (event) => {
      setFormData({ ...formData, categoryPic: event.target.files[0] });
    };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFormData({ ...formData, profilePic: event.target.files[0] });
  };
  const handleImageUpload1 = (event) => {
    const file = event.target.files[0];
    setSelectedImage1(URL.createObjectURL(file));
    setFormData({ ...formData, profilePic1: event.target.files[0] });
  };
  const handleImageUpload2 = (event) => {
    const file = event.target.files[0];
    setSelectedImage2(URL.createObjectURL(file));
    setFormData({ ...formData, profilePic2: event.target.files[0] });
  };
  const handleImageUpload3 = (event) => {
    const file = event.target.files[0];
    setSelectedImage3(URL.createObjectURL(file));
    setFormData({ ...formData, profilePic3: event.target.files[0] });
  };
  const handleImageUpload4 = (event) => {
    const file = event.target.files[0];
    setSelectedImage4(URL.createObjectURL(file));
    setFormData({ ...formData, profilePic4: event.target.files[0] });
  };

  // const handleOnSave = (event) => {
  //   event.preventDefault();
  //   handleOnSave1(event);
  //   handleOnSave2(event);
  //   handleOnSave3(event);
  //   handleOnSave4(event);
  //   handleOnSave5(event);
  // };
  const handleOnSave = (event) => {
    event.preventDefault();
    setTimeout(() => {
      handleOnSave1(event);
    }, 1000);

    setTimeout(() => {
      handleOnSave2(event);
    }, 2000);

    setTimeout(() => {
      handleOnSave3(event);
    }, 3000);

    setTimeout(() => {
      handleOnSave4(event);
    }, 4000);

    setTimeout(() => {
      handleOnSave5(event);
    }, 5000);
  };

  const handleOnSave1 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      console.log("homeScreen formdata", data);
      data.append("homeScreenOne", formData.profilePic);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenOne",
        data
      );
      console.log(response.data.results.saveUser);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response.data.results.saveUser);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnSave2 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      console.log("homeScreen formdata", data);
      data.append("homeScreenOne", formData.profilePic1);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenTwo",
        data
      );
      console.log(response.data.results.saveUser);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response.data.results.saveUser);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnSave3 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      console.log("homeScreen formdata", data);
      data.append("homeScreenOne", formData.profilePic2);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenThree",
        data
      );
      console.log(response.data.results.saveUser);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response.data.results.saveUser);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnSave4 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      console.log("homeScreen formdata", data);
      data.append("homeScreenOne", formData.profilePic3);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenFour",
        data
      );
      console.log(response.data.results.saveUser);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response.data.results.saveUser);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnSave5 = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      console.log("homeScreen formdata", data);
      data.append("homeScreenOne", formData.profilePic4);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenFive",
        data
      );
      console.log(response.data.results.saveUser);

      if (!response.data.error) {
        alert("List saved!");
        setFormData(response.data.results.saveUser);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("homeScreen banner", formData);

  return (
    <>
      <Sidebar Dash={"Home-Screen-banners"} />
      {/* <div className="admin_main">
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
                      <div className="col-auto">
                        <button
                          className="comman_btn2 mx-2"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop4"
                          fdprocessedid="958eb"
                        >
                          Preview
                        </button>
                        <button
                          className="comman_btn2"
                          fdprocessedid="j1mung"
                          onClick={handleOnSave}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <form
                      className="form-design banner_sliders owl-carousel py-5 px-5 row mx-0 align-items-end justify-content-between owl-loaded owl-drag"
                      action=""
                      //  onClick={handleOnSave}
                    >
                      <div className="owl-stage-outer">
                        <div className="owl-stage">
                          <div className="owl-item active">
                            <OwlCarousel
                              className="banner_slider "
                              autoplay={false}
                              autoplayHoverPause={true}
                              autoplayTimeout={8000}
                              rewind={true}
                              // loop={true}
                              dots={false}
                              nav={true}
                              video={true}
                              lazyLoad={true}
                              items={3}
                            >
                              <div className="banner_sliders_box me-2">
                                <div className="row Onboarding_box mb-4 mx-0">
                                  <span className="head_spann">
                                    Home Screen 1
                                  </span>
                                  <div className="check_toggle">
                                    <input
                                      type="checkbox"
                                      defaultChecked=""
                                      name="check1"
                                      id="check1"
                                      className="d-none"
                                    />
                                    <label htmlFor="check1" />
                                  </div>
                                  <div className="form-group mb-0 col-12">
                                    <div className="banner-profile position-relative">
                                      <div className="banner-Box bg-dark">
                                        {selectedImage ? (
                                          <img src={selectedImage} alt="" />
                                        ) : (
                                          <img
                                            src="assets/img/Group 3994.png"
                                            alt=""
                                          />
                                        )}
                                      </div>
                                      <div className="p-image">
                                        <i className="upload-button fas fa-camera" />
                                        <input
                                          className="file-upload"
                                          type="file"
                                          accept="image/*"
                                          name="file1"
                                          id="file1"
                                          onChange={(e) =>
                                            handleImageUpload(e, "file1")
                                          }
                                          // onChange={handleImageUpload}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group mb-0 col-12">
                                    <label htmlFor="">Upload Url</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="banner_sliders_box mx-2">
                                <div className="row Onboarding_box mb-4 mx-0">
                                  <span className="head_spann">
                                    Home Screen 2
                                  </span>
                                  <div className="check_toggle">
                                    <input
                                      type="checkbox"
                                      defaultChecked=""
                                      name="check2"
                                      id="check2"
                                      className="d-none"
                                    />
                                    <label htmlFor="check1" />
                                  </div>
                                  <div className="form-group mb-0 col-12">
                                    <div className="banner-profile position-relative">
                                      <div className="banner-Box bg-dark">
                                        {selectedImage1 ? (
                                          <img src={selectedImage1} alt="" />
                                        ) : (
                                          <img
                                            src="assets/img/Group 3994.png"
                                            alt=""
                                          />
                                        )}
                                      </div>
                                      <div className="p-image">
                                        <i className="upload-button fas fa-camera" />
                                        <input
                                          className="file-upload"
                                          type="file"
                                          name="file2"
                                          id="file2"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleImageUpload1(e, "file2")
                                          }
                                          // onChange={handleImageUpload1}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group mb-0 col-12">
                                    <label htmlFor="">Upload Url</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="banner_sliders_box mx-2">
                                <div className="row Onboarding_box mb-4 mx-0">
                                  <span className="head_spann">
                                    Home Screen 3
                                  </span>
                                  <div className="check_toggle">
                                    <input
                                      type="checkbox"
                                      defaultChecked=""
                                      name="check3"
                                      id="check3"
                                      className="d-none"
                                    />
                                    <label htmlFor="check1" />
                                  </div>
                                  <div className="form-group mb-0 col-12">
                                    <div className="banner-profile position-relative">
                                      <div className="banner-Box bg-dark">
                                        {selectedImage2 ? (
                                          <img src={selectedImage2} alt="" />
                                        ) : (
                                          <img
                                            src="assets/img/Group 3994.png"
                                            alt=""
                                          />
                                        )}
                                      </div>
                                      <div className="p-image">
                                        <i className="upload-button fas fa-camera" />
                                        <input
                                          className="file-upload"
                                          type="file"
                                          name="file3"
                                          id="file3"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleImageUpload2(e, "file3")
                                          }
                                          // onChange={handleImageUpload2}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group mb-0 col-12">
                                    <label htmlFor="">Upload Url</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="banner_sliders_box mx-2">
                                <div className="row Onboarding_box mb-4 mx-0">
                                  <span className="head_spann">
                                    Home Screen 4
                                  </span>
                                  <div className="check_toggle">
                                    <input
                                      type="checkbox"
                                      defaultChecked=""
                                      name="check4"
                                      id="check4"
                                      className="d-none"
                                    />
                                    <label htmlFor="check4" />
                                  </div>
                                  <div className="form-group mb-0 col-12">
                                    <div className="banner-profile position-relative">
                                      <div className="banner-Box bg-dark">
                                        {selectedImage3 ? (
                                          <img src={selectedImage3} alt="" />
                                        ) : (
                                          <img
                                            src="assets/img/Group 3994.png"
                                            alt=""
                                          />
                                        )}
                                      </div>
                                      <div className="p-image">
                                        <i className="upload-button fas fa-camera" />
                                        <input
                                          className="file-upload"
                                          type="file"
                                          name="file4"
                                          id="file4"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleImageUpload3(e, "file4")
                                          }
                                          // onChange={handleImageUpload3}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group mb-0 col-12">
                                    <label htmlFor="">Upload Url</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="banner_sliders_box mx-2">
                                <div className="row Onboarding_box mb-4 mx-0">
                                  <span className="head_spann">
                                    Home Screen 5
                                  </span>
                                  <div className="check_toggle">
                                    <input
                                      type="checkbox"
                                      defaultChecked=""
                                      name="check5"
                                      id="check5"
                                      className="d-none"
                                    />
                                    <label htmlFor="check1" />
                                  </div>
                                  <div className="form-group mb-0 col-12">
                                    <div className="banner-profile position-relative">
                                      <div className="banner-Box bg-dark">
                                        {selectedImage4 ? (
                                          <img src={selectedImage4} alt="" />
                                        ) : (
                                          <img
                                            src="assets/img/Group 3994.png"
                                            alt=""
                                          />
                                        )}
                                      </div>
                                      <div className="p-image">
                                        <i className="upload-button fas fa-camera" />
                                        <input
                                          className="file-upload"
                                          type="file"
                                          name="file5"
                                          id="file5"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleImageUpload4(e, "file5")
                                          }
                                          // onChange={handleImageUpload4}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group mb-0 col-12">
                                    <label htmlFor="">Upload Url</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                            </OwlCarousel>
                          </div>
                        </div>
                      </div>
                      <div className="owl-dots disabled" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal  fade Edit_modal"
        id="staticBackdrop4"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Preview
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 p-3 text-center">
                  <img
                    className="demo_img"
                    src="assets/img/Picsart_22-12-09_13-51-53-094.png"
                    alt=""
                  />
                </div>
                <div className="col-6 p-3 text-center ">
                  <img
                    className="demo_img2"
                    src="assets/img/Picsart_22-12-09_13-49-54-977.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 p-3 text-center">
                  <h1>Android</h1>
                </div>
                <div className="col-6 p-3 text-center ">
                  <h1>IPhone</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
                      <div className="col-auto">
                        <button
                          className="comman_btn2 mx-2"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop4"
                        >
                          Preview
                        </button>
                        <button className="comman_btn2">Save</button>
                      </div>
                    </div>
                    <form
                      className="form-design banner_sliders owl-carousel py-5 px-5 row mx-0 align-items-end justify-content-between"
                      action=""
                    >
                      <div className="banner_sliders_box">
                        <div className="row Onboarding_box mb-4 mx-0">
                          <span className="head_spann">Home Screen 1</span>
                          <div className="check_toggle">
                            <input
                              type="checkbox"
                              defaultChecked=""
                              name="check1"
                              id="check1"
                              className="d-none"
                            />
                            <label htmlFor="check1" />
                          </div>
                          <div className="form-group mb-0 col-12">
                            <div className="banner-profile position-relative">
                              <div className="banner-Box bg-dark">
                                <img
                                  className="home-banner"
                                  src="assets/img/Group 3994.png"
                                />
                              </div>
                              <div className="p-image">
                                <i className="upload-button fas fa-camera" />
                                <input
                                  className="file-upload"
                                  type="file"
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-0 col-12">
                            <label htmlFor="">Upload Url</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="banner_sliders_box">
                        <div className="row Onboarding_box mb-4 mx-0">
                          <span className="head_spann">Home Screen 2</span>
                          <div className="check_toggle">
                            <input
                              type="checkbox"
                              defaultChecked=""
                              name="check2"
                              id="check2"
                              className="d-none"
                            />
                            <label htmlFor="check2" />
                          </div>
                          <div className="form-group mb-0 col-12">
                            <div className="banner-profile position-relative">
                              <div className="banner-Box bg-dark">
                                <img
                                  className="home-banner"
                                  src="assets/img/Group 3994.png"
                                />
                              </div>
                              <div className="p-image">
                                <i className="upload-button fas fa-camera" />
                                <input
                                  className="file-upload"
                                  type="file"
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-0 col-12">
                            <label htmlFor="">Upload Url</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="banner_sliders_box">
                        <div className="row Onboarding_box mb-4 mx-0">
                          <span className="head_spann">Home Screen 3</span>
                          <div className="check_toggle">
                            <input
                              type="checkbox"
                              defaultChecked=""
                              name="check3"
                              id="check3"
                              className="d-none"
                            />
                            <label htmlFor="check3" />
                          </div>
                          <div className="form-group mb-0 col-12">
                            <div className="banner-profile position-relative">
                              <div className="banner-Box bg-dark">
                                <img
                                  className="home-banner"
                                  src="assets/img/Group 3994.png"
                                />
                              </div>
                              <div className="p-image">
                                <i className="upload-button fas fa-camera" />
                                <input
                                  className="file-upload"
                                  type="file"
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-0 col-12">
                            <label htmlFor="">Upload Url</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="banner_sliders_box">
                        <div className="row Onboarding_box mb-4 mx-0">
                          <span className="head_spann">Home Screen 4</span>
                          <div className="check_toggle">
                            <input
                              type="checkbox"
                              defaultChecked=""
                              name="check4"
                              id="check4"
                              className="d-none"
                            />
                            <label htmlFor="check4" />
                          </div>
                          <div className="form-group mb-0 col-12">
                            <div className="banner-profile position-relative">
                              <div className="banner-Box bg-dark">
                                <img
                                  className="home-banner"
                                  src="assets/img/Group 3994.png"
                                />
                              </div>
                              <div className="p-image">
                                <i className="upload-button fas fa-camera" />
                                <input
                                  className="file-upload"
                                  type="file"
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-0 col-12">
                            <label htmlFor="">Upload Url</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="banner_sliders_box">
                        <div className="row Onboarding_box mb-4 mx-0">
                          <span className="head_spann">Home Screen 5</span>
                          <div className="check_toggle">
                            <input
                              type="checkbox"
                              defaultChecked=""
                              name="check5"
                              id="check5"
                              className="d-none"
                            />
                            <label htmlFor="check5" />
                          </div>
                          <div className="form-group mb-0 col-12">
                            <div className="banner-profile position-relative">
                              <div className="banner-Box bg-dark">
                                <img
                                  className="home-banner"
                                  src="assets/img/Group 3994.png"
                                />
                              </div>
                              <div className="p-image">
                                <i className="upload-button fas fa-camera" />
                                <input
                                  className="file-upload"
                                  type="file"
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-0 col-12">
                            <label htmlFor="">Upload Url</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal  fade Edit_modal"
        id="staticBackdrop4"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Preview
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 p-3 text-center">
                  <img
                    className="demo_img"
                    src="assets/img/Picsart_22-12-09_13-51-53-094.png"
                    alt=""
                  />
                </div>
                <div className="col-6 p-3 text-center ">
                  <img
                    className="demo_img2"
                    src="assets/img/Picsart_22-12-09_13-49-54-977.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 p-3 text-center">
                  <h1>Android</h1>
                </div>
                <div className="col-6 p-3 text-center ">
                  <h1>IPhone</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <SlickSlider/> */}
    </>
  );
}

export default HomeScreenBanner;
