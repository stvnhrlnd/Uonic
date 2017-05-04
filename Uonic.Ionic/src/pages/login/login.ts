import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register';

/**
 * Displays the login form.
 * 
 * @export
 * @class LoginPage
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    /**
     * Creates an instance of LoginPage.
     * 
     * @param {NavController} navCtrl 
     * 
     * @memberof LoginPage
     */
    constructor(private navCtrl: NavController) {
    }

    /**
     * Navigates to the registration form.
     * 
     * 
     * @memberof LoginPage
     */
    goToRegisterPage() {
        this.navCtrl.push(RegisterPage);
    }
}
