import React, {useState} from "react";
//import { Link } from "react-router-dom"
import axios from "axios";
import ProductReports from "./ProductReports";
import UserReports from "./UserReports";
import Swal from "sweetalert2";

function ReportManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [reportList, setReportList] = useState([]);
    const handleSearch1 = async (e) => {
        e.preventDefault();
        if (searchQuery) {
            try {
                const response = await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/search-coupan', {
                    coupanTitle: searchQuery
                });
                const { error, results } = response.data;
                if (error) {
                    throw new Error('Error searching for products.Data are Not Found');
                } else {
                    setReportList(results.coupanData);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            setReportList([]);
        }
    };
    return (
        <>
            <div className="admin_main">
                <div className="admin_main_inner">
                    <div className="admin_panel_data height_adjust">
                        <div className="row transaction-management justify-content-center">
                            <div className="col-12 design_outter_comman shadow">
                                <div className="row comman_header justify-content-between">
                                    <div className="col">
                                        <h2>Reports Management</h2>
                                    </div>
                                    <div className="col-3 Searchbox">
                                        <form className="form-design" action="" onSubmit={handleSearch1}>
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
                                        <input type="date" className="custom_date" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 px-0">
                                        <nav>
                                            <div
                                                className="nav nav-tabs comman_tabs"
                                                id="nav-tab"
                                                role="tablist"
                                            >
                                                <button
                                                    className="nav-link active"
                                                    id="nav-home-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#nav-home"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="nav-home"
                                                    aria-selected="true"
                                                >
                                                    {" "}
                                                    User{" "}
                                                </button>
                                                <button
                                                    className="nav-link"
                                                    id="nav-profile-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#nav-profile"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="nav-profile"
                                                    aria-selected="false"
                                                >
                                                    {" "}
                                                    Products{" "}
                                                </button>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <UserReports />
                                            <ProductReports />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
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
                            >
                                <div className="form-group col-6">
                                    <label htmlFor="">Staff Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="Ajay Sharma"
                                        name="name"
                                        id="name"
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="user@gmail.com"
                                        name="name"
                                        id="name"
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="">Select Module</label>
                                    <select
                                        className="select form-control"
                                        multiple
                                        name=""
                                        id=""
                                    >
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                        <option defaultValue="1">Lorem</option>
                                        <option defaultValue="2">ipsum</option>
                                        <option defaultValue="3">Lorem</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="asdasd123123"
                                        name="name"
                                        id="name"
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Confirm Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="asdasd123123"
                                        name="name"
                                        id="name"
                                    />
                                </div>
                                <div className="form-group mb-0 col-auto">
                                    {" "}
                                    <button className="comman_btn2">Save</button>{" "}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReportManagement;
