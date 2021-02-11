import localForage from 'localforage';

export function initDB() {
    // IndexedDB Initialization
    localForage.config({
        driver: [
            localForage.INDEXEDDB,
            localForage.LOCALSTORAGE,
            localForage.WEBSQL,
        ],
        name: 'writi',     // These fields
        version: 1.0,      // are totally optional
        storeName: 'users'
    });

}