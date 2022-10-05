/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import {lazy} from "react";
import AbstractBlock from "@everyworkflow/page-builder-bundle/Block/AbstractBlock";
import ContainerBlock from "@everyworkflow/page-builder-bundle/Block/ContainerBlock";
import RowBlock from "@everyworkflow/page-builder-bundle/Block/RowBlock";
import ColBlock from "@everyworkflow/page-builder-bundle/Block/ColBlock";
import HeadingBlock from "@everyworkflow/page-builder-bundle/Block/HeadingBlock";
import ParagraphBlock from "@everyworkflow/page-builder-bundle/Block/ParagraphBlock";
import ButtonBlock from "@everyworkflow/page-builder-bundle/Block/ButtonBlock";
import LinkWrapperBlock from "@everyworkflow/page-builder-bundle/Block/LinkWrapperBlock";
import MarkdownBlock from "@everyworkflow/page-builder-bundle/Block/MarkdownBlock";
import ImageBlock from "@everyworkflow/page-builder-bundle/Block/ImageBlock";
const DataFormBlock = lazy(() => import("@everyworkflow/page-builder-bundle/Block/DataFormBlock"));

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
