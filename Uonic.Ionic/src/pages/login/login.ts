import { Component } from '@angular/core';

import { AlertController, LoadingController, NavController, ToastController } from 'ionic-angular';

import { AccountService } from '../../providers/account-service';
import { HomePage } from '../home/home';
import { LoginModel } from '../../models/login-model';
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
     * The external logins enabled for the application.
     *
     *
     * @memberof LoginPage
     */
    externalLogins = [];

    /**
     * The login form model.
     *
     * @type {LoginModel}
     * @memberof LoginPage
     */
    model: LoginModel = {};

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
     * Gets the available external logins from the server.
     *
     *
     * @memberof LoginPage
     */
    ionViewDidLoad() {
        this.accountService.externalLogins()
            .then(externalLogins => this.externalLogins = externalLogins);
    }

    /**
     * Starts the external login process.
     *
     * @param {any} login - The external provider.
     *
     * @memberof LoginPage
     */
    externalLogin(login) {
        // TODO
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

    /**
     * Attempts to log in.
     *
     *
     * @memberof LoginPage
     */
    logIn() {
        // Show loading animation while waiting on API
        let loader = this.loadingCtrl.create({
            content: 'Signing in...'
        });
        loader.present();

        this.accountService.logIn(this.model)
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
}
