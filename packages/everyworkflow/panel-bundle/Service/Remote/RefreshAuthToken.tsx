/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import UrlHelper from "@everyworkflow/panel-bundle/Helper/UrlHelper";
import BuildHeader from '@everyworkflow/panel-bundle/Service/Remote/BuildHeader';
import LocalStorage from '@everyworkflow/panel-bundle/Service/LocalStorage';

const RefreshAuthToken = async (): Promise<any> => {
    const url = UrlHelper.buildApiUrl('/login/refresh');
    const headers = await BuildHeader();

    let data: any = null;
    try {
        const authData = await LocalStorage.get('ew_auth');

        if (authData && authData.hasOwnProperty('refresh_token') && authData.hasOwnProperty('session_token')) {
            data = {
                refresh_token: authData.refresh_token,
                session_token: authData.session_token,
            }
        }
    } catch (error) {
        LocalStorage.remove('ew_auth');
        location.reload();
        return;
    }

    if (!data) {
        LocalStorage.remove('ew_auth');
        location.reload();
        return;
    }

    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        ...headers,
    };

    if (Number(import.meta.env.VITE_REACT_DEBUG) && Number(import.meta.env.VITE_REACT_REMOTE_DEBUG) > 0) {
        console.log('remote post -> ' + url, fetchOptions);
    }

    const res = await fetch(url, fetchOptions);

    if (Number(import.meta.env.VITE_REACT_DEBUG) && Number(import.meta.env.VITE_REACT_REMOTE_DEBUG) > 1) {
        console.log('remote post response -> ' + url, res);
    }

    if (res.status === 200) {
        const json = await res.json();
        LocalStorage.set('ew_auth', json);
    }

    if (res.status === 401) {
        LocalStorage.remove('ew_auth');
        location.reload();
        return
    }
};

export default RefreshAuthToken;
