/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import GetRequest from "@everyworkflow/panel-bundle/service/remote/get-request";
import PostRequest from "@everyworkflow/panel-bundle/service/remote/post-request";
import DeleteRequest from "@everyworkflow/panel-bundle/service/remote/delete-request";

const Remote = {
    get: GetRequest,
    post: PostRequest,
    delete: DeleteRequest,
};

export default Remote;
