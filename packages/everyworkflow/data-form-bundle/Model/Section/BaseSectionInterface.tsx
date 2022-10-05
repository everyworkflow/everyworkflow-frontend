/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/Model/Field/BaseFieldInterface";

interface BaseSectionInterface {
    _id?: string;
    section_type: string;
    code?: string;
    sections?: Array<BaseSectionInterface>;
    fields?: Array<BaseFieldInterface>;
}

export default BaseSectionInterface;
