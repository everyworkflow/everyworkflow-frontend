/*
 * @copyright EveryWorkflow. All rights reserved.
 */

"use client";

import { useContext, useEffect, useState } from "react";
import { Popover } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import MiniCartComponent from "./mini-cart-popover-component";
import IndexedDbObject from "@everyworkflow/panel-bundle/service/indexed-db/indexed-db-object";
import { CartContext } from "../../context/cart-context";
import { ACTION_SET_OFFLINE_CART_ITEM } from "../../reducer/cart-reducer";

const MiniCart = () => {
  const { dispatch } = useContext(CartContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const indexDB = new IndexedDbObject("cart");
      await indexDB.createObjectStore(["cart"]);
      const data: any = await indexDB.getAllValue("cart");

      dispatch({ type: ACTION_SET_OFFLINE_CART_ITEM, payload: data });
    })();
  }, []);

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const handleClosePopover = () => {
    setVisible(false);
  };

  return (
    <Popover
      placement="bottom"
      content={<MiniCartComponent handleClosePopover={handleClosePopover} />}
      mouseEnterDelay={0}
      open={visible}
      trigger="hover"
      onOpenChange={handleVisibleChange}
    >
      <ShoppingCartOutlined />
    </Popover>
  );
};

export default MiniCart;
