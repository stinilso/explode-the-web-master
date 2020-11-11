"use strict";
var pageTitle = $("title").text();
console.log("The title of the page is " + pageTitle);

// get scripts on the page
var scriptsFound = document.getElementsByTagName("script");
// store trackers we find
var trackersFound = [];
// loop through scripts
for (var i = 0, l = scriptsFound.length; i < l; i++) {
  // if script tag has a src attribute
  if (scriptsFound[i].src !== "") {
    // get root domain of scripts src
    var scriptDomain = extractRootDomain(scriptsFound[i].src);
    // look to see if tracker root domain is in disconnectTrackingServices
    if (disconnectTrackingServices.indexOf(scriptDomain) >= 0) {
      console.log("👀👀getTrackers()", scriptDomain);
      // add to found list
      trackersFound.push(scriptDomain);
    }
  }
}
