/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { CSSProperties } from 'react';
import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";

interface ContainerBlockInterface extends BlockInterface {
    container_type?: 'full-width' | 'container-center' | undefined;
    content_style?: CSSProperties;
    use_content_style_dark?: boolean;
    content_style_dark?: CSSProperties;
}

export default ContainerBlockInterface;
