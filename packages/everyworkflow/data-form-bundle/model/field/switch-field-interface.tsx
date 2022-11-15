/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/model/field/base-field-interface";

interface SwitchFieldInterface extends BaseFieldInterface {
    checked_label?: string;
    unchecked_label?: string;
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
    options?: any;
}

export default SwitchFieldInterface;
