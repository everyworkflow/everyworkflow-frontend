/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { IDBPDatabase, openDB } from 'idb';

class IndexedDbObject {
    private database: string;
    private version: number;
    private db: any;

    constructor(database: string, version: number = 1) {
        this.database = database;
        this.version = version;
    }

    public async createObjectStore(tableNames: Array<string>) {
        try {
            this.db = await openDB(this.database, this.version, {
                upgrade(db: IDBPDatabase) {
                    for (const tableName of tableNames) {
                        if (db.objectStoreNames.contains(tableName)) {
                            continue;
                        }
                        db.createObjectStore(tableName, {
                            autoIncrement: true,
                            keyPath: 'id',
                        });
                    }
                },
            });
        } catch (error) {
            console.log('createObjectStore - error -->', error);
        }
        return this;
    }

    public async getValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        console.log('Get Data ', JSON.stringify(result));
        return result;
    }

    public async getAllValue(tableName: string) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.getAll();
        console.log('Get All Data', JSON.stringify(result));
        return result;
    }

    public async putValue(tableName: string, value: any) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.put(value);
        console.log('Put Data ', JSON.stringify(result));
        return result;
    }

    public async putBulkValue(tableName: string, values: Array<any>) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        for (const value of values) {
            const result = await store.put(value);
            console.log('Put Bulk Data ', JSON.stringify(result));
        }
        return this.getAllValue(tableName);
    }

    public async deleteValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        if (!result) {
            console.log('Id not found', id);
            return result;
        }
        await store.delete(id);
        console.log('Deleted Data', id);
        return id;
    }
}

export default IndexedDbObject;
