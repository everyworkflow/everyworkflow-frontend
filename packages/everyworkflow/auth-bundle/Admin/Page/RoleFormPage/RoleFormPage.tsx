/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import DataFormPageComponent from '@everyworkflow/data-form-bundle/Component/DataFormPageComponent';

const RoleFormPage = () => {
    return (
        <DataFormPageComponent
            title="Role"
            getPath="/auth/role/{uuid}"
            savePath="/auth/role/{uuid}"
        />
    );
};

export default RoleFormPage;
