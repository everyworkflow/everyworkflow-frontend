/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";

interface LinkWrapperBlockInterface extends BlockInterface {
    link_path?: string;
    link_target?: string;
}

export default LinkWrapperBlockInterface;
