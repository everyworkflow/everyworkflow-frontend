/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { lazy } from 'react';
import DataFormPageComponent from '@everyworkflow/data-form-bundle/Component/DataFormPageComponent';

const AttributeFormPage = () => {
    return (
        <DataFormPageComponent
            title="Attribute"
            getPath="/eav/attribute/{code}"
            savePath="/eav/attribute/{code}"
            primaryKey="code"
            primaryKeyLabel="Code"
            formSectionMaps={{
                attribute_select_options: lazy(
                    () => import('@everyworkflow/eav-bundle/Admin/Page/Attribute/AttributeFormPage/OptionsFormSection')
                )
            }}
        />
    );
};

export default AttributeFormPage;
