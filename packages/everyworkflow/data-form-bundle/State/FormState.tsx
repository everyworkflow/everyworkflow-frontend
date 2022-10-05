/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import FormStateInterface from "@everyworkflow/data-form-bundle/Model/FormStateInterface";

export const formState: FormStateInterface = {
    form_type: undefined,

    form_data: undefined,
    form_id: undefined,
    mode: '',

    form_errors: {},
    initial_values: {},
    
    form_section_maps: {},
    form_field_maps: {},

    hidden_field_names: [],
    invisible_field_names: [],
    disable_field_names: [],

    form_update_data: {},
};
