/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/Model/Field/BaseFieldInterface";
import BaseSectionInterface from "@everyworkflow/data-form-bundle/Model/Section/BaseSectionInterface";

interface DataFormInterface {
    _id?: string;
    form_update_path?: string;
    is_side_form_anchor_enable?: boolean;
    side_form_anchor_position?: string;
    fields?: Array<BaseFieldInterface>;
    sections?: Array<BaseSectionInterface>;
}

export default DataFormInterface;
