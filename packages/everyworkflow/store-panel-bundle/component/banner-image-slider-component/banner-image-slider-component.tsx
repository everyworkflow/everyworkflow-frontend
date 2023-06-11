import React, { useEffect, useState, useRef } from "react";
import { Layout, Card, Row, Col, Button, Grid, theme } from "antd";
import { Image } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import ProductCardComponent from "@everyworkflow/catalog-product-bundle/component/product-card-component";
import getMockProducts from "../../services/product-service";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const contentStyle: React.CSSProperties = {
  marginLeft: 10,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  overflow: "hidden",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  // @ts-ignore
  "&::WebkitScrollbar": {
    height: "0",
    backgroundColor: "transparent",
  },
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  padding: 0,
  margin: 0,
  height: "100%",
};

const BannerImageSliderComponent = () => {
  const rightButtonRef = useRef<any>();
  const leftButtonRef = useRef<any>();
  const screens = useBreakpoint();
  const { token } = theme.useToken();
  const [state, setState] = useState<any>([]);

  // experimental
  const smallScreen = !Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((screen) => screen[0])
    .includes("md");
  //

  const buttonWidth = smallScreen ? 23 : 47;
  const buttonHeight = smallScreen ? 52 : 104;
  const fontSize = smallScreen ? 12 : 25;

  useEffect(() => {
    getMockProducts(10).then((data: any) => {
      setState(data);
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Card
        style={{ borderRadius: 2 }}
        bodyStyle={{
          padding: 0,
          margin: 0,
          width: "100%",
          boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
          display: "flex",
          borderRadius: 2,
          backgroundColor: token.colorBgBase,
        }}
      >
        <Layout style={{ backgroundColor: token.colorBgBase }}>
          <Sider style={siderStyle}>
            <Image
              src="/images/product-image-banner-1.png"
              width="100%"
              height="100%"
              style={{ padding: 0, margin: 0, objectFit: "cover" }}
              preview={false}
            />
          </Sider>
          <Content style={contentStyle}>
            <Row
              style={{
                overflow: "hidden",
                flexWrap: "nowrap",
                padding: token.padding,
              }}
            >
              <div ref={leftButtonRef} />
              {state.map((item: any) => {
                return (
                  <Col style={{ width: 250, margin: "0px 15px 0px 15px" }}>
                    <ProductCardComponent
                      key={item.id}
                      item={item}
                      showPrice={false}
                    />
                  </Col>
                );
              })}
              <div
                ref={rightButtonRef}
                style={{ padding: "0px 5px 0px 0px" }}
              />
            </Row>
          </Content>
        </Layout>
      </Card>
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(0, -50%)",
          left: 0,
          backgroundColor: token.colorBgContainer,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          border: 0,
        }}
      >
        <Button
          type="text"
          icon={
            <LeftOutlined
              style={{
                color: "black",
                fontSize,
              }}
            />
          }
          style={{
            height: buttonHeight,
            width: buttonWidth,
            backgroundColor: token.colorBgContainer,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 4,
            borderTopRightRadius: 4,
            border: 0,
          }}
          onClick={() => {
            leftButtonRef.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "end",
            });
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(0, -50%)",
          right: 0,
          backgroundColor: token.colorBgContainer,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 4,
          borderTopLeftRadius: 40,
          border: 0,
        }}
      >
        <Button
          type="text"
          icon={
            <RightOutlined
              style={{
                color: "black",
                fontSize,
              }}
            />
          }
          style={{
            backgroundColor: token.colorBgContainer,
            height: buttonHeight,
            width: buttonWidth,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 4,
            borderTopLeftRadius: 4,
            border: 0,
          }}
          onClick={() => {
            rightButtonRef.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "end",
            });
          }}
        />
      </div>
    </div>
  );
};

export default BannerImageSliderComponent;
