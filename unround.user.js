// ==UserScript==
// @name        Unround
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       GM_addStyle
// @run-at      document-start
// @version     1.0
// @author      [Alien]
// @description This script removes the border-radius of all elements on the page, making them square-shaped.
// ==/UserScript==

(function() {
  'use strict';

  GM_addStyle(`
    *, .avatar-user, .circle, .rounded-1, .rounded-2 {
      border-radius: 0 !important;
    }
  `);
})();
