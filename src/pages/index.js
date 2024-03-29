import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import GraphDemo from "@/components/GraphDemo";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <>
      <Head>
        <title>Stoki</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="w-full">
        <Layout></Layout>
      </div>
    </>
  );
}
