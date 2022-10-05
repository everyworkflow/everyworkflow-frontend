/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import TextFieldColumn from '@everyworkflow/data-grid-bundle/Column/TextFieldColumn';
import SelectFieldColumn from '@everyworkflow/data-grid-bundle/Column/SelectFieldColumn';
import DatePickerFieldColumn from '@everyworkflow/data-grid-bundle/Column/DatePickerFieldColumn';
import DateTimePickerFieldColumn from '@everyworkflow/data-grid-bundle/Column/DateTimePickerFieldColumn';
import SwitchFieldColumn from '@everyworkflow/data-grid-bundle/Column/SwitchFieldColumn';

export const DataGridColumnMaps: any = {
    text_field: TextFieldColumn,
    select_field: SelectFieldColumn,
    date_picker_field: DatePickerFieldColumn,
    date_time_picker_field: DateTimePickerFieldColumn,
    switch_field: SwitchFieldColumn,
};
