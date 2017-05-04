import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { RegisterModel } from '../models/register-model';

/**
 * Implements operations on member accounts.
 * 
 * @export
 * @class AccountService
 */
@Injectable()
export class AccountService {
    /**
     * Base URL for API calls.
     * 
     * @private
     * 
     * @memberof AccountService
     */
    private baseURL = 'http://localhost:53815/Umbraco/Api/Account/';

    /**
     * Creates an instance of AccountService.
     * 
     * @param {Http} http 
     * 
     * @memberof AccountService
     */
    constructor(private http: Http) {
    }

    /**
     * Registers a new member.
     * 
     * @param {RegisterModel} model 
     * @returns {Promise<any>} 
     * 
     * @memberof AccountService
     */
    register(model: RegisterModel): Promise<any> {
        return this.http
            .post(`${this.baseURL}Register`, model)
            .toPromise()
            .catch(this.handleError);
    }

    /**
     * Logs errors.
     * 
     * @private
     * @param {*} error 
     * @returns {Promise<any>} 
     * 
     * @memberof AccountService
     */
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
