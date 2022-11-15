/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Button, Col, Input, Space, Typography } from "antd";
import {
    MailOutlined,
    CheckCircleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagUsa } from "@fortawesome/free-solid-svg-icons";
import Styles from "./checkout.module.css";

const { Title, Text } = Typography;
const CheckoutPaymetDetailComponent = () => {
    return (
        <Col span={12} className={Styles.paymentDetailContainer}>
            <Space direction="vertical">
                <Title level={5}>Payment Details</Title>
                <Text>
                    Complete your purchase item by providing your payment details order.
                </Text>
                <div>
                    <Title level={5}>Email Address</Title>
                    <Input
                        addonBefore={<MailOutlined />}
                        suffix={<CheckCircleOutlined />}
                    />
                </div>
                <div>
                    <Title level={5}>Card Holder</Title>
                    <Input addonBefore={<UserOutlined />} />
                </div>
                <div>
                    <Title level={5}>Billing Address</Title>
                    <Input addonBefore={<FontAwesomeIcon icon={faFlagUsa} />} />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Input />
                        <Input />
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text>SubTotal</Text>
                        <Text>$100</Text>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text>Vat</Text>
                        <Text>$3.00</Text>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text strong>Total</Text>
                        <Text>$100</Text>
                    </div>
                </div>
                <Button type="primary" style={{ width: "100%" }}>
                    Pay $50.00
                </Button>
            </Space>
        </Col>
    );
};

export default CheckoutPaymetDetailComponent;
