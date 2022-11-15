/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import FrontendStateInterface from "@everyworkflow/front-panel-bundle/model/frontend-state-interface";

interface PanelActionInterface {
    type: string;
    payload: any;
}

const FrontendReducer = (
    state: FrontendStateInterface,
    action: PanelActionInterface
) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default FrontendReducer;
