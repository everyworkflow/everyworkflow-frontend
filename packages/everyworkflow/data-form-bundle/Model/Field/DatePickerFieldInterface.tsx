/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/Model/Field/BaseFieldInterface";

interface DatePickerFieldInterface extends BaseFieldInterface {
  row_class_name?: string;
  label_class_name?: string;
  class_name?: string;
  picker?: string;
  format?: string;
}

export default DatePickerFieldInterface;
