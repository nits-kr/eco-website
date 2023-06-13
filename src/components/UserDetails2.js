import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    faCheck,
    faDollarSign,
    faChartLine,
    faArrowRight,
    faCreditCard,
    faStar
} from "@fortawesome/free-solid-svg-icons";

function UserDetails2() {
    return (
        <>
            <div className="admin_main">
                <div className="admin_main_inner">
                    <div className="admin_panel_data height_adjust">
                        <h5 style={{ marginTop: "-30px", marginBottom: "20px" }}>
                            <Link>Customers</Link>/Profile
                        </h5>
                        <div className="row dashboard_part justify-content-center">
                            <div className="col-12 d-flex">
                                <div className="col-4 row mx-0" >
                                    <div className="col-12 design_outter_comman shadow mb-4">
                                        <div className="row users-information position-relative align-items-center justify-content-center">
                                            <div className="col-12">
                                                <div className="users_left">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div
                                                                className="profile-bg"
                                                                style={{
                                                                    backgroundImage:
                                                                        "url('assets/img/profile_img2.jpeg')",
                                                                    height: "100px",
                                                                    width: '124%',
                                                                    backgroundSize: "cover",
                                                                    backgroundPosition: "center",
                                                                    backgroundRepeat: "no-repeat",
                                                                    marginLeft: '-42px',
                                                                    marginTop: '-40px'
                                                                }}
                                                            ></div>
                                                            <div
                                                                className="user_imgg"
                                                                style={{
                                                                    marginTop: "-30px",
                                                                    marginLeft: '0px'

                                                                }}
                                                            >
                                                                <img src="assets/img/profile_img1.jpg" alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 users_left_content" style={{ marginTop: '-80px' }}>
                                                            <h5>Karan</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 d-flex">
                                                <div className="col-4">
                                                    <strong>06/May/2023</strong>
                                                    <div> <strong style={{ color: 'grey' }}>Member Since</strong> </div>
                                                </div>
                                                <div className="col-4">
                                                    <strong>Active</strong>
                                                    <div> <strong style={{ color: 'grey' }}>Status</strong> </div>
                                                </div>
                                                <div className="col-4">
                                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f5c724", }} />
                                                    <strong>0/5</strong>
                                                    <div> <strong style={{ color: 'grey' }}>Rating</strong> </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group my-2 ">
                                            <Link
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                className="comman_btn2 table_viewbtn danger"
                                                to=""
                                            >
                                                Block
                                            </Link>
                                            <div className="d-flex align-items-start ">
                                                <label htmlFor="">
                                                    {" "}
                                                    <Link>
                                                        <strong>Transactions</strong>
                                                    </Link>{" "}
                                                </label>
                                                <FontAwesomeIcon
                                                    icon={faArrowRight}
                                                    className="me-1 mt-1 ms-2"
                                                />
                                                <Link
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                    className="comman_btn2 table_viewbtn  ms-2"
                                                    to=""
                                                >
                                                    <FontAwesomeIcon icon={faCreditCard} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 pe-5 mt-2 shadow">
                                        <div
                                            className="users_right pe-2 mt-3"
                                            style={{ width: "115%" }}
                                        >
                                            <div className="row justify-content-between">
                                                <div className="col-auto">
                                                    <h5>Personal Information</h5>
                                                </div>
                                                <div className="col-auto mx-3">
                                                    <Link
                                                        style={{
                                                            color: "red",
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>
                                                </div>
                                            </div>
                                            <form
                                                action="#"
                                                className="form-design row position-relative"
                                            >
                                                <div className="form-group col-12" style={{
                                                    width
                                                        : '97%'
                                                }}>
                                                    <div
                                                        className="row"
                                                        style={{
                                                            border: "1px solid #e3e3e1",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                        }}
                                                    >
                                                        <div className="col-4">
                                                            <label htmlFor="" style={{ marginTop: "15px" }}>
                                                                Full Name:
                                                            </label>
                                                        </div>
                                                        <div className="col-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="karan"
                                                                name="name"
                                                                id="name"
                                                                style={{ border: "none" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-12" style={{
                                                    width
                                                        : '97%'
                                                }}>
                                                    <div
                                                        className="row"
                                                        style={{
                                                            border: "1px solid #e3e3e1",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                        }}
                                                    >
                                                        <div className="col-4">
                                                            <label htmlFor="" style={{ marginTop: "15px" }}>
                                                                Mobile Number:
                                                            </label>
                                                        </div>
                                                        <div className="col-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="+91********14"
                                                                name="name"
                                                                id="name"
                                                                style={{ border: "none" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-12" style={{
                                                    width
                                                        : '97%'
                                                }}>
                                                    <div
                                                        className="row"
                                                        style={{
                                                            border: "1px solid #e3e3e1",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                        }}
                                                    >
                                                        <div className="col-4">
                                                            <label htmlFor="" style={{ marginTop: "15px" }}>
                                                                Email Id:
                                                            </label>
                                                        </div>
                                                        <div className="col-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="********ffescom.co"
                                                                name="name"
                                                                id="name"
                                                                style={{ border: "none" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-12" style={{
                                                    width
                                                        : '97%'
                                                }}>
                                                    <div
                                                        className="row"
                                                        style={{
                                                            border: "1px solid #e3e3e1",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                        }}
                                                    >
                                                        <div className="col-4">
                                                            <label htmlFor="" style={{ marginTop: "15px" }}>
                                                                Wallet Amounts:
                                                            </label>
                                                        </div>
                                                        <div className="col-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="$0"
                                                                name="name"
                                                                id="name"
                                                                style={{ border: "none" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-12" style={{
                                                    width
                                                        : '97%'
                                                }}>
                                                    <div
                                                        className="row"
                                                        style={{
                                                            border: "1px solid #e3e3e1",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                        }}
                                                    >
                                                        <div className="col-4">
                                                            <label htmlFor="" style={{ marginTop: "15px" }}>
                                                                Loyalty Points:
                                                            </label>
                                                        </div>
                                                        <div className="col-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue="0 = $0"
                                                                name="name"
                                                                id="name"
                                                                style={{ border: "none" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-12 design_outter_comman shadow mb-4 mt-5 w-100">
                                        <div className="users_right pe-2">
                                            <form
                                                action="#"
                                                className="form-design row position-relative"
                                            >
                                                <div className="form-group  ">
                                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                                        <label htmlFor="">Addresses</label>
                                                        <Link
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdrop"
                                                            className="comman_btn2 table_viewbtn danger ms-2"
                                                            to=""
                                                        >
                                                            Add
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="form-group ">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <label htmlFor="">Home</label>
                                                        <div className="d-flex">
                                                            <Link
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#staticBackdrop"
                                                                className="comman_btn2 table_viewbtn mx-2"
                                                                to=""
                                                            >
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </Link>
                                                            <Link
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#staticBackdrop"
                                                                className="comman_btn2 table_viewbtn"
                                                                to=""
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-4 d-flex align-items-start justify-content-between w-100">
                                                    <label htmlFor=""></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue="20, sastri colony bhatianagar,yamuna nagar"
                                                        name="name"
                                                        id="name"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8 mx-5" >
                                    <div className="row">
                                        <div className="col-3 design_outter_comman shadow mb-4" style={{ width: "32%" }}>
                                            <div className=" w-100 my-5">
                                                <h5 >
                                                    {" "}
                                                    <Link>Completed Orders</Link>{" "}
                                                </h5>
                                                <div className="row mt-2">
                                                    <div className="col-12">
                                                        <div className="row content_offer_inner">
                                                            <div className="col-6 text-start">
                                                                <strong
                                                                    className="box_tag_left ms-5"
                                                                    style={{ fontSize: "30px" }}
                                                                >
                                                                    0
                                                                </strong>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="box_tag_left">
                                                                    <Link
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#staticBackdrop"
                                                                        className="comman_btn2 table_viewbtn"
                                                                        to=""
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faCheck}
                                                                            className="complete-order-icon"
                                                                            style={{ fontSize: "30px" }}
                                                                        />
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="col-4 design_outter_comman shadow mb-4 "
                                            style={{ marginLeft: "10px", width: "32%" }}
                                        >
                                            <div className="w-100 my-5">
                                                <Link>
                                                    <h5>Total Spent</h5>
                                                </Link>
                                                <div className="row mt-2">
                                                    <div className="col-12">
                                                        <div className="row content_offer_inner">
                                                            <div className="col-6 text-end">
                                                                <strong
                                                                    className="box_tag_left"
                                                                    style={{ fontSize: "30px" }}
                                                                >
                                                                    $0.00
                                                                </strong>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="box_tag_left">
                                                                    <Link
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#staticBackdrop"
                                                                        className="comman_btn2 table_viewbtn"
                                                                        to=""
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faDollarSign}
                                                                            className="total-spent-icon"
                                                                            style={{ fontSize: "30px" }}
                                                                        />
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="col-4 design_outter_comman shadow mb-4"
                                            style={{ marginLeft: "10px", width: "32%" }}
                                        >
                                            <div className="w-100 my-5">
                                                <Link>
                                                    <h5>Average Order Value</h5>
                                                </Link>
                                                <div className="row mt-2">
                                                    <div className="col-12">
                                                        <div className="row content_offer_inner">
                                                            <div className="col-6 text-end">
                                                                <strong
                                                                    className="box_tag_left"
                                                                    style={{ fontSize: "30px" }}
                                                                >
                                                                    0.00
                                                                </strong>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="box_tag_left">
                                                                    <Link
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#staticBackdrop"
                                                                        className="comman_btn2 table_viewbtn"
                                                                        to=""
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faChartLine}
                                                                            className="average-order-icon"
                                                                            style={{ fontSize: "30px" }}
                                                                        />
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 design_outter_comman shadow mb-4">
                                            <div className="row  justify-content-between mt-3">
                                                <div className="col-auto">
                                                    <h4> <strong>My Orders</strong> </h4>
                                                </div>
                                                <div className="col-auto mx-3">
                                                    <Link
                                                        style={{
                                                            color: "red",
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <strong> View All</strong>
                                                        <FontAwesomeIcon icon={faArrowRight} />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 comman_table_design px-0">
                                                    <div className="table-responsive">
                                                        <table className="table  ms-4 my-5" style={{ backgroundColor: '#f2efe4', width: '95%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Order Id</th>
                                                                    <th>Vendor</th>
                                                                    <th>Cost</th>
                                                                    <th>Status</th>
                                                                    <th>Created At</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>
                                                                        {/* <form className="table_btns d-flex align-items-center">
                                                                        <div className="check_toggle">
                                                                            <input
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#staticBackdrop"
                                                                                type="checkbox"
                                                                                defaultChecked=""
                                                                                name="check1"
                                                                                id="check1"
                                                                                className="d-none"
                                                                            />
                                                                            <label htmlFor="check1"></label>
                                                                        </div>
                                                                    </form> */}
                                                                    </td>
                                                                    <td>
                                                                        {/* <Link
                                                                        className="comman_btn2 table_viewbtn"
                                                                        to="/userDetails"
                                                                    >
                                                                        View
                                                                    </Link> */}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 design_outter_comman shadow mb-4">
                                            <div className="row  justify-content-between mt-3">
                                                <div className="col-auto">
                                                    <h4> <strong>Reviews</strong> </h4>
                                                </div>
                                                <div className="col-auto mx-3">
                                                    <Link
                                                        style={{
                                                            color: "red",
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {" "}
                                                        <strong> View All</strong>
                                                        <FontAwesomeIcon icon={faArrowRight} />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 comman_table_design px-0">
                                                    <div className="table-responsive">
                                                        <table className="table my-5 ms-4" style={{ backgroundColor: '#f2efe4', width: '95%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Order Id</th>
                                                                    <th>Review By</th>
                                                                    <th>Rating</th>
                                                                    <th>Review</th>
                                                                    <th>Created At</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
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
            </div>
        </>
    );
}

export default UserDetails2;
