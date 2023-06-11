/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { MediaDataGridColumnMaps } from '@everyworkflow/media-manager-bundle/root/media-data-grid-column-maps';

import TextFieldColumn from '@everyworkflow/data-grid-bundle/column/text-field-column';
import SelectFieldColumn from '@everyworkflow/data-grid-bundle/column/select-field-column';
import DatePickerFieldColumn from '@everyworkflow/data-grid-bundle/column/date-picker-field-column';
import DateTimePickerFieldColumn from '@everyworkflow/data-grid-bundle/column/date-time-picker-field-column';
import SwitchFieldColumn from '@everyworkflow/data-grid-bundle/column/switch-field-column';

export const DataGridColumnMaps: any = {
    text_field: TextFieldColumn,
    select_field: SelectFieldColumn,
    date_picker_field: DatePickerFieldColumn,
    date_time_picker_field: DateTimePickerFieldColumn,
    switch_field: SwitchFieldColumn,
    ...MediaDataGridColumnMaps,
};
