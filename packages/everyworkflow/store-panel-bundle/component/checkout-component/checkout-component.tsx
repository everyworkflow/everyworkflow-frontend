/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Card, Row } from "antd";
import CheckoutPaymetDetailComponent from "@everyworkflow/store-panel-bundle/component/checkout-component/checkout-paymet-detail-component";
import CheckoutMethodComponent from "@everyworkflow/store-panel-bundle/component/checkout-component/checkout-method-component";
import Styles from "./checkout.module.css";

const CheckoutComponent = () => {
  return (
    <div className={Styles.checkoutContainer}>
      <Card className={Styles.card} bodyStyle={{ padding: "0" }}>
        <Row>
          <CheckoutMethodComponent />
          <CheckoutPaymetDetailComponent />
        </Row>
      </Card>
    </div>
  );
};

export default CheckoutComponent;
