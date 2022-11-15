/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ColSectionInterface from "@everyworkflow/data-form-bundle/model/section/col-section-interface";
import FieldRenderComponent from "@everyworkflow/data-form-bundle/component/field-render-component";
import SectionRenderComponent from "@everyworkflow/data-form-bundle/component/section-render-component";
import Col from 'antd/lib/col';

interface ColSectionProps {
    sectionData: ColSectionInterface;
}

const ColSection = ({ sectionData }: ColSectionProps) => {
    return (
        <>
            <Col
                flex={sectionData.flex}
                offset={sectionData.offset}
                order={sectionData.order}
                pull={sectionData.pull}
                push={sectionData.push}
                span={sectionData.span}
                sm={sectionData.sm}
                md={sectionData.md}
                lg={sectionData.lg}
                xl={sectionData.xl}
                xxl={sectionData.xxl}>
                {(sectionData?.fields && sectionData?.fields.length > 0) && (
                    <FieldRenderComponent fields={sectionData.fields} />
                )}
                {(sectionData?.sections && sectionData?.sections.length > 0) && (
                    <SectionRenderComponent sections={sectionData.sections} />
                )}
            </Col>
        </>
    );
};

export default ColSection;
