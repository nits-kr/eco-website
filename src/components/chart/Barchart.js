// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const Barchart = ({ dashboardData }) => {
//   const sortedData = dashboardData?.results?.stats?.dailyTimeLine
//     ?.slice()
//     ?.sort((a, b) => {
//       const dateA = new Date(a._id);
//       const dateB = new Date(b._id);
//       return dateA - dateB;
//     });

//   const totalCartsTotal = sortedData?.reduce(
//     (acc, curr) => acc + curr.sales,
//     0
//   );

//   const chartData = sortedData?.slice(0, 7)?.map((item) => ({
//     date: new Date(item._id).toLocaleDateString(),
//     sales: item.sales,
//   }));

//   console.log("chartData", chartData);

//   const customTickFormatter = (tick) => {
//     const date = new Date(tick);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = date.toLocaleString("default", { month: "short" });
//     return `${day} ${month}`;
//   };

//   const formatYAxisLabel = (value) => {
//     if (Math.abs(value) >= 1.0e9) {
//       return (value / 1.0e9).toFixed(1) + "B";
//     }
//     if (Math.abs(value) >= 1.0e6) {
//       return (value / 1.0e6).toFixed(1) + "M";
//     }
//     if (Math.abs(value) >= 1.0e3) {
//       return (value / 1.0e3).toFixed(1) + "k";
//     }
//     return value;
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <strong
//           style={{
//             textTransform: "uppercase",
//             fontWeight: "900",
//             fontSize: "22px",
//             height: "35px",
//             textShadow:
//               "0px 0px 0px rgba(0, 0, 0, 0), 1px 1px 2px rgba(0, 0, 0, 0.2)",
//           }}
//         >
//           Daily Sales
//         </strong>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           data={chartData}
//           margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="date"
//             tickFormatter={customTickFormatter}
//             interval={2}
//             angle={-45}
//             textAnchor="end"
//           />
//           <YAxis
//             tickFormatter={(value) => formatYAxisLabel(value)}
//             label={{
//               angle: -90,
//               position: "insideLeft",
//             }}
//           />
//           <Tooltip
//             formatter={(value) => [`$${value.toFixed(1)}`, "Y Value"]}
//             labelFormatter={(label) => customTickFormatter(label)}
//           />
//           <Bar
//             type="monotone"
//             dataKey="sales"
//             stroke="#8884d8"
//             fillOpacity={1}
//             // entry.sales > 500 ? "#82ca9d" : "#8884d8";
//             fill="#8884d8"
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </>
//   );
// };

// export default Barchart;

import React from "react";
import moment from "moment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Barchart = ({ dashboardData }) => {
  // Filter data for the current month
  const currentMonth = moment().format("YYYY-MM");
  const sortedData = dashboardData?.results?.stats?.dailyTimeLine
    ?.filter((item) => moment(item._id).format("YYYY-MM") === currentMonth)
    ?.sort((a, b) => {
      const dateA = new Date(a._id);
      const dateB = new Date(b._id);
      return dateA - dateB;
    });

  const totalCartsTotal = sortedData?.reduce(
    (acc, curr) => acc + curr.sales,
    0
  );

  const chartData = sortedData?.slice(-7)?.map((item) => ({
    date: new Date(item._id).toLocaleDateString(),
    sales: item.sales,
  }));

  console.log("chartData", chartData);

  const customTickFormatter = (tick) => {
    const date = new Date(tick);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  // const formatYAxisLabel = (value) => {
  //   if (Math.abs(value) >= 1.0e9) {
  //     return (value / 1.0e9).toFixed(1) + "B";
  //   }
  //   if (Math.abs(value) >= 1.0e6) {
  //     return (value / 1.0e6).toFixed(1) + "M";
  //   }
  //   if (Math.abs(value) >= 1.0e3) {
  //     return (value / 1.0e3).toFixed(1) + "k";
  //   }
  //   return value;
  // };

  const formatYAxisLabel = (value) => {
    const formattedValue =
      Math.abs(value) >= 1.0e9
        ? "$" + (value / 1.0e9).toFixed(1) + "B"
        : Math.abs(value) >= 1.0e6
        ? "$" + (value / 1.0e6).toFixed(1) + "M"
        : Math.abs(value) >= 1.0e3
        ? "$" + (value / 1.0e3).toFixed(1) + "k"
        : "$" + value;

    return formattedValue;
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
          Daily Sales
        </strong>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={customTickFormatter}
            interval={1}
            angle={-45}
            textAnchor="end"
            tick={{ fontSize: 10 }}
          />
          <YAxis
            tickFormatter={(value) => formatYAxisLabel(value)}
            label={{
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(1)}`, "Y Value"]}
            labelFormatter={(label) => customTickFormatter(label)}
          />
          <Bar
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            fillOpacity={1}
            // entry.sales > 500 ? "#82ca9d" : "#8884d8";
            fill="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Barchart;
