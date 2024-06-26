import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import {
  useGetFileUserMutation,
  useGetOrderListAllMutation,
  useGetUserListQuery,
} from "../services/Post";
import { useEditOrderListMutation } from "../services/Post";
import { useDeleteOrderListMutation } from "../services/Post";
import { useOrderAssignMutation } from "../services/Post";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FidgetSpinner } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";

function OrderManagement() {
  const [loader, setLoader] = useState(false);
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);

  const [deleteOrder] = useDeleteOrderListMutation();

  const [getFiles] = useGetFileUserMutation();

  const [orderListdata] = useGetOrderListAllMutation();

  const { data: userListdata } = useGetUserListQuery({ ecomAdmintoken });

  const [updateOrder] = useEditOrderListMutation();
  const [assignOrder] = useOrderAssignMutation();
  const [orderList, setOrderList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [itemId, setItemId] = useState("");
  const [itemId2, setItemId2] = useState("");
  const [agents, setAgents] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);

  const [status, setOrderStatus] = useState("");
  const [statusAr, setOrderStatusAr] = useState("");

  const handleOrderStatusChange = (event) => {
    const selectedValue = event.target.value;
    setOrderStatus(selectedValue);

    // Select corresponding option in statusAr dropdown
    switch (selectedValue) {
      case "Shipped":
        setOrderStatusAr("معباه");
        break;
      case "Delivered":
        setOrderStatusAr("تم التوصيل");
        break;
      case "Cancelled":
        setOrderStatusAr("ملغاة");
        break;
      case "Processing":
        setOrderStatusAr("تجهيز");
        break;
      default:
        setOrderStatusAr("");
        break;
    }
  };

  const handleOrderStatusArChange = (event) => {
    const selectedValue = event.target.value;
    setOrderStatusAr(selectedValue);

    // Select corresponding option in status dropdown
    switch (selectedValue) {
      case "معباه":
        setOrderStatus("Shipped");
        break;
      case "تم التوصيل":
        setOrderStatus("Delivered");
        break;
      case "ملغاة":
        setOrderStatus("Cancelled");
        break;
      case "تجهيز":
        setOrderStatus("Processing");
        break;
      default:
        setOrderStatus("");
        break;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange1 = (event, index) => {
    const { value } = event.target;
    setSelectedBrandIds((prevSelectedBrandIds) => {
      const updatedSelectedBrandIds = [...prevSelectedBrandIds];
      updatedSelectedBrandIds[index] = value;
      return updatedSelectedBrandIds;
    });
  };

  const handleSelectChange = async (e, itemId, index) => {
    e.preventDefault();
    handleInputChange1(e, index);
    // setItemId3(data?._id);
    const updatedSelectedBrandIds = [...selectedBrandIds];
    updatedSelectedBrandIds[index] = e.target.value;

    const editOffer = {
      id: itemId,
      deliverdBy: updatedSelectedBrandIds.filter(Boolean),
      ecomAdmintoken: ecomAdmintoken,
    };
    try {
      const res = await assignOrder(editOffer);
      if (res?.data?.message === "Assign Order") {
        Swal.fire({
          title: "Changes Saved",
          text: "The Order has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleOrderList();
          }
        });
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      // Handle error here
    }
  };

  console.log("userListdata", userListdata);

  useEffect(() => {
    if (userListdata) {
      setAgents(userListdata?.results?.list);
    }
  }, [userListdata]);

  const handledeleteOrder = async (e, id) => {
    const result = await Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this order? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        deleteOrder({ id, ecomAdmintoken });

        await Swal.fire({
          title: "Deleted",
          text: "The order has been successfully deleted.",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        handleOrderList();
      } catch (error) {
        console.error("Error deleting order:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the order. Please try again later.",
          icon: "error",
        });
      }
    }
  };

  const [order, setOrder] = useState({
    columns: [
      {
        label: "S.No.",
        field: "sn",
        sort: "asc",
        width: 100,
      },
      {
        label: "ORDER ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "NAME",
        field: "customer",
        sort: "asc",
        width: 150,
      },

      {
        label: "DATE",
        field: "date",
        sort: "asc",
        width: 100,
      },
      {
        label: "Payment Method",
        field: "paymentIntent",
        sort: "asc",
        width: 150,
      },
      {
        label: "AMOUNT",
        field: "total",
        sort: "asc",
        width: 100,
      },
      {
        label: "DELIVERY STATUS",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "ACTION",
        field: "action",
        sort: "asc",
        width: 100,
      },
      {
        label: "ASSIGN DELIVERY BOY",
        field: "assign",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    if (ecomAdmintoken) {
      handleOrderList();
    }
  }, [ecomAdmintoken, searchQuery]);

  const handleOrderList = async () => {
    const data = {
      from: startDate,
      to: endDate,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await orderListdata(data);
    console.log("res cate", res);
    setOrderList(res?.data?.results?.list);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleOrderList();
  };

  useEffect(() => {
    if (orderList) {
      const newRows = [];
      orderList?.map((list, index) => {
        const returnData = {};

        returnData.sn = index + 1;
        returnData.title = list?.products[0]?.product_Id?.productName_en
          ?.split(/\s+/)
          .slice(0, 2)
          .join(" ");
        returnData.id = list?._id;
        returnData.date = moment(list?.createdAt).format("L");
        returnData.customer = list?.user_Id?.userName;
        returnData.paymentIntent = list?.paymentIntent;
        returnData.total = list?.grandTotal
          ? list?.grandTotal?.toFixed(2)
          : "N/A";
        returnData.status = (
          <div
            className={
              list?.status === "Cancelled"
                ? "text-danger"
                : list?.status === "Pending"
                ? "text-warning"
                : list?.status === "Shipped"
                ? "text-info"
                : list?.status === "Approved"
                ? "text-success"
                : list?.status === "Processing"
                ? "text-primary"
                : list?.status === "Delivered"
                ? "text-success"
                : "text-default"
            }
            style={{
              background:
                list?.status === "Cancelled"
                  ? "#ffe5e5"
                  : list?.status === "Pending"
                  ? "#fff6e5"
                  : list?.status === "Shipped"
                  ? "#e5f0ff"
                  : list?.status === "Approved"
                  ? "#e5ffe5"
                  : list?.status === "Processing"
                  ? "#e5e5ff"
                  : list?.status === "Delivered"
                  ? "#e5ffe5"
                  : "#f9f9f9",
              borderRadius: "5px",
              padding: "2px 5px",
            }}
          >
            {list?.status}
          </div>
        );
        returnData.action = (
          <div>
            {" "}
            {list.status === "Delivered" ? (
              <Link
                className="comman_btn table_viewbtn"
                title="Can't Edit"
                to="#"
                style={{
                  cursor: "not-allowed",
                  filter: "blur(0.5px)",
                  backgroundColor: "#fa9898",
                }}
                disabled
              >
                Edit
              </Link>
            ) : (
              <Link
                className="comman_btn table_viewbtn"
                data-bs-toggle="modal"
                data-bs-target="#edittoffer"
                to="#"
                onClick={() => {
                  setItemId(list?._id);
                }}
              >
                Edit
              </Link>
            )}
            <Link
              className="comman_btn table_viewbtn ms-2"
              to={`/order-details/${list?._id}`}
              onClick={() => {
                // handleItem(data);
                setTimeout(() => {
                  window?.location?.reload();
                }, 500);
              }}
            >
              View
            </Link>
            <Link
              className="comman_btn2 table_viewbtn ms-2"
              to="#"
              onClick={(e) => handledeleteOrder(e, list?._id)}
            >
              Delete
            </Link>
          </div>
        );
        returnData.assign = (
          <div>
            {list?.assignStatus === "Assign" ? (
              <span style={{ cursor: "not-allowed" }}>
                {list?.deliverdBy?.name}
              </span>
            ) : (
              <div className="form-group col-12">
                <select
                  className="select form-control"
                  multiple=""
                  name={`brandId1_${index}`}
                  id={`brandId1_${index}`}
                  value={selectedBrandIds[index] || ""}
                  onChange={(e) => handleSelectChange(e, list?._id, index)}
                >
                  <option value="" style={{ textAlign: "center" }}>
                    Assign
                  </option>
                  {Array.isArray(agents) &&
                    agents.map((agent) => (
                      <option
                        key={agent._id}
                        value={agent._id}
                        style={{ textAlign: "center" }}
                      >
                        {agent?.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        );

        newRows.push(returnData);
      });

      setOrder({ ...order, rows: newRows });
    }
  }, [orderList]);

  const handleDownload = async (e) => {
    e.preventDefault();
    const data = {
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await getFiles(data);

    if (res) {
      const link = document.createElement("a");
      link.href = res;
      link.target = "_blank";
      link.download = "file.pdf";
      link.click();
    }
  };

  const handleSaveChanges1 = async (data) => {
    // e.preventDefault();
    const editOffer = {
      id: itemId,
      orderStatus: data?.status || status,
      orderStatus_ar: data?.statusAr || statusAr,
      ecomAdmintoken: ecomAdmintoken,
    };
    try {
      setLoader(true);
      const res = await updateOrder(editOffer);
      setLoader(false);
      if (res?.data?.message === "Success") {
        Swal.fire({
          title: "Changes Saved",
          text: "The Order Status has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleOrderList();
            document?.getElementById("EditModalCloseBtn").click();
          }
        });
      } else {
        toast.error("Failed to save changes");
      }
    } catch (error) {}
  };

  return (
    <>
      <Sidebar Dash={"orders"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row transaction-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Order Management ({orderList?.length}) </h2>
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
                      <div className="col-auto">
                        <button
                          className="comman_btn2"
                          onClick={handleDownload}
                        >
                          <i className="fal fa-download me-2"></i>Excel
                        </button>
                      </div>
                      <div className="col-auto">
                        <input
                          type="date"
                          className="custom_date"
                          value={startDate1}
                          onChange={(e) => setStartDate1(e.target.value)}
                        />
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
                          <MDBDataTable
                            bordered
                            displayEntries={false}
                            searching={false}
                            className="userDatable"
                            hover
                            data={order}
                            noBottomColumns
                            sortable
                          />
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
      <div
        className="modal fade Edit_modal"
        id="edittoffer"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="EditModalCloseBtn"
              />
            </div>
            <div className="modal-body">
              <form
                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                action=""
                // onSubmit={handleSaveChanges1}
                onSubmit={handleSubmit(handleSaveChanges1)}
              >
                <div className="form-group col-6">
                  <div>
                    <div className="form-floating ">
                      <select
                        className="form-select"
                        id="status"
                        aria-label="  select example"
                        defaultValue=""
                        style={{
                          padding: "5px",
                        }}
                        {...register("status", {
                          required: status ? false : true,
                        })}
                        onChange={handleOrderStatusChange}
                        value={status}
                      >
                        <option value="">Order Status</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Processing">Processing</option>
                      </select>
                    </div>
                    {errors.status && (
                      <span className={`text-danger ${status ? "d-none" : ""}`}>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-6">
                  <div>
                    <div className="form-floating ">
                      <select
                        className="form-select"
                        id="floatingSelect12"
                        aria-label="  select example"
                        defaultValue=""
                        style={{
                          padding: "5px",
                        }}
                        {...register("statusAr", {
                          required: statusAr ? false : true,
                        })}
                        onChange={handleOrderStatusArChange}
                        value={statusAr}
                      >
                        <option value="">حالة الطلب</option>
                        <option value="معباه">معباه</option>
                        <option value="تم التوصيل">تم التوصيل</option>
                        <option value="ملغاة">ملغاة</option>
                        <option value="تجهيز">تجهيز</option>
                      </select>
                    </div>
                    {errors.statusAr && (
                      <span
                        className={`text-danger ${statusAr ? "d-none" : ""}`}
                      >
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group mb-0 col-12 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="comman_btn2"
                    disabled={loader}
                    style={{
                      cursor: loader ? "not-allowed" : "",
                      padding: loader ? "0px" : "",
                    }}
                  >
                    {loader ? (
                      <Spinner style={{ height: "20px", width: "20px" }} />
                    ) : (
                      "Update"
                    )}
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

export default OrderManagement;
