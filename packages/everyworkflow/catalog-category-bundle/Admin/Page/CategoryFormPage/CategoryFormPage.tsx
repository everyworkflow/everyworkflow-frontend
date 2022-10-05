/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import DataFormPageComponent from '@everyworkflow/data-form-bundle/Component/DataFormPageComponent';

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
