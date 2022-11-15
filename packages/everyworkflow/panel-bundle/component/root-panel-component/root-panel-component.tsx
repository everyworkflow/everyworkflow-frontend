/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useReducer } from 'react';
import { panelState } from "@everyworkflow/panel-bundle/state/panel-state";
import PanelReducer from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import PanelContext from '@everyworkflow/panel-bundle/context/panel-context';

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
