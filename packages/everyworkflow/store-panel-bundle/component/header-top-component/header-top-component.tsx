/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { theme, Button, Space } from "antd";
import ThemeSwitcherComponent from "@everyworkflow/store-panel-bundle/component/theme-switcher-component";
import { headerStyle } from "./headerStyle";

const HeaderTopComponent = () => {
  const { token } = theme.useToken();

  return (
    <div style={{
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: token.padding,
      paddingRight: token.padding,
      backgroundColor: token.colorBgBase,
    }}>
      <div className="container" style={headerStyle.container}>
        <Space>
          <div>
            Phone:{" "}
            <a href="tel:9800000000">
              <Button type="text" size="small">
                9800000000
              </Button>
            </a>
          </div>
          <div>
            Email:{" "}
            <a href="mailto:contact@example.com">
              <Button type="text" size="small">
                contact@example.com
              </Button>
            </a>
          </div>
        </Space>
        <Space>
          <div>
            <ThemeSwitcherComponent />
          </div>
        </Space>
      </div>
    </div>
  );
};

export default HeaderTopComponent;
