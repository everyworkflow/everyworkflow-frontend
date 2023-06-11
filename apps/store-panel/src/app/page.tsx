/*
 * @copyright EveryWorkflow. All rights reserved.
 */

'use client';

import type { NextPage } from "next";
import Head from "next/head";
import { Space, Grid, theme } from "antd";
import BannerSliderComponent from "@everyworkflow/store-panel-bundle/component/banner-slider-component";
import BannerImageSliderComponent from "@everyworkflow/store-panel-bundle/component/banner-image-slider-component";
import BannerNoImageSliderComponent from "@everyworkflow/store-panel-bundle/component/banner-no-image-sider-component";
import ProductGridComponent from "@everyworkflow/store-panel-bundle/component/product-grid-component";

const { useBreakpoint } = Grid;

const Page: NextPage = () => {
    const { token } = theme.useToken();
    const screens = useBreakpoint();
    // experimental
    const smallScreen = !Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => screen[0])
        .includes("md");
    //

    return (
      <div style={{ backgroundColor: token.colorBgContainer, padding: 1 }}>
        <Head>
          <title>StoreFront</title>
        </Head>
        <Space
          direction="vertical"
          size="middle"
          style={{
            margin: smallScreen ? 5 : 10,
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <BannerSliderComponent />
          <BannerImageSliderComponent />
          <BannerNoImageSliderComponent />
          {/* <ProductMultiGridComponent /> */}
          <ProductGridComponent />
        </Space>
      </div>
    );
};

export default Page;
