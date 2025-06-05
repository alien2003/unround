// ==UserScript==
// @name        Unround
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @run-at      document-start
// @version     1.0
// @author      [Alien]
// @description border-radius:0 across all HTML elements
// ==/UserScript==

(function() {
  'use strict';
  function setZeroBorderRadius(element) {
    element.style.setProperty('border-radius', '0', 'important');
  }

  // Apply to all existing elements
  document.querySelectorAll('*').forEach(setZeroBorderRadius);

  // Set up MutationObserver to handle dynamically added elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Skip non-element nodes (e.g., text nodes)
        if (node.nodeType === Node.ELEMENT_NODE) {
          setZeroBorderRadius(node);
          // Apply to all children recursively
          node.querySelectorAll('*').forEach(setZeroBorderRadius);
        }
      });
    });
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  })
})();
