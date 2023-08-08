import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { useGetFileQuery } from "../services/Post";
import { useEditOrderListMutation } from "../services/Post";
import { useDeleteOrderListMutation } from "../services/Post";
function OrderManagement() {
  const [deleteOrder, response] = useDeleteOrderListMutation();
  const { data, isLoading, isError } = useGetFileQuery("file-id");
  const [updateOrder] = useEditOrderListMutation();
  console.log("down load data", data);
  const [orderList, setOrderList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [status, setStatus] = useState("");
  const [status2, setStatus2] = useState("");
  const [itemId, setItemId] = useState("");

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/order/order/list";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/order/order/search";
  useEffect(() => {
    subOrderList();
  }, []);
  const subOrderList = async (e) => {
    await axios
      .post(url)
      .then((response) => {
        setOrderList(response?.data?.results?.list?.reverse());
      })
      .catch((error) => {
        console.log(error.response.data);
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Failed to fetch recent order list data. Please try again later.",
        });
      });
  };

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
              setOrderList(list);
            }
          });
          // setOrderList(list);
        } else {
          setOrderList([]);
          Swal.fire({
            icon: "warning",
            title: "No data found!",
            text: "There is no list between the selected dates.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              subOrderList();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(url, {
        startDate1,
      });
      const filteredUsers = data?.results?.list?.filter(
        (user) =>
          new Date(user?.createdAt?.slice(0, 10)).toISOString().slice(0, 10) ===
          new Date(startDate1).toISOString().slice(0, 10)
      );
      if (filteredUsers.length === 0) {
        setOrderList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subOrderList();
          }
        });
      } else if (filteredUsers.length > 0) {
        await Swal.fire({
          title: "List Found!",
          text: "list is available for the selected date.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setOrderList(filteredUsers);
          }
        });
      }
      setOrderList(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        orderStatus: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setOrderList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subOrderList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setOrderList(
          searchQuery !== "" ? results?.orderData : results?.list?.reverse()
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

  const handleDownload = () => {
    if (data) {
      const blob = new Blob([data]);
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'file.xlsx';
      link.click();
    }
  };
  // const handleDownload = () => {
  //   if (data && data.results && data.results.file) {
  //     const downloadUrl = data.results.file;
  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.download = "file.xlsx";
  //     link.click();
  //   }
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching the file.</div>;
  }

  const handleItem = (item) => {
    setStatus2(item?.orderStatus || "");
    // setTitle2(item?.title || "");
    // setCode2(item?.code || "");
    // setDiscount2(item?.Discount || "");
  };
  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editOffer = {
      id: itemId,
      orderStatus: status,
    };
    try {
      await updateOrder(editOffer);
      Swal.fire({
        title: "Changes Saved",
        text: "The offer has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        // Check if the user clicked "OK" (result.isConfirmed) and then reload the page
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      // Handle error if necessary
    }
  };

  return (
    <>
      <Sidebar Dash={"orders"} />
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
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                {/* <th>Order Image</th> */}
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Payment Method</th>
                                <th>Delivery Status</th>
                                <th>Amount</th>
                                <th>Action</th>
                                {/* <th></th> */}
                                {/* <th></th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {orderList?.map((data, index) => (
                                <tr key={index}>
                                  <td> {data?._id} </td>
                                  <td> {data?.createdAt?.slice(0, 10)} </td>
                                  <td> {data.paymentIntent} </td>
                                  <td> {data.orderStatus} </td>
                                  <td> {data.cartsTotal} </td>
                                  <td>
                                    <Link
                                      className="comman_btn table_viewbtn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edittoffer"
                                      to="#"
                                      onClick={() => {
                                        handleItem(data);
                                        setItemId(data?._id);
                                      }}
                                    >
                                      Edit
                                    </Link>
                                    <Link
                                      className="comman_btn2 table_viewbtn ms-2"
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
                                            deleteOrder(data?._id);
                                            Swal.fire(
                                              "Deleted!",
                                              `${data?.status}  item has been deleted.`,
                                              "success"
                                            ).then(() => {
                                              window.location.reload();
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
                Edit Offer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form
                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                action=""
                onSubmit={handleSaveChanges1}
              >
                <div className="form-group col-6">
                  <label htmlFor=""> DELIVERY STATUS</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={productName}
                    defaultValue={status2}
                    onChange={(e) => setStatus(e.target.value)}
                    name="name"
                    id="name"
                  />
                </div>
                {/* <div className="form-group col-6">
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={title}
                    defaultValue={title2}
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    id="title"
                  />
                </div>
                <div className="form-group mb-0 col">
                  <label htmlFor="">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={code}
                    defaultValue={code2}
                    onChange={(e) => setCode(e.target.value)}
                    name="code"
                    id="code"
                  />
                </div>
                <div className="form-group mb-0 col">
                  <label htmlFor="">Discount</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={discount}
                    // defaultValue={discount2}
                    // onChange={(e) => setDiscount(e.target.value)}
                    name="name"
                    id="name"
                  />
                </div> */}
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn2">Add</button>
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
