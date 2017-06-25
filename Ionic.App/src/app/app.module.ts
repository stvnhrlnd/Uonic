import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AccountService } from '../services/account-service';
import { LocalStorageService } from '../services/local-storage-service';

/**
 * Root module.
 *
 * @export
 * @class AppModule
 */
@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        LoginPage,
        RegisterPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(AppComponent)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        HomePage,
        LoginPage,
        RegisterPage
    ],
    providers: [
        SplashScreen,
        StatusBar,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AccountService,
        LocalStorageService
    ]
})
export class AppModule {
}
