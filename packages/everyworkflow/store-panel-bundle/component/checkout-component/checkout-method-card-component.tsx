/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Card, Col, Radio, Row, Space, Typography } from "antd";
import Styles from "./checkout.module.css";

const { Title, Text } = Typography;
const CheckoutMethodCardComponent = () => (
    <Col span={24}>
        <Card
            bordered={false}
            className={Styles.paymentMethodCardContainer}
            bodyStyle={{ padding: "0" }}
        >
            <Row gutter={[10, 16]} style={{ display: "flex", alignItems: "center" }}>
                <Col
                    className="gutter-row"
                    style={{
                        backgroundColor: "white",
                        borderRadius: 8,
                        padding: "0px 12px 0px 12px",
                    }}
                >
                    FedExSVG
                </Col>
                <Col className="gutter-row" style={{ marginLeft: 10, flexGrow: 1 }}>
                    <div>
                        <Title level={5} style={{ margin: 0 }}>
                            DreamWork Factory Delivery
                        </Title>
                        <Text>Delivery: 2-3 work day</Text>
                    </div>
                </Col>
                <Col className="gutter-row" style={{ paddingRight: 15 }}>
                    <Row align="middle">
                        <Space>
                            <Title level={5} style={{ margin: 0 }}>
                                Free
                            </Title>
                            <Radio value={1} style={{ margin: "2px 0px 0px 0px" }} />
                        </Space>
                    </Row>
                </Col>
            </Row>
        </Card>
    </Col>
);

export default CheckoutMethodCardComponent;
