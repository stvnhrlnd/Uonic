import { Injectable } from '@angular/core';

/**
 * Wraps HTML5 local storage API with some convenience methods.
 *
 * @export
 * @class LocalStorageService
 */
@Injectable()
export class LocalStorageService {
    /**
     * A string that will be used to namespace all local storage keys.
     *
     *
     * @memberof LocalStorageService
     */
    prefix = 'uonic';

    /**
     * Deletes all items from local storage.
     *
     *
     * @memberof LocalStorageService
     */
    clear() {
        localStorage.clear();
    }

    /**
     * Gets a value from local storage.
     *
     * @param {string} key
     * @returns {string}
     *
     * @memberof LocalStorageService
     */
    getItem(key: string): string {
        return localStorage.getItem(`${this.prefix}.${key}`);
    }

    /**
     * Gets a JSON object from local storage.
     *
     * @param {string} key
     * @returns {*}
     *
     * @memberof LocalStorageService
     */
    getObject(key: string): any {
        return JSON.parse(this.getItem(key));
    }

    /**
     * Deletes a key-value from local storage.
     *
     * @param {string} key
     *
     * @memberof LocalStorageService
     */
    removeItem(key: string) {
        localStorage.removeItem(`${this.prefix}.${key}`);
    }

    /**
     * Persists a value to local storage.
     *
     * @param {string} key
     * @param {string} data
     *
     * @memberof LocalStorageService
     */
    setItem(key: string, data: string) {
        localStorage.setItem(`${this.prefix}.${key}`, data);
    }

    /**
     * Persists an object to local storage.
     *
     * @param {string} key
     * @param {*} data
     *
     * @memberof LocalStorageService
     */
    setObject(key: string, data: any) {
        this.setItem(key, JSON.stringify(data));
    }
}
