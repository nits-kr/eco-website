import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../Sidebar";
import {
  useGetCoupanListAllMutation,
  useUpdateCoupanMutation,
} from "../../services/Post";
import { useDeleteCoupanListMutation } from "../../services/Post";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";

function CoupanLists() {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  //   const { data: coupanListdata } = useGetCoupanListQuery({
  //     ecomAdmintoken,
  //   });

  const [coupanListdata] = useGetCoupanListAllMutation();
  const [update, res] = useUpdateCoupanMutation();
  const [deleteCoupan] = useDeleteCoupanListMutation();
  const [coupanList, setCoupanList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemId, setItemId] = useState("");
  const [coupanCode, setCoupanCode] = useState([]);
  const [title, setTitle] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [coupanStatus, setCoupanStatus] = useState([]);
  const [coupan, setCoupan] = useState({
    coupanTitle: "",
    coupanCode: "",
  });
  const [coupanTitleEn2, setCoupanTitleEn2] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coupanStatus2, setCoupanStatus2] = useState([]);
  const [coupanCode2, setCoupanCode2] = useState([]);
  const [coupanDiscount2, setCoupanDiscount2] = useState([]);
  const [discountType, setDiscountType] = useState("");
  const [show, setShow] = useState(false);

  const handleDiscountTypeChange = (event) => {
    setDiscountType(event.target.value);
    setShow(true);
  };

  useEffect(() => {
    if (ecomAdmintoken) {
      handleCategoryList();
    }
  }, [ecomAdmintoken, searchQuery]);

  const handleCategoryList = async () => {
    const data = {
      from: startDate,
      to: endDate,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await coupanListdata(data);
    console.log("res cate", res);
    setCoupanList(res?.data?.results?.list);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const deleteConfirm = (_id) => {
    const data = axios.delete(
      `${process.env.REACT_APP_APIENDPOINT}admin/coupan/coupan/delete/${_id}`
    );
    console.log("deleted coupan list item", data?.results?.deleteData);
    setCoupanList([]);
  };
  const onSubmit = async (data) => {
    try {
      const alldata = {
        coupanTitle_en: data.coupanTitle,
        coupanTitle_ar: data.coupanTitleAr,
        coupanCode: data.coupanCode,
        startdate: data.startDate,
        enddate: data.endDate,
        quantity: data.quantity,
        DiscountType: discountType,
        status: data.c1,
        ecomAdmintoken: ecomAdmintoken,
        discount: data.discount,
        id: itemId,
      };
      console.log(data);
      const res = await update(alldata);
      console.log("res", res);
      if (res?.data?.message === "Success") {
        Swal.fire({
          title: "Coupan Updated!",
          text: "Your coupan have been updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleCategoryList();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const handleItem = (data) => {
    reset({
      coupanTitle: data?.coupanTitle_en,
      coupanTitleAr: data?.coupanTitle_ar,
      coupanCode: data?.coupanCode,
      startDate: data?.startdate?.slice(0, 10),
      endDate: data?.enddate?.slice(0, 10),
      quantity: data?.redeemableTime,
      discountType: data?.DiscountType,
      c1: data?.status,
      discount: data?.discount,
    });
  };

  const handleSubmits = (e) => {
    e.preventDefault();
    handleCategoryList();
  };
  return (
    <>
      <Sidebar Dash={"coupanList"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row coupan_page justify-content-center">
              <div className="col-12 text-end mb-4">
                <Link to="/creatCoupan" className="comman_btn">
                  Create Coupon
                </Link>
              </div>
              <div className="col-12 design_outter_comman shadow mb-4">
                <div className="row comman_header justify-content-between">
                  <div className="col-auto">
                    <h2>Coupon List</h2>
                  </div>
                  <div className="col-3">
                    <form
                      className="form-design"
                      action=""
                      // onSubmit={handleSearch1}
                    >
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
                        <i
                          className="far fa-search"
                          // onClick={handleSearch1}
                        ></i>
                      </div>
                    </form>
                  </div>
                </div>
                <form
                  className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                  action=""
                  onSubmit={handleSubmits}
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
                            {/* <th>
                              <form
                                className="table_btns d-flex align-items-center justify-content-center"
                                style={{ marginTop: "-27px" }}
                              >
                                <div className="check_radio">
                                  <input
                                    type="checkbox"
                                    name="c1"
                                    id="c1"
                                    className="d-none"
                                  />
                                  <label htmlFor="c1"></label>
                                </div>
                              </form>
                            </th> */}
                            <th>Title</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Status</th>
                            <th>Valid UpTo</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(coupanList || [])?.map((item, index) => (
                            <tr key={index}>
                              {/* <td>
                                <form className="table_btns d-flex align-items-center justify-content-center my-2">
                                  <div className="check_radio mb-3">
                                    <input
                                      type="checkbox"
                                      name={`c${index + 2}`}
                                      id={`c${index + 2}`}
                                      className="d-none"
                                    />
                                    <label htmlFor={`c${index + 2}`}></label>
                                  </div>
                                </form>
                              </td> */}
                              <td>
                                {item?.coupanTitle
                                  ? item?.coupanTitle
                                  : item?.coupanTitle_en}
                              </td>
                              <td>{item?.coupanCode}</td>
                              <td>{item?.DiscountType}</td>
                              <td>
                                {item?.status === "true"
                                  ? "Active"
                                  : "In Active"}
                              </td>
                              <td> {item?.enddate?.slice(0, 10)} </td>
                              <td>
                                <Link
                                  className="comman_btn table_viewbtn mx-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editt"
                                  to="#"
                                  onClick={() => {
                                    handleItem(item);
                                    setItemId(item?._id);
                                  }}
                                >
                                  Edit
                                </Link>
                                <Link
                                  className="comman_btn2 table_viewbtn"
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#delete"
                                  to="#"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        deleteCoupan({
                                          id: item?._id,
                                          ecomAdmintoken,
                                        });
                                        Swal.fire(
                                          "Deleted!",
                                          `${item?.coupanTitle_en}  item has been deleted.`,
                                          "success"
                                        ).then(() => {
                                          handleCategoryList();
                                        });
                                      }
                                    });
                                  }}
                                >
                                  Delete
                                </Link>
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
      <div
        className="modal fade Update_modal"
        id="delete"
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
                  <h2>Delete</h2>
                  <p>Are you sure you want to Delete this Coupon?</p>
                  <Link
                    className="comman_btn mx-2"
                    data-bs-dismiss="modal"
                    to=""
                    onClick={deleteConfirm}
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

      <div
        className="modal fade Edit_modal coupan_edit"
        id="editt"
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
                Edit Coupon
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
                className="form-design help-support-form row align-items-end"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group col-4">
                  <label htmlFor="coupanTitle">
                    Coupon Title(EN)
                    <span className="required-field text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.coupanTitle ? "is-invalid" : ""
                    }`}
                    {...register("coupanTitle", { required: true })}
                    id="coupanTitle"
                  />
                  {errors.coupanTitle && (
                    <span className="invalid-feedback">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-group col-4">
                  <label htmlFor="coupanTitleAr">
                    Coupon Title(AR)
                    <span className="required-field text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.coupanTitleAr ? "is-invalid" : ""
                    }`}
                    {...register("coupanTitleAr", {
                      required: true,
                    })}
                    id="coupanTitleAr"
                  />
                  {errors.coupanTitleAr && (
                    <span className="invalid-feedback">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-group col-4">
                  <label htmlFor="coupanCode">
                    Coupon Code
                    <span className="required-field text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.coupanCode ? "is-invalid" : ""
                    }`}
                    {...register("coupanCode", { required: true })}
                    id="coupanCode"
                  />
                  {errors.coupanCode && (
                    <span className="invalid-feedback">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-group col-4">
                  <label htmlFor="startDate">
                    Start Date
                    <span className="required-field text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control pe-4 ${
                      errors.startDate ? "is-invalid" : ""
                    }`}
                    {...register("startDate", { required: true })}
                    id="startDate"
                  />
                  {errors.startDate && (
                    <span className="invalid-feedback">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-group col-4">
                  <label htmlFor="endDate">
                    End Date
                    <span className="required-field text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control pe-4 ${
                      errors.endDate ? "is-invalid" : ""
                    }`}
                    {...register("endDate", { required: true })}
                    id="endDate"
                  />
                  {errors.endDate && (
                    <span className="invalid-feedback">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-group col-4">
                  <label htmlFor="quantity">
                    Quantity
                    <span className="required-field text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.quantity ? "is-invalid" : ""
                    }`}
                    {...register("quantity", { required: true })}
                    id="quantity"
                  />
                  {errors.quantity && (
                    <span className="invalid-feedback">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="form-group col-6">
                  <label htmlFor="discountType">Discount Type</label>
                  <select
                    className={classNames("select form-control", {
                      "is-invalid": errors.discountType && !discountType,
                    })}
                    // className={`select form-control ${
                    //   errors.discountType && !discountType
                    //     ? "is-invalid"
                    //     : ""
                    // }`}
                    {...register("discountType", {
                      required: true,
                    })}
                    onChange={handleDiscountTypeChange}
                    id="discountType"
                  >
                    <option value="">Select Discount Type</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Percent">Percentage</option>
                  </select>
                  {errors.discountType && (
                    <span className="invalid-feedback">
                      This field is required
                    </span>
                  )}
                </div>

                <div
                  className="form-group col-6"
                  style={{ display: show ? "" : "none" }}
                >
                  <input
                    type="text"
                    className={`form-control ${
                      errors.discount ? "is-invalid" : ""
                    }`}
                    placeholder="Discount Value"
                    aria-label="Discount Value"
                    aria-describedby="button-addon2"
                    {...register("discount", {
                      required: true,
                    })}
                  />
                </div>
                {errors.discount && (
                  <span className="invalid-feedback">
                    This field is required
                  </span>
                )}

                <div className="form-group col-4 coupon_checkbox">
                  <div className="check_radio">
                    <input
                      type="checkbox"
                      defaultChecked=""
                      name="c1"
                      id="c1"
                      className="d-none"
                      {...register("c1")}
                    />

                    <label htmlFor="c1">Enable the Coupon </label>
                  </div>
                </div>

                <div className="form-group mb-0 mt-3 col-12 text-center">
                  <button type="submit" className="comman_btn2">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoupanLists;
