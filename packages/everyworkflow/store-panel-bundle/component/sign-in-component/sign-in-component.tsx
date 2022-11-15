/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Button, Card, Divider, Input, Space, Typography } from "antd";
import Styles from "./sign-in-component.module.css";

const { Text } = Typography;

const SignInComponent = () => {
  return (
    <div className={Styles.signinContainer}>
      <Card
        bordered={false}
        style={{ width: 450, padding: "10px 50px 10px 50px", borderRadius: 4 }}
      >
        <Space
          direction="vertical"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          size={15}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            Logo
          </div>
          <Input placeholder="Email" style={{ height: 40, borderRadius: 4 }} />
          <Input
            placeholder="Password"
            style={{ height: 40, borderRadius: 4 }}
          />
          <Divider>
            <Text type="secondary">or</Text>
          </Divider>
          <Button
            type="primary"
            style={{ width: "100%", height: 40, borderRadius: 4 }}
          >
            Continue
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #d9d9d9",
                padding: 5,
                borderRadius: 4,
              }}
            >
              GoogleSVG
              <Text style={{ marginLeft: 10 }}>Continue with Google</Text>
            </div>
            <div style={{ padding: "5px 5px 5px 5px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #d9d9d9",
                padding: "5px 5px 5px 20px",
                borderRadius: 4,
              }}
            >
              FacebookSVG
              <Text style={{ marginLeft: 10 }}>Continue with Facebook</Text>
            </div>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default SignInComponent;
