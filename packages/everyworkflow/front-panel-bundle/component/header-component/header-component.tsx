/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback } from 'react';
import { theme, Layout, Row, Col, Menu } from "antd";
import { Link } from 'react-router-dom';
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import MainMenuComponent from "@everyworkflow/front-panel-bundle/component/main-menu-component";
import ThemeSwitcher from '@everyworkflow/front-panel-bundle/component/header-component/theme-switcher';
import UrlHelper from '@everyworkflow/panel-bundle/helper/url-helper';

const HeaderComponent = () => {
    const { token } = theme.useToken();
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
        <Layout.Header
            className="app-frontend-header"
            style={{
                backgroundColor: token.colorBgContainer,
            }}>
            <div className="app-container-center">
                <Row gutter={0} justify="space-between">
                    <Col>
                        <Link to={"/"} className="brand-home">
                            <img
                                src={UrlHelper.buildImgUrlFromPath('/media/ew-logo.svg')}
                                alt={'Logo'}
                                style={{ height: 36 }}
                            />
                        </Link>
                    </Col>
                    <Col style={{ flexGrow: 1 }}>
                        <MainMenuComponent menuCode={'front_panel_menu'} />
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
        </Layout.Header>
    );
}

export default HeaderComponent;
