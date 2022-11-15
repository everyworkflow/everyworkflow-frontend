/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/model/field/base-field-interface";
import OptionInterface from "@everyworkflow/data-form-bundle/model/field/select/option-interface";

interface RadioFieldInterface extends BaseFieldInterface {
    options?: Array<OptionInterface>;
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
}

export default RadioFieldInterface;
