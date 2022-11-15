/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/model/field/base-field-interface";

interface DynamicFieldPropsInterface {
    fieldData: BaseFieldInterface;
    onChange?: (value: any) => void;
    children?: JSX.Element;
}

export default DynamicFieldPropsInterface;
