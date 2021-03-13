import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private iab: InAppBrowser) {
    this.open();
  }

  open(){
    const browser = this.iab.create('https://riagroceries-mpm.web.app/', '_system', { location : 'no', zoom : 'no'});

    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });

    browser.on('exit').subscribe(event => {
      browser.close();
    });
  }

}
