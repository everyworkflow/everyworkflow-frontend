/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from 'react';
import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';

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
                    () => import('@everyworkflow/eav-bundle/admin/page/attribute/attribute-form-page/options-form-section')
                )
            }}
        />
    );
};

export default AttributeFormPage;
