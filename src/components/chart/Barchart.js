// import React from "react";

// import {
//   BarChart,
//   Bar,
//   Rectangle,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { useSelector } from "react-redux";

// const Barchart = () => {
//   const barChartData = useSelector((state) => state?.charts?.charts);

//   console.log("barChartData", barChartData);

//   const sortedData = barChartData?.salesDAy?.slice()?.sort((a, b) => {
//     const dateA = new Date(a.createdAt?.slice(0, 10));
//     const dateB = new Date(b.createdAt?.slice(0, 10));
//     return dateA - dateB;
//   });

//   const totalCartsTotal = sortedData?.reduce(
//     (acc, curr) => acc + curr.cartsTotal,
//     0
//   );

//   const chartData = sortedData?.map((item) => ({
//     date: new Date(item.createdAt).toLocaleDateString(),
//     total: totalCartsTotal, // Use the total sum for all bars
//   }));

//   const customTickFormatter = (tick) => {
//     const date = new Date(tick);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = date.toLocaleString("default", { month: "short" });
//     return `${day} ${month}`;
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
//           margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
//         >
//           <defs>
//             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <XAxis
//             dataKey="createdAt"
//             tickFormatter={customTickFormatter}
//             type="category"
//           />
//           <YAxis
//             tickFormatter={(value) => `$${value.toFixed(2)}`}
//             label={{
//               angle: -90,
//               position: "insideLeft",
//             }}
//           />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip
//             formatter={(value) => [`$${value.toFixed(2)}k`, "Y Value"]}
//             labelFormatter={(label) => customTickFormatter(label)}
//           />
//           <Bar
//             type="monotone"
//             dataKey="total"
//             stroke="#8884d8"
//             fillOpacity={1}
//             fill="url(#colorUv)"
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </>
//   );
// };

// export default Barchart;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const Barchart = () => {
  const barChartData = useSelector((state) => state?.charts?.charts);

  console.log("barChartData", barChartData);

  const sortedData = barChartData?.salesDAy?.slice()?.sort((a, b) => {
    const dateA = new Date(a.createdAt?.slice(0, 10));
    const dateB = new Date(b.createdAt?.slice(0, 10));
    return dateA - dateB;
  });

  const totalCartsTotal = sortedData?.reduce(
    (acc, curr) => acc + curr.cartsTotal,
    0
  );

  // Prepare data for the chart - ensure only one item in the array
  const chartData = [
    {
      date: new Date(sortedData?.[0]?.createdAt)?.toLocaleDateString(),
      total: totalCartsTotal, // Use the total sum for all bars
    },
  ];

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
          Daily Sales
        </strong>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
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
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}k`, "Y Value"]}
            labelFormatter={(label) => customTickFormatter(label)}
          />
          <Bar
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Barchart;
