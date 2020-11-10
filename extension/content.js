// get scripts on the page
var scriptsFound = document.getElementsByTagName("script");
// store trackers we find
var trackersFound = [];
// number of trackers allowed
var trackersFoundLimit = 6;
// track time to count down until explosion
var timeUntilExplode = 0;
// explosion timer duration
var timeUntilExplodeDuration = 10;
// whether to explode or not
var explodePaused = false;

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

// if there are more trackers on the page than the limit
if (trackersFound.length >= trackersFoundLimit) {
	// set time
	timeUntilExplode = timeUntilExplodeDuration;
	// start timer
	var interval = setInterval(updateTimer, 1000);
	// add explosion image
	$('.explode-counter').css({
		"background": "url(" + chrome.extension.getURL("assets/img/explode-ui.svg") + ")",
		"cursor": "pointer"
	});
	// add click listener if user wants to cancel
	$(document).on('click', '.explode-counter', function() {
        // if time left
		if (timeUntilExplode > 0) {
            // and explode isn't already paused
			if (!explodePaused) {
                // set it paused
				explodePaused = true;
                // clear timer
				clearInterval(interval);
                // update title
				showExplodeTitle("Click to start timer");
			} else {
                // set it not paused
				explodePaused = false;
                // start timer
				interval = setInterval(updateTimer, 1000);
                // update title
				showExplodeTitle("Click to cancel");
			}
		} else {
    		// reload page
    		location.reload();
        }
	});
}

// function called every second from setInterval()
function updateTimer() {
	// if time is left
	if (timeUntilExplode > 0) {
		// subtract by 1
		timeUntilExplode--;
		// show result in browser
		$('.explode-counter-text').html(timeUntilExplode);
		// update title text
		showExplodeTitle("Click to cancel");
	}
	// if no time is left
	else {
		// clear interval and explode page
		clearInterval(interval);
        // explode the page
		explodeThePage();
		// update title text
		showExplodeTitle("Click reset to reset page");
	}
}

function showExplodeTitle(status) {
    // change title text
	var attr = "this page will explode in [" + timeUntilExplode + "] seconds. " + status;
	$('.explode-counter').attr('title', attr);
}
