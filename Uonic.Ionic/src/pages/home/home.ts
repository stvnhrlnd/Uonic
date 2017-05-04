import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Displays the home screen.
 * 
 * @export
 * @class HomePage
 */
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    constructor(private navCtrl: NavController) {
    }
}
