import React, { useEffect, useState } from "react";
import Papa from "papaparse";
// import OverviewChart from "./OverviewChart";
import dynamic from "next/dynamic";

const OverviewChart = dynamic(() => import("./OverviewChart"), {
  ssr: false,
});

const GraphDemo = ({ classes, tickerName }) => {
  const [data, setData] = useState([]);
  const [datalen, setDatalen] = useState(0);
  // console.log(datalen);
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(15);
  const [isDragging, setIsDragging] = useState(false);
  const [prevScreenX, setPrevScreenX] = useState(null);
  const [isMovingRight, setIsMovingRight] = useState(false);

  // console.log(tickerName);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data/" + tickerName + ".NS.csv");
        var csvData = await response.text();

        const rows = csvData.split("\n");
        setDatalen(rows.length - 1);
        const header = rows[0];
        const reversedRows = [header, ...rows.slice(1).reverse()];
        var date_close = [];
        reversedRows.map((row) => {
          const cols = row.split(",");
          if (cols[0] && cols[4]) {
            // console.log(cols[0] + "," + cols[4]);
            date_close.push(cols[0] + "," + cols[4]);
          }
        });

        // Join the reversed rows back into CSV data
        csvData = date_close.join("\n");

        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: function (result) {
            const dataArray = result.data.slice(startIdx, endIdx).map(
              ({ Date, Close }) =>
                Close && {
                  x: parseDate(Date),
                  y: Close,
                }
            );

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
  }, [startIdx, endIdx, tickerName]);

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

  const handleWheel = (e) => {
    // Increase or decrease the number of rows based on scroll direction
    const delta = e.deltaY;
    const step = delta > 0 ? 1 : -1;
    // console.log(startIdx);
    if (startIdx == 0) {
      if (step == -1 && endIdx <= 20 && endIdx >= 6) setEndIdx(endIdx - 1);
      if (step == 1 && endIdx < 20 && endIdx >= 5) setEndIdx(endIdx + 1);
    }
    if (startIdx > 0) {
      if (step == -1 && endIdx - startIdx >= 6) {
        setEndIdx(endIdx - 1);
        setStartIdx(startIdx + 1);
      }
      if (step == 1 && endIdx - startIdx <= 20) {
        setEndIdx(endIdx + 1);
        setStartIdx(startIdx - 1);
      }
      // step == 1 && setEndIdx(endIdx + 1) && setStartIdx(startIdx + 1);
    }

    // startIdx + step >= 0 && setStartIdx(startIdx + step);
    // endIdx + step >= 5 && setEndIdx(endIdx + step);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setPrevScreenX(e.screenX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const delta = e.screenX - prevScreenX;
      setPrevScreenX(e.screenX);
      delta >= 0 ? setIsMovingRight(true) : setIsMovingRight(false);
      // console.log(startIdx, endIdx);
      console.log(datalen);

      if (!isMovingRight) {
        startIdx + 1 <= datalen - 20 && setStartIdx(startIdx + 1);
        endIdx + 1 <= datalen - 1 && setEndIdx(endIdx + 1);
      } else {
        startIdx - 1 >= 0 && setStartIdx(startIdx - 1);
        endIdx - 1 >= 20 && setEndIdx(endIdx - 1);
      }
    }
  };

  const handleMouseOut = () => {
    setIsDragging(false);
    // console.log("Out");
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setPrevScreenX(null);
  };
  return (
    <div
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      className={`bg-dark bg-opacity-10 rounded-xl cursor-default  ${classes}`}
      style={{ overflow: "hidden", userSelect: "none" }}
    >
      <OverviewChart data={data} />
    </div>
  );
};

export default GraphDemo;
