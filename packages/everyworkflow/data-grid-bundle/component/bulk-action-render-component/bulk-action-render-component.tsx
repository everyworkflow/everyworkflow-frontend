/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from 'react';
import { Menu, Dropdown, Button, Space } from 'antd';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import DataGridContext from '@everyworkflow/data-grid-bundle/context/data-grid-context';
import { DataGridBulkActionMaps } from '@everyworkflow/data-grid-bundle/root/data-grid-bulk-action-maps';

const BulkActionRenderComponent = () => {
    const { state: gridState } = useContext(DataGridContext);

    const getSortedData = (items: Array<any>): Array<any> => {
        return items?.sort((a: any, b: any) => {
            if (a.sort_order > b.sort_order) return 1;
            if (a.sort_order < b.sort_order) return -1;
            return 0;
        });
    };

    const renderItemContent = (item: any, index: number) => {
        if (item.name && !!gridState.grid_bulk_action_maps[item.name]) {
            const DynamicComponent = gridState.grid_bulk_action_maps[item.name];
            return <DynamicComponent key={index} actionData={item} />;
        }
        if (item.action_type && !!DataGridBulkActionMaps[item.action_type]) {
            const DynamicComponent = DataGridBulkActionMaps[item.action_type];
            return <DynamicComponent key={index} actionData={item} />;
        }
        const DynamicComponent = () => (
            <p style={{ padding: 16 }}>
                Action not found &quot;{item.action_type}&quot;
            </p>
        );
        return <DynamicComponent key={index} />;
    }

    if (gridState.data_grid_config?.bulk_actions?.length && gridState.popup_form_data === undefined) {
        if (gridState.data_grid_config?.bulk_action_type === 'dropdown') {
            return (
                <Dropdown
                    overlay={
                        <Menu>
                            {getSortedData(gridState.data_grid_config?.bulk_actions ?? []).map(renderItemContent)}
                        </Menu>
                    }
                    trigger={['click']}
                    placement="bottomRight">
                    <Button type="text" size="small">
                        <EllipsisOutlined />
                    </Button>
                </Dropdown>
            )
        }

        return (
            <Space>
                {getSortedData(gridState.data_grid_config?.bulk_actions ?? []).map(renderItemContent)}
            </Space>
        )
    }

    return null;
}

export default BulkActionRenderComponent;
