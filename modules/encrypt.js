const CryptoJS = require("crypto-js")
const SECRET = process.env['SECRET']

function encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString()
    
}
module.exports = encrypt