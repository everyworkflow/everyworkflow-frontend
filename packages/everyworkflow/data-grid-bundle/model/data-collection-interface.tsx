/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataCollectionMetaInterface from "@everyworkflow/data-grid-bundle/model/data-collection-meta-interface";

interface DataCollectionInterface {
    meta?: DataCollectionMetaInterface;
    results: Array<any>;
}

export default DataCollectionInterface;
