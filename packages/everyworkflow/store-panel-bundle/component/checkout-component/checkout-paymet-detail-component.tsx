/*
 * @copyright EveryWorkflow. All rights reserved.
 */
import { useContext } from "react";
import { Button, Col, Input, Space, Typography } from "antd";
import {
  MailOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagUsa } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/cart-context";
import CommonUtility from "../../utils";

const { Title, Text } = Typography;
const CheckoutPaymetDetailComponent = () => {
  const { state } = useContext(CartContext);

  return (
    <Col
      span={12}
      style={{
        backgroundColor: "rgba(249, 250, 251, 1)",
        padding: "35px",
      }}
    >
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
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Input />
            <div style={{ width: 40 }} />
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
            <Text>
              Rs. {CommonUtility.formatPrice(String(state.total_price))}
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Additional Charge</Text>
            <Text>Rs. 0.00</Text>
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
            <Text>
              Rs. {CommonUtility.formatPrice(String(state.total_price))}
            </Text>
          </div>
        </div>
        <Button type="primary" style={{ width: "100%" }}>
          Place Order
        </Button>
      </Space>
    </Col>
  );
};

export default CheckoutPaymetDetailComponent;
