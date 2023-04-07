/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback, useContext } from "react";
import { Form, Button, Space } from "antd";
import PageBuilderContext from "@everyworkflow/page-builder-bundle/context/page-builder-context";
import BlockFormInterface from "@everyworkflow/page-builder-bundle/model/block-form-interface";
import DataFormInterface from "@everyworkflow/data-form-bundle/model/data-form-interface";
import SidePanelComponent from "@everyworkflow/panel-bundle/component/side-panel-component";
import { PANEL_SIZE_MEDIUM } from "@everyworkflow/panel-bundle/component/side-panel-component/side-panel-component";
import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import UpdateBlockDataAction from "@everyworkflow/page-builder-bundle/action/update-block-data-action";
import DataFormComponent from "@everyworkflow/data-form-bundle/component/data-form-component";

interface BlockFormComponentProps {
    indexes?: Array<number>;
    blockData?: BlockInterface;
    onClose?: () => void;
}

const BlockFormComponent = ({ indexes, blockData, onClose }: BlockFormComponentProps) => {
    const { state: builderState, dispatch: builderDispatch } = useContext(PageBuilderContext);
    const [editForm] = Form.useForm();

    const getBlockFormData = useCallback((): BlockFormInterface | undefined => {
        return builderState.block_form_data?.find((item: BlockFormInterface) => {
            return item.block_type === blockData?.block_type;
        });
    }, [builderState.block_form_data, blockData?.block_type]);

    const getDataForm = useCallback((): DataFormInterface => {
        const block = getBlockFormData();
        let form: DataFormInterface = {
            fields: [],
        };
        if (block && block.data_form) {
            form = block.data_form;
        }
        return form;
    }, [getBlockFormData]);

    const onEditSubmit = (data: any) => {
        UpdateBlockDataAction({
            indexes: indexes,
            updateData: data
        })(builderState, builderDispatch);
    }

    return (
        <SidePanelComponent
            title={getBlockFormData()?.title ? 'Edit: ' + getBlockFormData()?.title : 'Edit: Block'}
            size={getBlockFormData()?.data_form?.panel_size ?? PANEL_SIZE_MEDIUM}
            onClose={onClose}
            footer={(
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            editForm.submit();
                            if (onClose) {
                                onClose();
                            }
                        }}>Save changes</Button>
                    <Button
                        onClick={() => {
                            editForm.resetFields();
                        }}>Reset</Button>
                </Space>
            )}
            footerStyle={{ textAlign: 'center' }}>
            <DataFormComponent
                form={editForm}
                formData={getDataForm()}
                onSubmit={onEditSubmit}
                initialValues={blockData}
            />
        </SidePanelComponent>
    );
}

export default BlockFormComponent;
