// ==UserScript==
// @name         Github Old Feed
// @description  Replacing the shit💩 new version of the feed with the old one
// @author       荣顶, flrngel
// @version      1.4
// @license      MIT
// @homeurl      https://github.com/flrngel/github-old-feed.git
// @updateURL    https://raw.githubusercontent.com/flrngel/github-old-feed/main/index.user.js
// @downloadURL  https://raw.githubusercontent.com/flrngel/github-old-feed/main/index.user.js
// @namespace    http://tampermonkey.net/
// @match        https://github.com/
// @match        https://github.com/dashboard
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const feedContent = document.querySelector('.feed-content')
  const feedMain = document.querySelector('.feed-main')
  feedContent.style.maxWidth = "unset"
  feedMain.style.maxWidth = "1200px"

  fetch('https://github.com/dashboard-feed')
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const dashboard = document.querySelector("#dashboard");
      const main = doc.querySelector('main');
      if (dashboard && main) dashboard.innerHTML = main.innerHTML;

      // unfold
      document.querySelectorAll('button[aria-expanded=false]').forEach((x)=>{if(x.previousElementSibling?.textContent.match(/release/) === null && x.previousElementSibling?.textContent.match(/follow/) === null ){x.click()}});
    })
    .catch(error => {
      console.error('Fetching the dashboard feed:', error);
    });
})();
