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
import { Spinner } from "react-bootstrap";

const DashboardConvaschart = ({ dashboardData, loadings }) => {
  const sortedData = dashboardData?.results?.stats?.monthlyTimeLine
    ?.slice()
    ?.sort((a, b) => {
      const dateA = new Date(a._id);
      const dateB = new Date(b._id);
      return dateA - dateB;
    });

  const customTickFormatter = (tick) => {
    const date = new Date(tick);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    return `${month}`;
  };

  const formatYAxisLabel = (value) => {
    if (Math.abs(value) >= 1.0e9) {
      return (value / 1.0e9).toFixed(1) + "B";
    }
    if (Math.abs(value) >= 1.0e6) {
      return (value / 1.0e6).toFixed(1) + "M";
    }
    if (Math.abs(value) >= 1.0e3) {
      return (value / 1.0e3).toFixed(1) + "k";
    }
    return value;
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

      {loadings ? (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="mt-5">
            <Spinner />
          </div>
        </div>
      ) : (
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
              // tickFormatter={(value) => `$${value.toFixed(2)}`}
              tickFormatter={(value) => formatYAxisLabel(value)}
              label={{
                angle: -90,
                position: "insideLeft",
              }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              formatter={(value) => [`$${value.toFixed(1)}`, "Y Value"]}
              // formatter={(value) => [`$${value.toFixed(2)}k`, "Y Value"]}
              labelFormatter={(label) => customTickFormatter(label)}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default DashboardConvaschart;
