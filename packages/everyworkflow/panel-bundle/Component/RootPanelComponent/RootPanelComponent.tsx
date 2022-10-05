/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useReducer } from 'react';
import { panelState } from "@everyworkflow/panel-bundle/State/PanelState";
import PanelReducer from "@everyworkflow/panel-bundle/Reducer/PanelReducer";
import PanelContext from '@everyworkflow/panel-bundle/Context/PanelContext';

interface RootPanelComponentProps {
    children?: JSX.Element | JSX.Element[];
}

const RootPanelComponent = ({ children }: RootPanelComponentProps) => {
    const [state, dispatch] = useReducer(PanelReducer, panelState);

    return (
        <PanelContext.Provider value={{ state, dispatch }}>
            {children}
        </PanelContext.Provider>
    );
};

export default RootPanelComponent;
