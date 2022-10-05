/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Typography from "antd/lib/typography";
import Markdown from "markdown-to-jsx";
import StyleHelper from "@everyworkflow/panel-bundle/Helper/StyleHelper";
import ParagraphBlockInterface from "@everyworkflow/page-builder-bundle/Model/Block/ParagraphBlockInterface";
import EditableBlockComponent from "@everyworkflow/page-builder-bundle/Component/EditableBlockComponent";
import "@everyworkflow/page-builder-bundle/Block/MarkdownBlock/MarkdownStyle.less";

interface ParagraphBlockProps {
    indexes?: Array<number>;
    blockData: ParagraphBlockInterface;
    mode?: string;
}

interface WithChildren {
    children?: React.ReactNode
}

const MarkdownBlock = ({ indexes, blockData }: ParagraphBlockProps) => {

    const OlWrapRenderComponent = ({ children }: WithChildren): React.ReactElement => (
        <Typography.Paragraph>
            <ol>{children}</ol>
        </Typography.Paragraph>
    )

    const UlWrapRenderComponent = ({ children }: WithChildren): React.ReactElement => (
        <Typography.Paragraph>
            <ul>{children}</ul>
        </Typography.Paragraph>
    )

    const PreWrapRenderComponent = ({ children }: WithChildren): React.ReactElement => (
        <Typography.Paragraph>
            <pre>{children}</pre>
        </Typography.Paragraph>
    )

    return (
        <EditableBlockComponent blockData={blockData} indexes={indexes}>
            <div className="app-markdown-content" style={StyleHelper.remoteStyleParse(blockData.style)}>
                <Markdown options={{
                    forceBlock: true,
                    overrides: {
                        h1: {
                            component: Typography.Title,
                            props: {
                                level: 1,
                            },
                        },
                        h2: {
                            component: Typography.Title,
                            props: {
                                level: 2,
                            },
                        },
                        h3: {
                            component: Typography.Title,
                            props: {
                                level: 3,
                            },
                        },
                        h4: {
                            component: Typography.Title,
                            props: {
                                level: 4,
                            },
                        },
                        h5: {
                            component: Typography.Title,
                            props: {
                                level: 5,
                            },
                        },
                        h6: {
                            component: Typography.Title,
                            props: {
                                level: 5,
                            },
                        },
                        p: {
                            component: Typography.Paragraph,
                        },
                        pre: {
                            component: PreWrapRenderComponent,
                        },
                        ol: {
                            component: OlWrapRenderComponent,
                        },
                        ul: {
                            component: UlWrapRenderComponent,
                        },
                    },
                }}>{blockData.content ?? ''}</Markdown>
            </div>
        </EditableBlockComponent>
    );
}

export default MarkdownBlock;
