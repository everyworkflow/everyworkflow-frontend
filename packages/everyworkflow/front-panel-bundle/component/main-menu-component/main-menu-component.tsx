/*
 * @copyright EveryWorkflow. All rights reserved.
 */

"use client";

import { useCallback, useState, useEffect } from "react";
import { Menu, theme } from "antd";
import { Link } from "react-router-dom";
import Remote from "@everyworkflow/panel-bundle/service/remote";

interface MainMenuComponentProps {
  menuCode: string;
}

const MainMenuComponent = ({ menuCode }: MainMenuComponentProps) => {
  const { token } = theme.useToken();
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const response: any = await Remote.get("/menu/" + menuCode);
      if (
        response &&
        response.item.menu_builder_data &&
        Array.isArray(response.item.menu_builder_data)
      ) {
        getMenuItems(response.item.menu_builder_data);
      }
    })();
  }, []);

  const getMenuItems = (menuData: any) => {
    const mapToFrontendMenuItem = (itemData: any) => {
      let itemKey: string = itemData?.item_path ?? "";
      let itemLabel: any = itemData?.item_label ?? "";

      if (itemKey === "#" || itemKey === "") {
        itemKey = `${itemData?.item_path}-${itemData?.item_label?.replaceAll(
          " ",
          "-"
        )}`;
      }

      if (itemData?.item_type === "external_link") {
        itemLabel = (
          <a href={itemData?.item_path} target={itemData?.item_target}>
            {itemData?.item_label}
          </a>
        );
      } else {
        itemLabel = (
          <Link to={itemData?.item_path} target={itemData?.item_target}>
            {itemData?.item_label}
          </Link>
        );
      }

      const menuItem: any = {
        key: itemKey,
        label: itemLabel,
      };

      if (itemData?.children && itemData?.children?.length) {
        const childMenu: Array<any> = itemData?.children?.map(
          (childItemData: any) => mapToFrontendMenuItem(childItemData)
        );
        menuItem["children"] = childMenu;
      }

      return menuItem;
    };

    const items: Array<any> = menuData.map((itemData: any) =>
      mapToFrontendMenuItem(itemData)
    );
    setItems(items);
  };

return (
  <Menu
    style={{ backgroundColor: token.colorBgBase }}
    mode="horizontal"
    className="app-frontend-main-menu"
    // activeKey={typeof window === 'object' ? window?.location?.pathname : undefined}
    items={items}
  />
);
};

export default MainMenuComponent;
