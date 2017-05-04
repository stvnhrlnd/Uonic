import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginPage } from '../pages/login/login';

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
     * Root page.
     * 
     * @type {*}
     * @memberof AppComponent
     */
    rootPage: any = LoginPage;

    /**
     * Creates an instance of AppComponent.
     * 
     * @param {Platform} platform 
     * @param {StatusBar} statusBar 
     * @param {SplashScreen} splashScreen 
     * 
     * @memberof AppComponent
     */
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
