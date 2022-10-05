/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import StyleHelper from "@everyworkflow/panel-bundle/Helper/StyleHelper";
import DataFormBlockInterface from "@everyworkflow/page-builder-bundle/Model/Block/DataFormBlockInterface";
import DataFormComponent from "@everyworkflow/data-form-bundle/Component/DataFormComponent";
import EditableBlockComponent from "@everyworkflow/page-builder-bundle/Component/EditableBlockComponent";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent/PageBuilderComponent";
import { FORM_TYPE_HORIZONTAL } from "@everyworkflow/data-form-bundle/Component/DataFormComponent/DataFormComponent";

interface DataFormBlockProps {
    indexes?: Array<number>;
    blockData: DataFormBlockInterface;
    mode?: string;
}

const DataFormBlock = ({ indexes, blockData, mode }: DataFormBlockProps) => {
    const [form] = Form.useForm();

    const onSubmit = (data: any) => {
        console.log('DataFormBlock --> onSubmit -->', data);
    }

    const renderBlockContent = () => (
        <>
            <DataFormComponent
                form={form}
                formData={blockData.data_form}
                formType={FORM_TYPE_HORIZONTAL}
                onSubmit={onSubmit}
            />
            <Button type="primary" onClick={() => {
                form.submit();
            }}>Submit</Button>
        </>
    )

    return (
        <div style={StyleHelper.remoteStyleParse(blockData.style)}>
            {mode === MODE_EDIT ? (
                <EditableBlockComponent blockData={blockData} indexes={indexes}>
                    {renderBlockContent()}
                </EditableBlockComponent>
            ) : renderBlockContent()}
        </div>
    );
}

export default DataFormBlock;
