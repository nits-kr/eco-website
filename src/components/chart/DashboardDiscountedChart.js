// import React from "react";
// import CanvasJSReact from "@canvasjs/react-charts";

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;
// const DashboardDiscountedChart = () => {
//   const options = {
//     animationEnabled: true,
//     // theme: "light2",
//     title: {
//       text: "Discounted Product Sales",
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
//           return "$" + CanvasJS.formatNumber(e.value, "$##0.00k");
//         },
//       },
//     },
//     data: [
//       {
//         // type: "area",
//         type: "splineArea",
//         xValueFormatString: "DD MMM",
//         yValueFormatString: "$##0.00k",
//         dataPoints: [
//           { x: new Date("2018-03-01"), y: 85.3 },
//           { x: new Date("2018-03-02"), y: 83.97 },
//           { x: new Date("2018-03-05"), y: 83.49 },
//           { x: new Date("2018-03-06"), y: 84.16 },
//           { x: new Date("2018-03-07"), y: 84.86 },
//           { x: new Date("2018-03-08"), y: 84.97 },
//           { x: new Date("2018-03-09"), y: 85.13 },
//           { x: new Date("2018-03-12"), y: 85.71 },
//           { x: new Date("2018-03-13"), y: 84.63 },
//           { x: new Date("2018-03-14"), y: 84.17 },
//           { x: new Date("2018-03-15"), y: 85.12 },
//           { x: new Date("2018-03-16"), y: 85.86 },
//           { x: new Date("2018-03-19"), y: 85.17 },
//           { x: new Date("2018-03-20"), y: 85.99 },
//           { x: new Date("2018-03-21"), y: 86.1 },
//           { x: new Date("2018-03-22"), y: 85.33 },
//           { x: new Date("2018-03-23"), y: 84.18 },
//           { x: new Date("2018-03-26"), y: 85.21 },
//           { x: new Date("2018-03-27"), y: 85.81 },
//           { x: new Date("2018-03-28"), y: 85.56 },
//           { x: new Date("2018-03-29"), y: 88.15 },
//         ],
//       },
//     ],
//   };

//   return (
//     <div>
//       <CanvasJSChart options={options} />
//     </div>
//   );
// };

// export default DashboardDiscountedChart;

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

const data = [
  { x: new Date("2018-03-01"), y: 85.3 },
  { x: new Date("2018-03-02"), y: 83.97 },
  { x: new Date("2018-03-05"), y: 83.49 },
  { x: new Date("2018-03-06"), y: 84.16 },
  { x: new Date("2018-03-07"), y: 84.86 },
  { x: new Date("2018-03-08"), y: 84.97 },
  { x: new Date("2018-03-09"), y: 85.13 },
  { x: new Date("2018-03-12"), y: 85.71 },
  { x: new Date("2018-03-13"), y: 84.63 },
  { x: new Date("2018-03-14"), y: 84.17 },
  { x: new Date("2018-03-15"), y: 85.12 },
  { x: new Date("2018-03-16"), y: 85.86 },
  { x: new Date("2018-03-19"), y: 85.17 },
  { x: new Date("2018-03-20"), y: 85.99 },
  { x: new Date("2018-03-21"), y: 86.1 },
  { x: new Date("2018-03-22"), y: 85.33 },
  { x: new Date("2018-03-23"), y: 84.18 },
  { x: new Date("2018-03-26"), y: 85.21 },
  { x: new Date("2018-03-27"), y: 85.81 },
  { x: new Date("2018-03-28"), y: 85.56 },
  { x: new Date("2018-03-29"), y: 88.15 },
];
//  const options = {
//     animationEnabled: true,
//     // theme: "light2",
//     title: {
//       text: "Discounted Product Sales",
//     },
//     height: 300,
//     axisX: {
//       valueFormatString: "DD MMM",
//       crosshair: {
//         enabled: true,
//         snapToDataPoint: true,
//       },
//     },
//   };
const customTickFormatter = (tick) => {
  const date = new Date(tick);
  const day = date.getDate().toString().padStart(2, "0"); // Format day as 2 digits
  const month = date.toLocaleString("default", { month: "short" }); // Get abbreviated month name
  return `${day} ${month}`;
};
const formatYAxisTick = (value) => `$${value.toFixed(2)}k`;

function DashboardDiscountedChart() {
  const minYValue = Math.min(...data.map((item) => item.y));
  const minXDate = new Date("2018-03-01"); // Minimum date for the x-axis

  // Find the minimum and maximum dates in your data
  const minDate = new Date("2018-03-03"); // Set the minimum date as 3 Mar
  const maxDate = new Date(Math.max(...data.map((item) => item.x)));
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
            // fontFamily: "Holtwood One SC, sans-serif",
            fontWeight: "900",
            fontSize: "22px",
            height: "35px",
            textShadow: "0px 0px 0px rgba(0, 0, 0, 0), 1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          Discounted Product Sales
        </strong>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 2, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="x"
            tickFormatter={customTickFormatter}
            type="category"
            domain={[minXDate, "auto"]} // Set the minimum x-axis value
          />
          <YAxis
            tickFormatter={formatYAxisTick} // Use the new tick formatter
            label={{
              // value: "Closing Price (in Dollar)",
              angle: -90,
              position: "insideLeft",
            }}
            domain={[minYValue, "auto"]} // Set the minimum y-axis value
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}k`, "Y Value"]} // Update tooltip format
            labelFormatter={(label) => customTickFormatter(label)}
          />
          <Area
            type="monotone"
            dataKey="y"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default DashboardDiscountedChart;
