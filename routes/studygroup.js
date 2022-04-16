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

router.use('/community',(req,res) => {
    if (req.session.key == undefined){
        res.send('<script>alert("카카오 로그인이 필요합니다")</script>')
        res.redirect('/kakologin/authorize')
    }
},studycommunity)

module.exports = router