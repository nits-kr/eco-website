import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Barchart = () => {
  const options = {
    title: {
      text: " Daily Sales",
    },
    height: 300,
    dataPointWidth: 10,
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
          { label: "Apple", y: 10 },
          { label: "Orange", y: 15 },
          { label: "Banana", y: 5 },
          { label: "Mango", y: 10 },
          { label: "Grape", y: 18 },
          { label: "Mango", y: 10 },
          { label: "Grape", y: 8 },
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

export default Barchart;

// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// // import faker from "faker";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// const generateRandomData = () => {
//   // return labels.map(() => faker.datatype.number({ min: 0, max: 1000 }));
//   return labels.map(() => Math.floor(Math.random() * 1000));
// };

// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: generateRandomData(),
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: generateRandomData(),
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

// function Barchart() {
//   return <Bar options={options} data={data} />;
// }

// export default Barchart;
