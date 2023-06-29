import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from "./Sidebar";

function SlickSlider() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setImageUrl(imageUrl);
    setFormData({ ...formData, profilePic: event.target.files[0] });
  };
  const handleImageUpload2 = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setImageUrl(imageUrl);
    setFormData({ ...formData, profilePic: event.target.files[0] });
  };
  const handleImageUpload3 = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setImageUrl(imageUrl);
    setFormData({ ...formData, profilePic: event.target.files[0] });
  };
  const handleImageUpload4 = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setImageUrl(imageUrl);
    setFormData({ ...formData, profilePic: event.target.files[0] });
  };

  const settings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <>
    <Sidebar/>
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row signup_management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <Slider {...settings}>
                      <div>
                        <div className="banner_sliders_box me-2">
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
                                  {selectedImage ? (
                                    <img src={selectedImage} alt="" />
                                  ) : (
                                    <img
                                      src="assets/img/Group 3994.png"
                                      alt=""
                                      style={{ height: "170px" }}
                                    />
                                  )}
                                </div>
                                <div className="p-image">
                                  <i className="upload-button fas fa-camera" />
                                  <input
                                    className="file-upload"
                                    type="file"
                                    accept="image/*"
                                    id="image1"
                                    onChange={handleImageUpload}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group mb-2 col-12">
                              <label htmlFor="">Upload Url</label>
                              <input
                                className="form-control"
                                type="text"
                                value={imageUrl}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="banner_sliders_box me-2">
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
                                  {selectedImage ? (
                                    <img src={selectedImage} alt="" />
                                  ) : (
                                    <img
                                      src="assets/img/Group 3994.png"
                                      alt=""
                                      style={{ height: "170px" }}
                                    />
                                  )}
                                </div>
                                <div className="p-image">
                                  <i className="upload-button fas fa-camera" />
                                  <input
                                    className="file-upload"
                                    type="file"
                                    accept="image/*"
                                    id="image2"
                                    onChange={handleImageUpload2}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group mb-2 col-12">
                              <label htmlFor="">Upload Url</label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="banner_sliders_box me-2">
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
                                  {selectedImage ? (
                                    <img src={selectedImage} alt="" />
                                  ) : (
                                    <img
                                      src="assets/img/Group 3994.png"
                                      alt=""
                                      style={{ height: "170px" }}
                                    />
                                  )}
                                </div>
                                <div className="p-image">
                                  <i className="upload-button fas fa-camera" />
                                  <input
                                    className="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload3}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group mb-2 col-12">
                              <label htmlFor="">Upload Url</label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="banner_sliders_box me-2">
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
                                  {selectedImage ? (
                                    <img src={selectedImage} alt="" />
                                  ) : (
                                    <img
                                      src="assets/img/Group 3994.png"
                                      alt=""
                                      style={{ height: "170px" }}
                                    />
                                  )}
                                </div>
                                <div className="p-image">
                                  <i className="upload-button fas fa-camera" />
                                  <input
                                    className="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload3}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group mb-2 col-12">
                              <label htmlFor="">Upload Url</label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="banner_sliders_box me-2">
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
                                  {selectedImage ? (
                                    <img src={selectedImage} alt="" />
                                  ) : (
                                    <img
                                      src="assets/img/Group 3994.png"
                                      alt=""
                                      style={{ height: "170px" }}
                                    />
                                  )}
                                </div>
                                <div className="p-image">
                                  <i className="upload-button fas fa-camera" />
                                  <input
                                    className="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload4}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group mb-2 col-12">
                              <label htmlFor="">Upload Url</label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Slider>
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

export default SlickSlider;
