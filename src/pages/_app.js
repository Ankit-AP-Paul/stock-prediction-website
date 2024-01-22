import "@/styles/globals.css";
import Head from "next/head";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
// import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${montserrat.variable} flex flex-row font-mont bg-light  w-full min-h-screen `}
      >
        <Sidebar classes="w-[20%]" />
        <div className="w-[80%]">
          <Header />
          <Component key={router.asPath} {...pageProps} />
          <Footer />
        </div>
      </main>
    </>
  );
}
