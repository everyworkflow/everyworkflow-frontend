/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";

interface HeadingBlockInterface extends BlockInterface {
    heading_type: string;
    content: string;
}

export default HeadingBlockInterface;
