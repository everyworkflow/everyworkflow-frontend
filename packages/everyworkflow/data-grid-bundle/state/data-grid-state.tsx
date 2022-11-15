/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataGridStateInterface from "@everyworkflow/data-grid-bundle/model/data-grid-state-interface";

export const dataGridState: DataGridStateInterface = {
    active_panel: undefined,
    selected_row_ids: [],
    is_filter_enabled: false,
    is_column_setting_enabled: false,

    data_grid_id: undefined,
    data_grid_type: undefined,
    data_grid_url: undefined,
    data_collection: undefined,
    data_grid_config: undefined,
    data_form: undefined,
    data_grid_column_state: [],

    grid_header_action_maps: {},
    grid_row_action_maps: {},
    grid_bulk_action_maps: {},
    grid_column_maps: {},
    grid_filter_fields_maps: {},
};
