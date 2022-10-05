/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ResponseResolver from "@everyworkflow/panel-bundle/Service/Remote/ResponseResolver";
import UrlHelper from "@everyworkflow/panel-bundle/Helper/UrlHelper";
import BuildHeader from "@everyworkflow/panel-bundle/Service/Remote/BuildHeader";
import RefreshAuthToken from "@everyworkflow/panel-bundle/Service/Remote/RefreshAuthToken";

const GetRequest = async (endPoint: string, options: any = {}): Promise<any> => {
    const url = UrlHelper.buildApiUrl(endPoint);
    const headers = await BuildHeader();
    const fetchOptions = {
        method: 'get',
        ...headers,
        ...options
    };

    if (Number(import.meta.env.VITE_REACT_DEBUG) && Number(import.meta.env.VITE_REACT_REMOTE_DEBUG) > 0) {
        console.log('remote get -> ' + url);
    }

    const res = await fetch(url, fetchOptions);

    if (Number(import.meta.env.VITE_REACT_DEBUG) && Number(import.meta.env.VITE_REACT_REMOTE_DEBUG) > 1) {
        console.log('remote get response -> ' + url, res);
    }

    if (res.status === 401) {
        await RefreshAuthToken();
        return GetRequest(endPoint, options);
    }

    return ResponseResolver(res, url);
};

export default GetRequest;
