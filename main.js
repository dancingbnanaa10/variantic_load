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
    var load_cog = document.getElementsByClassName("loading-cog")[0];
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
setTimeout(loading_dog, 3000);
})();
