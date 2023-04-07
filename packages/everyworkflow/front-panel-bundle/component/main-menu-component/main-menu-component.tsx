/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback, useState, useEffect } from 'react';
import { Menu } from "antd";
import { Link } from 'react-router-dom';
import Remote from '@everyworkflow/panel-bundle/service/remote';

interface MainMenuComponentProps {
    menuCode: string;
}

const MainMenuComponent = ({ menuCode }: MainMenuComponentProps) => {
    const [menuData, setMenuData] = useState<Array<any>>([]);

    useEffect(() => {
        (async () => {
            const response: any = await Remote.get('/menu/' + menuCode);
            if (response && response.item.menu_builder_data && Array.isArray(response.item.menu_builder_data)) {
                setMenuData(response.item.menu_builder_data);
            }
        })();
    }, []);

    const getMenuItems = useCallback((): Array<any> => {
        let items: Array<any> = [];

        const mapToFrontendMenuItem = (itemData: any) => {
            let itemKey: string = itemData?.item_path ?? '';
            let itemLabel: any = itemData?.item_label ?? '';

            if (itemKey === '#' || itemKey === '') {
                itemKey = itemData?.item_path + '-' + itemData?.item_label?.replaceAll(' ', '-');
            } if (itemData?.item_type === 'external_link') {
                itemLabel = (
                    <a href={itemData?.item_path} target={itemData?.item_target}>
                        {itemData?.item_label}
                    </a>
                )
            } else {
                itemLabel = (
                    <Link to={itemData?.item_path} target={itemData?.item_target}>
                        {itemData?.item_label}
                    </Link>
                );
            }

            let menuItem: any = {
                key: itemKey,
                label: itemLabel,
            };

            if (itemData?.children && itemData?.children?.length) {
                let childMenu: Array<any> = [];
                itemData?.children?.forEach((childItemData: any) => {
                    childMenu.push(mapToFrontendMenuItem(childItemData));
                });
                menuItem['children'] = childMenu;
            }

            return menuItem;
        }

        menuData.forEach((itemData: any) => {
            items.push(mapToFrontendMenuItem(itemData));
        });

        return items;
    }, [menuData]);

    return (
        <Menu
            mode="horizontal"
            className="app-frontend-main-menu"
            // activeKey={typeof window === 'object' ? window?.location?.pathname : undefined}
            items={getMenuItems()}
        />
    );
}

export default MainMenuComponent;
