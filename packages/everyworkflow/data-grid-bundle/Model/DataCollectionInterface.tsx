/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataCollectionMetaInterface from "@everyworkflow/data-grid-bundle/Model/DataCollectionMetaInterface";

interface DataCollectionInterface {
    meta?: DataCollectionMetaInterface;
    results: Array<any>;
}

export default DataCollectionInterface;
