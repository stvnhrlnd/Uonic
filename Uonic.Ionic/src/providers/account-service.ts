import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { RegisterModel } from '../models/register-model';

@Injectable()
export class AccountService {
    private baseURL = 'http://localhost:53815/Umbraco/Api/Account/';

    constructor(private http: Http) {
    }

    register(model: RegisterModel): Promise<any> {
        return this.http
            .post(`${this.baseURL}Register`, model)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
