/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";

interface HeadingBlockInterface extends BlockInterface {
    heading_type: string;
    content: string;
}

export default HeadingBlockInterface;
