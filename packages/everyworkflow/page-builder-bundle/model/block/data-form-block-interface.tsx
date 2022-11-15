/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import DataFormInterface from "@everyworkflow/data-form-bundle/model/data-form-interface";

interface DataFormBlockInterface extends BlockInterface {
    data_form?: DataFormInterface;
}

export default DataFormBlockInterface;
