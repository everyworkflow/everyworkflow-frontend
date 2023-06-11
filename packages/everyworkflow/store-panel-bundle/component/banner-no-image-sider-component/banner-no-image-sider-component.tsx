import { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Grid, Button, theme } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import ProductCardComponent from "@everyworkflow/catalog-product-bundle/component/product-card-component";
import getMockProducts from "../../services/product-service";

const { useBreakpoint } = Grid;
const BannerNoImageSliderComponent = () => {
  const rightButtonRef = useRef<any>();
  const leftButtonRef = useRef<any>();
  const screens = useBreakpoint();

  const { token } = theme.useToken();
  const [state, setState] = useState<any>([]);


  const [disbaleLeftButton, setDisableLeftButton] = useState(true);
  const [disbaleRightButton, setDisableRightButton] = useState(false);

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
          overflow: "hidden",
          backgroundColor: token.colorBgBase,
        }}
      >
        <Row
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflow: "hidden",
            padding: token.padding,
          }}
        >
          <div ref={leftButtonRef} />
          {state.map((item: any) => {
            return (
              <>
                <Col style={{ width: 250, margin: "0px 15px 0px 15px" }}>
                  <ProductCardComponent
                    key={item.id}
                    item={item}
                    showPrice={false}
                  />
                </Col>
              </>
            );
          })}
          <div ref={rightButtonRef} style={{ padding: "0px 5px 0px 0px" }} />
        </Row>
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
          disabled={disbaleLeftButton}
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
            opacity: disbaleLeftButton ? 0.1 : 1,
          }}
          onClick={() => {
            leftButtonRef.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "end",
            });
            setDisableRightButton(false);
            setTimeout(() => {
              setDisableLeftButton(true);
            }, 1000);
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
          borderTopLeftRadius: 4,
          border: 0,
        }}
      >
        <Button
          disabled={disbaleRightButton}
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
            borderTopLeftRadius: 40,
            border: 0,
            opacity: disbaleRightButton ? 0.1 : 1,
          }}
          onClick={() => {
            rightButtonRef.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "end",
            });

            setDisableLeftButton(false);
            setTimeout(() => {
              setDisableRightButton(true);
            }, 1000);
          }}
        />
      </div>
    </div>
  );
};

export default BannerNoImageSliderComponent;
