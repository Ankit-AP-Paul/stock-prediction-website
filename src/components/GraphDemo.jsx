import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import dynamic from "next/dynamic";
import { fetchDataFromApi } from "./util/api";
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
  // const [timeSeries, setTimeSeries] = useState([]);

  const makeApiCall = async (ticker) => {
    const res = await fetchDataFromApi(ticker);
    // console.log(res);
    // setTimeSeries(res);
    // console.log(timeSeries);
    return res;
  };
  // Formatting date

  useEffect(() => {
    // console.log(tickerName);
    const fetchData = async () => {
      try {
        const timeSeries =
          !!tickerName && (await makeApiCall(tickerName + ".NS"));
        for (let i = 0; i < timeSeries.length; i++) {
          const row = timeSeries[i];
          // console.log(row);
          // console.log(row);
          const date = row.Date;
          if (date === formattedDate) {
            setEndIdx(i);
            setStartIdx(i - 15);
            break;
          }
        }

        let closeSum = 0;
        for (let i = endIdx; i >= endIdx - 50; i--) {
          const row = timeSeries[i];
          const close = parseFloat(row.Close);
          closeSum = closeSum + close;
        }
        setAvg50(closeSum / 50);

        if (endIdx - 15 >= 0) setStartIdx(endIdx - 15);
        else setStartIdx(0);

        let dataArray = [];
        let dataArrayCS = [];
        let avg50array = [];
        let gf = [];
        let f = [];
        let s = [];

        for (let i = startIdx; i <= endIdx; i++) {
          const row = timeSeries[i];
          const close = parseFloat(row.Close);
          const open = parseFloat(row.Open);
          const high = parseFloat(row.High);
          const low = parseFloat(row.Low);
          const date = parseDate(row.Date);
          !!close &&
            dataArray.push({
              x: date,
              y: close,
            });

          !!grandfather &&
            gf.push({
              x: calMA2(timeSeries, grandfather)[i].date,
              y: calMA2(timeSeries, grandfather)[i].movingAverage,
            });
          !!father &&
            f.push({
              x: calMA2(timeSeries, father)[i].date,
              y: calMA2(timeSeries, father)[i].movingAverage,
            });
          !!son &&
            s.push({
              x: calMA2(timeSeries, son)[i].date,
              y: calMA2(timeSeries, son)[i].movingAverage,
            });
          // f.push(calMA2(timeSeries, father));
          // s.push(calMA2(timeSeries, son));
          // console.log(calMA2(timeSeries, 200)[i]);
          open &&
            high &&
            low &&
            close &&
            dataArrayCS.push({
              x: date,
              y: [
                open.toFixed(2),
                high.toFixed(2),
                low.toFixed(2),
                close.toFixed(2),
              ],
            });

          setDataCS(dataArrayCS);
        }

        const data2 = [
          {
            id: tickerName,
            data: dataArray,
          },
          {
            id: "50 days Avg",
            data: avg50array,
          },
          {
            id: "Grandfather",
            data: gf,
          },
          {
            id: "Father",
            data: f,
          },
          {
            id: "Son",
            data: s,
          },
        ];
        setData(data2);
      } catch (error) {
        console.log(error);
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

  const calMA2 = (rows, n) => {
    // console.log(rows, n);
    if (n === 0 || !n) return undefined;

    const data = rows.map((row) => {
      return {
        date: row.Date,
        close: parseFloat(row.Close),
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
