/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface BaseFieldInterface {
    _id?: string;
    label?: string;
    name?: string;
    value?: any;
    help_text?: string;
    sort_order?: number;
    field_type: string;
    default_value?: string;
    is_required?: boolean;
    is_disabled?: boolean;
    type?: string;

    is_readonly?: boolean;
    allow_clear?: boolean;

    is_actionable?: boolean;
    field_actions?: any;
}

export default BaseFieldInterface;
