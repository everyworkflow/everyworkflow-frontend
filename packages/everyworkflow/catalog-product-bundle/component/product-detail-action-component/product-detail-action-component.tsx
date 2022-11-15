/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from "react";
import { Button, InputNumber } from "antd";
import ProductDetailContext from "@everyworkflow/catalog-product-bundle/context/product-detail-context";
import { ACTION_SET_CART_DATA } from "@everyworkflow/catalog-product-bundle/reducer/product-detail-reducer";
import ProductSelectComponent from "@everyworkflow/catalog-product-bundle/component/product-select-component";
import ProductSwatchComponent from "@everyworkflow/catalog-product-bundle/component/product-swatch-component";

const ProductDetailActionComponent = () => {
    const { state: detailState, dispatch: detailDispatch } =
        useContext(ProductDetailContext);

    const handleChange = (code: string, value: any) => {
        let currentData = { ...detailState.cart_data };
        currentData[code] = value;
        detailDispatch({
            type: ACTION_SET_CART_DATA,
            payload: currentData,
        });
    };

    const onClickAddToCart = () => { };

    return (
        <>
            <ProductSelectComponent
                label="Fabric"
                defaultValue={"cotton"}
                options={[
                    { key: "cotton", label: "Cotton" },
                    { key: "polyester", label: "Polyester" },
                    { key: "silk", label: "Silk" },
                    { key: "nylon", label: "Nylon" },
                    { key: "cashmere", label: "Cashmere" },
                    { key: "wool", label: "Wool" },
                ]}
                onChange={(value: string) => handleChange("fabric", value)}
            />
            <ProductSwatchComponent
                defaultValue={"red"}
                onChange={(value: string) => handleChange("color", value)}
                productSwatch={{
                    label: "Color",
                    type: "hex",
                    items: [
                        {
                            label: "Red",
                            hex: "red",
                            key: "red",
                        },
                        {
                            label: "Yellow",
                            hex: "yellow",
                            key: "yellow",
                        },
                        {
                            label: "Blue",
                            hex: "blue",
                            key: "blue",
                        },
                    ],
                }}
            />
            <ProductSwatchComponent
                defaultValue={"S"}
                onChange={(value: string) => handleChange("size", value)}
                productSwatch={{
                    label: "Size",
                    type: "text",
                    items: [
                        {
                            label: "Small",
                            text: "S",
                            key: "S",
                        },
                        {
                            label: "Medium",
                            text: "M",
                            key: "M",
                        },
                        {
                            label: "Large",
                            text: "L",
                            key: "L",
                        },
                    ],
                }}
            />
            <ProductSwatchComponent
                defaultValue={"orange"}
                onChange={(value: string) => handleChange("design", value)}
                productSwatch={{
                    label: "Design",
                    type: "image",
                    items: [
                        {
                            label: "Orange",
                            image_url: "/media/test-product-images/ws12-orange_main_2.jpg",
                            small_image_url:
                                "/media/test-product-images/ws12-orange_main_2.jpg",
                            key: "orange",
                        },
                        {
                            label: "White",
                            image_url: "/media/test-product-images/wt09-white_main_1.jpg",
                            small_image_url:
                                "/media/test-product-images/wt09-white_main_1.jpg",
                            key: "white",
                        },
                    ],
                }}
            />
            <div className="ant-form-item">
                <div className="ant-form-item-label">
                    <label>Quantity</label>
                </div>
                <div className="ant-form-item-control">
                    <InputNumber
                        size="large"
                        min={1}
                        max={100}
                        value={detailState.cart_data.quantity ?? 1}
                        onChange={(value: number | null) => {
                            handleChange("quantity", value);
                        }}
                    />
                </div>
            </div>
            <div className="ant-form-item" style={{ marginTop: 32 }}>
                <Button type="primary" size="large" onClick={onClickAddToCart}>
                    Add to cart
                </Button>
            </div>
        </>
    );
};

export default ProductDetailActionComponent;
