import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
const about = () => {
  return (
    <>
      <Head>
        <title>Stoki</title>
        <meta name="description" content="any description" />
      </Head>
      <div>
        <Layout>About</Layout>
      </div>
    </>
  );
};

export default about;
