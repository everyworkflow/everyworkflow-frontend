/*
 * @copyright EveryWorkflow. All rights reserved.
 */

const LocalStorage = {
    get: (key: string, isJson = true): any => {
        if (typeof window === 'undefined') {
            return undefined;
        }
        if (isJson) {
            try {
                const jsonData = JSON.parse(window?.localStorage?.getItem(key) ?? '');
                return jsonData;
            } catch (error: any) {
                // Ignore error is unable to parse data
            }

            return undefined;
        }
        return localStorage.getItem(key);
    },
    set: (key: string, value: string | any): void => {
        if (typeof window === 'undefined') {
            return;
        }
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window?.localStorage?.setItem(key, value);
    },
    remove: (key: string): void => {
        if (typeof window === 'undefined') {
            return;
        }
        window?.localStorage?.removeItem(key);
    },
    clear: (): void => {
        if (typeof window === 'undefined') {
            return;
        }
        window?.localStorage?.clear();
    },
};

export default LocalStorage;

