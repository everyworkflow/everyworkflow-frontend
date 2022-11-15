/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback } from 'react';
import { Header } from "antd/lib/layout/layout";
import Menu from "antd/lib/menu";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Link } from 'react-router-dom';
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import MainMenuComponent from "@everyworkflow/front-panel-bundle/component/main-menu-component";
import ThemeSwitcher from '@everyworkflow/front-panel-bundle/component/header-component/theme-switcher';

const HeaderComponent = () => {
    const getHeaderRightSectionMenuItems = useCallback((): Array<any> => {
        const items: Array<any> = [];
        items.push({
            key: 'theme-switcher',
            icon: <ThemeSwitcher />,
        });
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
                    <Col>
                        <Link to={"/"} className="brand-home">
                            <img src={'/media/ew-logo.svg'} alt={'Logo'} />
                        </Link>
                    </Col>
                    <Col style={{ flexGrow: 1 }}>
                        <MainMenuComponent menuCode={'frontend_menu'} />
                    </Col>
                    <Col style={{ flexGrow: 1, flex: 1 }}>
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
