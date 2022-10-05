/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import {pageBuilderState} from "@everyworkflow/page-builder-bundle/State/PageBuilderState";
import PageBuilderStateInterface from "@everyworkflow/page-builder-bundle/Model/PageBuilderStateInterface";

export interface PageBuilderContextInterface {
    state: PageBuilderStateInterface;
    dispatch: any;
}

const PageBuilderContext = createContext<PageBuilderContextInterface>({
    state: pageBuilderState,
    dispatch: () => null,
});

export default PageBuilderContext;
