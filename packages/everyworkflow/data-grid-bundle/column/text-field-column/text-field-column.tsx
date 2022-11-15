/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import TextFieldInterface from '@everyworkflow/data-form-bundle/model/field/text-field-interface';

interface TextFieldColumnProps {
    fieldData?: TextFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const TextFieldColumn = ({ fieldData, fieldValue }: TextFieldColumnProps) => {
    if (fieldValue !== undefined && typeof fieldValue !== 'string') {
        return <span>{typeof fieldValue}</span>;
    }
    return <span>{fieldValue}</span>;
}

export default TextFieldColumn;
