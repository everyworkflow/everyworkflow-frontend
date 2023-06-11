/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useCallback, createContext, useMemo } from "react";
import { theme, notification, Card, Image, Button, Typography } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { CheckCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

import { CartContext } from "@everyworkflow/store-panel-bundle/context/cart-context";
import { ACTION_SET_CART_ITEM } from "@everyworkflow/store-panel-bundle/reducer/cart-reducer";
import CommonUtility from "@everyworkflow/store-panel-bundle/utils";

// notification context will be centralized later...using on this page only right now
const Context = createContext({ name: "Default" });

const { Text } = Typography;

const ProductCardComponent = ({
  showButton = false,
  showDetails = true,
  showCategory = true,
  showPrice = true,
  item,
}: any) => {
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const { token } = theme.useToken();
  const { dispatch } = useContext(CartContext);

  const onButtonPress = useCallback(() => {
    openNotification("topRight", item._id);
    dispatch({
      type: ACTION_SET_CART_ITEM,
      payload: { item, price: item.price },
    });
  }, [item]);

  const openNotification = (placement: NotificationPlacement, key: string) => {
    api.info({
      message: `Product added`,
      description: "1 new product have been added to your cart.",
      placement,
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      key: "new-notification",
      duration: 1,
    });
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Card
        style={{ width: 240 }}
        hoverable
        cover={
          <Image
            height={240}
            width={240}
            alt="example"
            src={item?.gallery[0]?.path_name ?? ""}
            style={{ borderRadius: 3 }}
          />
        }
      >
        {showDetails && (
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              textAlign: "center",
            }}
          >
            <Link href={"/product/" + item.url_key}>
              <Text
                ellipsis
                style={{
                  width: 250,
                  fontWeight: "700",
                  textTransform: "capitalize",
                }}
              >
                {item.name}
              </Text>
            </Link>
            {showCategory && (
              <Text
                ellipsis
                style={{
                  width: 250,
                  textTransform: "capitalize",
                  textAlign: "center",
                }}
              >
                {item.category}
              </Text>
            )}
            {showPrice && (
              <Text
                ellipsis
                style={{
                  width: 250,
                  color: token.colorPrimary,
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Rs. {CommonUtility.formatPrice(item.price)}
              </Text>
            )}
            {showButton && (
              <div
                style={{
                  paddingBottom: token.padding,
                  width: "100%",
                }}
              >
                <Button
                  type="primary"
                  style={{ marginTop: 10, width: "100%", overflow: "hidden" }}
                  onClick={onButtonPress}
                >
                  Add to cart
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </Context.Provider>
  );
};

export default ProductCardComponent;
