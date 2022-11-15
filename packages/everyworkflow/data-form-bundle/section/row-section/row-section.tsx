/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import Row from 'antd/lib/row';
import RowSectionInterface from "@everyworkflow/data-form-bundle/model/section/row-section-interface";
import FieldRenderComponent from "@everyworkflow/data-form-bundle/component/field-render-component";
import SectionRenderComponent from "@everyworkflow/data-form-bundle/component/section-render-component";

interface RowSectionProps {
    sectionData: RowSectionInterface;
}

const RowSection = ({ sectionData }: RowSectionProps) => {
    return (
        <>
            <Row
                align={sectionData.align}
                gutter={sectionData.gutter}
                justify={sectionData.justify}
                wrap={sectionData.wrap}>
                {(sectionData?.fields && sectionData?.fields.length > 0) && (
                    <FieldRenderComponent fields={sectionData.fields} />
                )}
                {(sectionData?.sections && sectionData?.sections.length > 0) && (
                    <SectionRenderComponent sections={sectionData.sections} />
                )}
            </Row>
        </>
    );
};

export default RowSection;
