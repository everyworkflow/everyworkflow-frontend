/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback, useEffect, useState } from 'react';
import Remote from "@everyworkflow/panel-bundle/Service/Remote";
import AlertAction, { ALERT_TYPE_ERROR } from "@everyworkflow/panel-bundle/Action/AlertAction";
import Menu from 'antd/lib/menu';
import SubMenu from 'antd/lib/menu/SubMenu';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import HtmlRawComponent from '@everyworkflow/panel-bundle/Component/HtmlRawComponent';
import { Scrollbars } from 'react-custom-scrollbars';

const SettingSidebar = () => {
    const [menuData, setmenuData] = useState<Array<any>>();
    const { code = 'general-setting' }: any = useParams();

    useEffect(() => {
        const handleResponse = (response: any) => {
            if (response.setting_menu_data) {
                setmenuData(response.setting_menu_data);
            }
        };

        (async () => {
            try {
                const response: any = await Remote.get('/setting/menu');
                handleResponse(response);
            } catch (error: any) {
                AlertAction({
                    description: error.message,
                    message: 'Fetch error',
                    type: ALERT_TYPE_ERROR,
                });
            }
        })();
    }, []);

    const findMenuItemByName = (name: string, items: Array<any>) => {
        let selectedItem: any = undefined;
        items.forEach((item: any) => {
            if (item.name === name) {
                selectedItem = item;
                return selectedItem;
            }
            if (item.children) {
                const newItem = findMenuItemByName(name, item.children);
                if (newItem) {
                    selectedItem = newItem;
                    return selectedItem;
                }
            }
        });
        return selectedItem;
    }

    const findMenuParentNames = (childName: string, items: Array<any>): Array<string> => {
        let selectedNames: Array<string> = [];
        items.forEach((item: any) => {
            if (item.name === childName) {
                selectedNames.push(item.name);
                return selectedNames;
            }
            if (item.children) {
                const newNames = findMenuParentNames(childName, item.children);
                if (Array.isArray(newNames) && newNames.length) {
                    selectedNames = [...newNames, item.name];
                    return selectedNames;
                }
            }
        });
        return selectedNames;
    }

    const getSelectedKeys = useCallback(() => {
        const name = code.toString().replaceAll('-', '.');
        return [name];
    }, [code]);

    const getDefaultOpenKeys = useCallback(() => {
        const name = code.toString().replaceAll('-', '.');
        if (!menuData) {
            return [];
        }

        return findMenuParentNames(name, [...menuData]);
    }, [code, menuData]);

    const getMenuItems = useCallback((): Array<any> => {
        const generateMenuTree = (item: any) => {
            if (item.children && item.item_type === 'group') {
                const node: any = {
                    type: 'group',
                    label: item.item_label,
                    key: item.name,
                    children: []
                };
                item?.children?.forEach((subItem: any) => {
                    node.children?.push(generateMenuTree(subItem));
                });
                return node;
            }
            if (item.children) {
                const node: any = {
                    label: item.item_label,
                    key: item.name,
                    icon: item?.item_icon ? (
                        <HtmlRawComponent
                            content={item.item_icon}
                            style={{ display: 'flex' }} />
                    ) : undefined,
                    children: []
                };
                item?.children?.forEach((subItem: any) => {
                    node.children?.push(generateMenuTree(subItem));
                });
                return node;
            }

            const node: any = {
                label: item.item_path ? (
                    <NavLink to={item.item_path}>{item.item_label}</NavLink>
                ) : <span>{item.item_label}</span>,
                key: item.name,
                icon: item?.item_icon ? (
                    <NavLink to={item.item_path}>
                        <HtmlRawComponent
                            content={item.item_icon}
                            style={{ display: 'flex' }} />
                    </NavLink>
                ) : undefined,
            };
            return node;
        }

        const items: Array<any> = [];
        menuData?.forEach((item) => {
            items.push(generateMenuTree(item));
        });
        return items;
    }, [menuData]);

    return (
        <div className="sidebar-panel">
            <div className="sidebar-wrapper">
                <Scrollbars autoHide={true} style={{ height: 'calc(100vh - 56px)' }}>
                    {menuData && Array.isArray(menuData) && (
                        <Menu
                            className="app-menu-active-left-side"
                            mode="inline"
                            selectedKeys={getSelectedKeys()}
                            defaultOpenKeys={getDefaultOpenKeys()}
                            items={getMenuItems()}
                            />
                    )}
                </Scrollbars>
            </div>
        </div>
    );
};

export default SettingSidebar;
