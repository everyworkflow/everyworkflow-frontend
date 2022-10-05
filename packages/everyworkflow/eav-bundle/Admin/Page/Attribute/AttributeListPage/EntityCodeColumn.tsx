/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import SelectFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/SelectFieldInterface';
import SelectFieldColumn from '@everyworkflow/data-grid-bundle/Column/SelectFieldColumn';
import { NavLink } from 'react-router-dom';

interface EntityCodeColumnProps {
    fieldData?: SelectFieldInterface;
    fieldValue?: any;
}

const EntityCodeColumn = ({ fieldData, fieldValue }: EntityCodeColumnProps) => {
    return (
        <NavLink to={'/system/entity/' + fieldValue + '/edit'}>
            <SelectFieldColumn fieldData={fieldData} fieldValue={fieldValue} />
        </NavLink>
    );
}

export default EntityCodeColumn;
