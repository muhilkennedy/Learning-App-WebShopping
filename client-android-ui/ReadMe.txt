ionic start client-android-ui blank --type=ionic-angular

-> no for capacitor

npm install

ionic cordova platform add android

ionic cordova plugin add cordova-plugin-inappbrowser
npm install @ionic-native/in-app-browser

 //ionic cordova platform rm android
 //ionic cordova platform add android@8.0.0 


    ionic cordova plugin add cordova-plugin-androidx 
    ionic cordova plugin add cordova-plugin-androidx-adapter
    cordova plugin add cordova-android-support-gradle-release --save

ionic cordova build android
ionic cordova run android

add this to gradle.build:

defaultConfig {
...
minSdkVersion 14
targetSdkVersion 21
...

// Enabling multidex support.
multiDexEnabled true
}

dependencies {
  compile 'com.android.support:multidex:1.0.0'
}
And android:name="android.support.multidex.MultiDexApplication"

to <application /> in AndroidManifest.xml

ionic cordova build android --prod --release

<button (click)="open()">Click Here Open Site in Default Browser</button>

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


Release APK:
ionic cordova build android --prod --release

keytool -genkey -v -keystore my-release-key.keystore -alias muhil_key_alias -keyalg RSA -keysize 2048 -validity 10000
Enter keystore password:
Re-enter new password:
What is your first and last name?
  [Unknown]:  muhil
What is the name of your organizational unit?
  [Unknown]:  muhil
What is the name of your organization?
  [Unknown]:  muhil
What is the name of your City or Locality?
  [Unknown]:  mamallapuram
What is the name of your State or Province?
  [Unknown]:  Tamil Nadu
What is the two-letter country code for this unit?
  [Unknown]:  in
Is CN=muhil, OU=muhil, O=muhil, L=mamallapuram, ST=Tamil Nadu, C=in correct?
  [no]:  y

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
        for: CN=muhil, OU=muhil, O=muhil, L=mamallapuram, ST=Tamil Nadu, C=in
Enter key password for <muhil_key_alias>
        (RETURN if same as keystore password):
[Storing my-release-key.keystore]

------------
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore C:\Users\ADMINS\Desktop\Project1\January\latest\Learning-App-WebShopping\client-android-ui\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk muhil_key_alias
------------
open cmd as admin

cd C:\Users\ADMINS\AppData\Local\Android\Sdk\build-tools\<VERSION>\zipalign.exe

zipalign -v 4 C:\Users\ADMINS\Desktop\Project1\January\latest\Learning-App-WebShopping\client-android-ui\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk E:\RiaGroceries.apk



