import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useUpdateCoupanMutation } from "../services/Post";
import { useDeleteCoupanListMutation } from "../services/Post";
function CoupanList() {
  const [update, res] = useUpdateCoupanMutation();
  const [deleteCoupan, response] = useDeleteCoupanListMutation();
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
  const [coupanTitleEn2, setCoupanTitleEn2] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coupanStatus2, setCoupanStatus2] = useState([]);
  const [coupanCode2, setCoupanCode2] = useState([]);
  const [coupanDiscount2, setCoupanDiscount2] = useState([]);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/list";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/coupan/coupan/search-coupan";

  const fetchCoupanList = async () => {
    try {
      const response = await axios.post(url);
      setCoupanList(response?.data?.results?.list?.reverse());
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchCoupanList();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(url, {
        from: startDate,
        to: endDate,
      })
      .then((response) => {
        const list = response?.data?.results?.list?.reverse();
        if (list && list.length > 0) {
          Swal.fire({
            title: "List Found!",
            text: "list is available for the selected date.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              setCoupanList(list);
            }
          });
          // setCoupanList(list);
        } else {
          setCoupanList([]);
          Swal.fire({
            icon: "warning",
            title: "No data found!",
            text: "There is no list between the selected dates.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              fetchCoupanList();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCoupan({ ...coupan, [name]: value });
  };

  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        coupanTitle_en: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setCoupanList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchCoupanList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setCoupanList(
          searchQuery !== "" ? results?.coupanData : results?.list?.reverse()
        );
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: error.response.data,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (error.request) {
        Swal.fire({
          title: "Error!",
          text: "Network error. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
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
        text: "The Coupan has been updated successfully.",
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
  
  const handleItem = (item) => {
    setCoupanStatus2(item?.status || "");
    setCoupanTitleEn2(item?.coupanTitle_en || "");
    setCoupanCode2(item?.coupanCode || "");
    setCoupanDiscount2(item?.DiscountType || "");
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
                        <i
                          className="far fa-search"
                          onClick={handleSearch1}
                        ></i>
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
                              <td>{item?.status}</td>
                              <td> {item?.enddate?.slice(0,10)} </td>
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
                                        deleteCoupan(item?._id);
                                        Swal.fire(
                                          "Deleted!",
                                          `${item?.coupanTitle_en}  item has been deleted.`,
                                          "success"
                                        ).then(() => {
                                          fetchCoupanList();
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
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
                onSubmit={handleSaveChanges1}
              >
                <div className="form-group col-6">
                  <label htmlFor="">TITLE</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    defaultValue={coupanTitleEn2}
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
                    defaultValue={coupanCode2}
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
                    defaultValue={coupanDiscount2}
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
                    defaultValue={coupanStatus2}
                    onChange={(e) => setCoupanStatus(e.target.value)}
                  />
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
  );
}

export default CoupanList;
