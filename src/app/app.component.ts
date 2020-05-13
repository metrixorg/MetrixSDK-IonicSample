import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Metrix, MetrixConfig } from '@ionic-native/metrix';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    console.log("metrix", "initializing...1");

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log("metrix", "initializing...2");

      this.initMetrix();
    });
  }

  initMetrix() {
    console.log("metrix", "initializing...");
    var metrixConfig = new MetrixConfig("xvwwyjqiduwhkpz");

    metrixConfig.setOnAttributionChangeListener(function(attribution) {
        console.log("[MetrixExample]: Attribution callback received.");
        console.log("[MetrixExample]: acquisitionAd = " + attribution.acquisitionAd);
        console.log("[MetrixExample]: acquisitionAdSet = " + attribution.acquisitionAdSet);
        console.log("[MetrixExample]: acquisitionCampaign = " + attribution.acquisitionCampaign);
        console.log("[MetrixExample]: acquisitionSource = " + attribution.acquisitionSource);
        console.log("[MetrixExample]: attributionStatus = " + attribution.attributionStatus);
    });

    metrixConfig.setFirebaseAppId("myFirebaseAppId");

    metrixConfig.setShouldLaunchDeeplink(true);
    metrixConfig.setOnDeeplinkResponseListener(function(deeplink) {
        console.log("[MetrixExample]: Deeplink callback received. deeplink: " + deeplink);
    });

    metrixConfig.setLocationListening(true);
    metrixConfig.setEventUploadThreshold(50);
    metrixConfig.setEventUploadMaxBatchSize(200);
    metrixConfig.setEventMaxCount(1500);
    metrixConfig.setEventUploadPeriodMillis(15000);
    metrixConfig.setSessionTimeoutMillis(180000);
    metrixConfig.setDefaultTracker("trackerToken");
    metrixConfig.setAppSecret(12345, 12345, 12345, 12345, 12345);
    metrixConfig.setStore("google play");

    metrixConfig.setOnReceiveUserIdListener(function(metrixUserId) {
        console.log("[MetrixExample]: UserId listener called. ID: " + metrixUserId);
    });

    metrixConfig.setOnSessionIdListener(function(metrixSessionId) {
        console.log("[MetrixExample]: SessionId listener called. ID: " + metrixSessionId);
    });

    Metrix.create(metrixConfig);
  }
}
