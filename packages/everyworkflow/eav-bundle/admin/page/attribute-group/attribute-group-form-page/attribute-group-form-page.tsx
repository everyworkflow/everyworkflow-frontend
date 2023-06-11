/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from 'react';
import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';

const AttributeGroupFormPage = () => {
    return (
        <DataFormPageComponent
            title="Attribute group"
            getPath="/eav/attribute-group/{code}"
            savePath="/eav/attribute-group/{code}"
            primaryKey="code"
            primaryKeyLabel="Code"
            formSectionMaps={{
                attribute_group: lazy(
                    () => import('@everyworkflow/eav-bundle/section/attribute-group-section')
                )
            }}
        />
    );
};

export default AttributeGroupFormPage;
