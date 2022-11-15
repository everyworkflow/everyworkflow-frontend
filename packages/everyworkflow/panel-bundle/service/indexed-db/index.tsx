/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { deleteDB, IDBPDatabase, openDB } from 'idb';
import IndexedDbObject from "@everyworkflow/panel-bundle/service/indexed-db/indexed-db-object";

const IndexedDb = {
    /* TODO: Remove object access from object */
    IndexedDbObject: IndexedDbObject,

    getDb: async (dbName: string, table: string, tableConfig: any = {}, version: number = 1) => {
        const db = await openDB(dbName, version, {
            upgrade(db: IDBPDatabase) {
                if (db.objectStoreNames.contains(table)) {
                    return;
                }
                db.createObjectStore(table, {
                    autoIncrement: true,
                    keyPath: 'id',
                    ...tableConfig,
                });
            },
        });
        return db;
    },

    deleteDb: async (dbName: string) => {
        await deleteDB(dbName);
    }
};

export default IndexedDb;
