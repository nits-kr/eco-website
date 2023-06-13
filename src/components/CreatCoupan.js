import React, { useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";

export default function CreatCoupan() {
    //const [coupanList, setCoupanList] = useState([])
    const [coupan, setCoupan] = useState({
        coupanTitle: '',
        coupanCode: ''
    });
    const [restriction, setRestriction] = useState({
        coupanTitle: '',
        coupanCode: ''
    });
    const [usage, setUsage] = useState({
        coupanTitle: '',
        coupanCode: ''
    });

    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCoupan({ ...coupan, [name]: value });
    };
    const handleInputChange1 = (event) => {
        const { name, value } = event.target;
        setRestriction({ ...restriction, [name]: value });
    };
    const handleInputChange2 = (event) => {
        const { name, value } = event.target;
        setUsage({ ...restriction, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/create",
                {
                    coupanTitle: coupan.coupanTitle,
                    coupanCode: coupan.coupanCode,
                    startDate: coupan.startDate,
                    endDate: coupan.endDate,
                    Quantity: coupan.quantity,
                    DiscountType: coupan.discountType,
                }
            );
            console.log(response.data.results.coupanData);
            if (!response.data.error) {
                Swal.fire({
                    title: "Coupan Created!",
                    text: "Your have been created coupan successfully.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/coupanList";
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit1 = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/restriction",
                {
                    product_Id: restriction.products,
                    category_Id: restriction.category,
                    MinimumSpend: restriction.minummSpeed,
                    MaximumSpend: restriction.maximumSpeed
                }
            );
            console.log(response.data.results.coupanData);
            if (!response.data.error) {
                Swal.fire({
                    title: "Restriction Created!",
                    text: "Your have been created restriction successfully.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/coupanList";
                    }
                });
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/coupanUsage",
                {
                    customer: usage.perCustomer,
                    limited: usage.perLimited
                }
            );
            console.log(response.data.results.coupanData);
            if (!response.data.error) {
                Swal.fire({
                    title: "Usage Created!",
                    text: "Your have been created Usage successfully.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/coupanList";
                    }
                });
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <>
            <div className="admin_main">
                <div className="admin_main_inner">
                    <div className="admin_panel_data height_adjust">
                        <div className="row coupan_page justify-content-center">
                            <div className="col-12 design_outter_comman shadow mb-4">
                                <div className="row comman_header justify-content-between">
                                    <div className="col-auto">
                                        <h2>Create Coupon</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 px-0">
                                        <nav>
                                            <div className="nav nav-tabs comman_tabs" id="nav-tab" role="tablist">
                                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">General</button>
                                                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Restriction</button>
                                                <button className="nav-link" id="nav-profile1-tab" data-bs-toggle="tab" data-bs-target="#nav-profile1" type="button" role="tab" aria-controls="nav-profile1" aria-selected="false">Usage</button>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                <div className="row p-4 mx-0">
                                                    <form className="form-design help-support-form row align-items-end" action="" onSubmit={handleSubmit}>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="">Coupon Title</label>
                                                            <input type="text" className="form-control" name="coupanTitle" id="coupanTitle" value={coupan.coupanTitle}
                                                                onChange={handleInputChange} />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="">Coupon Code</label>
                                                            <input type="text" className="form-control" name="coupanCode" id="coupanCode" value={coupan.coupanCode}
                                                                onChange={handleInputChange} />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="">Start Date</label>
                                                            <input type="date" className="form-control" name="startDate" id="startDate" value={coupan.startDate}
                                                                onChange={handleInputChange} />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="">End Date</label>
                                                            <input type="date" className="form-control" name="endDate" id="endDate" value={coupan.endDate}
                                                                onChange={handleInputChange} />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="">Quantity</label>
                                                            <input type="text" className="form-control" name="quantity" id="quantity" value={coupan.quantity}
                                                                onChange={handleInputChange} />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="">Discount Type</label>
                                                            <input type="text" className="form-control" name="discountType" id="discountType" value={coupan.discountType}
                                                                onChange={handleInputChange} />
                                                        </div>
                                                        <div className="form-group col-4 coupon_checkbox">
                                                            <div className="check_radio">
                                                                <input type="checkbox" name="c1" id="c1" className="d-none" />
                                                                <label htmlFor="c1">Allow Free Shipping </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-4 coupon_checkbox">
                                                            <div className="check_radio">
                                                                <input type="checkbox" checked name="c1" id="c1" className="d-none" value={coupan.c1}
                                                                    onChange={handleInputChange} />
                                                                <label htmlFor="c1">Enable the Coupon </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group mb-0 mt-3 col-12 text-center">
                                                            <button className="comman_btn2">Create</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <div className="row p-4 mx-0">
                                                    <form className="form-design help-support-form row align-items-end" action="" onSubmit={handleSubmit1}>
                                                        <div className="form-group col-6">
                                                            <label htmlFor="">Products</label>
                                                            <input type="text" className="form-control" name="products" id="products" value={restriction.products}
                                                                onChange={handleInputChange} />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <label htmlFor="">Category</label>
                                                            <input type="text" className="form-control" name="category" id="category" value={restriction.category}
                                                                onChange={handleInputChange1} />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <label htmlFor="">Minimum Spend</label>
                                                            <input type="text" className="form-control" name="minummSpeed" id="minummSpeed" value={restriction.minummSpeed}
                                                                onChange={handleInputChange1} />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <label htmlFor="">Maximum Spend</label>
                                                            <input type="text" className="form-control" name="maximumSpeed" id="maximumSpeed" value={restriction.maximumSpeed}
                                                                onChange={handleInputChange1} />
                                                        </div>
                                                        <div className="form-group mb-0 mt-3 col-12 text-center">
                                                            <button className="comman_btn2">Create</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-profile1" role="tabpanel" aria-labelledby="nav-profile1-tab">
                                                <div className="row p-4 mx-0">
                                                    <form className="form-design help-support-form row align-items-end" action="" onSubmit={handleSubmit2}>
                                                        <div className="form-group col-6">
                                                            <label htmlFor="">Per Limited</label>
                                                            <input type="text" className="form-control" name="perLimited" id="perLimited" value={usage.perLimited}
                                                                onChange={handleInputChange2} />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <label htmlFor="">Per Customer
                                                            </label>
                                                            <input type="text" className="form-control" name="perCustomer" id="perCustomer" value={usage.perCustomer}
                                                                onChange={handleInputChange2} />
                                                        </div>
                                                        <div className="form-group mb-0 mt-3 col-12 text-center">
                                                            <button className="comman_btn2">Create</button>
                                                        </div>
                                                    </form>
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
    )
}
