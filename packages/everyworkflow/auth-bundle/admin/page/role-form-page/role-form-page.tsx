/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';

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
