/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import SelectFieldInterface from '@everyworkflow/data-form-bundle/model/field/select-field-interface';
import SelectFieldColumn from '@everyworkflow/data-grid-bundle/column/select-field-column';
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
