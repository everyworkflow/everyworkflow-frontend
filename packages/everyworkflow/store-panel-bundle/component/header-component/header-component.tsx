/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Layout, Row, Col, Menu } from "antd";
import Link from "next/link";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import HeaderTopComponent from "@everyworkflow/store-panel-bundle/component/header-top-component";
import MainMenuComponent from "@everyworkflow/front-panel-bundle/component/main-menu-component";

const HeaderComponent = () => {
    return (
        <>
            <HeaderTopComponent />
            <Layout.Header className="app-header">
                <div className="container">
                    <Row>
                        <Col>
                            <Link href={"/"}>
                                <a className="app-header-logo-holder"></a>
                            </Link>
                        </Col>
                        <Col style={{
                            flexGrow: 1,
                        }}>
                            <MainMenuComponent menuCode={'store_front'} />
                        </Col>
                        <Col span={4}>
                            <Menu
                                mode="horizontal"
                                style={{
                                    justifyContent: 'end',
                                }}
                                items={[
                                    {
                                        key: '/sign-in',
                                        label: (
                                            <Link href="/sign-in">Sign In</Link>
                                        ),
                                    },
                                    {
                                        key: '/cart',
                                        icon: (
                                            <Link href={"/cart"}><ShoppingCartOutlined /></Link>
                                        ),
                                        label: 'Cart'
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </div>
            </Layout.Header>
        </>
    );
};

export default HeaderComponent;
