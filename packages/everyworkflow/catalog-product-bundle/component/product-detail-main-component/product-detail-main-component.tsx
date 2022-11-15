/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from "react";
import ProductDetailActionComponent from "@everyworkflow/catalog-product-bundle/component/product-detail-action-component";
import ProductDetailContext from "@everyworkflow/catalog-product-bundle/context/product-detail-context";

const ProductDetailMainComponent = () => {
    const { state: detailState } = useContext(ProductDetailContext);

    return (
        <>
            <div className="app-store-product-main">
                <h1 className="product-title">
                    {detailState.remote_data?.item?.product_name}
                </h1>
                <div className="product-price">
                    <span className="product-regular-price">
                        {detailState.remote_data?.item?.price_formatted}
                    </span>
                    {detailState.remote_data?.item?.price_old_formatted && (
                        <span className="product-previous-price">
                            {detailState.remote_data?.item?.price_old_formatted}
                        </span>
                    )}
                </div>
                <div className="product-content">
                    <p>{detailState.remote_data?.item?.short_description}</p>
                </div>
                <ProductDetailActionComponent />
            </div>
        </>
    );
};

export default ProductDetailMainComponent;
