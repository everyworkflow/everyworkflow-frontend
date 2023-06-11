/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from "react";
import { theme } from 'antd';
import ProductDetailActionComponent from "@everyworkflow/catalog-product-bundle/component/product-detail-action-component";
import ProductDetailContext from "@everyworkflow/catalog-product-bundle/context/product-detail-context";

const ProductDetailMainComponent = () => {
  const { state: detailState } = useContext(ProductDetailContext);
  const { token } = theme.useToken();

  return (
    <>
      <div
        style={{
          padding: "32px 0",
          maxWidth: "520px",
          margin: "auto",
        }}
      >
        <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>
          {detailState.remote_data?.item?.name}
        </h1>
        <div style={{ marginBottom: 16 }}>
          <span style={{
            color: token.colorPrimary,
            fontSize: token.fontSize * 2,
          }}>Rs. {detailState.remote_data?.item?.price}</span>
          {detailState.remote_data?.item?.price_old_formatted && (
            <span
              style={{
                textDecoration: "line-through",
                marginLeft: "8px",
                fontSize: "14px",
              }}
            >
              {detailState.remote_data?.item?.price_old_formatted}
            </span>
          )}
        </div>
        <div style={{ marginBottom: "16px" }}>
          <p>{detailState.remote_data?.item?.short_description}</p>
        </div>
        <ProductDetailActionComponent />
      </div>
    </>
  );
};

export default ProductDetailMainComponent;
