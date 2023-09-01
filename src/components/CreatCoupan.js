import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";

export default function CreatCoupan() {
  //const [coupanList, setCoupanList] = useState([])
  const [coupan, setCoupan] = useState({
    coupanTitle: "",
    coupanCode: "",
    startDate: "", // Provide an initial value
    endDate: "", // Provide an initial value
    quantity: "",
    discountType: "",
    coupanStatus: "",
  });

  const [restriction, setRestriction] = useState({
    coupanTitle: "",
    coupanCode: "",
    startDate: "", // Provide an initial value
    endDate: "", // Provide an initial value
    quantity: "",
    discountType: "",
  });
  const [usage, setUsage] = useState({
    coupanTitle: "",
    coupanCode: "",
  });
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [subCategory, setSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    subCategoryId: "",
    subCategoryPic: null,
  });
  const [subSubCategory, setSubSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    brandId1: "",
  });
  const handleInputChange4 = (event) => {
    const { name, value } = event.target;
    setSubSubCategory({ ...subSubCategory, [name]: value });
  };

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
  const handleInputChange3 = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/create",
        {
          coupanTitle_en: coupan.coupanTitle,
          coupanCode: coupan.coupanCode,
          startdate: coupan.startDate,
          enddate: coupan.endDate,
          Quantity: coupan.quantity,
          DiscountType: coupan.discountType,
          status: coupan.coupanStatus,
        }
      );
      console.log("create coupan", response.data.results.coupanData);
      if (!response.data.error) {
        Swal.fire({
          title: "Coupan Created!",
          text: "Your have been created coupan successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/coupanList";
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productList"
      )
      .then((response) => {
        setCategories(response?.data?.results?.list.reverse());
        console.log(response.data);
      });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/selectCategory"
        );
        setCategories2(response.data.results.categoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/restriction",
        {
          product_Id: subCategory.categoryId,
          category_Id: subSubCategory.categoryId1,
          MinimumSpend: restriction.minummSpeed,
          MaximumSpend: restriction.maximumSpeed,
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
        }).then((result) => {
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
          limited: usage.perLimited,
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
        }).then((result) => {
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
      <Sidebar />
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
                          General
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
                          Restriction
                        </button>
                        <button
                          className="nav-link"
                          id="nav-profile1-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-profile1"
                          type="button"
                          role="tab"
                          aria-controls="nav-profile1"
                          aria-selected="false"
                        >
                          Usage
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <div className="row p-4 mx-0">
                          <form
                            className="form-design help-support-form row align-items-end"
                            action=""
                            onSubmit={handleSubmit}
                          >
                            <div className="form-group col-4">
                              <label htmlFor="">
                                Coupon Title
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="coupanTitle"
                                id="coupanTitle"
                                value={coupan.coupanTitle}
                                onChange={handleInputChange}
                                required
                                minLength="3"
                              />
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="">
                                Coupon Code
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="coupanCode"
                                id="coupanCode"
                                value={coupan.coupanCode}
                                onChange={handleInputChange}
                                required
                                minLength="3"
                              />
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="">
                                Start Date
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                id="startDate"
                                value={coupan.startDate}
                                onChange={handleInputChange}
                                required
                                minLength="3"
                              />
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="">
                                End Date
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                id="endDate"
                                value={coupan.endDate}
                                onChange={handleInputChange}
                                required
                                minLength="3"
                              />
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="">
                                Quantity
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="quantity"
                                id="quantity"
                                value={coupan.quantity}
                                onChange={handleInputChange}
                                required
                                minLength="3"
                              />
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="">
                                Discount Type
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="discountType"
                                id="discountType"
                                value={coupan.discountType}
                                onChange={handleInputChange}
                                required
                                minLength="3"
                              />
                            </div>
                            <div className="form-group col-4">
                              <label htmlFor="">
                                Coupan status
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="coupanStatus"
                                id="coupanStatus"
                                value={coupan.coupanStatus}
                                onChange={handleInputChange}
                                required
                                minLength="3"
                              />
                            </div>
                            <div className="form-group col-4 coupon_checkbox">
                              <div className="check_radio">
                                <input
                                  type="checkbox"
                                  name="c1"
                                  id="c1"
                                  className="d-none"
                                />
                                <label htmlFor="c1">Allow Free Shipping </label>
                              </div>
                            </div>
                            <div className="form-group col-4 coupon_checkbox">
                              <div className="check_radio">
                                <input
                                  type="checkbox"
                                  checked
                                  name="c1"
                                  id="c1"
                                  className="d-none"
                                  value={coupan.c1}
                                  onChange={handleInputChange}
                                />
                                <label htmlFor="c1">Enable the Coupon </label>
                              </div>
                            </div>
                            <div className="form-group mb-0 mt-3 col-12 text-center">
                              <button className="comman_btn2">Create</button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        <div className="row p-4 mx-0">
                          <form
                            className="form-design help-support-form row align-items-end"
                            action=""
                            onSubmit={handleSubmit1}
                          >
                            <div className="form-group col-6">
                              <label htmlFor="">
                                Products Name
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <select
                                className="select form-control"
                                multiple=""
                                name="categoryId"
                                id="selectCategory"
                                value={subCategory.categoryId}
                                onChange={handleInputChange3}
                              >
                                <option value="">Select Product</option>
                                {Array.isArray(categories) &&
                                  categories.map((category) => (
                                    <option
                                      key={category._id}
                                      value={category._id}
                                    >
                                      {category.productName_en}
                                    </option>
                                  ))}
                              </select>
                              {/* <input
                                type="text"
                                className="form-control"
                                name="products"
                                id="products"
                                value={restriction.products}
                                onChange={handleInputChange}
                              /> */}
                            </div>
                            <div className="form-group col-6">
                              <label htmlFor="">
                                Category
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <select
                                className="select form-control"
                                multiple=""
                                name="categoryId1"
                                id="categoryId1"
                                value={subSubCategory.categoryId1}
                                onChange={handleInputChange4}
                              >
                                <option value="">Select Category</option>
                                {Array.isArray(categories2) &&
                                  categories2.map((category) => (
                                    <option
                                      key={category._id}
                                      value={category._id}
                                    >
                                      {category.categoryName_en}
                                    </option>
                                  ))}
                              </select>
                              {/* <input
                                type="text"
                                className="form-control"
                                name="category"
                                id="category"
                                value={restriction.category}
                                onChange={handleInputChange1}
                              /> */}
                            </div>
                            <div className="form-group col-6">
                              <label htmlFor="">
                                Minimum Spend
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="minummSpeed"
                                id="minummSpeed"
                                value={restriction.minummSpeed}
                                onChange={handleInputChange1}
                                required
                              />
                            </div>
                            <div className="form-group col-6">
                              <label htmlFor="">
                                Maximum Spend
                                <span className="required-field text-danger">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="maximumSpeed"
                                id="maximumSpeed"
                                value={restriction.maximumSpeed}
                                onChange={handleInputChange1}
                                required
                              />
                            </div>
                            <div className="form-group mb-0 mt-3 col-12 text-center">
                              <button className="comman_btn2">Create</button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-profile1"
                        role="tabpanel"
                        aria-labelledby="nav-profile1-tab"
                      >
                        <div className="row p-4 mx-0">
                          <form
                            className="form-design help-support-form row align-items-end"
                            action=""
                            onSubmit={handleSubmit2}
                          >
                            <div className="form-group col-6">
                              <label htmlFor="">Per Limited</label>
                              <input
                                type="text"
                                className="form-control"
                                name="perLimited"
                                id="perLimited"
                                value={usage.perLimited}
                                onChange={handleInputChange2}
                              />
                            </div>
                            <div className="form-group col-6">
                              <label htmlFor="">Per Customer</label>
                              <input
                                type="text"
                                className="form-control"
                                name="perCustomer"
                                id="perCustomer"
                                value={usage.perCustomer}
                                onChange={handleInputChange2}
                              />
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
  );
}
