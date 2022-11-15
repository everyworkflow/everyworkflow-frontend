/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormInterface from "@everyworkflow/data-form-bundle/model/data-form-interface";

interface PanelDataFormInterface extends DataFormInterface {
    panel_size?: string;
}

interface BlockFormInterface {
    title?: string;
    panel_size?: string;
    block_type: string;
    data_form?: PanelDataFormInterface;
}

export default BlockFormInterface;
