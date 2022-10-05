/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useState, useEffect, useCallback } from 'react';
import Menu from 'antd/lib/menu';
import { NavLink, useLocation } from 'react-router-dom';
import Button from 'antd/lib/button';
import HtmlRawComponent from "@everyworkflow/panel-bundle/Component/HtmlRawComponent";
import AdminPanelContext from "@everyworkflow/admin-panel-bundle/Context/AdminPanelContext";
import { ACTION_HIDE_MOBILE_APP_SIDEBAR } from '@everyworkflow/admin-panel-bundle/Reducer/AdminPanelReducer';
import { Scrollbars } from 'react-custom-scrollbars';
import LocalStorage from '@everyworkflow/panel-bundle/Service/LocalStorage';

const SidebarComponent = () => {
    const { state: adminPanelState, dispatch: adminPanelDispatch } = useContext(AdminPanelContext);
    const [sidebarData, setSidebarData] = useState<Array<any>>([]);
    const location = useLocation();

    useEffect(() => {
        if (adminPanelState.sidebar_data) {
            setSidebarData([...adminPanelState.sidebar_data]);
        }
    }, [adminPanelState.sidebar_data]);

    const findMenuItemByPath = (itemPath: string, items: Array<any>) => {
        let selectedItem: any = undefined;
        items.forEach((item: any) => {
            if (itemPath.includes(item.item_path, 0)) {
                selectedItem = item;
                return selectedItem;
            }
            if (item.children) {
                const newItem = findMenuItemByPath(itemPath, item.children);
                if (newItem) {
                    selectedItem = newItem;
                    return selectedItem;
                }
            }
        });
        return selectedItem;
    }

    const findMenuParentNamesByPath = (childPath: string, items: Array<any>): Array<string> => {
        let selectedNames: Array<string> = [];
        items.forEach((item: any) => {
            if (childPath.startsWith(item.item_path, 0)) {
                selectedNames.push(item.name);
                return selectedNames;
            }
            if (item.children) {
                const newPaths = findMenuParentNamesByPath(childPath, item.children);
                if (Array.isArray(newPaths) && newPaths.length) {
                    selectedNames = [...newPaths, item.name];
                    return selectedNames;
                }
            }
        });
        return selectedNames;
    }

    const getSelectedKeys = useCallback(() => {
        const menuItem = findMenuItemByPath(location.pathname, [...sidebarData]);
        if (menuItem) {
            return [menuItem.name];
        } else {
            return [];
        }
    }, [location, sidebarData]);

    const getDefaultOpenKeys = useCallback(() => {
        if (!LocalStorage.get('is_main_sidebar_collapsed')) {
            return findMenuParentNamesByPath(location.pathname, [...sidebarData]);
        }

        return [];
    }, [location, sidebarData]);

    const getSidebarItems = useCallback((): Array<any> => {
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
        sidebarData?.forEach((item) => {
            items.push(generateMenuTree(item));
        });
        return items;
    }, [sidebarData]);

    return (
        <>
            <div className="app-sidebar-header">
                <NavLink to={'/dashboard'} className="btn-title-navlink">
                    <Button className="btn-title" type="text" block={true}>
                        <span className="long-label"><strong>EW</strong> Admin Panel</span>
                        <span className="small-label"><strong>EW</strong></span>
                    </Button>
                </NavLink>
            </div>
            <div className="app-sidebar-panel">
                <Scrollbars autoHide={true} style={{
                    height: 'calc(100vh - 56px - 46px)',
                }}>
                    {sidebarData && Array.isArray(sidebarData) && sidebarData.length > 0 && (
                        <Menu
                            className="app-menu-active-left-side"
                            mode="inline"
                            items={getSidebarItems()}
                            selectedKeys={getSelectedKeys()}
                            defaultOpenKeys={getDefaultOpenKeys()}
                            onClick={() => {
                                adminPanelDispatch({ type: ACTION_HIDE_MOBILE_APP_SIDEBAR });
                            }} />
                    )}
                </Scrollbars>
            </div>
        </>
    );
}

export default SidebarComponent;
