/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import "antd/dist/reset.css";
import "/public/antd.min.css";
import { Inter } from "next/font/google";
import HeaderComponent from "@everyworkflow/store-panel-bundle/component/header-component";
import FooterComponent from "@everyworkflow/store-panel-bundle/component/footer-component";
import RootPanelComponent from "@everyworkflow/panel-bundle/component/root-panel-component";
import Remote from "@everyworkflow/panel-bundle/service/remote";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Storefront - EveryWorkflow",
  description: "This is description",
};

const getRemoteRouteData = async (pathname: string) => {
  let currentPathName = pathname;
  if (currentPathName === "/") {
    currentPathName = "/home";
  }
  try {
    const response = await Remote.get(`/url-rewrite${currentPathName}`);
    console.log("response -->", response);
  } catch (error: any) {}
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const remoteRouteData = await getRemoteRouteData(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <RootPanelComponent
          // disableThemeProvider={true}
          disableInlineThemeToken={true}
          initialThemeToken={{
            colorPrimary: "#52c41a",
            colorBgContainer: "#f1f3f6",
          }}
        >
          <>
            <HeaderComponent />
            {children}
            <FooterComponent />
          </>
        </RootPanelComponent>
      </body>
    </html>
  );
}
