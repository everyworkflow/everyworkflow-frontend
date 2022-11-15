/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/model/field/base-field-interface";

interface BaseSectionInterface {
    _id?: string;
    section_type: string;
    code?: string;
    sections?: Array<BaseSectionInterface>;
    fields?: Array<BaseFieldInterface>;
}

export default BaseSectionInterface;
