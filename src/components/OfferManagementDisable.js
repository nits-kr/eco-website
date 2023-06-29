import React from 'react'
import { Link } from "react-router-dom"
import Sidebar from './Sidebar'
function OfferManagementDisable() {
    return (
        <>
        <Sidebar/>
            <div className="admin_main">
                <div className="admin_main_inner">
                    <div className="admin_panel_data height_adjust">
                        <div className="row offer-management justify-content-center">
                            <div className="col-12">
                                <div className="row mx-0">
                                    {/* <!-- <div className="col-12 px-0 mb-4"><div className="offer_map shadow"><img src="assets/img/map.png" alt=""></div></div> --> */}
                                    <div className="col-12 col-md-12 design_outter_comman shadow">
                                        <div className="row comman_header justify-content-between">
                                            <div className="col">
                                                <h2>Offers Management</h2>
                                            </div>
                                            <div className="col-3">
                                                <form className="form-design" action="">
                                                    <div className="form-group mb-0 position-relative icons_set">
                                                        <input type="text" className="form-control" placeholder="Search" name="name" id="name" />
                                                        <i className="far fa-search"></i>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="form-group mb-0 col-auto">
                                                <Link to="/offerManagementEnable" className="comman_btn2">Enable All</Link>
                                            </div>
                                            <div className="col-auto">
                                                <input type="date" className="custom_date" />
                                            </div>
                                            <div className="col-auto">
                                                <div className="dropdown calender_part">
                                                    <Link className="dropdown-toggle" to="" role="button" id="dropdownMenuLink"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="fa fa-filter"></i>
                                                    </Link>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <li>
                                                            <Link className="dropdown-item" to="/offers">All</Link>
                                                        </li>
                                                        <li>
                                                            <Link className="dropdown-item" to="/offerManagementEnable">Enabled Only</Link>
                                                        </li>
                                                        <li>
                                                            <Link className="dropdown-item" to="/offerManagementDisable">Disabled Only</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 px-0">
                                                <nav>
                                                    <div className="nav nav-tabs comman_tabs" id="nav-tab" role="tablist">
                                                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                                                            data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                                                            aria-selected="true">All</button>
                                                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                                                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Free
                                                            Offers</button>
                                                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                                                            type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Fixed Price
                                                            Offers</button>
                                                        <button className="nav-link" id="nav-contact1-tab" data-bs-toggle="tab"
                                                            data-bs-target="#nav-contact1" type="button" role="tab" aria-controls="nav-contact1"
                                                            aria-selected="false">Auctions</button>
                                                    </div>
                                                </nav>
                                                <div className="tab-content" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                                        aria-labelledby="nav-home-tab">
                                                        <div className="row py-4 pe-2 mx-0">
                                                            <div className="col-12">
                                                                <div className="row products_posted p-0">
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img1.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/free.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img2.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/price.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img3.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/auction.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img1.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/free.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img2.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/price.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img3.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/auction.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                        <div className="row py-4 pe-2 mx-0">
                                                            <div className="col-12">
                                                                <div className="row products_posted p-0">
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img1.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/free.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img2.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/free.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img3.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/free.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img3.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/free.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img1.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/free.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img2.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/free.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                                        <div className="row py-4 pe-2 mx-0">
                                                            <div className="col-12">
                                                                <div className="row products_posted p-0">
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img1.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/price.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img2.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/price.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img3.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/price.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img3.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/price.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img1.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/price.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img2.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/price.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-contact1" role="tabpanel" aria-labelledby="nav-contact1-tab">
                                                        <div className="row py-4 pe-2 mx-0">
                                                            <div className="col-12">
                                                                <div className="row products_posted p-0">
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img1.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/auction.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img2.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/auction.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img3.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/auction.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img3.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/auction.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img1.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/auction.svg" alt="" />
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-4 mb-4 mt-2">
                                                                        <Link to="/offerDetails" className="products_posted_box_disabled">
                                                                            <img className="main_img" src="assets/img/product_img2.png" alt="" />
                                                                            <div className="img_bx">
                                                                                <img src="assets/img/auction.svg" alt="" />
                                                                            </div>
                                                                        </Link>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade Edit_modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-design p-3 help-support-form row align-items-end justify-content-center" action="">
                                <div className="form-group col-6">
                                    <label htmlFor="">Enter Category Name (En)</label>
                                    <input type="text" className="form-control" defaultValue="Lorem" name="name" id="name" />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Enter Category Name (Ar)</label>
                                    <input type="text" className="form-control" defaultValue="لوريم" name="name" id="name" />
                                </div>
                                <div className="form-group col-12 choose_file position-relative">
                                    <span>Upload Image</span>
                                    <label htmlFor="upload_video">
                                        <i className="fal fa-camera me-1"></i>Choose File </label>
                                    <input type="file" className="form-control" defaultValue="" name="upload_video" id="upload_video" />
                                </div>
                                <div className="form-group mb-0 col-auto">
                                    <button className="comman_btn2">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade Edit_modal" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Sub Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-design p-3 help-support-form row align-items-end justify-content-center" action="">
                                <div className="form-group col-12">
                                    <label htmlFor="">Select Category</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Enter Sub Category Name (En)</label>
                                    <input type="text" className="form-control" defaultValue="Lorem" name="name" id="name" />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Enter Sub Category Name (Ar)</label>
                                    <input type="text" className="form-control" defaultValue="لوريم" name="name" id="name" />
                                </div>
                                <div className="form-group mb-0 col-auto">
                                    <button className="comman_btn2">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade Edit_modal" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Sub Sub Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-design p-3 help-support-form row align-items-end justify-content-center" action="">
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Category</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Sub Category</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Enter Sub Sub Category Name (En)</label>
                                    <input type="text" className="form-control" defaultValue="Lorem" name="name" id="name" />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Enter Sub Sub Category Name (Ar)</label>
                                    <input type="text" className="form-control" defaultValue="لوريم" name="name" id="name" />
                                </div>
                                <div className="form-group mb-0 col-auto">
                                    <button className="comman_btn2">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade Edit_modal" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Attribute</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-design p-3 help-support-form row align-items-end justify-content-center" action="">
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Category</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Sub Category</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="">Select Sub Sub Category</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Attribute Name (En)</label>
                                    <input type="text" className="form-control" defaultValue="Lorem" name="name" id="name" />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Attribute Name (Ar)</label>
                                    <input type="text" className="form-control" defaultValue="لوريم" name="name" id="name" />
                                </div>
                                <div className="form-group mb-0 col-auto">
                                    <button className="comman_btn2">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade Edit_modal" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Values</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-design p-3 help-support-form row align-items-end justify-content-center" action="">
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Category</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Sub Category</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Sub Sub Category</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Attribute</label>
                                    <select className="select form-control" multiple name="" id="">
                                        <option selected defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Value Name (En)</label>
                                    <input type="text" className="form-control" defaultValue="Lorem" name="name" id="name" />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Value Name (Ar)</label>
                                    <input type="text" className="form-control" defaultValue="لوريم" name="name" id="name" />
                                </div>
                                <div className="form-group mb-0 col-auto">
                                    <button className="comman_btn2">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OfferManagementDisable
