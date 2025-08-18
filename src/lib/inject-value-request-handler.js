let firstInjectionRun = true;
module.exports = function injectValueRequestHandler(browserInterface, tabId, requestValue) {
	'use strict';
	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
	return browserInterface.executeScript(tabId, '/inject-value.js')
		.then(() => delay(250))
		.then(() => {
			if (firstInjectionRun) {
				firstInjectionRun = false;
				return browserInterface.sendMessage(tabId, requestValue)
					.then(() => delay(40))
					.then(() => browserInterface.sendMessage(tabId, requestValue));
			}
			return browserInterface.sendMessage(tabId, requestValue);
		});
};
