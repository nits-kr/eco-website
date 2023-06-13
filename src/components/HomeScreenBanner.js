import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
function HomeScreenBanner() {
    const [formData, setFormData] = useState([]);
    const [image, setImage] = useState(null);
    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
    const handleFileChange = (e, key) => {
        console.log(e.target.files, key)
        setFormData({ ...formData, [key]: e.target.files[0] });
    };
    console.log(formData);
    const handleOnSave = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("homeScreenOne", formData.uploadImage4);

        axios
            .post("http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/ScreenOne", data)
            .then((response) => {
                setFormData(response.data.results.bannersData);
                console.log(response.data.results.bannersData);
                Swal.fire({
                    title: "HomeScreenOne Created!",
                    text: "Your new product has been created successfully.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setImage('http://localhost:5000'+response.data.results.bannersData.homeScreenOne)
                        // window.location.reload();
                    }
                });
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <>
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
                                                    </div>
                                                    <div className="form-group mb-0 col-12">
                                                        <div className="banner-profile position-relative">
                                                            <div className="banner-Box d-flex bg-dark">
                                                                <Link
                                                                    className="edit_content_btn comman_btn"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#staticBackdrop1"
                                                                    to="#"
                                                                    style={{ width: "68px", marginLeft: "85%" }}
                                                                >
                                                                    <i className="far fa-edit me-2"></i>Edit
                                                                </Link>
                                                                <Link
                                                                    className="edit_content_btn comman_btn"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#staticBackdrop1"
                                                                    to="#"
                                                                    style={{ width: "72px", marginLeft: "93%" }}
                                                                    onClick={handleOnSave}
                                                                >
                                                                    <i className="far fa-edit me-2"></i>Save
                                                                </Link>
                                                                <img
                                                                    className="home-banner"
                                                                    src={image}
                                                                    // src={
                                                                    //     formData.uploadImage4 ||
                                                                    //     "assets/img/Group 3994.png"
                                                                    // }
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="p-image">
                                                                <i className="upload-button fas fa-camera"></i>
                                                                <input
                                                                    className="file-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    name="uploadImage4"
                                                                    id="uploadImage4"
                                                                    onChange={(e) =>
                                                                        handleFileChange(e, "uploadImage4")
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group mb-0 col-12">
                                                        <label htmlFor="">Upload Url</label>
                                                        <input className="form-control" type="text" defaultValue={formData?.uploadImage4?.name} />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        {/* <form>
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
                                                        <label htmlFor="check2"></label>
                                                    </div>
                                                    <div className="form-group mb-0 col-12">
                                                        <div className="banner-profile position-relative">
                                                            <div className="banner-Box bg-dark">
                                                                <img
                                                                    className="home-banner"
                                                                    src="assets/img/Group 3994.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="p-image">
                                                                <i className="upload-button fas fa-camera"></i>
                                                                <input
                                                                    className="file-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    name="upload-image3"
                                                                    id="upload-image3"
                                                                    onChange={(e) =>
                                                                        handleFileChange(e, "uploadImage3")
                                                                    }
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
                                                        <label htmlFor="check3"></label>
                                                    </div>
                                                    <div className="form-group mb-0 col-12">
                                                        <div className="banner-profile position-relative">
                                                            <div className="banner-Box bg-dark">
                                                                <img
                                                                    className="home-banner"
                                                                    src="assets/img/Group 3994.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="p-image">
                                                                <i className="upload-button fas fa-camera"></i>
                                                                <input
                                                                    className="file-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    name="upload-image2"
                                                                    id="upload-image2"
                                                                    onChange={(e) =>
                                                                        handleFileChange(e, "uploadImage2")
                                                                    }
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
                                                        <label htmlFor="check4"></label>
                                                    </div>
                                                    <div className="form-group mb-0 col-12">
                                                        <div className="banner-profile position-relative">
                                                            <div className="banner-Box bg-dark">
                                                                <img
                                                                    className="home-banner"
                                                                    src="assets/img/Group 3994.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="p-image">
                                                                <i className="upload-button fas fa-camera"></i>
                                                                <input
                                                                    className="file-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    name="upload-image1"
                                                                    id="upload-image1"
                                                                    onChange={(e) =>
                                                                        handleFileChange(e, "uploadImage1")
                                                                    }
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
                                                        <label htmlFor="check5"></label>
                                                    </div>
                                                    <div className="form-group mb-0 col-12">
                                                        <div className="banner-profile position-relative">
                                                            <div className="banner-Box bg-dark">
                                                                <img
                                                                    className="home-banner"
                                                                    src="assets/img/Group 3994.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="p-image">
                                                                <i className="upload-button fas fa-camera"></i>
                                                                <input
                                                                    className="file-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    name="upload-image"
                                                                    id="upload-image"
                                                                    onChange={(e) =>
                                                                        handleFileChange(e, "uploadImage")
                                                                    }
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
                                        </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div
                className="modal  fade Edit_modal"
                id="staticBackdrop4"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
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
                            ></button>
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
        </>
    );
}

export default HomeScreenBanner;
