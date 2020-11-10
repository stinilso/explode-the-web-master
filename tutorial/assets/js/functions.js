/**
 * 	Functions for explode-the-web
 */


/**
 *	Return entire name from URL
 */
function extractHostname(url) {
	//console.log("extractHostname()",url);
	var hostname;
	//find & remove protocol (http, ftp, etc.) and get hostname

	if (url.indexOf("://") > -1) {
		hostname = url.split('/')[2];
	} else {
		hostname = url.split('/')[0];
	}

	//find & remove port number
	hostname = hostname.split(':')[0];
	//find & remove "?"
	hostname = hostname.split('?')[0];
	//console.log("extractHostname() hostname =",hostname);
	return hostname;
}

/**
 *	Return just the domain and TLD name
 */
function extractRootDomain(url) {
	//console.log("extractRootDomain()",url);
	if (url == "") return "";
	var domain = extractHostname(url),
		splitArr = domain.split('.'),
		arrLen = splitArr.length;

	//extracting the root domain here
	if (arrLen > 2) {
		domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
	}
	//console.log("extractRootDomain() domain =",domain);
	return domain;
}
