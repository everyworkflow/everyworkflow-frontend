/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback } from 'react';
import moment from 'moment';
import { Popover } from 'antd';
import SelectFieldInterface from '@everyworkflow/data-form-bundle/model/field/select-field-interface';

interface DateTimePickerFieldColumnProps {
    fieldData?: SelectFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const DateTimePickerFieldColumn = ({ fieldData, fieldValue }: DateTimePickerFieldColumnProps) => {
    const getDateObject = useCallback(() => {
        return moment.utc(fieldValue).local();
    }, [fieldValue])

    return (
        <Popover content={(
            <div>{fieldValue} UTC</div>
        )}>
            <span>{fieldValue ? getDateObject().format('YYYY-MM-DD hh:mm:ss A') : null}</span>
        </Popover>
    );
}

export default DateTimePickerFieldColumn;
