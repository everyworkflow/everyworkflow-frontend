/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import BaseSectionInterface from "@everyworkflow/data-form-bundle/Model/Section/BaseSectionInterface";
import FieldRenderComponent from "@everyworkflow/data-form-bundle/Component/FieldRenderComponent";
import SectionRenderComponent from "@everyworkflow/data-form-bundle/Component/SectionRenderComponent";

interface BaseSectionProps {
    sectionData: BaseSectionInterface;
}

const BaseSection = ({ sectionData }: BaseSectionProps) => {
    return (
        <div id={'form-section-' + sectionData.code}>
            {(sectionData?.fields && sectionData?.fields.length > 0) && (
                <FieldRenderComponent fields={sectionData.fields} />
            )}
            {(sectionData?.sections && sectionData?.sections.length > 0) && (
                <SectionRenderComponent sections={sectionData.sections} />
            )}
        </div>
    );
};

export default BaseSection;
