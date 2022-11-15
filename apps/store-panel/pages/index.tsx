import BannerSliderComponent from "@everyworkflow/store-panel-bundle/component/banner-slider-component";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>StoreFront</title>
      </Head>
      <BannerSliderComponent />
      <div className="container">
        <div
          style={{
            padding: "16px 0",
            textAlign: "center",
          }}
        >
          <h1>New Arrivals</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
