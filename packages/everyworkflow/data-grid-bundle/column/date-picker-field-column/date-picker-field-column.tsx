/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback } from 'react';
import moment from 'moment';
import SelectFieldInterface from '@everyworkflow/data-form-bundle/model/field/select-field-interface';

interface DatePickerFieldColumnProps {
    fieldData?: SelectFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const DatePickerFieldColumn = ({ fieldData, fieldValue }: DatePickerFieldColumnProps) => {
    const getDateObject = useCallback(() => {
        return moment(fieldValue);
    }, [fieldValue])

    return (
        <span>{fieldValue ? getDateObject().format('YYYY-MM-DD') : ''}</span>
    );
}

export default DatePickerFieldColumn;
