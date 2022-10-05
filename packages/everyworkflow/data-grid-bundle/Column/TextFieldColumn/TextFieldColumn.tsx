/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import TextFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/TextFieldInterface';

interface TextFieldColumnProps {
    fieldData?: TextFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const TextFieldColumn = ({ fieldData, fieldValue }: TextFieldColumnProps) => {
    return <span>{fieldValue}</span>;
}

export default TextFieldColumn;
