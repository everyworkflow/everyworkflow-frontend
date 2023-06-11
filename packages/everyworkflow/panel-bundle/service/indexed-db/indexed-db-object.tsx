/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { IDBPDatabase, openDB } from "idb";

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
              keyPath: "id",
            });
          }
        },
      });
    } catch (error) {
      console.log("createObjectStore - error -->", error);
    }
    return this;
  }

  public async getValue(tableName: string, id: number) {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);

    return result;
  }

  public async getAllValue(tableName: string) {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.getAll();

    return result;
  }

  public async putValue(tableName: string, value: any) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.put(value);

    return result;
  }

  public async replaceValue(
    tableName: string,
    primaryKey: number,
    updatedData: any
  ) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const { id, ...rest } = updatedData;
    await store.put({ ...rest, id: primaryKey });
  }

  public async putBulkValue(tableName: string, values: Array<any>) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);

    for (const value of values) {
      const result = await store.put(value);
    }
    return this.getAllValue(tableName);
  }

  public async deleteValue(tableName: string, id: number) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);

    if (!result) {
      return result;
    }
    await store.delete(id);
    return id;
  }

  public async clearDB(tableName: string) {
    let tx = this.db.transaction([tableName], "readwrite");
    let objectStore = tx.objectStore(tableName);
    await objectStore.clear();
  }
}

export default IndexedDbObject;
