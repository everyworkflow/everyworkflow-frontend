/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import UrlHelper from "@everyworkflow/panel-bundle/helper/url-helper";
import BuildHeader from '@everyworkflow/panel-bundle/service/remote/build-header';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';
import PanelConfig from "@everyworkflow/panel-bundle/config/panel-config";

const RefreshAuthToken = async (): Promise<any> => {
    const url = UrlHelper.buildApiUrl('/login/refresh');
    const headers = await BuildHeader();
    const authPrefixKey: string = PanelConfig.REACT_AUTH_PREFIX_KEY ?? 'ew_';

    let data: any = null;
    try {
        const authData = await LocalStorage.get(authPrefixKey + 'auth');

        if (authData && authData.hasOwnProperty('refresh_token') && authData.hasOwnProperty('session_token')) {
            data = {
                refresh_token: authData.refresh_token,
                session_token: authData.session_token,
            }
        }
    } catch (error) {
        LocalStorage.remove(authPrefixKey + 'auth');
        location.reload();
        return;
    }

    if (!data) {
        LocalStorage.remove(authPrefixKey + 'auth');
        location.reload();
        return;
    }

    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        ...headers,
    };

    if (Number(PanelConfig.REACT_DEBUG) && Number(PanelConfig.REACT_REMOTE_DEBUG) > 0) {
        console.log('remote post -> ' + url, fetchOptions);
    }

    const res = await fetch(url, fetchOptions);

    if (Number(PanelConfig.REACT_DEBUG) && Number(PanelConfig.REACT_REMOTE_DEBUG) > 1) {
        console.log('remote post response -> ' + url, res);
    }

    if (res.status === 200) {
        const json = await res.json();
        LocalStorage.set(authPrefixKey + 'auth', json);
    }

    if (res.status === 401) {
        LocalStorage.remove(authPrefixKey + 'auth');
        window?.location?.reload();
        return
    }
};

export default RefreshAuthToken;
