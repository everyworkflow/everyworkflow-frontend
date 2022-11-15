/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from 'react';
import { MediaFormFieldMaps } from '@everyworkflow/media-manager-bundle/root/media-form-field-maps';

import TextField from '@everyworkflow/data-form-bundle/field/text-field';

import SelectField from '@everyworkflow/data-form-bundle/field/select-field';
import CheckField from '@everyworkflow/data-form-bundle/field/check-field';
import SwitchField from '@everyworkflow/data-form-bundle/field/switch-field';
import TextareaField from '@everyworkflow/data-form-bundle/field/textarea-field';
const MarkdownField = lazy(() => import('@everyworkflow/data-form-bundle/field/markdown-field'));
const WysiwygField = lazy(() => import('@everyworkflow/data-form-bundle/field/wysiwyg-field'));
const ColorPickerField = lazy(() => import('@everyworkflow/data-form-bundle/field/color-picker-field'));
const DatePickerField = lazy(() => import('@everyworkflow/data-form-bundle/field/date-picker-field'));
const TimePickerField = lazy(() => import('@everyworkflow/data-form-bundle/field/time-picker-field'));
import DateTimePickerField from '@everyworkflow/data-form-bundle/field/date-time-picker-field';
const DateRangePickerField = lazy(() => import('@everyworkflow/data-form-bundle/field/date-range-picker-field'));
const TimeRangePickerField = lazy(() => import('@everyworkflow/data-form-bundle/field/time-range-picker-field'));
import DateTimeRangePickerField from '@everyworkflow/data-form-bundle/field/date-time-range-picker-field';
const FileField = lazy(() => import('@everyworkflow/data-form-bundle/field/file-field'));
const RadioField = lazy(() => import('@everyworkflow/data-form-bundle/field/radio-field'));
import MultiSelectField from '@everyworkflow/data-form-bundle/field/multi-select-field';
const Cascader = lazy(() => import('@everyworkflow/data-form-bundle/field/cascader'));
const TreeSelectField = lazy(() => import('@everyworkflow/data-form-bundle/field/tree-select-field'));

export const DataFormFieldMaps: any = {
    text_field: TextField,
    textarea_field: TextareaField,
    markdown_field: MarkdownField,
    wysiwyg_field: WysiwygField,
    color_picker_field: ColorPickerField,
    date_picker_field: DatePickerField,
    time_picker_field: TimePickerField,
    date_time_picker_field: DateTimePickerField,
    date_range_picker_field: DateRangePickerField,
    time_range_picker_field: TimeRangePickerField,
    date_time_range_picker_field: DateTimeRangePickerField,
    file_field: FileField,
    check_field: CheckField,
    switch_field: SwitchField,
    radio_field: RadioField,
    select_field: SelectField,
    multi_select_field: MultiSelectField,
    cascader: Cascader,
    tree_select_field: TreeSelectField,
    ...MediaFormFieldMaps,
};
