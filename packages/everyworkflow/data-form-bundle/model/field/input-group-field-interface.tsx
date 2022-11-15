/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/model/field/base-field-interface";

interface InputGroupFieldInterface extends BaseFieldInterface {
    row_class_name?: string;
    label_class_name?: string;
    type?: string;
    class_name?: string;
    options?: any;

    prefix_text?: string;
    subfix_text?: string;
}

export default InputGroupFieldInterface;
