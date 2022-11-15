/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseSectionInterface from "@everyworkflow/data-form-bundle/model/section/base-section-interface";
import FieldRenderComponent from "@everyworkflow/data-form-bundle/component/field-render-component";
import SectionRenderComponent from "@everyworkflow/data-form-bundle/component/section-render-component";

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
