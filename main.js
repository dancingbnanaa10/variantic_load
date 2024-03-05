// ==UserScript==
// @name         Loading screen
// @namespace    http://tampermonkey.net/
// @version      2024-03-04
// @author       inż. Wojciech Wolkowycki
// @description  loading dog
// @match        https://*.variantic.com/editor/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at document-body
// ==/UserScript==

(function() {
    'use strict';
function biasedRandom() {
    var randomNumber = Math.random();
    if (randomNumber < 0.35) {
        return 1;
    } else if (randomNumber < 0.625) {
        return 2;
    } else if (randomNumber < 0.875) {
        return 3;
    } else {
        return 4;
    }
}
function addCss(cssCode) {
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = cssCode;
    } else {
        styleElement.appendChild(document.createTextNode(cssCode));
    }
    document.head.appendChild(styleElement);
}
var cssCode =
    `
    @keyframes spin
    {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
    .spin
    {
        animation: spin 2s linear infinite;
    }
    `
;
addCss(cssCode);
    function loading_dog() {
    //var load_cog = document.getElementsByClassName("loading-cog");
    var load_cog = document.querySelector('.loading-cog');
    load_cog.style.fontSize = '0';
    load_cog.style.opacity = "1";
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "new_load_elem");
    var spinnerImg = document.createElement("img");
    var randomOption =biasedRandom();
    //In order to add img its mandatory to add spinnerImg.classList.add("spin"); .
        switch (randomOption) {
        case 1:
            spinnerImg.setAttribute("src", "https://iili.io/JMpBova.png");
            spinnerImg.classList.add("spin"); // Add spin class
            break;
        case 2:
            spinnerImg.setAttribute("src", "https://iili.io/JMptSF2.gif");
            break;
        case 3:
            spinnerImg.setAttribute("src", "https://i.gifer.com/L6MI.gif");
            break;
        case 4:
            spinnerImg.setAttribute("src", "https://iili.io/JMyc1mQ.gif");
            break;
        // Add more cases for additional images or GIFs
        default:
           alert('IMG switch_case error');
            break;
    }
    newDiv.appendChild(spinnerImg);
    load_cog.appendChild(newDiv);
}
//setTimeout(loading_dog, 3000);

// Function to handle mutations
function mutationCallback(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if a node with class 'loading-cog' has been added
            const loadingCog = document.querySelector('.loading-cog');
            if (loadingCog) {
                // Modify the content or style of the span
                alert ('loading-cog active');
                loading_dog()
                // Add more modifications as needed
                observer.disconnect(); // Stop observing once the span is found
                break;
            }
        }
    }
}

// Create a new observer instance
const observer = new MutationObserver(mutationCallback);

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Start observing the target node for configured mutations
observer.observe(document.body, config);


})();
