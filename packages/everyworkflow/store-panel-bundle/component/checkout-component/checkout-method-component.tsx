/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Col, Typography } from "antd";
import CheckoutMethodCardComponent from "@everyworkflow/store-panel-bundle/component/checkout-component/checkout-method-card-component";
import Styles from "./checkout.module.css";

const { Title } = Typography;
const CheckoutMethodComponent = () => {
    return (
        <Col span={12} className={Styles.paymentMethodContainer}>
            <Title level={5}>Available Shipping Methods</Title>
            <CheckoutMethodCardComponent />
        </Col>
    );
};

export default CheckoutMethodComponent;
