/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import SwitchFieldInterface from '@everyworkflow/data-form-bundle/model/field/switch-field-interface';

interface SwitchFieldColumnProps {
    fieldData?: SwitchFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const SwitchFieldColumn = ({ fieldData, fieldValue }: SwitchFieldColumnProps) => {
    return <div style={{ textAlign: 'center' }}>{fieldValue ? 'Yes' : 'No'}</div>;
}

export default SwitchFieldColumn;
