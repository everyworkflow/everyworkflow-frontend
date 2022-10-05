/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";

interface ColBlockInterface extends BlockInterface {
    flex?: string | number;
    span?: number;
    offset?: number;
    order?: number;
    pull?: number;
    push?: number;
}

export default ColBlockInterface;
