/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import PanelStateInterface from '@everyworkflow/panel-bundle/Model/PanelStateInterface';
import { panelState } from "@everyworkflow/panel-bundle/State/PanelState";

export interface PanelContextInterface {
    state: PanelStateInterface;
    dispatch: any;
}

const PanelContext = createContext<PanelContextInterface>({
    state: panelState,
    dispatch: () => null,
});

export default PanelContext;
