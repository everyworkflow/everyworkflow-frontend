/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import PageBuilderComponent from "@everyworkflow/page-builder-bundle/component/page-builder-component";

const DataFormBlockPage = () => {
    const pageBuilderData = {
        block_data: [
            {
                block_type: 'container_block',
                block_data: [
                    {
                        block_type: 'row_block',
                        block_data: [
                            {
                                block_type: 'col_block',
                                flex: 1,
                                block_data: [
                                    {
                                        block_type: 'paragraph_block',
                                        content: 'Col 1 - This is hello from home page to paragraph_block!'
                                    },
                                ],
                            },
                            {
                                block_type: 'col_block',
                                flex: 1,
                                block_data: [
                                    {
                                        block_type: 'paragraph_block',
                                        content: 'Col 1 - This is hello from home page to paragraph_block!'
                                    },
                                ],
                            },
                        ],
                    },
                    // {
                    //     block_type: 'data_form_block',
                    //     data_form: FormData
                    // }
                ],
            },
        ],
    };
    return (
        <>
            <PageBuilderComponent pageBuilderData={pageBuilderData} />
        </>
    );
}

export default DataFormBlockPage;
