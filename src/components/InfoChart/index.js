import React from "react";
import ReactApexChart from "react-apexcharts";

const series = [
  {
    name: "Sales",
    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
  },
];
const options = {
  chart: {
    height: 350,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  forecastDataPoints: {
    count: 7,
  },
  stroke: {
    width: 5,
    curve: "smooth",
  },
  //   xaxis: {
  //     type: "datetime",
  //     categories: [
  //       "1/11/2000",
  //       "2/11/2000",
  //       "3/11/2000",
  //       "4/11/2000",
  //       "5/11/2000",
  //       "6/11/2000",
  //       "7/11/2000",
  //       "8/11/2000",
  //       "9/11/2000",
  //       "10/11/2000",
  //       "11/11/2000",
  //       "12/11/2000",
  //       "1/11/2001",
  //       "2/11/2001",
  //       "3/11/2001",
  //       "4/11/2001",
  //       "5/11/2001",
  //       "6/11/2001",
  //     ],
  //     tickAmount: 10,
  //     labels: {
  //       formatter: function (value, timestamp, opts) {
  //         return opts.dateFormatter(new Date(timestamp), "dd MMM");
  //       },
  //     },
  //   },
  title: {
    text: "Forecast",
    align: "left",
    style: {
      fontSize: "16px",
      color: "#666",
    },
  },
  grid: {
    show: false, // you can either change hear to disable all grids
    // xaxis: {
    //   lines: {
    //     show: false, //or just here to disable only x axis grids
    //   },
    // },
    // yaxis: {
    //   lines: {
    //     show: true, //or just here to disable only y axis
    //   },
    // },
  },
  xaxis: {
    show: false,
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#FDD835"],
      shadeIntensity: 1,
      type: "horizontal",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100],
    },
  },
  yaxis: {
    show: false,
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
};

const InfoChart = () => {
  return (
    <div>
      <ReactApexChart
        series={series}
        options={options}
        type="line"
        height={200}
      />
    </div>
  );
};

export default InfoChart;
