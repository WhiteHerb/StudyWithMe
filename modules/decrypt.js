const CryptoJS = require("crypto-js")
const SECRET = process.env['SECRET']

function decrypt(data) {
    var bytes = CryptoJS.AES.decrypt(data.toString(), SECRET)
    var timedata = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return timedata
}

module.exports = decrypt