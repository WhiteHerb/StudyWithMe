const express = require('express')
const router = express.Router()
const decrypt = require('../modules/decrypt')
const fs = require("fs")
const encrypt = require('../modules/encrypt')

router.get('/studytime/remove/:name',async (req,res) => {
    var params = req.params
    var name = params.name
    fs.readFile("../static/data/studytime.json", (err,data) => {
            decrypt(data,(timedata) => {
            delete timedata[name]
            timedata_en = encrypt(timedata)
            fs.writeFileSync("../static/data/studytime.json",timedata_en,(err) => {
                console.log(err);
                res.status(404).redirect('/')
            })
        })
        res.redirect("/studytime")
    })
})

router.get('/',async (req,res) => {
    var datas = new Array()
    fs.readdir('/static/data/',(err, files) => {
        files.forEach(file => {
            fs.readFileSync(`/static/data/${file}`, (err,data) => {
                decrypt(data,(data_) => {
                    datas.push(data_)
                })
            })
        })
        res.render('admin.ejs',{datas : datas})
    })
})

module.exports = router