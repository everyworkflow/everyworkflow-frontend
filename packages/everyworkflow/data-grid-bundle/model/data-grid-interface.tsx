/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormInterface from '@everyworkflow/data-form-bundle/model/data-form-interface';
import DataCollectionInterface from '@everyworkflow/data-grid-bundle/model/data-collection-interface';
import DataGridConfigInterface from '@everyworkflow/data-grid-bundle/model/data-grid-config-interface';

interface DataGridInterface {
    is_filter_enabled?: boolean;
    is_column_setting_enabled?: boolean;

    data_collection?: DataCollectionInterface;
    data_grid_config?: DataGridConfigInterface;
    data_form?: DataFormInterface;
}

export default DataGridInterface;
