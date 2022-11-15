/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import Card from "antd/lib/card";
import Table from "antd/lib/table";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import Button from "antd/lib/button";
import { ColumnsType } from "antd/lib/table";
import {
    CloseOutlined,
    PlusOutlined,
    MinusOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import CartFooterComponent from "@everyworkflow/store-panel-bundle/component/cart-component/cart-footer-component";
import { useRouter } from "next/router";
import Styles from "./cart-checkout.module.css";


const { Title, Text } = Typography;

const data = [
    {
        key: "1",
        description: "Streamline Leggins",
        size: "S",
        quantity: 1,
        tags: ["nice", "developer"],
        image: "https://picsum.photos/200/300",
        price: "$100",
    },
    {
        key: "2",
        description: "Jim Green",
        size: "M",
        quantity: 2,
        tags: ["loser"],
        image: "https://picsum.photos/200/300",
        price: "$100",
    },
    {
        key: "3",
        description: "StreamLine Sports Pants",
        size: "L",
        quantity: 5,
        tags: ["cool", "teacher"],
        price: "$100",
        image: "https://picsum.photos/200/300",
    },
    {
        key: "3",
        description: "StreamLine Sports Pants",
        size: "L",
        quantity: 5,
        tags: ["cool", "teacher"],
        price: "$100",
        image: "https://picsum.photos/200/300",
    },
    {
        key: "3",
        description: "StreamLine Sports Pants",
        size: "L",
        quantity: 5,
        tags: ["cool", "teacher"],
        price: "$100",
        image: "https://picsum.photos/200/300",
    },
];

const columns: ColumnsType<Object> = [
    {
        width: 500,
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (_, { description, image }: any) => (
            <div className={Styles.description}>
                <Image width={80} height={80} src={image} />
                <Title level={5} style={{ marginLeft: 10 }}>
                    {description}
                </Title>
            </div>
        ),
    },
    {
        title: "Size",
        dataIndex: "size",
        key: "size",
        render: (_, { size }: any) => (
            <Button type="primary" ghost>
                <Text>{size}</Text>
            </Button>
        ),
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        render: (_, { quantity }: any) => (
            <div className={Styles.quantityContainer}>
                <Button type="primary" style={{ marginRight: 10 }}>
                    <PlusOutlined style={{ color: "white" }} />
                </Button>
                <Button type="primary" ghost>
                    {quantity}
                </Button>
                <Button type="primary" style={{ marginLeft: 10 }}>
                    <MinusOutlined />
                </Button>
            </div>
        ),
    },
    {
        title: "Remove",
        key: "remove",
        dataIndex: "remove",
        render: (_, { size }: any) => (
            <Button type="primary" danger>
                <CloseOutlined />
            </Button>
        ),
    },
    {
        title: "Price",
        key: "price",
        dataIndex: "price",
    },
];

const CartCheckoutComponent = () => {
    const router = useRouter();

    const onClickCheckout = () => router.push("/checkout");

    return (
        <div className={Styles.cartContainer}>
            <Card className={Styles.card}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    style={{ height: 390, overflow: "scroll" }}
                />
                <CartFooterComponent />
                <div className={Styles.footer}>
                    <Button
                        type="primary"
                        size="large"
                        className={Styles.button}
                        onClick={onClickCheckout}
                    >
                        Checkout
                    </Button>
                    <div className={Styles.checkoutIcon}>
                        <ShoppingCartOutlined style={{ color: "white" }} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CartCheckoutComponent;
