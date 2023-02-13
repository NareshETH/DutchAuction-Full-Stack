import Head from "next/head";
import Home from "./components/Home";

export default function Index() {
  return (
    <div>
      <Head>
        <title>DUTCH AUCTION</title>
        <meta name="DUTCH AUCTION" content="CREATED BY NARESH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </div>
  );
}
