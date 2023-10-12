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

const DashboardDiscountedChart = () => {
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
          Discounted Product Sales
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

export default DashboardDiscountedChart;
