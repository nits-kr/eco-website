import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
// import { getDatabase } from "firebase/database";
import { getDatabase, ref, push, set } from "firebase/database";
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
import { useGetDashboardCountQuery, useGetFileQuery } from "../services/Post";
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
  const db = getDatabase();
  const postListRef = ref(db, "posts");
  const newPostRef = push(postListRef);
  set(newPostRef, {
    // ...
  });
  const [loading, setLoading] = useState(false);
  const { data, isLoading, isError } = useGetFileQuery("file-id");
  const dashboard = useGetDashboardCountQuery();
  console.log("dashboard", dashboard);
  const [updateOrder] = useEditOrderListMutation();
  const [assignOrder] = useOrderAssignMutation();
  // console.log("down load data", data);
  const [orderList, setOrderList] = useState([]);
  console.log("order new list", orderList);
  const [startDate1, setStartDate1] = useState("");
  const [itemId3, setItemId3] = useState("");
  console.log("item id 3", itemId3);
  const [brands, setBrands] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [productList, setProductList] = useState([]);
  const [totalStockQuantity, setTotalStockQuantity] = useState(0);
  const [usersList, setUsersList] = useState([]);
  console.log("userlist", usersList);
  const [salesList, setSalesList] = useState([]);
  console.log("salesList", salesList);
  const [expectedEarnings, setExpectedEarnings] = useState(0);
  const [totalCartsTotal, setTotalCartsTotal] = useState(0);
  console.log("totalCartsTotal", totalCartsTotal);
  console.log("selectedBrandIds", selectedBrandIds);
  console.log("totalStockQuantity", totalStockQuantity);

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const navigate = useNavigate();

  const reloadUsersPage = () => {
    navigate("/users");
    setTimeout(() => {
      window?.location?.reload();
    }, 500);
  };
  // Initialize a variable to keep track of the total delivered items
  const url1 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/dashboards/count/order-dashboards";
  useEffect(() => {
    userManagementList();
  }, []);
  const userManagementList = () => {
    props.setProgress(10);
    setLoading(true);
    axios
      .post(url1)
      .then((response) => {
        setUsersList(response?.data?.results?.customerMonth || []);
        const orderyearData = response?.data?.results?.orderyear || [];
        const customerMonthData = response?.data?.results?.customerMonth || [];
        console.log("orderyearData", orderyearData);
        const salesData = response?.data?.results?.salesDAy || [];
        let totalCartsTotal = 0;
        orderyearData.forEach((order) => {
          totalCartsTotal += order.cartsTotal;
        });
        console.log(
          "Total CartsTotal from orderyear:",
          totalCartsTotal.toFixed(2)
        );
        const totalSalesCartsTotal = salesData.reduce((sum, sale) => {
          sum += sale.cartsTotal;
          return sum;
        }, 0);

        setSalesList(totalSalesCartsTotal.toFixed(2));
        console.log("Total Sales CartsTotal:", totalSalesCartsTotal.toFixed(2));

        const totalDiscountSum = customerMonthData.reduce((sum, customer) => {
          if (
            Array.isArray(customer.totalAfterDiscount) &&
            customer.totalAfterDiscount.length > 0
          ) {
            sum += customer.totalAfterDiscount[0];
          }
          return sum;
        }, 0);

        console.log(
          "Total Sales CartsTotal totalAfterDiscount:",
          totalDiscountSum.toFixed(2)
        );

        props.setProgress(100);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const calculateTotalAfterDiscount = () => {
    let total = 0;
    for (const user of usersList) {
      if (user.totalAfterDiscount && user.totalAfterDiscount.length > 0) {
        total += user.totalAfterDiscount[0];
      }
    }
    return total.toFixed(2);
  };

  const totalAfterDiscount = calculateTotalAfterDiscount();
  let totalDeliveredItems = 0;
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
        console.log("Order List:", orderList);
        setOrderList(response?.data?.results?.list);
        calculateTotalCartsTotal(response?.data?.results?.list);
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

  const calculateTotalCartsTotal = (orderList) => {
    let total = 0;
    for (const order of orderList) {
      total += order.cartsTotal;
    }
    setTotalCartsTotal(total);
  };
  useEffect(() => {
    // Calculate expected earnings when the orderList changes
    const calculatedEarnings = calculateExpectedEarnings(orderList);
    setExpectedEarnings(calculatedEarnings);
  }, [orderList]);

  // Function to calculate expected earnings
  const calculateExpectedEarnings = (orders) => {
    let totalEarnings = 0;

    // orders.forEach((order) => {
    //   order.products.forEach((product) => {
    //     totalEarnings +=
    //       product.quantity * product.product_Id.addVarient[0].Price;
    //   });
    // });

    return totalEarnings;
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
    const words = productName?.split(" ");
    if (words?.length > 3) {
      return words.slice(0, 3).join(" ");
    } else {
      return productName;
    }
  }

  const calculateAverageDailySales = (orderList) => {
    if (!orderList || orderList.length === 0) {
      return 0;
    }
    const totalSales = orderList.reduce((total, order) => {
      return (
        total +
        order.products.reduce((subTotal, product) => {
          return subTotal + product.quantity;
        }, 0)
      );
    }, 0);

    const averageDailySales = totalSales / orderList.length;
    return averageDailySales;
  };

  const averageDailySales = calculateAverageDailySales(orderList);
  console.log("Average Daily Sales:", averageDailySales);

  // Define previousTotal and calculate percentageChange based on your logic
  // const previousTotal = 100; // Replace with the actual previous total
  // const totalCartsTotal1 = 120; // Replace with the actual current total
  // const percentageChange = ((totalCartsTotal - previousTotal) / previousTotal) * 100;

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
                                <span>$</span>
                                {totalCartsTotal.toFixed(2)}
                              </h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div>
                            <DashboardDougnetChart />
                          </div>
                        </div>
                        {/* <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center">
                              <h3>
                                <span>$</span>
                                {totalCartsTotal.toFixed(2)}
                              </h3>
                              {totalCartsTotal > previousTotal ? (
                                <div className="Percent_box ms-2 text-success">
                                  <i className="fas fa-arrow-up"></i>{" "}
                                  {percentageChange.toFixed(2)}%
                                </div>
                              ) : totalCartsTotal < previousTotal ? (
                                <div className="Percent_box ms-2 text-danger">
                                  <i className="fas fa-arrow-down"></i>{" "}
                                  {percentageChange.toFixed(2)}%
                                </div>
                              ) : (
                                <div className="Percent_box ms-2">0.00%</div>
                              )}
                            </div>
                            <DashboardDougnetChart />
                          </div>
                        </div> */}
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
                                <span>$</span>
                                {salesList}
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
                                <span>$</span>
                                {totalAfterDiscount}
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
                          <div className="canvas_top d-flex align-items-center mt-3">
                            <h3 className="p-0">
                              {" "}
                              {
                                dashboard?.data?.results?.orderMonth[0]?.count
                              }{" "}
                            </h3>
                            <div className="Percent_box ms-2">2.2%</div>
                          </div>
                          <div className="col text-secondary">
                            <h6>Orders This Month</h6>
                          </div>
                        </div>
                        {/* <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Orders This Month</h2>
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-12 p-4">
                            {/* <div className="canvas_top d-flex align-items-center mb-5">
                              <h3 className="p-0">
                                {dashboard?.data?.results?.orderMonth[0]?.count}
                              </h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div> */}
                            <div className="order_this mt-5">
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
                          <div className="canvas_top d-flex align-items-center mt-3">
                            <h3 className="p-0"> {usersList?.length} </h3>
                          </div>
                          <div className="col text-secondary">
                            <h6>New Customers This Month</h6>
                          </div>
                        </div>
                        <div className="row mt-5">
                          <div className="col-12 p-4">
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
                                {usersList.length < 3 ? (
                                  <div>
                                    {usersList.map((data, index) => (
                                      <Link
                                        key={data._id}
                                        data-bs-toggle="tooltip"
                                        title="Alan Warden"
                                        className="heros"
                                        href="javascript:;"
                                      >
                                        <img
                                          src={
                                            data.profile_Pic ||
                                            "assets/img/profile.png"
                                          }
                                          alt=""
                                          // style={{
                                          //   width: "50px",
                                          //   height: "50px",
                                          // }}
                                        />
                                      </Link>
                                    ))}
                                  </div>
                                ) : (
                                  <>
                                    {usersList
                                      ?.slice(0, 3)
                                      .map((data, index) => (
                                        <Link
                                          key={data._id}
                                          data-bs-toggle="tooltip"
                                          title="Alan Warden"
                                          className="heros"
                                          href="javascript:;"
                                        >
                                          <img
                                            src={
                                              data.profile_Pic ||
                                              "assets/img/profile.png"
                                            }
                                            alt=""
                                            // style={{
                                            //   width: "50px",
                                            //   height: "50px",
                                            // }}
                                          />
                                        </Link>
                                      ))}
                                    <Link
                                      title="Click For More"
                                      className="heros"
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdrop"
                                      href="javascript:;"
                                    >
                                      <div
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                          backgroundColor: "blue",
                                          borderRadius: "50%",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          color: "white",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {usersList?.length}+
                                      </div>
                                    </Link>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Average Mothly Sales</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 p-4">
                            <div className="canvas_top d-flex align-items-center">
                              <h3>
                                <span>$</span>
                                {(totalCartsTotal / 12).toFixed(2)}
                              </h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div>
                            {/* <canvas id="line-chart1" className="w-full w-100" /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Average Daily Sales</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 p-4">
                            <div className="canvas_top d-flex align-items-center">
                              <h3>
                                <span>$</span>
                                {(salesList / 30)?.toFixed(2)}
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
                                  {orderList
                                    ?.slice(0, 5)
                                    ?.map((data, index) => (
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
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          X{" "}
                                          {data.products.reduce(
                                            (totalQuantity, item) => {
                                              return (
                                                totalQuantity + item.quantity
                                              );
                                            },
                                            0
                                          )}
                                        </td>
                                        <td>
                                          $
                                          {(
                                            data?.cartsTotal /
                                            data.products.reduce(
                                              (totalQuantity, item) => {
                                                return (
                                                  totalQuantity + item.quantity
                                                );
                                              },
                                              0
                                            )
                                          ).toFixed(2)}
                                        </td>

                                        <td>
                                          {data?.cartsTotal
                                            ? data?.cartsTotal?.toFixed(2)
                                            : "N/A"}
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
                                      <td>{data.user_Id.userName}</td>
                                      <td>
                                        {data?.cartsTotal
                                          ? data?.cartsTotal?.toFixed(2)
                                          : "N/A"}
                                        {/* {typeof data.cartsTotal?.[0]?.[0] ===
                                        "number"
                                          ? `$${data.cartsTotal?.[0]?.[0].toFixed(
                                              2
                                            )}`
                                          : "N/A"} */}
                                      </td>
                                      {/* <td>
                                        ${calculateProfit(data.cartsTotal[0])}
                                      </td> */}
                                      <td>
                                        <div
                                          className={
                                            data?.orderStatus === "Cancelled"
                                              ? "text-danger"
                                              : data?.orderStatus === "Pending"
                                              ? "text-warning"
                                              : data?.orderStatus === "Packed"
                                              ? "text-info"
                                              : data?.orderStatus === "Approved"
                                              ? "text-success"
                                              : data?.orderStatus ===
                                                "Inprogress"
                                              ? "text-primary"
                                              : data?.orderStatus ===
                                                "Delivered"
                                              ? "text-secondary"
                                              : "text-default"
                                          }
                                          style={{
                                            background:
                                              data?.orderStatus === "Cancelled"
                                                ? "#ffe5e5"
                                                : data?.orderStatus ===
                                                  "Pending"
                                                ? "#fff6e5"
                                                : data?.orderStatus === "Packed"
                                                ? "#e5f0ff"
                                                : data?.orderStatus ===
                                                  "Approved"
                                                ? "#e5ffe5"
                                                : data?.orderStatus ===
                                                  "Inprogress"
                                                ? "#e5e5ff"
                                                : data?.orderStatus ===
                                                  "Delivered"
                                                ? "#f3f3f3"
                                                : "#f9f9f9",
                                            borderRadius: "5px",
                                            padding: "2px 5px",
                                          }}
                                        >
                                          {data?.orderStatus}
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
                                              {data?.user_Id?.userName}
                                            </strong>
                                          </div>
                                          {/* <div
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
                                          </div> */}
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
                                                : data?.orderStatus ===
                                                  "Delivered"
                                                ? "text-secondary"
                                                : "text-default" // Add a default class for unrecognized statuses
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
                                                  : data?.orderStatus ===
                                                    "Delivered"
                                                  ? "#f3f3f3"
                                                  : "#f9f9f9", // Add a default background color for unrecognized statuses
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
      <div
        className="modal fade Edit_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="col d-flex flex-column align-items-center justify-content-center">
                <div>
                  <h2>Browse Users</h2>
                </div>
              </div>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="d-flex align-items-center justify-content-center"
              onClick={reloadUsersPage}
              style={{ cursor: "pointer" }}
            >
              If you need more information, please check out our{" "}
              <span className="ms-1 text-primary"> Users Directory</span> .
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 comman_table_design px-0">
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <tbody>
                        {usersList?.map((data, index) => (
                          <tr key={index}>
                            <td> {index + 1} </td>
                            <td>
                              <div className="product_showw">
                                <img
                                  src={
                                    data.profile_Pic || "assets/img/profile.png"
                                  }
                                  alt=""
                                />
                                <div>
                                  <div className="product_showw_iiner">
                                    <a href="javascript:;">
                                      <strong>{data.userName}</strong>{" "}
                                    </a>
                                  </div>
                                  <div className="product_showw_iiner">
                                    <a
                                      href="javascript:;"
                                      className="text-secondary"
                                    >
                                      {data.userEmail}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div className="product_showw_iiner">
                                  <a href="javascript:;">
                                    <strong>
                                      $
                                      {data.totalAfterDiscount[0]?.toFixed(2) ||
                                        0.0}
                                    </strong>{" "}
                                  </a>
                                </div>
                                <div className="product_showw_iiner">
                                  <a
                                    href="javascript:;"
                                    className="text-secondary"
                                  >
                                    Sales
                                  </a>
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
      </div>
    </>
  );
}

export default DashboardNew;
