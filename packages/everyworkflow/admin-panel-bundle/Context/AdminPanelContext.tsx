/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import AdminPanelStateInterface from '@everyworkflow/admin-panel-bundle/Model/AdminPanelStateInterface';
import { adminPanelState } from "@everyworkflow/admin-panel-bundle/State/AdminPanelState";

export interface AdminPanelContextInterface {
    state: AdminPanelStateInterface;
    dispatch: any;
}

const AdminPanelContext = createContext<AdminPanelContextInterface>({
    state: adminPanelState,
    dispatch: () => null,
});

export default AdminPanelContext;
