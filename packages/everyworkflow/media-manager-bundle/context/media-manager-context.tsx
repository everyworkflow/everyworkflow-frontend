/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import MediaManagerStateInterface from '@everyworkflow/media-manager-bundle/model/media-manager-state-interface';
import { mediaManagerState } from "@everyworkflow/media-manager-bundle/state/media-manager-state";

export interface MediaManagerContextInterface {
    state: MediaManagerStateInterface;
    dispatch: any;
}

const MediaManagerContext = createContext<MediaManagerContextInterface>({
    state: mediaManagerState,
    dispatch: () => null,
});

export default MediaManagerContext;
