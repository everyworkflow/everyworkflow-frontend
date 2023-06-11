/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from 'react';
import { Form, Input } from 'antd';
import CardSectionInterface from "@everyworkflow/data-form-bundle/model/section/card-section-interface";
import AttributeValueOptionsComponent from "@everyworkflow/eav-bundle/component/attribute-value-options-component";
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';

interface AttributeOptionsSectionProps {
    sectionData: CardSectionInterface;
}

const AttributeOptionsSection = ({ sectionData }: AttributeOptionsSectionProps) => {
    const { state: formState } = useContext(FormContext);

    return (
        <div id={'form-section-' + sectionData.code} className="app-container" style={{ marginBottom: 24 }}>
            <div style={{ display: 'none' }}>
                <Form.Item
                    name={'options'}
                    initialValue={formState.initial_values['options'] ?? []}>
                    <Input.TextArea />
                </Form.Item>
            </div>
            <AttributeValueOptionsComponent
                initalOptions={formState.initial_values['options'] ?? []}
                onChange={(options: Array<any>) => {
                    formState.form?.setFieldsValue({ options: [...options] });
                }} />
        </div>
    );
};

export default AttributeOptionsSection;
