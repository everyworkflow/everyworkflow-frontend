"use client";

import { useContext, useEffect } from "react";
import {
  Card,
  Table,
  Image,
  Typography,
  Button,
  InputNumber,
  Input,
  theme,
  Divider,
  Empty,
  Space,
} from "antd";
import { CloseOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/navigation";
import { CartContext } from "@everyworkflow/store-panel-bundle/context/cart-context";
import {
  ACTION_ADD_CART_ITEM,
  ACTION_DELETE_CART_ITEM,
  ACTION_REMOVE_CART_ITEM,
  ACTION_SET_OFFLINE_CART_ITEM,
} from "../../reducer/cart-reducer";
import IndexedDbObject from "@everyworkflow/panel-bundle/service/indexed-db/indexed-db-object";
import CommonUtility from "../../utils";

const { Title, Text } = Typography;

const get_columns = (dispatch: any) => {
  const columns_data: ColumnsType<Object> = [
    {
      width: 500,
      title: "Item",
      dataIndex: "gallery",
      key: "gallery",
      render: (_, { gallery, name, size }: any) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            <Image
              width={100}
              src={gallery && gallery[0]?.path_name}
              alt="product_image"
              style={{ borderRadius: 8 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0px 20px 0px 20px",
            }}
          >
            <Title
              level={5}
              style={{ marginLeft: 10, textTransform: "capitalize" }}
            >
              {name}
            </Title>
            <Text style={{ marginLeft: 10 }}>Size: {size}</Text>
          </div>
        </div>
      ),
    },
    {
      width: 100,
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (_, { price, cart_quantity }: any) => (
        <Text>
          Rs. {CommonUtility.formatPrice(String(price * cart_quantity))}
        </Text>
      ),
    },
    {
      width: 150,
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, { _id, cart_quantity, price, id }: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          className="cart-table"
        >
          <Text style={{ marginRight: 10 }}>Quantity</Text>
          <InputNumber
            controls={true}
            value={cart_quantity}
            style={{ backgroundColor: "white", width: 70 }}
            onChange={(value: any) => {
              if (value > cart_quantity) {
                dispatch({
                  type: ACTION_ADD_CART_ITEM,
                  payload: { _id, price, indexedId: id },
                });
              } else {
                dispatch({
                  type: ACTION_REMOVE_CART_ITEM,
                  payload: { _id, price, indexedId: id },
                });
              }
            }}
            min={1}
          />
        </div>
      ),
    },
    {
      width: 100,
      title: "Remove",
      key: "remove",
      dataIndex: "remove",
      render: (_, { _id, cart_quantity, price, id, size }: any) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              icon={<CloseOutlined style={{ fontSize: 10 }} />}
              shape="circle"
              style={{
                backgroundColor: "#f2f2f2",
                borderColor: "#f2f2f2",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                textTransform: "capitalize",
              }}
              onClick={() => {
                dispatch({
                  type: ACTION_DELETE_CART_ITEM,
                  payload: { indexedId: id, _id, cart_quantity, price },
                });
              }}
            />
          </div>
        );
      },
    },
  ];
  return columns_data;
};

const Cart = () => {
  const { token } = theme.useToken();
  const router = useRouter();
  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      const indexDb = new IndexedDbObject("cart");
      await indexDb.createObjectStore(["cart"]);
      const data: any = await indexDb.getAllValue("cart");
      dispatch({ type: ACTION_SET_OFFLINE_CART_ITEM, payload: data });
    })();
  }, []);

  const tableComponents = {
    header: {
      cell: ({ children }: any) => (
        <th style={{ backgroundColor: token.colorBgBase }}>{children}</th>
      ),
    },
    body: {
      wrapper: ({ children }: any) => (
        <tbody style={{ backgroundColor: token.colorBgBase }}>{children}</tbody>
      ),
      cell: ({ children }: any) => (
        <td style={{ paddingTop: 20, paddingBottom: 10 }}>{children}</td>
      ),
    },
  };

  const onClickCheckout = () => router.push("/checkout");

  return (
    <div
      style={{
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
      }}
      className="cart"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: token.colorBgContainer,
          padding: 20,
          flexWrap: "wrap",
        }}
      >
        <Card
          style={{
            backgroundColor: token.colorBgBase,
            minHeight: 289,
            height: "100%",
            padding: 20,
            display: "flex",
            alignItems: state.cart_item?.length ? "flex-start" : "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {!state.cart_item?.length ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                height: 200,
              }}
            >
              <Empty />
            </div>
          ) : (
            <Table
              scroll={{ y: 350 }}
              components={tableComponents}
              columns={get_columns(dispatch)}
              dataSource={state.cart_item}
              pagination={false}
              style={{ overflow: "scroll", width: 1000 }}
            />
          )}
        </Card>
        {state?.cart_item?.length > 0 && (
          <>
            <div style={{ margin: "0px 30px 0px 30px" }} />
            <Space direction="vertical">
              <Card
                bordered={false}
                style={{
                  backgroundColor: token.colorBgBase,
                  width: 300,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                  }}
                >
                  <Title level={5} style={{ padding: 0, margin: 0 }}>
                    ORDER SUMMARY
                  </Title>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <Input
                    style={{ backgroundColor: token.colorWhite }}
                    placeholder="COUPON CODE"
                  />
                  <div style={{ margin: "0px 10px 0px 10px" }} />
                  <Button
                    style={{
                      opacity: 0.8,
                      backgroundColor: token.colorPrimary,
                      color: token.colorWhite,
                    }}
                  >
                    Apply
                  </Button>
                </div>
                <Divider dashed style={{ borderColor: "#e6e6e6" }} />
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Sub Total</Text>
                    <Text>
                      Rs. {CommonUtility.formatPrice(String(state.total_price))}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Total</Text>
                    <Text>
                      Rs. {CommonUtility.formatPrice(String(state.total_price))}
                    </Text>
                  </div>
                </Space>
              </Card>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                style={{ width: "100%" }}
                onClick={onClickCheckout}
              >
                Checkout
              </Button>
            </Space>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
