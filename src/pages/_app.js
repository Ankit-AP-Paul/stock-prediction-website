import "@/styles/globals.css";
import Head from "next/head";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import useThemeSwitcher from "@/components/hooks/useThemeSwitcher";
// import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [mode, setMode] = useThemeSwitcher();
  const [isSidebarOpen, setIsSidebarOpen] = useState("true");
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${montserrat.variable} flex flex-row font-mont bg-light dark:bg-dark w-full min-h-screen `}
      >
        <Sidebar classes={isSidebarOpen ? "w-[20%]" : "hidden"} />
        <div className={isSidebarOpen ? "w-[80%]" : "w-full"}>
          <Header
            mode={mode}
            setMode={setMode}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Component key={router.asPath} {...pageProps} mode={mode} />
          <Footer />
        </div>
      </main>
    </>
  );
}
