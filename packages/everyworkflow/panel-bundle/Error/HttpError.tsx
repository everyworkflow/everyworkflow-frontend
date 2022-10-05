/*
 * @copyright EveryWorkflow. All rights reserved.
 */

class HttpError extends Error {
    status: number | undefined;
    
    constructor(message?: string, status?: number) {
        super(message);
        this.status = status;

        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

export default HttpError;
