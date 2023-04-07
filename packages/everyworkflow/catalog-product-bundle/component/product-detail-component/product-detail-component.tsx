/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useReducer } from "react";
import { Row, Col } from "antd";
import StickyBox from "react-sticky-box";
import ProductGalleryComponent from "@everyworkflow/catalog-product-bundle/component/product-gallery-component";
import ProductDetailMainComponent from "@everyworkflow/catalog-product-bundle/component/product-detail-main-component";
import ProductDetailReducer from "@everyworkflow/catalog-product-bundle/reducer/product-detail-reducer";
import { productDetailState } from "@everyworkflow/catalog-product-bundle/state/product-detail-state";
import ProductDetailStateInterface from "@everyworkflow/catalog-product-bundle/model/product-detail-state-interface";
import ProductDetailContext from "@everyworkflow/catalog-product-bundle/context/product-detail-context";
import ProductDetailFooterComponent from "@everyworkflow/catalog-product-bundle/component/product-detail-footer-component";

interface ProductDetailComponentProps {
    initialState?: ProductDetailStateInterface;
}

const ProductDetailComponent = ({
    initialState,
}: ProductDetailComponentProps) => {
    const [state, dispatch] = useReducer(ProductDetailReducer, {
        ...productDetailState,
        ...initialState,
    });

    return (
        <>
            <ProductDetailContext.Provider
                value={{
                    state: state,
                    dispatch: dispatch,
                }}
            >
                <>
                    <Row gutter={16}>
                        <Col span={14}>
                            <ProductGalleryComponent />
                        </Col>
                        <Col span={10}>
                            <StickyBox offsetTop={56}>
                                <ProductDetailMainComponent />
                            </StickyBox>
                        </Col>
                    </Row>
                    <ProductDetailFooterComponent />
                </>
            </ProductDetailContext.Provider>
        </>
    );
};

export default ProductDetailComponent;
