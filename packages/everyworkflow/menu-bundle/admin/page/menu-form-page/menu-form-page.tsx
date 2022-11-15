/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useParams } from 'react-router-dom';
import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';
import FormMenuTabComponent from '@everyworkflow/data-form-bundle/component/form-menu-tab-component';

const MenuFormPage = () => {
    const { code = '' }: any = useParams();

    return (
        <DataFormPageComponent
            title="Menu"
            getPath="/menu/{code}"
            savePath="/menu/{code}"
            primaryKey="code"
            primaryKeyLabel="Code"
            childrenBeforeHeader={code !== '' ?
                <FormMenuTabComponent tabData={[
                    {
                        label: 'Edit menu',
                        path: '/system/menu/' + code,
                    },
                    {
                        label: 'Menu builder',
                        path: '/system/menu/' + code + '/menu-builder',
                    }
                ]} /> : undefined}
        />
    );
};

export default MenuFormPage;
