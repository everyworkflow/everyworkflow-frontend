/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback, useContext, useState } from "react";
import { theme, Row, Col, Card, Space, Button, Form, Input } from 'antd';
import CardSectionInterface from "@everyworkflow/data-form-bundle/model/section/card-section-interface";
import FieldRenderComponent from "@everyworkflow/data-form-bundle/component/field-render-component";
import SectionRenderComponent from "@everyworkflow/data-form-bundle/component/section-render-component";
import AttributeItem from "@everyworkflow/eav-bundle/section/attribute-group-section/attribute-item";
import AttributeSectionItem from "@everyworkflow/eav-bundle/section/attribute-group-section/attribute-section-item";
import AttributeSectionItemForm from "@everyworkflow/eav-bundle/section/attribute-group-section/attribute-section-item-form";
import FormContext from "@everyworkflow/data-form-bundle/context/form-context";
import "@everyworkflow/eav-bundle/section/attribute-group-section/attribute-group-section.css";

interface AttributeGroupSectionProps {
    sectionData: CardSectionInterface;
}

const AttributeGroupSection = ({ sectionData }: AttributeGroupSectionProps) => {
    const { token } = theme.useToken();
    const { state: formState } = useContext(FormContext);
    const [groupData, setGroupData] = useState<Array<any>>(formState.initial_values?.attribute_group_data ?? []);
    const [addNewSection, setAddNewSection] = useState<boolean>(false);

    const updateGroupDataHandler = (newGroupData: Array<any>) => {
        setGroupData(newGroupData);
        formState.form?.setFieldValue('attribute_group_data', newGroupData);
    }

    const allUsedAttributeCodes = useCallback((): Array<string> => {
        let allCodes: Array<string> = [];
        groupData.forEach((item: any) => {
            item?.attributes?.forEach((attrCode: string) => {
                allCodes.push(attrCode);
            });
        });
        return allCodes;
    }, [groupData]);

    return (
        <>
            <Form.Item
                name={'attribute_group_data'}
                style={{ display: 'none' }}
                initialValue={groupData}>
                <Input.TextArea />
            </Form.Item>
            <Card
                id={'form-section-' + sectionData.code}
                className="app-container app-attribute-group-form-section"
                title={sectionData.title}
                style={{ marginBottom: 24 }}
                bodyStyle={{ padding: 0, paddingTop: 1 }}
                extra={(
                    <Space>
                        <span>Entity code: {formState.form_data?.additional_data?.entity_code ?? '??'}</span>
                        {formState.form_data?.additional_data?.entity_code && (
                            <Button
                                type="default"
                                onClick={() => {
                                    setAddNewSection(true);
                                }}>Add new section</Button>
                        )}
                    </Space>
                )}>
                <Row>
                    <Col
                        span={8}
                        style={{
                            borderRight: 'solid 1px ' + token.colorBorder,
                        }}>
                        <div className="group-section">
                            {!formState.form_data?.additional_data?.attributes?.length && (
                                <div>
                                    <span>No attribute found.</span>
                                </div>
                            )}
                            {formState.form_data?.additional_data?.attributes
                                ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
                                ?.filter((item: any) => !allUsedAttributeCodes().includes(item.code))
                                ?.map((item: any, index: number) => (
                                    <AttributeItem
                                        key={index}
                                        item={item} />
                                ))}
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="group-section">
                            {!groupData?.length && (
                                <div>
                                    <span>No section added yet.</span>
                                </div>
                            )}
                            {groupData
                                .sort((a: any, b: any) => a?.sort_order - b?.sort_order)
                                ?.map((item: any, index: number) => (
                                    <AttributeSectionItem
                                        key={index}
                                        data={groupData}
                                        item={item}
                                        onChange={(newGroupData: any) => {
                                            updateGroupDataHandler(newGroupData);
                                        }} />
                                ))}
                        </div>
                    </Col>
                </Row>
                {addNewSection && (
                    <AttributeSectionItemForm
                        onSave={(saveItem) => {
                            const currentData: Array<any> = [...groupData];
                            const currentItemIndex = currentData.findIndex((section: any) => section.code === saveItem?.code);
                            if (currentItemIndex > -1) {
                                let currentItem: any = currentData[currentItemIndex];
                                currentItem = { ...currentItem, ...saveItem };
                                currentData[currentItemIndex] = currentItem;
                            } else {
                                currentData.push(saveItem);
                            }
                            updateGroupDataHandler(currentData);
                            setAddNewSection(false);
                        }}
                        onClose={() => {
                            setAddNewSection(false);
                        }} />
                )}
                {(sectionData?.fields && sectionData?.fields.length > 0) && (
                    <FieldRenderComponent fields={sectionData.fields} />
                )}
                {(sectionData?.sections && sectionData?.sections.length > 0) && (
                    <SectionRenderComponent sections={sectionData.sections} />
                )}
            </Card>
        </>
    );
};

export default AttributeGroupSection;
