/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormInterface from '@everyworkflow/data-form-bundle/model/data-form-interface';
import DataCollectionInterface from '@everyworkflow/data-grid-bundle/model/data-collection-interface';
import DataGridConfigInterface from '@everyworkflow/data-grid-bundle/model/data-grid-config-interface';
import DataGridColumnInterface from '@everyworkflow/data-grid-bundle/model/data-grid-column-interface';

interface DataGridStateInterface {
    active_panel?: string;
    selected_row_ids: Array<string>;
    is_filter_enabled?: boolean;
    is_column_setting_enabled?: boolean;

    data_grid_id?: string;
    data_grid_type?: string;
    data_grid_url?: string;
    data_collection?: DataCollectionInterface;
    data_grid_config?: DataGridConfigInterface;
    data_form?: DataFormInterface;
    data_grid_column_state: Array<DataGridColumnInterface>;

    grid_header_action_maps?: any;
    grid_row_action_maps?: any;
    grid_bulk_action_maps?: any;
    grid_column_maps?: any;
    grid_filter_fields_maps?: any;

    popup_form_data?: {
        get_path?: string;
    };
}

export default DataGridStateInterface;
