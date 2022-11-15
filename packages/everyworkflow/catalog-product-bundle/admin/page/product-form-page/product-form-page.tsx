/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';

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
