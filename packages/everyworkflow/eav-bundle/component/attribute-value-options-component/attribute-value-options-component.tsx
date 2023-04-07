/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useState } from 'react';
import { Card, Button, Popconfirm, Space } from 'antd';
import AttributeValueOptionsTable from '@everyworkflow/eav-bundle/component/attribute-value-options-component/attribute-value-options-table';
import SidePanelComponent from '@everyworkflow/panel-bundle/component/side-panel-component';
import { PANEL_SIZE_MEDIUM } from '@everyworkflow/panel-bundle/component/side-panel-component/side-panel-component';
import AttributeValueForm from '@everyworkflow/eav-bundle/component/attribute-value-options-component/attribute-value-form';
import AlertAction, { ALERT_TYPE_SUCCESS } from '@everyworkflow/panel-bundle/action/alert-action';

interface AttributeValueOptionsComponentProps {
    initalOptions?: Array<any>;
    onChange?: (options: Array<any>) => void;
}

const AttributeValueOptionsComponent = ({ initalOptions, onChange }: AttributeValueOptionsComponentProps) => {
    const getSortedItems = (items: Array<any>): Array<any> => {
        return items?.sort((a: any, b: any) => {
            if (a.sort_order > b.sort_order) return 1;
            if (a.sort_order < b.sort_order) return -1;
            return 0;
        });
    };

    const [options, setOptions] = useState<Array<any>>(getSortedItems(initalOptions ?? []));
    const [selectedOptionCodes, setSelectedOptionCodes] = useState<Array<any>>([]);
    const [sidePanel, setSidePanel] = useState<any | { type: string }>();

    return (
        <>
            <Card
                title={'Options'}
                bodyStyle={{ padding: '1px 8px 0 8px' }}
                extra={(
                    <Space>
                        {selectedOptionCodes.length > 0 && (
                            <Popconfirm
                                title={'Are you sure to delete all selected rows?'}
                                onConfirm={() => {
                                    let newOptions: Array<any> = [...options];
                                    newOptions = newOptions.filter((item: any) => !selectedOptionCodes.includes(item.code));
                                    setOptions(newOptions);
                                    setSelectedOptionCodes([]);
                                    AlertAction({
                                        message: 'Selected rows delete temporarily.',
                                        type: ALERT_TYPE_SUCCESS,
                                    });
                                }}>
                                <Button danger={true}>Bulk delete selected ({selectedOptionCodes.length})</Button>
                            </Popconfirm>
                        )}
                        <Button
                            type="primary"
                            ghost={true}
                            onClick={() => {
                                setSidePanel({ type: 'new' });
                            }}>
                            Add new option
                        </Button>
                    </Space>
                )}>
                <AttributeValueOptionsTable
                    options={options}
                    setOptions={setOptions}
                    setSidePanel={setSidePanel}
                    selectedOptionCodes={selectedOptionCodes}
                    setSelectedOptionCodes={setSelectedOptionCodes}
                />
            </Card>
            {sidePanel && (
                <SidePanelComponent
                    title={'Attribute option'}
                    size={PANEL_SIZE_MEDIUM}
                    onClose={() => {
                        setSidePanel(undefined);
                    }}>
                    <AttributeValueForm
                        optionIndex={(() => {
                            if (sidePanel?.type === 'edit') {
                                const editItemIndex = options.findIndex((item) => {
                                    return item.code === sidePanel?.code;
                                });
                                if (editItemIndex !== -1) {
                                    return editItemIndex;
                                }
                            }
                            return undefined;
                        })()}
                        initialValues={(() => {
                            if (sidePanel?.type === 'edit') {
                                const editItem = options.find((item) => {
                                    return item.code === sidePanel?.code;
                                });
                                if (editItem) {
                                    if (!editItem.option_type) {
                                        editItem['option_type'] = '';
                                    }
                                    return editItem;
                                }
                            }
                            return {
                                option_type: '',
                            };
                        })()}
                        onSubmit={(data, optionIndex) => {
                            let newOptions: Array<any> = [...options];
                            if (optionIndex !== undefined && newOptions[optionIndex]) {
                                newOptions[optionIndex] = {
                                    ...newOptions[optionIndex],
                                    ...data,
                                };
                            } else {
                                newOptions.push(data);
                            }
                            newOptions = getSortedItems(newOptions);
                            setOptions(newOptions);
                            setSidePanel(undefined);
                            AlertAction({
                                message: 'Changes saved temporarily.',
                                type: ALERT_TYPE_SUCCESS,
                            });
                            if (onChange) {
                                onChange(newOptions);
                            }
                        }}
                    />
                </SidePanelComponent>
            )}
        </>
    );
}

export default AttributeValueOptionsComponent;
