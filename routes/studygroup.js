const express = require('express')
const router = express.Router()
const fs = require('fs')
const studycommunity = require('./studycommunity') 
const data = require('')

router.get("/tip",async (req,res) => {
    fs.readFile("./static/data/studytips.json", (err,data) => {
        const tipdata = JSON.parse(data)
      const request = require('request'); // POST 요청하기 http://www.google.com
      const options = { 
        uri:'https://nel951.kro.kr/Dday', 
        method: 'GET',
        json:true 
      }
        request.get(options, function (error, response, body) {
          console.log(body)
          res.render("StudyTip.ejs",{tips:tipdata,text:body.text,writer:body.writer})
        })
    })
})

router.get('/', async (req,res) => {
    res.render('StudyGroup.html')
})

router.use('/community',studycommunity)

module.exports = router