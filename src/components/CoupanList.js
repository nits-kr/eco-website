import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useUpdateCoupanMutation } from "../services/Post";
function CoupanList() {
  const [update, res] = useUpdateCoupanMutation();
  const [coupanList, setCoupanList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemId, setItemId] = useState([]);
  const [coupanCode, setCoupanCode] = useState([]);
  const [title, setTitle] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [coupanStatus, setCoupanStatus] = useState([]);
  const [coupan, setCoupan] = useState({
    coupanTitle: "",
    coupanCode: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const fetchStaffList = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/list"
      );
      setCoupanList(response?.data?.results?.list?.reverse());
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, []);
  const userList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/list",
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
    setCoupanList(filteredUsers.reverse());
    console.log(data);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    userList();
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCoupan({ ...coupan, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/coupanUsage",
        {
          coupanCode: coupan.code,
        }
      );
      console.log(response.data.results.coupanData);
      if (!response.data.error) {
        Swal.fire({
          title: "Updated!",
          text: "Your have been updated the list successfully.",
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

  const handleSearch1 = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/search-coupan",
          {
            coupanTitle: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products.Data are Not Found");
        } else {
          setCoupanList(results.coupanData);
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
      setCoupanList([]);
    }
  };
  const handleDelete = (_id) => {
    alert(_id);
    deleteConfirm(_id);
  };
  const deleteConfirm = (_id) => {
    const data = axios.delete(
      `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/delete/${_id}`
    );
    console.log("deleted coupan list item", data?.results?.deleteData);
    setCoupanList([]);
  };
  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editAddress = {
      id: itemId,
      coupanCode: coupanCode,
      coupanTitle_en: title,
      DiscountType: discount,
      status: coupanStatus,
    };
    try {
      await update(editAddress);
      Swal.fire({
        icon: "success",
        title: "Changes Saved",
        text: "The subcategory has been updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the subcategory.",
      });
    }
  };
  return (
    <>
      <Sidebar />
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
                      onSubmit={handleSearch1}
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
                        <i className="far fa-search"></i>
                      </div>
                    </form>
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
                            <th>
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
                            </th>
                            <th>Title</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(coupanList || [])?.map((item, index) => (
                            <tr key={index}>
                              <td>
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
                              </td>
                              <td>{item?.coupanTitle ? item?.coupanTitle : item?.coupanTitle_en}</td>
                              <td>{item?.coupanCode}</td>
                              <td>{item?.DiscountType}</td>
                              <td>{item?.status}</td>
                              <td>
                                <Link
                                  className="comman_btn table_viewbtn mx-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editt"
                                  to="#"
                                  onClick={() => setItemId(item?._id)}
                                >
                                  Edit
                                </Link>
                                <Link
                                  className="comman_btn2 table_viewbtn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete"
                                  to="#"
                                  onClick={() => handleDelete(item._id)}
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
                    to="javscript:;"
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
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
                onSubmit={handleSubmit}
              >
                <div className="form-group col-6">
                  <label htmlFor="">TITLE</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">CODE</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    id="code"
                    value={coupanCode}
                    onChange={(e) => setCoupanCode(e.target.value)}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">DISCOUNT</label>
                  <input
                    type="text"
                    className="form-control"
                    name="discount"
                    id="discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="status"
                    id="status"
                    value={coupanStatus}
                    onChange={(e) => setCoupanStatus(e.target.value)}
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn2" onClick={handleSaveChanges1}>
                    Save
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

export default CoupanList;
