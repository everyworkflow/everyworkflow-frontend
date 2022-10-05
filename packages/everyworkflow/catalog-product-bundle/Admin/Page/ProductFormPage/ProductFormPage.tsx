/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import DataFormPageComponent from '@everyworkflow/data-form-bundle/Component/DataFormPageComponent';

const ProductFormPage = () => {
    return (
        <DataFormPageComponent
            title="Product"
            getPath="/catalog/product/{uuid}"
            savePath="/catalog/product/{uuid}"
        />
    );
};

export default ProductFormPage;
