import { Component } from '@angular/core';

import {
    AlertController,
    LoadingController,
    NavController,
    ToastController
} from 'ionic-angular';

import { ExternalLoginViewModel } from '../../models/account-view-models';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { AccountService } from '../../services/account-service';

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
     * The external logins enabled for the application.
     *
     * @type {Array<ExternalLoginViewModel>}
     * @memberof LoginPage
     */
    externalLogins: Array<ExternalLoginViewModel> = [];

    /**
     * Indicates whether the local login provider is enabled.
     *
     * @memberof LoginPage
     */
    localLoginEnabled = false;

    /**
     * The username form field model.
     *
     * @type {string}
     * @memberof LoginPage
     */
    username = '';

    /**
     * The password form field model.
     *
     * @type {string}
     * @memberof LoginPage
     */
    password = '';

    /**
     * Creates an instance of LoginPage.
     *
     * @param {AlertController} alertCtrl
     * @param {LoadingController} loadingCtrl
     * @param {NavController} navCtrl
     * @param {ToastController} toastCtrl
     * @param {AccountService} accountService
     *
     * @memberof LoginPage
     */
    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private accountService: AccountService) {
    }

    /**
     * Gets the login providers to display on the page.
     *
     * @memberof LoginPage
     */
    ionViewDidLoad() {
        this.accountService.localLoginEnabled()
            .then(localLoginEnabled => this.localLoginEnabled = localLoginEnabled);
        this.accountService.externalLogins()
            .then(externalLogins => this.externalLogins = externalLogins);
    }
    /**
     * Attempts to log the user in.
     *
     * @memberof LoginPage
     */
    logIn() {
        // Show loading animation while waiting on API
        let loader = this.loadingCtrl.create({
            content: 'Signing in...'
        });
        loader.present();

        this.accountService.logIn(this.username, this.password)
            .then(() => {
                loader.dismiss();

                // Set home page as root to prevent navigating back to login
                this.navCtrl.setRoot(HomePage);
            })
            .catch(error => {
                loader.dismiss();

                // Get errors from API response and display them in an alert
                let responseBody = JSON.parse(error._body);
                let errorDescription = responseBody.error_description;

                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Failed to authenticate.',
                    message: errorDescription,
                    buttons: ['Dismiss']
                });
                alert.present();
            });
    }

    /**
     * Starts the external login process.
     * 
     * @param {ExternalLoginViewModel} login - The external login provider to use.
     *
     * @memberof LoginPage
     */
    externalLogin(login: ExternalLoginViewModel) {
        // TODO
    }

    /**
     * Navigates to the registration form.
     *
     * @memberof LoginPage
     */
    goToRegisterPage() {
        this.navCtrl.push(RegisterPage);
    }
}
