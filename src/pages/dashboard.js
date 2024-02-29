import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import GraphDemo from "@/components/GraphDemo";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const tickers = [
  "TATAMOTORS.NS",
  "MARUTI.NS",
  "EICHERMOT.NS",
  "M&M.NS",
  "BAJAJ-AUTO.NS",
  "TVSMOTOR.NS",
  "NESTLEIND.NS",
  "TATACONSU,M.NS",
  "HINDUNILVR.NS",
  "VBL.NS",
  "COLPAL.NS",
  "BRITANNIA.NS",
  "MCDOWELL-N.NS",
  "TITAN.NS",
  "HDFCBANK.NS",
  "ICICIBANK.NS",
  "KOTAKBANK.NS",
  "AXISBANK.NS",
  "INDUSINDBK.NS",
  "SBIN.NS",
  "BANKBARODA.NS",
  "IOB.NS",
  "PNB.NS",
  "UNIONBANK.NS",
  "ULTRACEMCO.NS",
  "SHREECEM.NS",
  "AMBUJACEM.NS",
  "JSWSTEEL.NS",
  "TATASTEEL.NS",
  "JSL.NS",
  "HINDALCO.NS",
  "JINDALSTEL.NS",
  "HINDZINC.NS",
  "VEDL.NS",
  "COALINDIA.NS",
  "BHARTIARTL.NS",
  "DMART.NS",
  "TRENT.NS",
  "DLF.NS",
  "GODREJPROP.NS",
  "OBEROIRLTY.NS",
  "LODHA.NS",
  "LT.NS",
  "HAL.NS",
  "TCS.NS",
  "INFY.NS",
  "HCLTECH.NS",
  "WIPRO.NS",
  "TECHM.NS",
  "LTIM.NS",
  "ADANIPORTS.NS",
  "GRASIM.NS",
  "ITC.NS",
  "SUNPHARMA.NS",
  "DIVISLAB.NS",
  "CIPLA.NS",
  "DRREDDY.NS",
  "APOLLOHOSP.NS",
  "MANKIND.NS",
  "BAJFINANCE.NS",
  "LICI.NS",
  "BAJAJFINSV,.NS",
  "JIOFIN.NS",
  "HDFCLIFE.NS",
  "SBILIFE.NS",
  "CHOLAFIN.NS",
  "NTPC.NS",
  "POWERGRID.NS",
  "ADANIGREEN.NS",
  "SUPREMEIND.NS",
  "RELIANCE.NS",
  "ONGC.NS",
  "IOC.NS",
  "POLYCAB.NS",
  "HAVELLS.NS",
  "SIEMENS.,NS",
  "BERGEPAINT.NS",
  "ASIANPAINT.NS",
  "PIDILITIND.NS",
];

const CompanyList = ({ tickerList, setActiveTicker, activeTicker }) => {
  // console.log(activeTicker);
  useEffect(() => {
    setActiveTicker(tickerList[0]);
  }, [tickerList]);

  const handleClick = (item) => {
    setActiveTicker(item);
  };
  return (
    <div className=" col-span-2">
      <div class="text-xs row-span-2 text-light uppercase bg-alt dark:bg-secDark rounded-t-xl shadow-xl h-20 flex flex-row items-center">
        <h3 class=" text-xl px-6 dark:text-light">Company</h3>
      </div>
      <div class="relative overflow-x-auto  sm:rounded-lg  rounded-b-xl shadow-xl h-[420px]">
        <table class="w-full text-sm text-left rtl:text-right">
          <tbody className="overflow-y-scroll">
            {tickerList.map((item) => {
              // console.log(item);
              return (
                <tr
                  onClick={() => handleClick(item)}
                  class={`bg-secLight dark:bg-alt border-b border-alt dark:border-secLight  hover:bg-acc2 dark:hover:bg-acc2 ${
                    item === activeTicker && "!bg-acc2 dark:!bg-acc2"
                  }`}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-dark dark:text-light whitespace-nowrap "
                  >
                    {item}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GfsInput = ({ placeholder, setter }) => {
  return (
    <input
      className="w-24 ml-5 text-xs placeholder:text-dark placeholder:opacity-60 text-center"
      placeholder={placeholder}
      onChange={setter}
    />
  );
};

const dashboard = ({ mode }) => {
  const [tickerRows, setTickerRows] = useState([]);
  const [activeTicker, setActiveTicker] = useState("");
  const [grandfather, setGrandfather] = useState(200);
  const [father, setFather] = useState(50);
  const [son, setSon] = useState(10);
  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    "Tue Jan 09 2024 12:51:46 GMT+0530 (India Standard Time)"
  );

  const handleSetGF = (e) => {
    const val = e.target.value;
    if (val > 200) {
      e.target.value = 200;
      setGrandfather(200);
    } else setGrandfather(val);
  };

  const handleSetF = (e) => {
    const val = e.target.value;
    if (val > 200) {
      e.target.value = 200;
      setFather(200);
    } else setFather(val);
  };

  const handleSetS = (e) => {
    const val = e.target.value;
    if (val > 200) {
      e.target.value = 200;
      setSon(200);
    } else setSon(val);
  };

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch("./tickers/TICKERS.txt");
        const tickerData = await response.text();

        // Split the file content into an array of rows
        const rows = tickerData.split("\n");
        var tr = [];
        rows.map((row) => {
          row = row.replace(".NS", "");
          tr.push(row);
        });
        setTickerRows(tr);
      } catch (error) {
        console.error("Error fetching tickers:", error.message);
      }
    };

    fetchTickers();
  }, []);

  return (
    <>
      <Head>
        <title>Stoki</title>
        <meta name="description" content="any description" />
      </Head>
      <div>
        <Layout>
          <h2 className="text-2xl text-acc1 font-bold w-36 mb-5 dark:text-acc2">
            DASHBOARD
          </h2>
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-6">
              <div className="w-full flex flex-row">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                {/* <div className="dark:text-light text-dark ml-5">200</div>
                <div className="dark:text-light text-dark ml-5">50</div>
                <div className="dark:text-light text-dark ml-5">10</div> */}
                <GfsInput placeholder="grandfather" setter={handleSetGF} />
                <GfsInput placeholder="father" setter={handleSetF} />
                <GfsInput placeholder="son" setter={handleSetS} />
              </div>
              {activeTicker && (
                <GraphDemo
                  grandfather={grandfather}
                  father={father}
                  son={son}
                  startDate={startDate}
                  mode={mode}
                  classes="h-[500px] w-full"
                  tickerName={activeTicker}
                />
              )}
            </div>
            <CompanyList
              tickerList={tickerRows}
              setActiveTicker={setActiveTicker}
              activeTicker={activeTicker}
            />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default dashboard;
