/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';

const CategoryFormPage = () => {
    return (
        <DataFormPageComponent
            title="Category"
            getPath="/catalog/category/{uuid}"
            savePath="/catalog/category/{uuid}"
        />
    );
};

export default CategoryFormPage;
