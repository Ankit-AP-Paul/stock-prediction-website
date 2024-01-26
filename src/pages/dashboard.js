import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import GraphDemo from "@/components/GraphDemo";

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
      <div class="text-xs row-span-2 text-light uppercase bg-alt rounded-t-xl shadow-xl h-20 flex flex-row items-center">
        <h3 class=" text-xl px-6">Company</h3>
      </div>
      <div class="relative overflow-x-auto  sm:rounded-lg  rounded-b-xl shadow-xl h-[420px]">
        <table class="w-full text-sm text-left rtl:text-right">
          <tbody className="overflow-y-scroll">
            {tickerList.map((item) => {
              // console.log(item);
              return (
                <tr
                  onClick={() => handleClick(item)}
                  class={`bg-secLight border-b border-alt  hover:bg-acc2 ${
                    item === activeTicker && "!bg-acc2"
                  }`}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-dark whitespace-nowrap "
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

const dashboard = () => {
  const [tickerRows, setTickerRows] = useState([]);
  const [activeTicker, setActiveTicker] = useState("");
  // console.log(tickerRows);

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
          // console.log(row);
        });
        // Update state with the array of rows
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
          <h2 className="text-2xl text-acc1 font-bold w-36 mb-5">DASHBOARD</h2>
          <div className="grid grid-cols-8 gap-4">
            <CompanyList
              tickerList={tickerRows}
              setActiveTicker={setActiveTicker}
              activeTicker={activeTicker}
            />
            <div className="col-span-6">
              {activeTicker && (
                <GraphDemo
                  classes="h-[500px] w-full"
                  tickerName={activeTicker}
                />
              )}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default dashboard;
