/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AdminPanelContext from '@everyworkflow/admin-panel-bundle/Context/AdminPanelContext';
import SidebarItemInterface from '../../Model/Sidebar/SidebarItemInterface';
import Breadcrumb from 'antd/lib/breadcrumb';
import { NavLink } from 'react-router-dom';

const BreadcrumbComponent = () => {
    const { state: adminPanelState } = useContext(AdminPanelContext);
    const location = useLocation();

    const getArrayItems = useCallback(() => {
        const findHierarchical = (
            items: Array<SidebarItemInterface>,
            pathName: string
        ) => {
            const hierarchicalData: Array<SidebarItemInterface> = [];
            items.forEach((item: SidebarItemInterface) => {
                let isItemAdded = false;
                if (item.item_path && pathName.includes(item.item_path, 0)) {
                    hierarchicalData.push(item);
                    isItemAdded = true;
                }
                if (item.children) {
                    const nextItems = findHierarchical(item.children, pathName);
                    if (nextItems.length) {
                        if (!isItemAdded) {
                            hierarchicalData.push(item);
                            isItemAdded = true;
                        }
                        nextItems.forEach((nextItem: SidebarItemInterface) => {
                            hierarchicalData.push(nextItem);
                        });
                    }
                }
            });
            return hierarchicalData;
        };
        if (adminPanelState.sidebar_data) {
            return findHierarchical(adminPanelState.sidebar_data, location.pathname);
        }
        return [];
    }, [location, adminPanelState]);

    return (
        <Breadcrumb style={{ margin: '16px 24px' }}>
            {getArrayItems().map((item, index: number) => (
                <Breadcrumb.Item key={index}>{
                    item.item_path ? (
                        <NavLink to={item.item_path}>{item.item_label}</NavLink>
                    ) : item.item_label
                }</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default BreadcrumbComponent;
