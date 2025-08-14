module.exports = function injectValueRequestHandler(browserInterface, tabId, requestValue) {
	'use strict';
	// In MV3 there is a race where the injected script may not have registered
	// its onMessage listener by the time we send the message. Add a tiny delay
	// after executeScript resolves to ensure the listener is attached.
	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
	return browserInterface.executeScript(tabId, '/inject-value.js')
		.then(() => delay(25))
		.then(() => browserInterface.sendMessage(tabId, requestValue));
};

