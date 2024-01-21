import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import GraphDemo from "@/components/GraphDemo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Stoki</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div>
        <Layout>
          Home
          <GraphDemo />
        </Layout>
      </div>
    </>
  );
}
