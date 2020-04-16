chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: 'www.myweekinjs.com',
          schemes: ['https', 'http'],
          pathContains: 'inject-me'
        },
        css: ['div']
      })],
      actions: [
        new chrome.declarativeContent.RequestContentScript({
          js: ['app.js']
        })
      ]
    }]);
  });
});