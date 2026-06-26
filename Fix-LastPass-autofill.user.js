// ==UserScript==
// @name         Fix LastPass autofill
// @namespace    https://github.com/Ceilphied/Lastpass-Fields-Fix
// @version      1.0.0
// @homepageURL  https://github.com/Ceilphied/Lastpass-Fields-Fix
// @supportURL   https://github.com/Ceilphied/Lastpass-Fields-Fix/issues
// @updateURL    https://raw.githubusercontent.com/Ceilphied/Lastpass-Fields-Fix/main/Fix-LastPass-autofill.user.js
// @downloadURL  https://raw.githubusercontent.com/Ceilphied/Lastpass-Fields-Fix/main/Fix-LastPass-autofill.user.js
// @description  Fix username/password autocomplete attributes for LastPass
// @match        https://flashpoint.ongoingsystems.se/flashpoint/login.aspx
// @match        https://portal.dibspayment.eu/*
// @match        https://www.unifaunonline.com/jsapp/uo/*
// @match        https://wisdom.pagodalog.com/bookings/onlinebooking
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function fix() {
        // Ongoing
        const ongoingUser = document.querySelector('#Tlogin, input[name="Tlogin"]');
        const ongoingPass = document.querySelector('#TPass, input[name="TPass"]');

        if (ongoingUser) ongoingUser.autocomplete = "username";
        if (ongoingPass) ongoingPass.autocomplete = "current-password";

        // Andra sidan
        const loginUser = document.querySelector('#loginEmail, input[name="USER"]');
        const loginPass = document.querySelector('#loginPassword, input[name="PASSWORD"]');

        if (loginUser) loginUser.autocomplete = "username";
        if (loginPass) loginPass.autocomplete = "current-password";

        // Unifaun - detta är INTE ett username-fält
        const unifaunWrongUsers = document.querySelectorAll(
            'input[name="ServiceSelectFilter"],input[name="AddonPartText4NOT"], input[name="invoiceNumber"]');

        unifaunWrongUsers.forEach(function (field) {
    field.setAttribute('autocomplete', 'off');
    field.setAttribute('data-lpignore', 'true');
});
    }

    fix();

    new MutationObserver(fix).observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
