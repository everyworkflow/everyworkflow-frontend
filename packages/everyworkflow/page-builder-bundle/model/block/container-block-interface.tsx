/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";

interface ContainerBlockInterface extends BlockInterface {
    container_type?: 'full-width' | 'container-center' | undefined;
    content_style?: string;
}

export default ContainerBlockInterface;
