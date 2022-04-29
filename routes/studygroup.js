const express = require('express')
const router = express.Router()
const fs = require('fs')
const studycommunity = require('./studycommunity') 

router.get("/tip",async (req,res) => {
    fs.readFile("./static/data/studytips.json", (err,data) => {
        const tipdata = JSON.parse(data)
        res.render("StudyTip.ejs",{tips:tipdata})
    })
})

router.get('/', async (req,res) => {
    res.render('StudyGroup.html')
})

router.use('/community',studycommunity)

module.exports = router