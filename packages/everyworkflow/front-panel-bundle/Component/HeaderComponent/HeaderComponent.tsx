/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback } from 'react';
import { Header } from "antd/lib/layout/layout";
import Menu from "antd/lib/menu";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import MainMenuComponent from "@everyworkflow/front-panel-bundle/Component/MainMenuComponent";

const HeaderComponent = () => {
    const getHeaderRightSectionMenuItems = useCallback((): Array<any> => {
        const items: Array<any> = [];
        items.push({
            key: 'search',
            icon: <SearchOutlined />,
            label: 'Search',
        });
        items.push({
            key: 'account',
            icon: <UserOutlined />,
            label: 'Account',
            children: [
                {
                    key: 'my-account',
                    label: 'My Account',
                },
                {
                    key: 'setting',
                    label: 'Setting',
                },
                {
                    key: 'logout',
                    label: 'Logout',
                },
            ],
        });
        // items.push({
        //     key: 'login',
        //     icon: <UserOutlined />,
        //     label: 'Login',
        // });
        return items;
    }, []);

    return (
        <Header className="app-frontend-header">
            <div className="app-container-center">
                <Row gutter={0} justify="space-between">
                    <Col span={16}>
                        <MainMenuComponent />
                    </Col>
                    <Col span={8}>
                        <Menu
                            mode="horizontal"
                            style={{
                                border: 'none',
                                textAlign: 'right',
                                justifyContent: 'end',
                                alignItems: 'center',
                            }}
                            items={getHeaderRightSectionMenuItems()}
                        />
                    </Col>
                </Row>
            </div>
        </Header>
    );
}

export default HeaderComponent;
