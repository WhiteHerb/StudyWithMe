const express = require('express')
const router = express.Router()
const fs = require('fs')
const decrypt = require('../modules/decrypt')

router.get("/tip",async (req,res) => {
    fs.readFile("./static/data/studytips.json", (err,data) => {
        const tipdata = JSON.parse(data)
        res.render("StudyTip.ejs",{tips:tipdata})
    })
})

router.get('/', async (req,res) => {
    res.render('StudyGroup.html')
})

router.get('/comu', async (req,res) => {
    fs.readFile('./static/data/comunitydata.json', (err,data) => {
        var views = decrypt(data)
        res.render('community.ejs',{views : views})
    })
})

module.exports = router