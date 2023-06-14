import * as localforage from 'localforage'
import { LOCAL_FORAGE_DB_NAME } from './constants'

export const postStore = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: LOCAL_FORAGE_DB_NAME,
    storeName: 'posts',
})
