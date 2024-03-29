import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactDOM from "react-dom";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const CandleStick = ({ data, mode }) => {
  const col = mode === "dark" ? "#DDFFF5" : "#04111A";

  const opt = {
    chart: {
      type: "candlestick",
      height: 350,
      foreColor: col,
    },
  };
  const [series, setSeries] = useState([
    {
      data: data,
    },
  ]);

  const [options, setOptions] = useState(opt);

  useEffect(() => {
    setSeries([
      {
        data: data,
      },
    ]);
    setOptions(opt);
  }, [data, mode]);

  return (
    <div className="h-full mt-4">
      <div id="chart" className="h-full">
        {typeof window !== undefined && (
          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={"100%"}
          />
        )}
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CandleStick;
