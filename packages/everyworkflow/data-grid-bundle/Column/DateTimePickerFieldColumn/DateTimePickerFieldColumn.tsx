/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback } from 'react';
import moment from 'moment';
import SelectFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/SelectFieldInterface';
import Popover from 'antd/lib/popover';

interface DateTimePickerFieldColumnProps {
    fieldData?: SelectFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const DateTimePickerFieldColumn = ({ fieldData, fieldValue }: DateTimePickerFieldColumnProps) => {
    const getDateObject = useCallback(() => {
        return moment(fieldValue);
    }, [fieldValue])

    return (
        <Popover content={(
            <div>{getDateObject().format('YYYY-MM-DD hh:mm:ss A')}</div>
        )}>
            <span>{fieldValue}</span>
        </Popover>
    );
}

export default DateTimePickerFieldColumn;
