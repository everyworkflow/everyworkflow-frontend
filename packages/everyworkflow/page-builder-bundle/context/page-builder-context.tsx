/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import { pageBuilderState } from "@everyworkflow/page-builder-bundle/state/page-builder-state";
import PageBuilderStateInterface from "@everyworkflow/page-builder-bundle/model/page-builder-state-interface";

export interface PageBuilderContextInterface {
    state: PageBuilderStateInterface;
    dispatch: any;
}

const PageBuilderContext = createContext<PageBuilderContextInterface>({
    state: pageBuilderState,
    dispatch: () => null,
});

export default PageBuilderContext;
