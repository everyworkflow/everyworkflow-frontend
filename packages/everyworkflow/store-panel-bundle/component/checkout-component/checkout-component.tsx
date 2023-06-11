/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Card, Row, theme } from "antd";
import CheckoutPaymetDetailComponent from "@everyworkflow/store-panel-bundle/component/checkout-component/checkout-paymet-detail-component";
import CheckoutMethodComponent from "@everyworkflow/store-panel-bundle/component/checkout-component/checkout-method-component";

const CheckoutComponent = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: token.colorBgContainer,
        overflow: "scroll",
      }}
    >
      <Card
        style={{ margin: "20px 0px" }}
        bodyStyle={{ padding: "0", backgroundColor: token.colorBgBase }}
      >
        <Row>
          <CheckoutMethodComponent />
          <CheckoutPaymetDetailComponent />
        </Row>
      </Card>
    </div>
  );
};

export default CheckoutComponent;
