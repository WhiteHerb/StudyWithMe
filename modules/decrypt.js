const CryptoJS = require("crypto-js")
const SECRET = process.env['SECRET']

function decrypt(data,callback) {
    var timedata = {}
    if (data.toString().length != 0){
        var bytes = CryptoJS.AES.decrypt(data.toString(), SECRET)
        timedata = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
    callback(timedata)
}

module.exports = decrypt