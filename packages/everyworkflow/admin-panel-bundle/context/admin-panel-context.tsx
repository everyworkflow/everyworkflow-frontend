/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import AdminPanelStateInterface from '@everyworkflow/admin-panel-bundle/model/admin-panel-state-interface';
import { adminPanelState } from "@everyworkflow/admin-panel-bundle/state/admin-panel-state";

export interface AdminPanelContextInterface {
    state: AdminPanelStateInterface;
    dispatch: any;
}

const AdminPanelContext = createContext<AdminPanelContextInterface>({
    state: adminPanelState,
    dispatch: () => null,
});

export default AdminPanelContext;
