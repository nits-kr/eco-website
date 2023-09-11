import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faTrashCan,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import DashboardConvaschart from "./chart/DashboardConvaschart";
import DashboardDougnetChart from "./chart/DashboardDougnetChart";
import Barchart from "./chart/Barchart";
import DashboardDiscountedChart from "./chart/DashboardDiscountedChart";
import { useGetFileQuery } from "../services/Post";
import { useEditOrderListMutation } from "../services/Post";
import { useDeleteOrderListMutation } from "../services/Post";
import { useOrderAssignMutation } from "../services/Post";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Radar, Bar, getElementsAtEvent } from "react-chartjs-2";

function DashboardNew(props) {
  const [loading, setLoading] = useState(false);
  const [deleteOrder, response] = useDeleteOrderListMutation();
  const { data, isLoading, isError } = useGetFileQuery("file-id");
  const [updateOrder] = useEditOrderListMutation();
  const [assignOrder] = useOrderAssignMutation();
  // console.log("down load data", data);
  const [orderList, setOrderList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [status, setStatus] = useState("");
  const [status2, setStatus2] = useState("");
  const [itemId, setItemId] = useState("");
  const [itemId3, setItemId3] = useState("");
  console.log("item id 3", itemId3);
  const [itemId2, setItemId2] = useState("");
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderStatusAr, setOrderStatusAr] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [productList, setProductList] = useState([]);
  const [totalStockQuantity, setTotalStockQuantity] = useState(0);
  console.log("selectedBrandIds", selectedBrandIds);
  console.log("totalStockQuantity", totalStockQuantity);
  const [subSubCategory, setSubSubCategory] = useState({
    brandId1: "",
  });

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  // Initialize a variable to keep track of the total delivered items
  let totalDeliveredItems = 0;

  // Iterate through the orderList and count delivered items
  orderList.forEach((data) => {
    if (data.orderStatus === "Shipped") {
      totalDeliveredItems++;
    }
  });

  // Now, totalDeliveredItems contains the count of delivered items
  console.log("Total Delivered Items:", totalDeliveredItems);

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
    setItemId3(data?._id);
    const updatedSelectedBrandIds = [...selectedBrandIds];
    updatedSelectedBrandIds[index] = e.target.value;

    const editOffer = {
      id: itemId,
      deliverdBy: updatedSelectedBrandIds.filter(Boolean),
    };
    try {
      await assignOrder(editOffer);
      Swal.fire({
        title: "Changes Saved",
        text: "The Order has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      // Handle error here
    }
  };
  useEffect(() => {
    props.setProgress(10);
    setLoading(true);
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productList"
      )
      .then((response) => {
        setProductList(response?.data?.results?.list.reverse());
        console.log(response.data);
        props.setProgress(100);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    // Calculate the total stockQuantity from all variants
    const totalStock = productList.reduce((total, product) => {
      const variants = product?.addVarient || [];
      const stockQuantity = variants.reduce(
        (variantTotal, variant) => variantTotal + variant.stockQuantity,
        0
      );
      return total + stockQuantity;
    }, 0);

    // Set the total stockQuantity to state
    setTotalStockQuantity(totalStock);

    // Display the total stockQuantity in the console
    console.log("Total Stock Quantity:", totalStock);
  }, [productList]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/agent/agent/user-List"
        );
        setBrands(response?.data?.results?.list);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData2();
  }, []);

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
        setOrderList(response?.data?.results?.list);
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
        const list = response?.data?.results?.list;
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
        setOrderList(searchQuery !== "" ? results?.orderData : results?.list);
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
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "file.xlsx";
      link.click();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching the file.</div>;
  }

  const handleItem = (item) => {
    setStatus2(item?.orderStatus || "");
  };
  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editOffer = {
      id: itemId,
      orderStatus: orderStatus,
      orderStatus_ar: orderStatusAr,
    };
    try {
      await updateOrder(editOffer);
      Swal.fire({
        title: "Changes Saved",
        text: "The Order Status has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {}
  };

  function formatTimeAgo(createdAt) {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDifferenceInSeconds = Math.floor(
      (currentDate - createdAtDate) / 1000
    );
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} sec ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} days ago`;
    }
  }
  function trimProductName(productName) {
    const words = productName.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ");
    } else {
      return productName;
    }
  }

  return (
    <>
      <Sidebar Dash={"dashboard"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-3 d-flex align-items-stretch mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        {/* <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Expected Earnings</h2>
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center">
                              <h3>
                                <span>$</span>69,700
                              </h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div>
                            {/* <canvas className="w-100" id="myChart" /> */}
                            <DashboardDougnetChart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-stretch mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        {/* <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Expected Earnings</h2>
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center">
                              <h3>
                                <span>$</span>69,700
                              </h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div>
                            {/* <canvas className="w-100" id="myChart" /> */}
                            <Barchart />
                            {/* <Bar
                              data={dataBarInfo} height={300}
                              onClick={infoBar ? onClickInfo : onClick}
                              ref={charRef}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-stretch mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        {/* <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Average Daily Sales</h2>
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center">
                              <h3>
                                <span>$</span>69,700
                              </h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div>
                            {/* <canvas id="line-chart" className="w-full w-100" /> */}
                            <DashboardConvaschart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-stretch mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Orders This Month</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center mb-5">
                              <h3 className="p-0">1,836</h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div>
                            <div className="order_this">
                              <div className="order_top">
                                <strong>1,048 to Goal</strong>
                                <span>62%</span>
                              </div>
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "85%" }}
                                  aria-valuenow={85}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-stretch mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>New Customers This Month</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center mb-3">
                              <h3 className="p-0">6.3k </h3>
                            </div>
                            <div className="today_heros">
                              <strong className="mb-2 d-block">
                                Today’s Heroes
                              </strong>
                              <div
                                className="heros_img"
                                style={{
                                  display: "flex",
                                  justifyContent: "start",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <Link
                                  data-bs-toggle="tooltip"
                                  title="Alan Warden"
                                  className="heros"
                                  href="javascript:;"
                                >
                                  <img
                                    src="assets/img/profile.png"
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </Link>
                                <Link
                                  data-bs-toggle="tooltip"
                                  title="Michael Eberon"
                                  className="heros"
                                  href="javascript:;"
                                >
                                  <img
                                    src="assets/img/profile.png"
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </Link>
                                <Link
                                  data-bs-toggle="tooltip"
                                  title="Susan Redwood"
                                  className="heros"
                                  href="javascript:;"
                                >
                                  <img
                                    src="assets/img/profile.png"
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </Link>
                                <Link
                                  data-bs-toggle="tooltip"
                                  title="Disabled tooltip"
                                  className="heros"
                                  href="javascript:;"
                                >
                                  <img
                                    src="assets/img/profile.png"
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </Link>
                                <Link
                                  data-bs-toggle="tooltip"
                                  title="Melody Macy"
                                  className="heros"
                                  href="javascript:;"
                                >
                                  <img
                                    src="assets/img/profile.png"
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Average Daily Sales</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center">
                              <h3>
                                <span>$</span>69,700
                              </h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div>
                            {/* <canvas id="line-chart1" className="w-full w-100" /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-stretch mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Recent Orders </h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 comman_table_design px-0">
                            <div className="table-responsive">
                              <table className="table mb-0">
                                <thead>
                                  <tr>
                                    <th>S.No.</th>
                                    <th>ITEM</th>
                                    <th>QTY</th>
                                    <th>PRICE</th>
                                    <th>TOTAL(discounted)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderList?.map((data, index) => (
                                    <tr key={index}>
                                      <td> {index + 1} </td>
                                      <td>
                                        <div className="product_showw">
                                          <img
                                            src={
                                              data.products[0]?.product_Id
                                                ?.addVarient[0]
                                                ?.product_Pic[0] ||
                                              "assets/img/product1.png"
                                            }
                                            alt=""
                                          />
                                          <div className="product_showw_iiner">
                                            <a href="javascript:;">
                                              {data.products[0]?.product_Id?.productName_en?.slice(
                                                0,
                                                8
                                              )}
                                            </a>
                                            {/* <span>
                                              Item: #
                                              {
                                                data.products[0]?.product_Id
                                                  ?._id
                                              }
                                            </span> */}
                                          </div>
                                        </div>
                                      </td>
                                      <td>X {data.products[0]?.quantity}</td>
                                      <td>
                                        $
                                        {data.products[0]?.product_Id
                                          ?.addVarient[0]?.Price || 0.0}
                                      </td>
                                      <td>
                                        $
                                        {data.cartsTotal[0]?.[0]?.totalAfterDiscount[0]?.toFixed(
                                          2
                                        )}
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
                  <div className="col-md-6 d-flex align-items-stretch mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        {/* <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Discounted Product Sales</h2>
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center mb-3">
                              <h3 className="p-0">3,706 </h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div>
                            {/* <canvas className="w-100" id="myChart1" /> */}
                            <DashboardDiscountedChart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Product Orders</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 comman_table_design px-0">
                            <div className="table-responsive">
                              <table className="table mb-0">
                                <thead>
                                  <tr>
                                    <th>S.No.</th>
                                    <th>ORDER ID</th>
                                    <th>CREATED</th>
                                    <th>CUSTOMER</th>
                                    <th>TOTAL</th>
                                    {/* <th>PROFIT</th> */}
                                    <th>STATUS</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderList?.map((data, index) => (
                                    <tr key={index}>
                                      <td> {index + 1} </td>
                                      <td> {data?._id} </td>
                                      <td className="text-secondary fs-7">
                                        {data?.createdAt &&
                                          formatTimeAgo(data.createdAt)}
                                      </td>
                                      <td>{data.cartsTotal[0][0].userName}</td>
                                      <td>
                                        $
                                        {
                                          data.cartsTotal[0][0]
                                            .totalAfterDiscount[0]
                                        }
                                      </td>
                                      {/* <td>
                                        ${calculateProfit(data.cartsTotal[0])}
                                      </td> */}
                                      <td>{data.orderStatus}</td>
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
                  <div className="col-md-4 mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Product Delivery</h2>
                            <div className="text-secondary">
                              <strong>{totalDeliveredItems}</strong> Products
                              Shipped so far
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 comman_table_design px-0">
                            <div className="table-responsive">
                              <table className="table mb-0">
                                {/* <thead>
                                  <tr>
                                    <th>S.No.</th>
                                    <th>ORDER ID</th>
                                    <th>CREATED</th>
                                    <th>CUSTOMER</th>
                                    <th>TOTAL</th>
                                    <th>PROFIT</th>
                                    <th>STATUS</th>
                                  </tr>
                                </thead> */}
                                <tbody>
                                  {orderList?.map((data, index) => (
                                    <tr key={index}>
                                      <td>
                                        <div className="product_showw">
                                          <img
                                            src={
                                              data?.products[0]?.product_Id
                                                ?.addVarient[0]?.product_Pic[0]
                                            }
                                            alt=""
                                          />
                                          <div className="product_showw_iiner">
                                            <a href="javascript:;">
                                              {/* {
                                                data?.products[0]?.product_Id
                                                  ?.productName_en?.slice(0,4)
                                              } */}
                                              {trimProductName(
                                                data?.products[0]?.product_Id
                                                  ?.productName_en
                                              )}
                                            </a>
                                            {/* <span>{data?._id}</span> */}
                                          </div>
                                          {/* <div
                                            style={{
                                              display: "flex",
                                              alignItems: "flex-end",
                                              marginLeft: "207px",
                                              marginBottom: "20px",
                                              backgroundColor:
                                                "rgb(243, 243, 243);",
                                            }}
                                          >
                                            <button style={{ border: "none" }}>
                                              <FontAwesomeIcon
                                                icon={faEllipsis}
                                              />
                                            </button>
                                          </div> */}
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <div>
                                            To:{" "}
                                            <strong>
                                              {" "}
                                              &nbsp;
                                              {data?.cartsTotal[0][0]?.userName}
                                            </strong>
                                          </div>
                                          <div
                                            className={
                                              data?.orderStatus === "Cancelled"
                                                ? "text-danger"
                                                : data?.orderStatus ===
                                                  "Pending"
                                                ? "text-warning"
                                                : data?.orderStatus === "Packed"
                                                ? "text-info"
                                                : data?.orderStatus ===
                                                  "Approved"
                                                ? "text-success"
                                                : data?.orderStatus ===
                                                  "Inprogress"
                                                ? "text-primary"
                                                : "text-secondary"
                                            }
                                            style={{
                                              background:
                                                data?.orderStatus ===
                                                "Cancelled"
                                                  ? "#ffe5e5"
                                                  : data?.orderStatus ===
                                                    "Pending"
                                                  ? "#fff6e5"
                                                  : data?.orderStatus ===
                                                    "Packed"
                                                  ? "#e5f0ff"
                                                  : data?.orderStatus ===
                                                    "Approved"
                                                  ? "#e5ffe5"
                                                  : data?.orderStatus ===
                                                    "Inprogress"
                                                  ? "#e5e5ff"
                                                  : "#f3f3f3",
                                              borderRadius: "5px",
                                              padding: "2px 5px",
                                            }}
                                          >
                                            {data?.orderStatus}
                                          </div>
                                        </div>
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
                  <div className="col-md-8 mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Stock Report</h2>
                            <div className="text-secondary">
                              Total{" "}
                              <strong>
                                {totalStockQuantity?.toLocaleString()}
                              </strong>{" "}
                              Items in the Stock
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 comman_table_design px-0">
                            <div className="table-responsive">
                              <table className="table mb-0">
                                <thead>
                                  <tr>
                                    <th>Item</th>
                                    <th>Product ID</th>
                                    <th>CREATED AT</th>
                                    <th>Price</th>
                                    <th> STATUS</th>
                                    <th> Quantity</th>
                                    {/* <th>PROFIT</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {productList?.map((data, index) => {
                                    const totalStockQuantity =
                                      data.addVarient.length > 0
                                        ? data.addVarient.reduce(
                                            (sum, variant) =>
                                              sum +
                                              (variant.stockQuantity || 0),
                                            0
                                          )
                                        : 0;
                                    return (
                                      <tr key={index}>
                                        <td>
                                          {trimProductName(
                                            data?.productName_en
                                          )}
                                        </td>
                                        <td>{data?._id}</td>
                                        <td className="text-secondary fs-7">
                                          {data?.publishDate?.slice(0, 10)}
                                        </td>
                                        {/* <td>${data.addVarient[0]?.Price}</td> */}
                                        <td>
                                          $
                                          {data.addVarient[0]?.Price?.toLocaleString()}
                                        </td>
                                        <td>
                                          <div
                                            style={{
                                              background:
                                                data.addVarient[0]
                                                  ?.stockQuantity > 10
                                                  ? "#c8e6c9" // Green background for "In Stock"
                                                  : data.addVarient[0]
                                                      ?.stockQuantity === 0
                                                  ? "#ffcdd2" // Red background for "Out of Stock"
                                                  : "#fff9c4", // Yellow background for "Low Stock"
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              padding: "4px", // Optional padding for spacing
                                              borderRadius: "5px",
                                              color:
                                                data.addVarient[0]
                                                  ?.stockQuantity > 10
                                                  ? "#005a02" // Dark green text for "In Stock"
                                                  : data.addVarient[0]
                                                      ?.stockQuantity === 0
                                                  ? "#e60000" // Dark red text for "Out of Stock"
                                                  : "#9e7800", // Dark yellow text for "Low Stock"
                                            }}
                                          >
                                            <strong>
                                              {data.addVarient[0]
                                                ?.stockQuantity > 10
                                                ? "In Stock"
                                                : data.addVarient[0]
                                                    ?.stockQuantity === 0
                                                ? "Out of Stock"
                                                : "Low Stock"}
                                            </strong>
                                          </div>
                                        </td>
                                        <td>{totalStockQuantity} PCS</td>
                                      </tr>
                                    );
                                  })}
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
      </div>
    </>
  );
}

export default DashboardNew;
