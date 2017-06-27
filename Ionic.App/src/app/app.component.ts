import { Component, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AccountService } from '../services/account-service';

/**
 * Root component.
 *
 * @export
 * @class AppComponent
 */
@Component({
    templateUrl: 'app.html'
})
export class AppComponent {
    /**
     * Reference to the nav element.
     * 
     * @type {Nav}
     * @memberof AppComponent
     */
    @ViewChild(Nav)
    nav: Nav;

    /**
     * Root page.
     *
     * @type {*}
     * @memberof AppComponent
     */
    rootPage: any;

    /**
     * Creates an instance of AppComponent.
     *
     * @param {Platform} platform
     * @param {SplashScreen} splashScreen
     * @param {StatusBar} statusBar
     * @param {AccountService} accountService
     *
     * @memberof AppComponent
     */
    constructor(
        platform: Platform,
        splashScreen: SplashScreen,
        statusBar: StatusBar,
        private accountService: AccountService) {
        platform.ready().then(() => {
            splashScreen.hide();
            statusBar.styleDefault();
        });

        // Set the root page according to login status
        this.rootPage = accountService.isLoggedIn() ? HomePage : LoginPage;
    }

    /**
     * Logs the current member out and navigates back to login.
     *
     * @memberof AppComponent
     */
    logOut() {
        this.accountService.logOut()
            .then(() => {
                this.nav.setRoot(LoginPage);
            });
    }
}
