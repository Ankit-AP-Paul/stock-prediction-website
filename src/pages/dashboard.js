import React from "react";
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

const CompanyList = () => {
  return (
    <div className=" col-span-2">
      <div class="text-xs row-span-2 text-light uppercase bg-alt rounded-t-xl shadow-xl h-20 flex flex-row items-center">
        <h3 class=" text-xl px-6">Company</h3>
      </div>
      <div class="relative overflow-x-auto  sm:rounded-lg  rounded-b-xl shadow-xl h-[420px]">
        <table class="w-full text-sm text-left rtl:text-right">
          <tbody className="overflow-y-scroll">
            {tickers.map((item) => {
              return (
                <tr class="bg-secLight border-b border-alt  hover:bg-acc2 ">
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

const about = () => {
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
            <CompanyList />
            <div className="col-span-6">
              <GraphDemo classes="h-[500px] w-full" />
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default about;
