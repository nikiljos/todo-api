const bcrypt = require("bcrypt");
const validator = require("validator");

const hashRounds = 2;

const checkPasswordStrength = (pass) =>
    validator.isStrongPassword(pass, {
        minLength: 3,
        minNumbers: 1,
        minUpperCase: 1,
        returnScore: false,
    });

const hashInputPassword = (pass) =>
    new Promise((resolve, reject) => {
        bcrypt.hash(pass, hashRounds, function (err, hash) {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });

const verifyInputPassword = (plainPass, hashedPass) =>
    new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, hashedPass, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

module.exports = {
    checkPasswordStrength,
    hashInputPassword,
    verifyInputPassword,
};
