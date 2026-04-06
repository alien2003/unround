// ==UserScript==
// @name        Unround
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @run-at      document-start
// @version     1.1
// @author      [Alien], Ivan Kovmir
// @description border-radius:0 across all HTML elements
// ==/UserScript==

(function () {
'use strict';

// Reset border-radius to 0 for the given HTML node.
function squareIfRound(node) {
	if (node.nodeType !== Node.ELEMENT_NODE)
		return
	if (window.getComputedStyle(node).borderRadius !== '0px')
		node.style.setProperty('border-radius', '0', 'important');
}

// Handle newly added nodes.
function mutationCallback(node) {
	// Node itself:
	squareIfRound(node)
	// Its children:
	node.querySelectorAll('*').forEach(squareIfRound);
}

// Set up MutationObserver to watch for new elements
function setupObserver() {
	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			mutation.addedNodes.forEach(mutationCallback);
		});
	});
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true
	});
}

window.addEventListener('load', () => {
	// Square existing elements.
	const elements = document.querySelectorAll('*');
	elements.forEach(squareIfRound);
	// Watch dynamically added elements and square them.
	setupObserver();
})
})();
