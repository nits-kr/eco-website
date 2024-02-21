import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DashboardDougnetChart = () => {
  const options = {
    animationEnabled: true,
    title: {
      text: "EXPECTED EARNINGS",
    },
    height: 300,
    subtitles: [
      {
        text: "71% Positive",
        verticalAlign: "center",
        fontSize: 14,
        dockInsidePlotArea: true,
      },
    ],
    legend: {
      verticalAlign: "top",
      horizontalAlign: "center",
      fontSize: 14,
      layout: "vertical", // Align legend items in a vertical column
    },
    data: [
      {
        type: "doughnut",
        radius: "80%",
        innerRadius: "55%",
        showInLegend: true,
        // indexLabel: "{name}: {y}",
        yValueFormatString: "$#,##0",
        dataPoints: [
          { name: "Shoes", y: 7660 },
          { name: "Gaming", y: 2820 },
          { name: "Others", y: 45257 },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default DashboardDougnetChart;
