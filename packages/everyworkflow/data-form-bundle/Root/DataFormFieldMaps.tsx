/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from 'react';
import { MediaFormFieldMaps } from '@everyworkflow/media-manager-bundle/Root/MediaFormFieldMaps';

import TextField from '@everyworkflow/data-form-bundle/Field/TextField';

const TextareaField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/TextareaField')
);
const MarkdownField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/MarkdownField')
);
const WysiwygField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/WysiwygField')
);
const ColorPickerField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/ColorPickerField')
);
const DatePickerField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/DatePickerField')
);
const TimePickerField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/TimePickerField')
);
import DateTimePickerField from '@everyworkflow/data-form-bundle/Field/DateTimePickerField';
const DateRangePickerField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/DateRangePickerField')
);
const TimeRangePickerField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/TimeRangePickerField')
);
import DateTimeRangePickerField from '@everyworkflow/data-form-bundle/Field/DateTimeRangePickerField';
const FileField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/FileField')
);
import CheckField from '@everyworkflow/data-form-bundle/Field/CheckField';
import SwitchField from '@everyworkflow/data-form-bundle/Field/SwitchField';
const RadioField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/RadioField')
);
import SelectField from '@everyworkflow/data-form-bundle/Field/SelectField';
import MultiSelectField from '@everyworkflow/data-form-bundle/Field/MultiSelectField';
const Cascader = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/Cascader')
);
const TreeSelectField = lazy(
  () => import('@everyworkflow/data-form-bundle/Field/TreeSelectField')
);

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
