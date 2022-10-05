/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";
import DataFormInterface from "@everyworkflow/data-form-bundle/Model/DataFormInterface";

interface DataFormBlockInterface extends BlockInterface {
    data_form?: DataFormInterface;
}

export default DataFormBlockInterface;
