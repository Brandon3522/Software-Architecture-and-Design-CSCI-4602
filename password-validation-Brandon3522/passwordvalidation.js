"use strict";
//Converts a given string (single word), test if valid password
function validatePassword(word) {
    return /[a-z]/.test(word) && // A lowercase letter
        /[A-Z]/.test(word) && // An upppercase letter
        /[0-9]/.test(word) && // A number
        word.length >= 8 && // At least 8 characters
        /\s/.test(word) == false; // An no spaces!
}
module.exports = validatePassword;
