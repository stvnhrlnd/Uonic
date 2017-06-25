import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from '../environments/environment';
import * as bindingModels from '../models/account-binding-models';
import * as viewModels from '../models/account-view-models';
import { LocalStorageService } from '../services/local-storage-service';

/**
 * Implements operations on member accounts.
 *
 * @export
 * @class AccountService
 */
@Injectable()
export class AccountService {
    /**
     * Base URL for account API calls.
     *
     * @private
     * @memberof AccountService
     */
    private baseURL = `${environment.umbracoSite}/Umbraco/Api/Account`;

    /**
     * Creates an instance of AccountService.
     *
     * @param {Http} http
     * @param {LocalStorageService} localStorageService
     *
     * @memberof AccountService
     */
    constructor(
        private http: Http,
        private localStorageService: LocalStorageService) {
    }

    /**
     * Gets the enabled external login providers.
     *
     * @returns {Promise<Array<viewModels.ExternalLoginViewModel>>}
     *
     * @memberof AccountService
     */
    externalLogins(): Promise<Array<viewModels.ExternalLoginViewModel>> {
        let searchParams = new URLSearchParams();
        searchParams.set('returnUrl', '/');
        searchParams.set('generateState', 'true');
        return this.http
            .get(`${this.baseURL}/ExternalLogins`, { search: searchParams })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Checks if a member is currently logged in.
     *
     * @returns {boolean}
     *
     * @memberof AccountService
     */
    isLoggedIn(): boolean {
        let accessTokenExpires = this.localStorageService.getItem('accessTokenExpires');
        if (accessTokenExpires) {
            return moment().isBefore(moment(accessTokenExpires));
        }

        return false;
    }

    /**
     * Checks if the local login provider is enabled.
     *
     * @returns {Promise<boolean>}
     *
     * @memberof AccountService
     */
    localLoginEnabled(): Promise<boolean> {
        return this.http
            .get(`${this.baseURL}/LocalLoginEnabled`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Logs a member in.
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<any>}
     *
     * @memberof AccountService
     */
    logIn(username: string, password: string): Promise<any> {
        let searchParams = new URLSearchParams();
        searchParams.append('grant_type', 'password');
        searchParams.append('username', username);
        searchParams.append('password', password);
        return this.http
            .post(`${environment.umbracoSite}/Token`, searchParams)
            .toPromise()
            .then(response => {
                // Store access token and expiry date locally
                let responseObject = response.json();
                let expires = moment().add(responseObject.expires_in, 'seconds');
                this.localStorageService.setItem('accessToken', responseObject.access_token);
                this.localStorageService.setItem('accessTokenExpires', expires.toISOString());
                return response;
            })
            .catch(this.handleError);
    }

    /**
     * Registers a new member.
     *
     * @param {bindingModels.RegisterBindingModel} model
     * @returns {Promise<any>}
     *
     * @memberof AccountService
     */
    register(model: bindingModels.RegisterBindingModel): Promise<any> {
        return this.http
            .post(`${this.baseURL}/Register`, model)
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
