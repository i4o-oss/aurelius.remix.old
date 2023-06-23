import { LOCAL_STORAGE_KEYS } from '@aurelius/writer'
import * as localforage from 'localforage'
import { LOCAL_FORAGE_DB_NAME } from './constants'

export const postStore = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: LOCAL_FORAGE_DB_NAME,
    storeName: 'posts',
})

export const writingSessionStore = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: LOCAL_FORAGE_DB_NAME,
    storeName: 'writingSessions'
})
