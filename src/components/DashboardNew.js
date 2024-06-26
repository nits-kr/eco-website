import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";

import DashboardConvaschart from "./chart/DashboardConvaschart";
import DashboardDougnetChart from "./chart/DashboardDougnetChart";
import Barchart from "./chart/Barchart";
import DashboardDiscountedChart from "./chart/DashboardDiscountedChart";
import {
  useGetDashBoardDataQuery,
  useGetDashboardCountQuery,
  useGetMonthlyUserQuery,
  useGetOrderListAllMutation,
  useGetProductListQuery,
  useGetStockReportQuery,
} from "../services/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../app/chartSlice";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function DashboardNew(props) {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);
  const [loading, setLoading] = useState(false);
  const { data: dashboard, refetch: refetchdashboard } =
    useGetDashboardCountQuery({ ecomAdmintoken });
  const { data: dashboardData, isLoading: loadings } = useGetDashBoardDataQuery(
    { ecomAdmintoken }
  );
  const { data: stockReport, isLoading: loadings2 } = useGetStockReportQuery({
    ecomAdmintoken,
  });
  const { data: monthlyUser, isLoading } = useGetMonthlyUserQuery({
    ecomAdmintoken,
  });

  const [orderListdata] = useGetOrderListAllMutation();

  const { data: productListdata } = useGetProductListQuery({ ecomAdmintoken });
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [monthPrice, setMonthPrice] = useState([]);
  const [totalStockQuantity, setTotalStockQuantity] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [salesList, setSalesList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dashboarddata, setDashboarddata] = useState("");

  const totalBarTotals = dashboardData?.results?.stats?.dailyTimeLine?.reduce(
    (acc, curr) => acc + curr.sales,
    0
  );
  const totalMonthTotals =
    dashboardData?.results?.stats?.monthlyTimeLine?.reduce(
      (acc, curr) => acc + curr.sales,
      0
    );

  useEffect(() => {
    if (dashboard) {
      setDashboarddata(dashboard?.results);
      setUsersList(dashboard?.results?.customerMonth || []);
      dispatch(getAllData(dashboard?.results));
      const orderyearData = dashboard?.results?.orderyear || [];
      const orderMonthData = dashboard?.results?.OrderMonth || [];
      const totalOrderMonth = orderMonthData.reduce((sum, order) => {
        return (sum += order.cartsTotal);
      }, 0);
      setMonthPrice(totalOrderMonth?.toFixed(2));
      const salesData = dashboard?.results?.salesDAy || [];
      let totalCartsTotal = 0;
      orderyearData.forEach((order) => {
        totalCartsTotal += order.cartsTotal;
      });

      const totalSalesCartsTotal = salesData.reduce((sum, sale) => {
        sum += sale.cartsTotal;
        return sum;
      }, 0);

      setSalesList(totalSalesCartsTotal.toFixed(2));
    }
  }, [dashboard]);

  const [product, setProduct] = useState({
    columns: [
      {
        label: "ITEM",
        field: "title",
        sort: "asc",
        width: 100,
      },
      {
        label: "PRODUCT ID",
        field: "id",
        sort: "asc",
        width: 150,
      },

      {
        label: "CREATED AT",
        field: "date",
        sort: "asc",
        width: 100,
      },
      {
        label: "PRICE",
        field: "price",
        sort: "asc",
        width: 150,
      },
      {
        label: "STATUS",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "QUANTITY",
        field: "quantity",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });
  const [order, setOrder] = useState({
    columns: [
      {
        label: "S.No.",
        field: "sn",
        sort: "asc",
        width: 100,
      },
      {
        label: "Image",
        field: "pic",
        sort: "asc",
        width: 150,
      },
      {
        label: "ORDER ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "To",
        field: "del_to",
        sort: "asc",
        width: 150,
      },

      {
        label: "PRODUCT NAME",
        field: "title",
        sort: "asc",
        width: 150,
      },

      {
        label: "CREATED AT",
        field: "date",
        sort: "asc",
        width: 100,
      },
      {
        label: "CUSTOMER",
        field: "customer",
        sort: "asc",
        width: 150,
      },
      {
        label: "TOTAL",
        field: "total",
        sort: "asc",
        width: 100,
      },
      {
        label: "STATUS",
        field: "status",
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
  }, [ecomAdmintoken]);

  const handleOrderList = async () => {
    const data = {
      from: "",
      to: "",
      orderStatus: "",
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await orderListdata(data);
    setOrderList(res?.data?.results?.orders);
  };

  useEffect(() => {
    if (orderList) {
      // setOrderList(orderListdata?.results?.orders);
      // calculateTotalCartsTotal(orderListdata?.results?.orders);
      const newRows = [];
      orderList?.map((list, index) => {
        const returnData = {};
        // const totalStockQuantity =
        //   list.addVarient.length > 0
        //     ? list.addVarient.reduce(
        //         (sum, variant) => sum + (variant.stockQuantity || 0),
        //         0
        //       )
        //     : 0;
        returnData.sn = index + 1;
        returnData.title = list?.products[0]?.product_Id?.productName_en
          ?.split(/\s+/)
          .slice(0, 2)
          .join(" ");
        returnData.id = list?._id;
        returnData.del_to = <strong>{list?.user_Id?.userName}</strong>;
        returnData.pic = (
          <>
            <img
              src={list?.products[0]?.product_Id?.addVarient[0]?.product_Pic[0]}
              alt=""
              height={50}
              width={50}
            />
          </>
        );
        returnData.date = moment(list?.publishDate).format("L");
        returnData.customer = list?.user_Id?.userName;
        returnData.total = list?.cartsTotal
          ? list?.cartsTotal?.toFixed(2)
          : "N/A";
        returnData.status = (
          <div
            className={
              list?.orderStatus === "Cancelled"
                ? "text-danger"
                : list?.orderStatus === "Pending"
                ? "text-warning"
                : list?.orderStatus === "Packed"
                ? "text-info"
                : list?.orderStatus === "Approved"
                ? "text-success"
                : list?.orderStatus === "Inprogress"
                ? "text-primary"
                : list?.orderStatus === "Delivered"
                ? "text-secondary"
                : "text-default"
            }
            style={{
              background:
                list?.orderStatus === "Cancelled"
                  ? "#ffe5e5"
                  : list?.orderStatus === "Pending"
                  ? "#fff6e5"
                  : list?.orderStatus === "Packed"
                  ? "#e5f0ff"
                  : list?.orderStatus === "Approved"
                  ? "#e5ffe5"
                  : list?.orderStatus === "Inprogress"
                  ? "#e5e5ff"
                  : list?.orderStatus === "Delivered"
                  ? "#f3f3f3"
                  : "#f9f9f9",
              borderRadius: "5px",
              padding: "2px 5px",
            }}
          >
            {list?.orderStatus}
          </div>
        );
        // returnData.quantity = totalStockQuantity;

        newRows.push(returnData);
      });

      setOrder({ ...order, rows: newRows });
    }
  }, [orderList]);

  useEffect(() => {
    if (productListdata) {
      setProductList(productListdata?.results?.list);
      const totalStock = productListdata?.results?.list.reduce(
        (total, product) => {
          const variants = product?.addVarient || [];
          const stockQuantity = variants.reduce(
            (variantTotal, variant) => variantTotal + variant.stockQuantity,
            0
          );
          return total + stockQuantity;
        },
        0
      );
      setTotalStockQuantity(totalStock);
      const newRows = [];
      productListdata?.results?.list
        ?.slice()
        ?.reverse()
        ?.map((list, index) => {
          const returnData = {};
          const totalStockQuantity =
            list?.addVarient?.length > 0
              ? list?.addVarient?.reduce(
                  (sum, variant) => sum + (variant.stockQuantity || 0),
                  0
                )
              : 0;
          // returnData.sn = index + 1;
          returnData.title = list?.productName_en
            ?.split(/\s+/)
            .slice(0, 2)
            .join(" ");
          returnData.id = list?._id;
          returnData.date = moment(list?.publishDate).format("L");
          returnData.price = list?.varient?.[0]?.Price?.toLocaleString();
          returnData.status = (
            <div
              style={{
                background:
                  totalStockQuantity > 10
                    ? "#c8e6c9" // Green background for "In Stock"
                    : totalStockQuantity === 0
                    ? "#ffcdd2" // Red background for "Out of Stock"
                    : "#fff9c4", // Yellow background for "Low Stock"
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px", // Optional padding for spacing
                borderRadius: "5px",
                color:
                  totalStockQuantity > 10
                    ? "#005a02" // Dark green text for "In Stock"
                    : totalStockQuantity === 0
                    ? "#e60000" // Dark red text for "Out of Stock"
                    : "#9e7800", // Dark yellow text for "Low Stock"
              }}
            >
              <strong>
                {totalStockQuantity > 10
                  ? "In Stock"
                  : totalStockQuantity === 0
                  ? "Out of Stock"
                  : "Low Stock"}
              </strong>
            </div>
          );
          returnData.quantity = totalStockQuantity;

          newRows.push(returnData);
        });

      setProduct({ ...product, rows: newRows });
    }
  }, [productListdata]);

  const reloadUsersPage = () => {
    document?.getElementById("closeusermodal").click();
    navigate("/users");
  };

  let totalDeliveredItems = 0;
  orderList?.forEach((data) => {
    if (data.orderStatus === "Shipped") {
      totalDeliveredItems++;
    }
  });

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

  // const currentDayIndex = 0; // Index of today's data
  // const previousDayIndex = 1; // Index of yesterday's data

  // const currentDaySales =
  //   dashboardData?.results?.stats?.dailyTimeLine[currentDayIndex]?.sales;
  // const previousDaySales =
  //   dashboardData?.results?.stats?.dailyTimeLine[previousDayIndex]?.sales;

  // // Calculate percentage change
  // const percentageChange =
  //   ((currentDaySales - previousDaySales) / previousDaySales) * 100;

  const currentDayIndex = 0;
  const previousDayIndex = 1;

  const currentDaySales =
    dashboardData?.results?.stats?.dailyTimeLine[currentDayIndex]?.sales;
  const previousDaySales =
    dashboardData?.results?.stats?.dailyTimeLine[previousDayIndex]?.sales;

  console.log("currentDaySales", currentDaySales);
  console.log("previousDaySales", previousDaySales);

  let percentageChange;

  if (previousDaySales !== 0) {
    percentageChange =
      ((currentDaySales - previousDaySales) / previousDaySales) * 100;
  } else {
    if (currentDaySales !== 0) {
      percentageChange = 100;
    } else {
      percentageChange = 0;
    }
  }

  let icon;
  let colorClass;
  if (percentageChange > 0) {
    icon = <i className="bi bi-arrow-up"></i>;
    colorClass = "text-success";
  } else if (percentageChange < 0) {
    icon = <i className="bi bi-arrow-down"></i>;
    colorClass = "text-danger";
  } else {
    icon = <i className="bi bi-dash"></i>;
    colorClass = "text-muted";
  }

  const currentMonthIndex = 0;
  const previousMonthIndex = 1;

  // Extracting data from the response
  const monthlyData = dashboardData?.results?.stats?.monthlyTimeLine;

  // Function to calculate total sales for a given month
  const calculateTotalSales = (monthData) => {
    return monthData.reduce((total, item) => total + item.sales, 0);
  };

  // Find current month and previous month data
  const currentMonthData = monthlyData?.find(
    (month) => month._id === moment().format("YYYY-MM")
  );
  const previousMonthData = monthlyData?.find((month) => {
    const previousMonth = moment().subtract(1, "months").format("YYYY-MM");
    return month._id === previousMonth;
  });

  // Calculate total sales for current month and previous month
  const totalCurrentMonthSales = currentMonthData ? currentMonthData.sales : 0;
  const totalPreviousMonthSales = previousMonthData
    ? previousMonthData.sales
    : 0;

  const currentMonthSales =
    dashboardData?.results?.stats?.monthlyTimeLine[currentMonthIndex]?.sales;
  const previousMonthSales =
    dashboardData?.results?.stats?.monthlyTimeLine[previousMonthIndex]?.sales;

  const percentageChanges =
    ((totalCurrentMonthSales - totalPreviousMonthSales) /
      totalPreviousMonthSales) *
    100;

  if (percentageChange > 0) {
    icon = <i className="bi bi-arrow-up"></i>;
    colorClass = "text-success";
  } else if (percentageChange < 0) {
    icon = <i className="bi bi-arrow-down"></i>;
    colorClass = "text-danger";
  } else {
    icon = <i className="bi bi-dash"></i>;
    colorClass = "text-muted";
  }

  return (
    <>
      {loading}
      <Sidebar Dash={"dashboard"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-3 d-flex align-items-stretch mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center">
                              <h3>
                                <span>$</span>
                                {dashboarddata?.expectedEarnings?.toFixed(2)}
                              </h3>
                              {/* <div className="Percent_box ms-2">2.2%</div> */}
                            </div>
                          </div>
                          <DashboardDougnetChart />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-stretch mb-4">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="canvas_top d-flex align-items-center">
                              <h3>
                                <span>$</span>
                                {loadings ? (
                                  <Spinner />
                                ) : (
                                  (
                                    totalBarTotals /
                                    dashboardData?.results?.stats?.dailyTimeLine
                                      ?.length
                                  )?.toFixed(1)
                                )}
                              </h3>
                              {/* <div className="Percent_box ms-2">2.2%</div> */}
                              <div className="Percent_box ms-2 d-none">
                                {loadings ? (
                                  <Spinner />
                                ) : (
                                  <span className={colorClass}>
                                    {icon}{" "}
                                    {Math.abs(percentageChange).toFixed(1)}%
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* <canvas className="w-100" id="myChart" /> */}
                            <Barchart dashboardData={dashboardData} />
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
                                {loadings ? (
                                  <Spinner />
                                ) : (
                                  totalMonthTotals?.toFixed(1)
                                )}
                              </h3>
                              <div className="Percent_box ms-2 d-none">
                                {loadings ? (
                                  <Spinner />
                                ) : (
                                  <span className={colorClass}>
                                    {icon}{" "}
                                    {Math.abs(percentageChanges).toFixed(1)}%
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* <canvas id="line-chart" className="w-full w-100" /> */}
                            <DashboardConvaschart
                              dashboardData={dashboardData}
                              loadings={loadings}
                            />
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
                              {dashboarddata?.OrderMonth?.length}
                            </h3>
                            <div className="Percent_box ms-2">
                              {loadings ? (
                                <Spinner />
                              ) : (
                                (
                                  (dashboarddata?.OrderMonth?.length / 200) *
                                  100
                                ).toFixed(1)
                              )}
                              %
                            </div>
                          </div>
                          <div className="col text-secondary">
                            <h6>Orders This Month</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 p-4">
                            <div className="order_this mt-5">
                              <div className="order_top">
                                <strong>200 to Goal</strong>
                                <span>
                                  {(
                                    (dashboarddata?.OrderMonth?.length / 200) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </span>
                              </div>
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{
                                    width: `${(
                                      (dashboarddata?.OrderMonth?.length /
                                        200) *
                                      100
                                    ).toFixed(0)}%`,
                                  }}
                                  aria-valuenow={(
                                    (dashboarddata?.OrderMonth?.length / 200) *
                                    100
                                  ).toFixed(0)}
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
                            <h3 className="p-0">
                              Total:{" "}
                              {isLoading ? (
                                <Spinner />
                              ) : (
                                monthlyUser?.results?.users?.metadate?.[0]
                                  ?.Total
                              )}
                              +
                            </h3>
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
                                {monthlyUser?.results?.users?.users.length <
                                3 ? (
                                  <div>
                                    {monthlyUser?.results?.users?.users?.map(
                                      (data, index) => (
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
                                          />
                                        </Link>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <>
                                    {monthlyUser?.results?.users?.users
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
                                          />
                                        </Link>
                                      ))}
                                    <Link
                                      title="Click For More"
                                      className="heros"
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdrop"
                                      to="#"
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
                                        {
                                          monthlyUser?.results?.users?.users
                                            ?.length
                                        }
                                        +
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
                                {loadings ? (
                                  <Spinner />
                                ) : (
                                  dashboardData?.results?.stats
                                    ?.monthlyTimeLine?.[0]?.averageSale
                                )}
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
                                {loadings ? (
                                  <Spinner />
                                ) : (
                                  dashboardData?.results?.stats
                                    ?.dailyTimeLine?.[0]?.averageSale
                                )}
                              </h3>
                              <div className="Percent_box ms-2">2.2%</div>
                            </div>
                            {/* <canvas id="line-chart1" className="w-full w-100" /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 d-flex align-items-stretch mb-4">
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
                                    <th>Order Id</th>
                                    <th>QTY</th>
                                    <th>PRICE</th>
                                    <th>DISCOUNT</th>
                                    <th>shipping Price</th>
                                    <th>Tax</th>
                                    <th>Grand TOTAL</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dashboardData?.results?.stats?.orders
                                    ?.slice(0, 5)
                                    ?.map((data, index) => (
                                      <tr key={index}>
                                        <td> {index + 1} </td>
                                        <td> {data?._id} </td>
                                        {/* <td>
                                          <div className="product_showw">
                                            <img
                                              src={"assets/img/product1.png"}
                                              alt=""
                                            />
                                            <div className="product_showw_iiner">
                                              <a href="javascript:;">
                                                {data?.productName_en?.slice(
                                                  0,
                                                  8
                                                )}
                                              </a>
                                            </div>
                                          </div>
                                        </td> */}
                                        <td>
                                          {data?.products?.reduce(
                                            (total, product) =>
                                              total + product?.quantity,
                                            0
                                          )}
                                        </td>
                                        <td>${data?.totalAmount}</td>
                                        <td>${data?.discount}</td>
                                        <td>${data?.shippingPrice}</td>
                                        <td>${data?.taxPrice}</td>
                                        <td>{data?.grandTotal || "N/A"}</td>
                                        <td>
                                          <Link
                                            className="comman_btn table_viewbtn ms-2"
                                            to={`/order-details/${data?._id}`}
                                            onClick={() => {
                                              // handleItem(data);
                                              setTimeout(() => {
                                                window?.location?.reload();
                                              }, 500);
                                            }}
                                          >
                                            View
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
                  <div className="col-md-6 d-flex align-items-stretch mb-4 d-none">
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
                            <DashboardDiscountedChart
                              dashboardData={dashboardData}
                              loadings={loadings}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-4 d-none">
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
                              <MDBDataTable
                                bordered
                                displayEntries={false}
                                // searching={false}
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
                  {/* <div className="col-md-4 mb-4">
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
                                <tbody>
                                  {orderList
                                    ?.slice(0, 9)
                                    ?.map((data, index) => (
                                      <tr key={index}>
                                        <td>
                                          <div className="product_showw">
                                            <img
                                              src={
                                                data?.products[0]?.product_Id
                                                  ?.addVarient[0]
                                                  ?.product_Pic[0]
                                              }
                                              alt=""
                                            />
                                            <div className="product_showw_iiner">
                                              <a href="javascript:;">
                                                {trimProductName(
                                                  data?.products[0]?.product_Id
                                                    ?.productName_en
                                                )}
                                              </a>
                                            </div>
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
                                            <div
                                              className={
                                                data?.orderStatus ===
                                                "Cancelled"
                                                  ? "text-danger"
                                                  : data?.orderStatus ===
                                                    "Pending"
                                                  ? "text-warning"
                                                  : data?.orderStatus ===
                                                    "Packed"
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
                                                  : "text-default"
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
                                                    : "#f9f9f9",
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
                  </div> */}
                  <div className="col-md-12 mb-4 d-none">
                    <div className="row mx-0 w-100">
                      <div className="col-12 design_outter_comman shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col d-flex justify-content-between">
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
                              <MDBDataTable
                                bordered
                                displayEntries={false}
                                // searching={false}
                                className="userDatable"
                                hover
                                data={product}
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
                id="closeusermodal"
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
                        {monthlyUser?.results?.users?.users?.map(
                          (data, index) => (
                            <tr key={index}>
                              <td> {index + 1} </td>
                              <td>
                                <Link
                                  to={`/userDetails/${data?._id}`}
                                  className="product_showw2"
                                  onClick={() =>
                                    document
                                      ?.getElementById("closeusermodal")
                                      .click()
                                  }
                                >
                                  <img
                                    src={
                                      data.profile_Pic ||
                                      "assets/img/profile.png"
                                    }
                                    alt=""
                                    style={{
                                      height: "50px",
                                      width: "50px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <div>
                                    <div className="product_showw2_iiner">
                                      <a href="javascript:;">
                                        <strong>{data?.userName}</strong>{" "}
                                      </a>
                                    </div>
                                    <div className="product_showw2_iiner">
                                      <a
                                        href="javascript:;"
                                        className="text-secondary"
                                      >
                                        {data?.mobileNumber}
                                      </a>
                                    </div>
                                  </div>
                                </Link>
                              </td>
                              <td>
                                <div>
                                  <div className="product_showw2_iiner">
                                    <a href="javascript:;">
                                      <strong>
                                        $
                                        {data?.totalAfterDiscount?.[0]?.toFixed(
                                          2
                                        ) || 0.0}
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
                          )
                        )}
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
