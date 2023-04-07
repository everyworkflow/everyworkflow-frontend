/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useState } from "react";
import { Row, Col, Modal, Button, Space, InputNumber, Typography } from "antd";
import Styles from "./cart-checkout.module.css";

const { Title, Text } = Typography;
let discountAmount = 0;
let totalAmount = 1000;
const CartDetailComponent = () => {
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(totalAmount);
    const [openModal, setOpenModal] = useState(false);

    const showModal = () => setOpenModal(true);
    const closeModal = () => setOpenModal(false);

    const calculateDiscount = () => {
        let discountPrice = (discount / 100) * total;
        setTotal(total - discountPrice);
    };

    const onPressOk = () => {
        discountAmount = discount;
        totalAmount = total;
        closeModal();
    };

    return (
        <div
            style={{
                marginTop: 20,
            }}
        >
            <Row gutter={[10, 16]}>
                <Col
                    className="gutter-row"
                    lg={{ span: 6 }}
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    onClick={showModal}
                    style={{ cursor: "pointer" }}
                >
                    <div className={Styles.footerBorderBox}>
                        <Title level={5}>Discount {discountAmount} %</Title>
                    </div>
                </Col>
                <Col
                    className="gutter-row"
                    lg={{ span: 6 }}
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                >
                    <div className={Styles.footerBorderBox}>
                        <Title level={5}>Delivery $10</Title>
                    </div>
                </Col>
                <Col
                    className="gutter-row"
                    lg={{ span: 6 }}
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                >
                    <div className={Styles.footerBorderBox}>
                        <Title level={5}>SubTotal $10</Title>
                    </div>
                </Col>
                <Col
                    className="gutter-row"
                    lg={{ span: 6 }}
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                >
                    <div className={Styles.footerBorderBox}>
                        <Title level={5}>Total ${totalAmount}</Title>
                    </div>
                </Col>
            </Row>
            <Modal
                title="Apply Discount"
                centered
                visible={openModal}
                onOk={onPressOk}
                onCancel={closeModal}
                width={400}
            >
                <Row>
                    <Space direction="vertical">
                        <Col span={24}>
                            <Space>
                                <InputNumber
                                    style={{ width: 200 }}
                                    value={discount}
                                    defaultValue={100}
                                    formatter={(value) =>
                                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    onChange={(price) => setDiscount(price)}
                                />
                                <Button
                                    type="primary"
                                    style={{ width: 100 }}
                                    onClick={calculateDiscount}
                                >
                                    Apply
                                </Button>
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Text>Total: ${total}</Text>
                        </Col>
                    </Space>
                </Row>
            </Modal>
        </div>
    );
};

export default CartDetailComponent;
