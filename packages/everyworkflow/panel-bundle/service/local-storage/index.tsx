/*
 * @copyright EveryWorkflow. All rights reserved.
 */

const LocalStorage = {
    get: (key: string, isJson = true): any => {
        if (isJson) {
            try {
                const jsonData = JSON.parse(localStorage.getItem(key) ?? '');
                return jsonData;
            } catch (error: any) {
                // Ignore error is unable to parse data
            }

            return undefined;
        }
        return localStorage.getItem(key);
    },
    set: (key: string, value: string | any, isJson = true): void => {
        if (typeof value !== 'string' && isJson) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },
    remove: (key: string): void => {
        localStorage.removeItem(key);
    },
    clear: (): void => {
        localStorage.clear();
    },
};

export default LocalStorage;
