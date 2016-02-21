if (window.location.href.split("?tab=")[1]) {
  var app = document.querySelector('#app');
  var tab=window.location.href.split("?tab=")[1];
  app.addEventListener('dom-change', function() {
    app.tabs=true;
    app.tab=tab;
  });
} else {
(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // Sets app default base URL
  //app.baseUrl = window.location.href;
  app.baseUrl="/";
  app.baseLoc=window.location.href;
  window.app=app;

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Ready');
    if (new window.auther("token").c.get("clientToken")) { //check if user is signed in
      //app init
      window.auth=new window.auther("token");

    } else {
      /*var w=*/new tabs("signin");
      require('nw.gui').Window.get().close();
      /*w.on("close", function() {
        setTimeout(function() {
          require('nw.gui').App.closeAllWindows();
        },250);
      });*/
    }
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.closeDrawer = function() {
    app.$.paperDrawerPanel.closeDrawer();
  };

})(document);
}
