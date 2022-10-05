/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext } from 'react';
import { DataFormSectionMaps } from "@everyworkflow/data-form-bundle/Root/DataFormSectionMaps";
import BaseSectionInterface from '@everyworkflow/data-form-bundle/Model/Section/BaseSectionInterface';
import FormContext from '@everyworkflow/data-form-bundle/Context/FormContext';

interface SectionRenderComponentProps {
    sections: Array<BaseSectionInterface>;
}

const SectionRenderComponent = ({ sections }: SectionRenderComponentProps) => {
    const { state: formState } = useContext(FormContext);

    const getSortedSectionData = (sections: Array<any>): Array<any> => {
        return sections?.sort((a: any, b: any) => {
            if (a.sort_order > b.sort_order) return 1;
            if (a.sort_order < b.sort_order) return -1;
            return 0;
        });
    };

    const renderSection = (item: any, index: number) => {
        if (!!formState.form_section_maps[item.code]) {
            const DynamicComponent = formState.form_section_maps[item.code];
            return <DynamicComponent key={index} sectionData={item} />;
        }
        if (!!DataFormSectionMaps[item.section_type]) {
            const DynamicComponent = DataFormSectionMaps[item.section_type];
            return <DynamicComponent key={index} sectionData={item} />;
        }

        return (
            <p key={index} style={{ padding: 16 }}>
                Section not found &quot;{item.section_type}&quot;
            </p>
        );
    }

    if (sections.length) {
        return (
            <>
                {getSortedSectionData([...sections]).map(renderSection)}
            </>
        )
    }

    return null;
};

export default SectionRenderComponent;
