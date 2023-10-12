// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import CanvasJSReact from "@canvasjs/react-charts";
// import { useSelector } from "react-redux";

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;
// const DashboardConvaschart = () => {
//   const selector = useSelector((state) => state?.charts?.charts);
//   console.log("DashboardConvaschart", selector?.MonthData);

//   const options = {
//     animationEnabled: true,
//     title: {
//       text: "SALES THIS MONTH",
//     },
//     height: 300,
//     axisX: {
//       valueFormatString: "DD MMM",
//       crosshair: {
//         enabled: true,
//         snapToDataPoint: true,
//       },
//     },
//     axisY: {
//       title: "Closing Price (in Dollar)",
//       valueFormatString: "$##0.00k",
//       crosshair: {
//         enabled: true,
//         snapToDataPoint: true,
//         labelFormatter: function (e) {
//           return CanvasJS.formatNumber(e.value, "$##0.00k");
//         },
//       },
//     },
//     data: [
//       {
//         type: "splineArea",
//         xValueFormatString: "DD MMM",
//         yValueFormatString: "$##0.00k",
//         dataPoints: selector?.MonthData?.map((item, index) => {
//           return { x: new Date(item?._id), y: item?.total };
//         }),

//         // dataPoints: [
//         //   { x: new Date("2018-03-01"), y: 85.3 },
//         //   { x: new Date("2018-03-02"), y: 83.97 },
//         //   { x: new Date("2018-03-05"), y: 83.49 },
//         //   { x: new Date("2018-03-06"), y: 84.16 },
//         //   { x: new Date("2018-03-07"), y: 84.86 },
//         //   { x: new Date("2018-03-08"), y: 84.97 },
//         //   { x: new Date("2018-03-09"), y: 85.13 },
//         //   { x: new Date("2018-03-12"), y: 85.71 },
//         //   { x: new Date("2018-03-13"), y: 84.63 },
//         //   { x: new Date("2018-03-14"), y: 84.17 },
//         //   { x: new Date("2018-03-15"), y: 85.12 },
//         //   { x: new Date("2018-03-16"), y: 85.86 },
//         //   { x: new Date("2018-03-19"), y: 85.17 },
//         //   { x: new Date("2018-03-20"), y: 85.99 },
//         //   { x: new Date("2018-03-21"), y: 86.1 },
//         //   { x: new Date("2018-03-22"), y: 85.33 },
//         //   { x: new Date("2018-03-23"), y: 84.18 },
//         //   { x: new Date("2018-03-26"), y: 85.21 },
//         //   { x: new Date("2018-03-27"), y: 85.81 },
//         //   { x: new Date("2018-03-28"), y: 85.56 },
//         //   { x: new Date("2018-03-29"), y: 88.15 },
//         // ],
//       },
//     ],
//   };

//   return (
//     <div>
//       {selector?.MonthData?.length > 0 && <CanvasJSChart options={options} />}
//     </div>
//   );
// };

// export default DashboardConvaschart;
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const DashboardConvaschart = () => {
  const selector = useSelector((state) => state?.charts?.charts);

  const sortedData = selector?.MonthData?.slice()?.sort((a, b) => {
    const dateA = new Date(a._id);
    const dateB = new Date(b._id);
    return dateA - dateB;
  });

  const customTickFormatter = (tick) => {
    const date = new Date(tick);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <strong
          style={{
            textTransform: "uppercase",
            fontWeight: "900",
            fontSize: "22px",
            height: "35px",
            textShadow:
              "0px 0px 0px rgba(0, 0, 0, 0), 1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          SALES THIS MONTH
        </strong>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={sortedData}
          margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="_id"
            tickFormatter={customTickFormatter}
            type="category"
          />
          <YAxis
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            label={{
              angle: -90,
              position: "insideLeft",
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}k`, "Y Value"]}
            labelFormatter={(label) => customTickFormatter(label)}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardConvaschart;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CanvasJSReact from "@canvasjs/react-charts";

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const DashboardConvaschart = () => {
//   const [usersList, setUsersList] = useState([]);
//   const url1 = `${process.env.REACT_APP_APIENDPOINT}admin/dashboards/count/order-dashboards`;

//   useEffect(() => {
//     userManagementList();
//   }, []);

//   const userManagementList = () => {
//     axios
//       .post(url1)
//       .then((response) => {
//         setUsersList(response?.data?.results?.MonthData || []);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };

//   const options = {
//     animationEnabled: true,
//     title: {
//       text: "SALES THIS MONTH",
//     },
//     height: 300,
//     axisX: {
//       valueFormatString: "YYYY-MM-DD",
//       crosshair: {
//         enabled: true,
//         snapToDataPoint: true,
//       },
//     },
//     axisY: {
//       title: "Closing Price (in Dollar)",
//       valueFormatString: "$##0.00k",
//       crosshair: {
//         enabled: true,
//         snapToDataPoint: true,
//         labelFormatter: function (e) {
//           return CanvasJSReact.CanvasJS.formatNumber(e.value, "$##0.00k");
//         },
//       },
//     },
//     data: [
//       {
//         type: "splineArea",
//         xValueFormatString: "YYYY-MM-DD",
//         yValueFormatString: "$##0.00k",
//         dataPoints: usersList.map((data) => ({
//           x: new Date(data._id),
//           y: data.total / 1000,
//         })),
//       },
//     ],
//   };

//   return (
//     <div>
//       <CanvasJSChart options={options} />
//     </div>
//   );
// };

// export default DashboardConvaschart;
