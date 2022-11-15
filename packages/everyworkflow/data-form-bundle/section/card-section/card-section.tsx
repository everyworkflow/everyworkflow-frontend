/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import Card from 'antd/lib/card';
import CardSectionInterface from "@everyworkflow/data-form-bundle/model/section/card-section-interface";
import FieldRenderComponent from "@everyworkflow/data-form-bundle/component/field-render-component";
import SectionRenderComponent from "@everyworkflow/data-form-bundle/component/section-render-component";

interface CardSectionProps {
    sectionData: CardSectionInterface;
}

const CardSection = ({ sectionData }: CardSectionProps) => {
    return (
        <>
            <Card
                id={'form-section-' + sectionData.code}
                className="app-container"
                title={sectionData.title}
                style={{ marginBottom: 24 }}>
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

export default CardSection;
