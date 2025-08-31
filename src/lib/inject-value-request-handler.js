module.exports = function injectValueRequestHandler(browserInterface, tabId, requestValue) {
	'use strict';
	// First inject the script file to set up the message listener
	return browserInterface.executeScript(tabId, '/inject-value.js')
		.then(() => {
			// Then check if the listener was registered using inline script
			return browserInterface.executeInlineScript(tabId, function () {
				// Check if the listener was registered successfully
				/*global chrome*/
				return typeof chrome !== 'undefined' &&
					chrome.runtime &&
					chrome.runtime.onMessage &&
					chrome.runtime.onMessage.hasListeners() ? 'READY' : 'NOT_READY';
			});
		})
		.then(result => {
			if (result === 'READY') {
				return browserInterface.sendMessage(tabId, requestValue);
			} else {
				throw new Error('Script injection failed or script not ready');
			}
		});
};
