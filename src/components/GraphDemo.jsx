import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import { render } from "react-dom";
import Papa from "papaparse";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("./LineChart"), {
  ssr: false,
});
const CandleStick = dynamic(() => import("./CandleStick"), {
  ssr: false,
});
const GraphDemo = ({
  chart,
  classes,
  tickerName,
  mode,
  startDate,
  grandfather,
  father,
  son,
}) => {
  const date = new Date(startDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const [data, setData] = useState([]);
  const [dataCS, setDataCS] = useState([]);
  const [avg50, setAvg50] = useState(0);
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(0);

  // Formatting date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data/" + tickerName + ".NS.csv");
        var csvData = await response.text();
        const rows = csvData.split("\n");
        console.log(startIdx, endIdx);
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i].trim().split(",");
          const date = row[0];
          if (date === formattedDate) {
            setEndIdx(i);
            setStartIdx(i - 15);
            break;
          }
        }
        let closeSum = 0;
        for (let i = endIdx; i >= endIdx - 50; i--) {
          const row = rows[i].trim().split(",");
          const close = parseFloat(row[4]);
          closeSum = closeSum + close;
        }
        setAvg50(closeSum / 50);

        if (endIdx - 15 >= 0) setStartIdx(endIdx - 15);
        else setStartIdx(0);
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

            const dataArrayCS = result.data.slice(startIdx, endIdx).map(
              ({ Date, Open, High, Low, Close }) =>
                Open &&
                High &&
                Low &&
                Close && {
                  x: parseDate(Date),
                  y: [
                    Open.toFixed(2),
                    High.toFixed(2),
                    Low.toFixed(2),
                    Close.toFixed(2),
                  ],
                }
            );

            // console.log(dataArrayCS);
            setDataCS(dataArrayCS);

            const avg50array = result.data.slice(startIdx, endIdx).map(
              ({ Date, Close }) =>
                Close && {
                  x: parseDate(Date),
                  y: avg50,
                }
            );

            const gf = calMA(rows, grandfather)
              .slice(startIdx, endIdx)
              .map(({ date, movingAverage }) => ({
                x: parseDate(date),
                y: movingAverage,
              }));

            const f = calMA(rows, father)
              .slice(startIdx, endIdx)
              .map(({ date, movingAverage }) => ({
                x: parseDate(date),
                y: movingAverage,
              }));

            const s = calMA(rows, son)
              .slice(startIdx, endIdx)
              .map(({ date, movingAverage }) => ({
                x: parseDate(date),
                y: movingAverage,
              }));

            const data2 = [
              {
                id: tickerName,
                color: mode === "dark" ? "#DDFFF5" : "#04111A",
                data: dataArray,
              },
              {
                id: "50 days Avg",
                color: mode === "dark" ? "#DDFFF5" : "#04111A",
                data: avg50array,
              },
              {
                id: "Grandfather",
                color: mode === "dark" ? "#DDFFF5" : "#04111A",
                data: gf,
              },
              {
                id: "Father",
                color: mode === "dark" ? "#DDFFF5" : "#04111A",
                data: f,
              },
              {
                id: "Son",
                color: mode === "dark" ? "#DDFFF5" : "#04111A",
                data: s,
              },
            ];
            setData(data2);
            // console.log(dataCS[1].y[0]);
            // console.log(data);
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
  }, [
    startIdx,
    endIdx,
    tickerName,
    formattedDate,
    avg50,
    grandfather,
    father,
    son,
  ]);

  const calMA = (rows, n) => {
    if (n === 0) return undefined;
    const data = rows.map((row) => {
      const rowArray = row.trim().split(",");

      return {
        date: rowArray[0],
        close: parseFloat(rowArray[4]),
      };
    });

    const movingAverageData = [];

    for (let i = 1; i < data.length; i++) {
      if (i < n - 1) {
        movingAverageData.push({ date: data[i].date, movingAverage: 0 });
      } else {
        const sum = data
          .slice(i - n + 1, i + 1)
          .reduce((acc, val) => acc + val.close, 0);
        const average = sum / n;
        movingAverageData.push({ date: data[i].date, movingAverage: average });
      }
    }

    return movingAverageData;
  };

  const parseDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };

    if (dateString) {
      const ds = new Date(dateString);
      const formatted_date = ds.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return formatted_date;
    }

    return null;
  };

  // const handleWheel = (e) => {
  //   // Increase or decrease the number of rows based on scroll direction
  //   const delta = e.deltaY;
  //   const step = delta > 0 ? 1 : -1;
  //   // console.log(startIdx);
  //   if (startIdx == 0) {
  //     if (step == -1 && endIdx <= 20 && endIdx >= 6) setEndIdx(endIdx - 1);
  //     if (step == 1 && endIdx < 20 && endIdx >= 5) setEndIdx(endIdx + 1);
  //   }
  //   if (startIdx > 0) {
  //     if (step == -1 && endIdx - startIdx >= 6) {
  //       setEndIdx(endIdx - 1);
  //       setStartIdx(startIdx + 1);
  //     }
  //     if (step == 1 && endIdx - startIdx <= 20) {
  //       setEndIdx(endIdx + 1);
  //       setStartIdx(startIdx - 1);
  //     }
  //     // step == 1 && setEndIdx(endIdx + 1) && setStartIdx(startIdx + 1);
  //   }
  //   if (endIdx == datalen - 1) {
  //     if (step == -1 && endIdx - startIdx <= 15) setEndIdx(startIdx + 1);
  //     if (step == 1 && endIdx - startIdx >= 5) setEndIdx(startIdx - 1);
  //   }

  //   // startIdx + step >= 0 && setStartIdx(startIdx + step);
  //   // endIdx + step >= 5 && setEndIdx(endIdx + step);
  // };

  // const handleMouseDown = (e) => {
  //   // setIsDragging(true);
  //   setPrevScreenX(e.screenX);
  // };

  // const handleMouseMove = (e) => {
  //   if (isDragging) {
  //     const delta = e.screenX - prevScreenX;
  //     setPrevScreenX(e.screenX);
  //     delta >= 0 ? setIsMovingRight(true) : setIsMovingRight(false);
  //     // console.log(isMovingRight);
  //     if (!isMovingRight) {
  //       startIdx + 1 <= datalen - 20 && setStartIdx(startIdx + 1);
  //       endIdx + 1 <= datalen - 1 && setEndIdx(endIdx + 1);
  //     } else {
  //       startIdx - 1 >= 0 && setStartIdx(startIdx - 1);
  //       endIdx - 1 >= 20 && setEndIdx(endIdx - 1);
  //     }
  //   }
  // };

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
      // onWheel={handleWheel}
      // onMouseDown={handleMouseDown}
      // onMouseMove={handleMouseMove}
      // onMouseUp={handleMouseUp}
      // onMouseOut={handleMouseOut}
      className={`bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 pr-5 rounded-xl cursor-default  ${classes}`}
      style={{ overflow: "hidden", userSelect: "none" }}
    >
      {chart === 1 ? (
        data && <LineChart mode={mode} width="100%" height="100%" data={data} />
      ) : (
        <CandleStick mode={mode} width="100%" height="100%" data={dataCS} />
      )}
    </div>
  );
};

export default GraphDemo;
