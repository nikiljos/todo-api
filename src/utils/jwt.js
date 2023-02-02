const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

const generateToken = (userId) =>
    new Promise((resolve, reject) => {
        jwt.sign(
            {
                userId,
            },
            jwtSecret,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            }
        );
    });

const checkToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });

module.exports={
    generateToken,
    checkToken
}
