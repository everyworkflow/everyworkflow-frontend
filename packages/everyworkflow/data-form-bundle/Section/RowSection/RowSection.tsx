/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import RowSectionInterface from "@everyworkflow/data-form-bundle/Model/Section/RowSectionInterface";
import FieldRenderComponent from "@everyworkflow/data-form-bundle/Component/FieldRenderComponent";
import SectionRenderComponent from "@everyworkflow/data-form-bundle/Component/SectionRenderComponent";
import Row from 'antd/lib/row';

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
