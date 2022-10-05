/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/Model/Field/BaseFieldInterface";

interface FileFieldInterface extends BaseFieldInterface {
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
    options?: any;
}

export default FileFieldInterface;
