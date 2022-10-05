/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import LocalStorage from "@everyworkflow/panel-bundle/Service/LocalStorage";

const BuildHeader = async (headers: any = {}): Promise<any> => {
    const returnHeaders: any = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    };
    try {
        const authData: any = LocalStorage.get('ew_auth');
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
