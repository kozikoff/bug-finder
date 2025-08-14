module.exports = function injectValueRequestHandler(browserInterface, tabId, requestValue) {
	'use strict';
	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
	return browserInterface.executeScript(tabId, '/inject-value.js')
		.then(() => delay(25))
		.then(() => browserInterface.sendMessage(tabId, requestValue));
};
