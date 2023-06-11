/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useState } from 'react';
import { Form, Input, Space, Button } from 'antd';
import SidePanelComponent, {
    PANEL_SIZE_MEDIUM,
} from '@everyworkflow/panel-bundle/component/side-panel-component/side-panel-component';
import AlertAction, { ALERT_TYPE_SUCCESS } from '@everyworkflow/panel-bundle/action/alert-action';

interface AttributeSectionItemFormProps {
    item?: any;
    onSave?: (item: any) => void;
    onClose?: () => void;
}

const AttributeSectionItemForm = ({ item, onSave, onClose }: AttributeSectionItemFormProps) => {
    const [data, setData] = useState<any>(item);

    const handleChange = (key: string, val: string) => {
        const newData = { ...data };
        newData[key] = val;
        setData(newData);
    }

    return (
        <SidePanelComponent
            title={data ? 'Edit Attribute Section' : 'Add Attribute Section'}
            size={PANEL_SIZE_MEDIUM}
            onClose={() => {
                if (onClose) {
                    onClose();
                }
            }}
            footer={(
                <Space
                    align="center"
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            if (onSave) {
                                onSave(data);
                                AlertAction({
                                    type: ALERT_TYPE_SUCCESS,
                                    message: 'Attribute section saved temporarily.',
                                });
                            }
                        }}>
                        Save changes
                    </Button>
                </Space>
            )}>
            <>
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item
                        label="Name"
                        name="name"
                        initialValue={data?.name ?? ''}
                        required={true}>
                        <Input
                            autoFocus={true}
                            onChange={(e) => {
                                handleChange('name', e.currentTarget?.value ?? '');
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Code"
                        name="code"
                        initialValue={data?.code ?? ''}
                        required={true}>
                        <Input
                            onChange={(e) => {
                                handleChange('code', e.currentTarget?.value ?? '');
                            }}
                            disabled={item?.code ? true : false}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Sort order"
                        name="sort_order"
                        initialValue={data?.sort_order ?? ''}
                        required={true}>
                        <Input
                            type="number"
                            min={0}
                            onChange={(e) => {
                                handleChange('sort_order', e.currentTarget?.value ?? '');
                            }}
                        />
                    </Form.Item>
                </Form>
            </>
        </SidePanelComponent>
    );
};

export default AttributeSectionItemForm;
