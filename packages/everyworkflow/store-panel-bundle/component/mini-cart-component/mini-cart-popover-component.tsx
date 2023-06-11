import { Button, Typography, Table, Image, theme } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/navigation";
import EmptyMessageComponent from "../empty-message-component";
import { CartContext } from "../../context/cart-context";
import { useContext } from "react";
import CommonUtility from "../../utils";

type MiniCartComponentProps = {
  handleClosePopover?: () => void;
};

const { Text } = Typography;

const MiniCartComponent = ({
  handleClosePopover = () => { },
}: MiniCartComponentProps) => {
  const { token } = theme.useToken();
  const router = useRouter();
  const { state } = useContext(CartContext);

  const columns: ColumnsType<Object> = [
    {
      width: 300,
      key: "name",
      dataIndex: "name",
    },
    {
      width: 300,
      key: "gallery",
      render: (_, { gallery }: any) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            width={80}
            src={gallery && gallery[0]?.path_name}
            alt="product_image"
          />
        </div>
      ),
    },
    {
      key: "cart_quantity",
      dataIndex: "cart_quantity",
      render: (_, { cart_quantity }: any) => <Text>{cart_quantity}</Text>,
    },
    {
      width: 400,
      key: "price",
      dataIndex: "price",
      render: (_, { price, cart_quantity }: any) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>
            Rs. {CommonUtility.formatPrice(String(price * cart_quantity))}
          </Text>
        </div>
      ),
    },
  ];

  if (!state.cart_item?.length)
    return (
      <div
        style={{
          height: 100,
          width: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EmptyMessageComponent message="There are no items in the cart." />
      </div>
    );

  const onClickCheckout = () => {
    handleClosePopover();
    router.push("/checkout");
  };

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
    },
  };

  return (
    <div style={{ width: 400 }}>
      <div style={{ maxHeight: 400, padding: 20, overflow: "auto" }}>
        <Table
          components={tableComponents}
          columns={columns}
          dataSource={state.cart_item}
          pagination={false}
        />
      </div>
      <div
        style={{
          padding: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0px 10px 0px",
          }}
        >
          <Text>Total :</Text>
          <Text>
            Rs. {CommonUtility.formatPrice(String(state?.total_price ?? 0))}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            size="large"
            onClick={onClickCheckout}
            style={{ width: "100%" }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniCartComponent;
