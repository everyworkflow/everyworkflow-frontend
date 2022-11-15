/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import { frontendState } from "@everyworkflow/store-panel-bundle/state/frontend-state";
import FrontendStateInterface from "@everyworkflow/store-panel-bundle/model/frontend-state-interface";

export interface FrontendContextInterface {
    state: FrontendStateInterface;
    dispatch: any;
}

const FrontendContext = createContext<FrontendContextInterface>({
    state: frontendState,
    dispatch: () => null,
});

export default FrontendContext;
