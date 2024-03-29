import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactDOM from "react-dom";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const LineChart = ({ mode, data }) => {
  const lines = [
    {
      name: "Close",
      data: data[0]?.data,
    },
    {
      name: "50Days Avg",
      data: data[1]?.data,
    },
    {
      name: "Grandfather",
      data: data[2]?.data,
    },
    {
      name: "Father",
      data: data[3]?.data,
    },
    {
      name: "Son",
      data: data[4]?.data,
    },
  ];

  const col = mode === "dark" ? "#DDFFF5" : "#04111A";

  const opt = {
    chart: {
      foreColor: col,
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },

      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };
  // console.log(lines[0]);
  const [series, setSeries] = useState(lines);

  const [options, setOptions] = useState(opt);

  useEffect(() => {
    setSeries(lines);
    setOptions(opt);
  }, [data, mode]);

  return (
    <div className="h-full mt-4">
      <div id="chart" className="h-[90%] ">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={"100%"}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineChart;
