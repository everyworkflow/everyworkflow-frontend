/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import SelectFieldInterface from '@everyworkflow/data-form-bundle/model/field/select-field-interface';

interface SelectFieldColumnProps {
    fieldData?: SelectFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const SelectFieldColumn = ({ fieldData, fieldValue }: SelectFieldColumnProps) => {
    const getSelectOptionValue = (): string => {
        fieldData?.options?.forEach(option => {
            if (option.key?.toString() === fieldValue?.toString()) {
                fieldValue = option.value?.toString();
            }
        });
        return fieldValue;
    }

    return <span>{getSelectOptionValue()}</span>;
}

export default SelectFieldColumn;
