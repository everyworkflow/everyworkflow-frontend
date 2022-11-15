/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import SwatchImageInterface from "@everyworkflow/catalog-product-bundle/model/product-swatch/swatch-image-interface";
import SwatchHexInterface from "@everyworkflow/catalog-product-bundle/model/product-swatch/swatch-hex-interface";
import SwatchTextInterface from "@everyworkflow/catalog-product-bundle/model/product-swatch/swatch-text-interface";


interface ProductSwatchInterface {
    label?: string;
    type?: string;
    items?: Array<SwatchImageInterface | SwatchHexInterface | SwatchTextInterface>;
}

export default ProductSwatchInterface;
