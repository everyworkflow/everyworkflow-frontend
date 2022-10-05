/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext } from 'react';
import DataGridContext from '@everyworkflow/data-grid-bundle/Context/DataGridContext';
import { DataGridColumnMaps } from '@everyworkflow/data-grid-bundle/Root/DataGridColumnMaps';
import BaseFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/BaseFieldInterface';
import TextFieldColumn from '@everyworkflow/data-grid-bundle/Column/TextFieldColumn';

interface ColumnRenderComponentProps {
    fieldData?: BaseFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const ColumnRenderComponent = ({ fieldData, fieldValue, rowData }: ColumnRenderComponentProps) => {
    const { state: gridState } = useContext(DataGridContext);

    if (fieldData?.name && !!gridState.grid_column_maps[fieldData.name]) {
        const DynamicComponent = gridState.grid_column_maps[fieldData.name];
        return <DynamicComponent fieldData={fieldData} fieldValue={fieldValue} rowData={rowData} />;
    }
    if (fieldData?.field_type && !!DataGridColumnMaps[fieldData.field_type]) {
        const DynamicComponent = DataGridColumnMaps[fieldData.field_type];
        return <DynamicComponent fieldData={fieldData} fieldValue={fieldValue} rowData={rowData} />;
    }

    return <TextFieldColumn fieldData={fieldData} fieldValue={fieldValue} rowData={rowData} />;
}

export default ColumnRenderComponent;
