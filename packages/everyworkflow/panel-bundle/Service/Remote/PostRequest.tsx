/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ResponseResolver from '@everyworkflow/panel-bundle/Service/Remote/ResponseResolver';
import UrlHelper from "@everyworkflow/panel-bundle/Helper/UrlHelper";
import BuildHeader from "@everyworkflow/panel-bundle/Service/Remote/BuildHeader";
import RefreshAuthToken from '@everyworkflow/panel-bundle/Service/Remote/RefreshAuthToken';

const PostRequest = async (endPoint: string, data: any | Array<any>, options: any = {}): Promise<any> => {

    const url = UrlHelper.buildApiUrl(endPoint);
    const headers = await BuildHeader();
    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        ...headers,
        ...options,
    };

    if (Number(import.meta.env.VITE_REACT_DEBUG) && Number(import.meta.env.VITE_REACT_REMOTE_DEBUG) > 0) {
        console.log('remote post -> ' + url, fetchOptions);
    }

    const res = await fetch(url, fetchOptions);

    if (Number(import.meta.env.VITE_REACT_DEBUG) && Number(import.meta.env.VITE_REACT_REMOTE_DEBUG) > 1) {
        console.log('remote post response -> ' + url, res);
    }

    if (res.status === 401) {
        await RefreshAuthToken();
        return PostRequest(endPoint, data, options);
    }

    return ResponseResolver(res, url);
};

export default PostRequest;