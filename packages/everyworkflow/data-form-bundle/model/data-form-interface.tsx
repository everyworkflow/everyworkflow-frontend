/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from "@everyworkflow/data-form-bundle/model/field/base-field-interface";
import BaseSectionInterface from "@everyworkflow/data-form-bundle/model/section/base-section-interface";

interface DataFormInterface {
    _id?: string;
    form_update_path?: string;
    is_side_form_anchor_enable?: boolean;
    side_form_anchor_position?: string;
    fields?: Array<BaseFieldInterface>;
    sections?: Array<BaseSectionInterface>;
}

export default DataFormInterface;
