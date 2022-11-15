/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import LocalStorage from "@everyworkflow/panel-bundle/service/local-storage";
import PanelConfig from "@everyworkflow/panel-bundle/config/panel-config";

const BuildHeader = async (headers: any = {}): Promise<any> => {
    const authPrefixKey: string = PanelConfig.REACT_AUTH_PREFIX_KEY ?? 'ew_';

    const returnHeaders: any = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    };
    try {
        const authData: any = LocalStorage.get(authPrefixKey + 'auth');
        if (authData.token) {
            returnHeaders['Authorization'] = 'Bearer ' + authData.token;
        }
    } catch (error: any) { }

    return {
        headers: {
            ...returnHeaders,
            ...headers
        },
    };
};

export default BuildHeader;
