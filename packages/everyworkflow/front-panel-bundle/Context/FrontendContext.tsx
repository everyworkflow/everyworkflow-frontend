/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import { frontendState } from "@everyworkflow/front-panel-bundle/State/FrontendState";
import FrontendStateInterface from "@everyworkflow/front-panel-bundle/Model/FrontendStateInterface";

export interface FrontendContextInterface {
    state: FrontendStateInterface;
    dispatch: any;
}

const FrontendContext = createContext<FrontendContextInterface>({
    state: frontendState,
    dispatch: () => null,
});

export default FrontendContext;
