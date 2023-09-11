// import React from "react";
// import CanvasJSReact from "@canvasjs/react-charts";

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const DashboardDougnetChart = () => {
//   const options = {
//     animationEnabled: true,
//     title: {
//       text: "EXPECTED EARNINGS",
//     },
//     height: 300,
//     subtitles: [
//       {
//         text: "71% Positive",
//         verticalAlign: "center",
//         fontSize: 14,
//         dockInsidePlotArea: true,
//       },
//     ],
//     data: [
//       {
//         type: "doughnut",
//         radius: "80%",
//         innerRadius: "55%",
//         showInLegend: true,
//         // indexLabel: "{name}: {y}",
//         yValueFormatString: "#,###'%'",
//         dataPoints: [
//           { name: "Unsatisfied", y: 5 },
//           { name: "Very Unsatisfied", y: 31 },
//           { name: "Very Satisfied", y: 40 },
//           { name: "Satisfied", y: 17 },
//           { name: "Neutral", y: 7 },
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

// export default DashboardDougnetChart;
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

// import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// const DashboardDougnetChart = () => {
//   return <Doughnut data={data} />;
// }

// export default DashboardDougnetChart;
