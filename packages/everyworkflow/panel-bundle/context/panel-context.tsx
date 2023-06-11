/*
 * @copyright EveryWorkflow. All rights reserved.
 */

'use client';

import { createContext } from 'react';
import PanelStateInterface from '@everyworkflow/panel-bundle/model/panel-state-interface';
import { panelState } from "@everyworkflow/panel-bundle/state/panel-state";

export interface PanelContextInterface {
    state: PanelStateInterface;
    dispatch: any;
}

const PanelContext = createContext<PanelContextInterface>({
    state: panelState,
    dispatch: () => null,
});

export default PanelContext;
