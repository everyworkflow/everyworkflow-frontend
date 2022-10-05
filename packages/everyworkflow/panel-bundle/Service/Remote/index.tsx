/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import GetRequest from "@everyworkflow/panel-bundle/Service/Remote/GetRequest";
import PostRequest from "@everyworkflow/panel-bundle/Service/Remote/PostRequest";
import DeleteRequest from "@everyworkflow/panel-bundle/Service/Remote/DeleteRequest";

const Remote = {
    get: GetRequest,
    post: PostRequest,
    delete: DeleteRequest,
};

export default Remote;
