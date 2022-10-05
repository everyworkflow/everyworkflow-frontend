/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import DataFormPageComponent from '@everyworkflow/data-form-bundle/Component/DataFormPageComponent';

const EntityFormPage = () => {
    return (
        <DataFormPageComponent
            title="Entity"
            getPath="/eav/entity/{code}"
            savePath="/eav/entity/{code}"
            primaryKey="code"
            primaryKeyLabel="Code"
        />
    );
};

export default EntityFormPage;
