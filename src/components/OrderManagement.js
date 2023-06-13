import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function OrderManagement() {
    const [orderList, setOrderList] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
    useEffect(() => {
        userList();
    }, []);
    const userList = async () => {
        const { data } = await axios.post(
            "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/order/order/list",
            {
                startDate,
                endDate,
            }
        );
        const filteredUsers = data.results.list.filter(
            (user) =>
                new Date(user.createdAt) >= new Date(startDate) &&
                new Date(user.createdAt) <= new Date(endDate)
        );
        setOrderList(filteredUsers.reverse());
        console.log(data);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        userList();
    };
    const handleSearch1 = async (e) => {
        e.preventDefault();
        if (searchQuery) {
            try {
                const response = await axios.post(
                    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/order/order/search",
                    {
                        sellerName: searchQuery,
                    }
                );
                const { error, results } = response.data;
                if (error) {
                    throw new Error("Error searching for products.Data are Not Found");
                } else {
                    setOrderList(results.orderData);
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
            setOrderList([]);
        }
    };

    return (
        <>
            <div className="admin_main">
                <div className="admin_main_inner">
                    <div className="admin_panel_data height_adjust">
                        <div className="row transaction-management justify-content-center">
                            <div className="col-12">
                                <div className="row mx-0">
                                    <div className="col-12 design_outter_comman shadow">
                                        <div className="row comman_header justify-content-between">
                                            <div className="col">
                                                <h2>Order Management</h2>
                                            </div>
                                            <div className="col-3">
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
                                                <button className="comman_btn2">
                                                    <i className="fal fa-download me-2"></i>Excel
                                                </button>
                                            </div>
                                            <div className="col-auto">
                                                <input type="date" className="custom_date" />
                                            </div>
                                        </div>
                                        <form
                                            className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                            action=""
                                            onSubmit={handleSearch}
                                        >
                                            <div className="form-group mb-0 col-5">
                                                <label htmlFor="">From</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group mb-0 col-5">
                                                <label htmlFor="">To</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group mb-0 col-auto">
                                                <button
                                                    type="submit"
                                                    className="comman_btn2"
                                                    disabled={startDate > endDate}
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </form>

                                        <div className="row">
                                            <div className="col-12 comman_table_design px-0">
                                                <div className="table-responsive">
                                                    <table className="table mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>S.No.</th>
                                                                <th>Date</th>
                                                                <th>Order ID</th>
                                                                <th>Seller Name</th>
                                                                <th>Buyer Name</th>
                                                                <th>Offer Type</th>
                                                                <th>Price</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(orderList || []).map((data, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{data.createdAt}</td>
                                                                    <td>{data.product_Id}</td>
                                                                    <td>{data.sellerName}</td>
                                                                    <td>{data.buyerName}</td>
                                                                    <td>{data.offerType}</td>
                                                                    <td>{data.price}</td>
                                                                    <td>
                                                                        <Link
                                                                            className="comman_btn2 table_viewbtn"
                                                                            to={`/order-details`}
                                                                        >
                                                                            View
                                                                        </Link>
                                                                        {/* <Link className="comman_btn2 table_viewbtn" to={`/order-details/${data.orderId}`}>View</Link> */}
                                                                    </td>
                                                                </tr>
                                                            ))}
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
        </>
    );
}

export default OrderManagement;
