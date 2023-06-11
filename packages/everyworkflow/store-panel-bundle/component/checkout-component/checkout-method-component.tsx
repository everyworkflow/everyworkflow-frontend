/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Col, Typography } from "antd";
import CheckoutMethodCardComponent from "@everyworkflow/store-panel-bundle/component/checkout-component/checkout-method-card-component";


const { Title } = Typography;
const CheckoutMethodComponent = () => {
    return (
      <Col span={12} style={{ padding: 35 }}>
        <Title level={5}>Available Shipping Methods</Title>
        <CheckoutMethodCardComponent />
      </Col>
    );
};

export default CheckoutMethodComponent;
