/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/Model/Field/BaseFieldInterface";

interface DynamicFieldPropsInterface {
    fieldData: BaseFieldInterface;
    onChange?: (value: any) => void;
    children?: JSX.Element;
}

export default DynamicFieldPropsInterface;
