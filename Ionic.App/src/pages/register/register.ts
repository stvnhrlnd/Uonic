import { Component } from '@angular/core';

import {
    AlertController,
    LoadingController,
    NavController,
    ToastController
} from 'ionic-angular';

import { RegisterBindingModel } from '../../models/account-binding-models';
import { AccountService } from '../../services/account-service';

/**
 * Displays the registration form.
 *
 * @export
 * @class RegisterPage
 */
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    /**
     * The registration form model.
     *
     * @type {RegisterBindingModel}
     * @memberof RegisterPage
     */
    model: RegisterBindingModel = new RegisterBindingModel();

    /**
     * Creates an instance of RegisterPage.
     *
     * @param {AlertController} alertCtrl
     * @param {LoadingController} loadingCtrl
     * @param {NavController} navCtrl
     * @param {ToastController} toastCtrl
     * @param {AccountService} accountService
     *
     * @memberof RegisterPage
     */
    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private accountService: AccountService) {
    }

    /**
     * Attempts to register the member.
     *
     * @memberof RegisterPage
     */
    register() {
        // Show loading animation while waiting on API
        let loader = this.loadingCtrl.create({
            content: 'Creating account...'
        });
        loader.present();

        this.accountService.register(this.model)
            .then(() => {
                loader.dismiss();

                // Return to previous page and show a success message
                this.navCtrl.pop();

                let toast = this.toastCtrl.create({
                    message: 'Account created.',
                    duration: 3000,
                    showCloseButton: true
                });
                toast.present();
            })
            .catch(error => {
                loader.dismiss();

                // Get errors from API response and display them in an alert
                let errors = [];
                let responseBody = JSON.parse(error._body);
                if (responseBody.modelState) {
                    for (let key in responseBody.modelState) {
                        errors = errors.concat(responseBody.modelState[key]);
                    }
                }

                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Account was not created.',
                    message: errors.join('<br>'),
                    buttons: ['Dismiss']
                });
                alert.present();
            });
    }
}
