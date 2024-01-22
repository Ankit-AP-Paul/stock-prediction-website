import React, { useEffect, useState } from "react";
import Papa from "papaparse";
// import OverviewChart from "./OverviewChart";
import dynamic from "next/dynamic";

const OverviewChart = dynamic(() => import("./OverviewChart"), {
  ssr: false,
});

const GraphDemo = ({ classes }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./ITC.csv");
        const csvData = await response.text();

        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: function (result) {
            // Process only the first 30 rows
            const dataArray = result.data
              .slice(0, 30)
              .map(({ Date, Close }) => ({
                x: parseDate(Date), // Use a custom function to parse the date
                y: Close,
              }));

            // console.log(dataArray);
            const data2 = [
              {
                id: "ITC",
                data: dataArray,
              },
            ];
            setData(data2);
          },
          error: function (error) {
            console.error("Error parsing CSV:", error.message);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error.message);
      }
    };

    fetchData();
  }, []);

  const parseDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    // Check if dateString is not null before splitting
    if (dateString) {
      const parts = dateString.split("-");
      return new Date(parts[2], parts[1] - 1, parts[0]).toLocaleDateString(
        "en-US",
        options
      );
    }
    // Return null or handle the case when dateString is null
    return null;
  };
  // console.log(data);
  return (
    <div
      className={`bg-dark bg-opacity-10 rounded-xl overflow-hidden ${classes}`}
    >
      <OverviewChart data={data} />
    </div>
  );
};

export default GraphDemo;
