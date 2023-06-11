/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, CSSProperties, useCallback } from 'react';
import { theme, Layout, Row, Col, Menu, Dropdown, Button, Space } from 'antd';
import type { MenuProps } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';
import ButtonInterface from "@everyworkflow/panel-bundle/model/button-interface";
import ButtonHeaderAction from '@everyworkflow/data-grid-bundle/header-action/button-header-action';
import PanelContext from '@everyworkflow/panel-bundle/context/panel-context';

interface headerButtonInterface extends ButtonInterface {
    is_confirm?: boolean;
    confirm_message?: string;
}

interface PageHeaderComponentProps {
    title?: string;
    actions?: Array<headerButtonInterface>;
    children?: JSX.Element | JSX.Element[];
    left?: JSX.Element | JSX.Element[];
    right?: JSX.Element | JSX.Element[];
    isSticky?: boolean;
    style?: CSSProperties;
    headerStyle?: CSSProperties;
}

const PageHeaderComponent = ({
    title,
    actions,
    children,
    left,
    right,
    isSticky = true,
    style,
    headerStyle
}: PageHeaderComponentProps) => {
    const { token } = theme.useToken();
    const { state: panelState } = useContext(PanelContext);

    const getHeaderDropDownItems = useCallback(() => {
        const items: MenuProps['items'] = [];
        actions?.forEach((item: any, index) => {
            items.push({
                key: 'header-action' + index,
                label: 'header-action' + index,
            })
        });
        return items;
    }, [actions]);

    return (
        <>
            <div
                style={{
                    backgroundColor: token.colorBgContainer,
                    position: isSticky ? 'sticky' : 'initial',
                    boxShadow: token.boxShadowTertiary,
                    zIndex: 5,
                    top: 0,
                    ...style,
                }}>
                <Layout.Header style={{
                    backgroundColor: token.colorBgContainer,
                    zIndex: 5,
                    paddingLeft: token.paddingContentHorizontalLG,
                    paddingRight: token.paddingContentHorizontalLG,
                    ...headerStyle,
                }}>
                    <Row align="middle" style={{ height: 'inherit' }}>
                        {title && (<Col span={12}>{title}{left}</Col>)}
                        {right && (
                            <Col style={{ textAlign: 'right', flexGrow: 1 }}>
                                {right}
                            </Col>
                        )}
                        {actions && actions?.length && (
                            <Col
                                span={title === undefined ? 24 : 12}
                                style={{ textAlign: 'right' }}>
                                {panelState?.is_mobile && actions.length > 1 ? (
                                    <Dropdown
                                        overlay={<Menu items={getHeaderDropDownItems()} />}
                                        // overlay={<h1>Dropdown menu</h1>}
                                        trigger={['click']}>
                                        <Button type="primary" className="ant-dropdown-link">
                                            Actions <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                ) : (
                                    <Space>
                                        {actions.map((item: any, index) => (
                                            <ButtonHeaderAction
                                                key={index}
                                                actionData={item} />
                                        ))}
                                    </Space>
                                )}
                            </Col>
                        )}
                        {children}
                    </Row>
                </Layout.Header>
            </div>
        </>
    );
};

export default PageHeaderComponent;
