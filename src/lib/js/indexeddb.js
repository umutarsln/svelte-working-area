import { openDB } from "idb";

const dbName = 'my-sveltekit-db';
/**
 * @type {Promise<import("idb").IDBPDatabase<unknown>>}
 */
let dbPromise;

export async function initDB() {
    dbPromise = openDB(dbName, 1, {
        upgrade(db) {
            const store = db.createObjectStore('my-store', { keyPath: 'id', autoIncrement: true });
            store.add({ name: 'John Doe', age: 30 });
        },
    });
    await dbPromise;
}


async function getDB() {
  if (!dbPromise) {
    throw new Error('Database not initialized yet');
  }
  return await dbPromise;
}

/**
 * @param {{ name: string; age: number; }} data
 */
export async function addData(data) {
  const db = await getDB();
  const tx = db.transaction('my-store', 'readwrite');
  const store = tx.objectStore('my-store');
  await store.add(data);
  return await tx.done;
}

/**
 * @param {string} storeName
 */
export async function getAllData(storeName) {
  const db = await getDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const data = [];
  for (const item of await store.getAll()) {
    data.push(item);
  }
  return data;
}

/**
 * @param {any} storeName
 */
export async function deleteAllData(storeName) {
  const db = await getDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.clear();
  return await tx.done;
}
