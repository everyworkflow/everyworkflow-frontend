/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";
import AbstractBlock from "@everyworkflow/page-builder-bundle/block/abstract-block";
import ContainerBlock from "@everyworkflow/page-builder-bundle/block/container-block";
import RowBlock from "@everyworkflow/page-builder-bundle/block/row-block";
import ColBlock from "@everyworkflow/page-builder-bundle/block/col-block";
import HeadingBlock from "@everyworkflow/page-builder-bundle/block/heading-block";
import ParagraphBlock from "@everyworkflow/page-builder-bundle/block/paragraph-block";
import ButtonBlock from "@everyworkflow/page-builder-bundle/block/button-block";
import LinkWrapperBlock from "@everyworkflow/page-builder-bundle/block/link-wrapper-block";
import MarkdownBlock from "@everyworkflow/page-builder-bundle/block/markdown-block";
import ImageBlock from "@everyworkflow/page-builder-bundle/block/image-block";
const DataFormBlock = lazy(() => import("@everyworkflow/page-builder-bundle/block/data-form-block"));

export const PageBlockMaps: any = {
    abstract_block: AbstractBlock,
    container_block: ContainerBlock,
    row_block: RowBlock,
    col_block: ColBlock,
    heading_block: HeadingBlock,
    paragraph_block: ParagraphBlock,
    button_block: ButtonBlock,
    link_wrapper_block: LinkWrapperBlock,
    markdown_block: MarkdownBlock,
    image_block: ImageBlock,
    data_form_block: DataFormBlock,
};
