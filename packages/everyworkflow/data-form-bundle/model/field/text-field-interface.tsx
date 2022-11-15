/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/model/field/base-field-interface";

interface TextFieldInterface extends BaseFieldInterface {
    row_class_name?: string;
    label_class_name?: string;
    input_type?: string;
    class_name?: string;
    options?: any;

    prefix_tab_text?: string;
    suffix_tab_text?: string;
    prefix_text?: string;
    suffix_text?: string;
}

export default TextFieldInterface;
