/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';
import AdminPanelContext from '@everyworkflow/admin-panel-bundle/context/admin-panel-context';
import SidebarItemInterface from '@everyworkflow/admin-panel-bundle/model/sidebar/sidebar-item-interface';

const BreadcrumbComponent = () => {
    const { state: adminPanelState } = useContext(AdminPanelContext);
    const location = useLocation();

    const getArrayItems = useCallback((): Array<any> => {
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
        let items: Array<any> = [];
        if (adminPanelState.sidebar_data) {
            const result: Array<any> = findHierarchical(adminPanelState.sidebar_data, location.pathname);
            result.forEach((item: SidebarItemInterface) => {
                items.push({
                    key: item.item_path,
                    title: (
                        <>
                            {item.item_path ? <NavLink to={item.item_path}>{item.item_label}</NavLink> : item.item_label}
                        </>
                    )
                });
            });
        }
        return items;
    }, [location, adminPanelState]);

    return (
        <Breadcrumb style={{ margin: '16px 24px' }} items={getArrayItems()} />
    );
};

export default BreadcrumbComponent;
