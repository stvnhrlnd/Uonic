import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar) {
        platform.ready().then(() => {
            splashScreen.hide();
            statusBar.styleDefault();
        });
    }
}
