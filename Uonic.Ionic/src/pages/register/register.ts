import { Component } from '@angular/core';

import { AlertController, LoadingController, NavController, ToastController } from 'ionic-angular';

import { AccountService } from '../../providers/account-service';
import { RegisterModel } from '../../models/register-model';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    model: RegisterModel = {};

    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private accountService: AccountService) {
    }

    register() {
        let loader = this.loadingCtrl.create({
            content: "Creating account..."
        });
        loader.present();

        this.accountService.register(this.model)
            .then(() => {
                this.navCtrl.pop();

                loader.dismiss();

                let toast = this.toastCtrl.create({
                    message: 'Account created.',
                    duration: 3000,
                    showCloseButton: true
                });
                toast.present();
            })
            .catch(error => {
                loader.dismiss();

                let errors = [];
                let responseBody = JSON.parse(error._body);
                if (responseBody.ModelState) {
                    for (let key in responseBody.ModelState) {
                        errors = errors.concat(responseBody.ModelState[key]);
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
