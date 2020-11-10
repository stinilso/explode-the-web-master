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
			console.log("👀 👀 getTrackers()", scriptDomain);
			// add to found list
			trackersFound.push(scriptDomain);
		}
	}
}

// if there are trackers on the page
if (trackersFound.length > 0) {
	// create html element to show trackers
	var str = "<div class='explode-notification' title='click to see trackers on this page'>";
	// display the number of trackers
	str += "<span class='explode-number'>" + trackersFound.length + "</span>";
	str += "<span class='explode-text'>" + " tracker(s)" + "</span>";
	str += "</div>";
	// create the list of trackers (hide by default)
	str += "<div class='explode-tracker-list'>" + trackersFound.join("<br>") + "</div>";
	// timer (hide by default)
	str += "<div class='explode-counter'><div class='explode-counter-text'></div></div>";
	// append html to loaded web page
	$('body').append(str);
	// if the user clicks on the element
	$(document).on('click', '.explode-notification', function() {
		// and display the list
		$('.explode-tracker-list').toggle();
	});
}
