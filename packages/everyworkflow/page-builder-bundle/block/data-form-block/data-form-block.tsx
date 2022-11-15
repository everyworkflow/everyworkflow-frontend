/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import Form from "antd/lib/form";
import Button from "antd/lib/button";
import StyleHelper from "@everyworkflow/panel-bundle/helper/style-helper";
import DataFormBlockInterface from "@everyworkflow/page-builder-bundle/model/block/data-form-block-interface";
import DataFormComponent from "@everyworkflow/data-form-bundle/component/data-form-component";
import BlockWrapperComponent from "@everyworkflow/page-builder-bundle/component/block-wrapper-component";
import { FORM_TYPE_HORIZONTAL } from "@everyworkflow/data-form-bundle/component/data-form-component/data-form-component";

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

    return (
        <div style={StyleHelper.remoteStyleParse(blockData.style)}>
            <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
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
            </BlockWrapperComponent>
        </div>
    );
}

export default DataFormBlock;
