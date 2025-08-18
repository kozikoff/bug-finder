let firstInjectionRun = true;
module.exports = function injectValueRequestHandler(browserInterface, tabId, requestValue) {
	'use strict';
	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)),
		safeSend = () => browserInterface
			.sendMessage(tabId, requestValue)
			.catch(err => {
				if (err && /Receiving end does not exist/i.test(String(err))) {
					return;
				}
				throw err;
			});

	return browserInterface.executeScript(tabId, '/inject-value.js')
		.then(() => delay(250))
		.then(() => {
			if (firstInjectionRun) {
				firstInjectionRun = false;
				return safeSend()
					.then(() => delay(500))
					.then(() => safeSend());
			}
			return safeSend();
		});
};
