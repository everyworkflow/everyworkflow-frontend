/*
 * @copyright EveryWorkflow. All rights reserved.
 */

class ValidationError extends Error {
    status: number | undefined;
    errors: any;

    constructor(message?: string, status?: number, errors?: any) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}

export default ValidationError;
