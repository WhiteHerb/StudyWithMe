const express = require('express')
const router = express.Router()
const CryptoJS = require("crypto-js")
const fs = require("fs")

function decrypt(data) {
    var bytes = CryptoJS.AES.decrypt(data.toString(), SECRET)
    var timedata = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return timedata
}

router.get('/studytime/remove/:name',async (req,res) => {
    var params = req.params
    var name = params.name
    fs.readFile("../static/data/studytime.json", (err,data) => {
        var timedata = decrypt(data)
        delete timedata[name]
        timedata_en = CryptoJS.AES.encrypt(JSON.stringify(timedata), SECRET).toString()
        fs.writeFileSync("../static/data/studytime.json",timedata_en,(err) => {
            console.log(err);
            res.status(404).redirect('/')
        })
        res.redirect("/studytime")
    })
})

router.get('/')

module.exports = router