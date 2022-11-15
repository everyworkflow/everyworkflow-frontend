/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';

const UserFormPage = () => {
    return (
        <DataFormPageComponent
            title="User"
            getPath="/user/{uuid}"
            savePath="/user/{uuid}"
        />
    );
};

export default UserFormPage;
