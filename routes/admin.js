const express = require('express')
const router = express.Router()
const decrypt = require('../modules/decrypt')
const fs = require("fs")
const encrypt = require('../modules/encrypt')

router.get('/studytime/remove/:name',async (req,res) => {
    var params = req.params
    var name = params.name
    fs.readFile("../static/data/studytime.json", (err,data) => {
        var timedata = decrypt(data)
        delete timedata[name]
        timedata_en = encrypt(timedata)
        fs.writeFileSync("../static/data/studytime.json",timedata_en,(err) => {
            console.log(err);
            res.status(404).redirect('/')
        })
        res.redirect("/studytime")
    })
})

router.get('/')

module.exports = router