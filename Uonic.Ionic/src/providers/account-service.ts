import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { LoginModel } from '../models/login-model';
import { RegisterModel } from '../models/register-model';
import { LocalStorageService } from '../providers/local-storage-service';

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
    private baseURL = 'http://localhost:53815/';

    /**
     * The key used to store identity information in local storage.
     *
     * @private
     *
     * @memberof AccountService
     */
    private identityKey = 'identity';

    /**
     * Creates an instance of AccountService.
     *
     * @param {Http} http
     * @param {LocalStorageService} localStorageService
     *
     * @memberof AccountService
     */
    constructor(private http: Http, private localStorageService: LocalStorageService) {
    }

    /**
     * Checks if a member is currently logged in.
     *
     * @returns {boolean}
     *
     * @memberof AccountService
     */
    isLoggedIn(): boolean {
        let identity = this.localStorageService.getObject(this.identityKey);
        if (identity) {
            // Ensure access token has not expired
            let expires = moment(identity['.expires']);
            if (moment().isBefore(expires)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Logs a member in.
     *
     * @param {LoginModel} model
     * @returns {Promise<any>}
     *
     * @memberof AccountService
     */
    logIn(model: LoginModel): Promise<any> {
        let data = new URLSearchParams();
        data.append('grant_type', 'password');
        data.append('username', model.username);
        data.append('password', model.password);

        // Call token endpoint and store response object
        return this.http
            .post(`${this.baseURL}Token`, data)
            .toPromise()
            .then(response =>
                this.localStorageService.setObject(this.identityKey, response.json()))
            .catch(this.handleError);
    }

    /**
     * Logs the current member out.
     *
     *
     * @memberof AccountService
     */
    logOut() {
        this.localStorageService.removeItem(this.identityKey);
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
            .post(`${this.baseURL}Umbraco/Api/Account/Register`, model)
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
