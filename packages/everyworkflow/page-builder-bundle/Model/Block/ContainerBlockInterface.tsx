/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";

interface ContainerBlockInterface extends BlockInterface {
    container_type?: 'full-width' | 'container-center' |undefined;
    content_style?: string;
}

export default ContainerBlockInterface;
