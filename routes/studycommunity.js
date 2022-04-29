const express = require('express')
const fs = require('fs')
const router = express.Router()
const decrypt = require('../modules/decrypt')
const encrypt = require('../modules/encrypt')

router.get('/',async (req,res) => {
    fs.readFile('/static/data/communitydata.json',(err,data) =>{
        decrypt(data,(data_) => {
            res.render("community.ejs",{views : Object.entries(data_)})
        })
    })
})

router.get('/form', async (req,res) => {
    res.render('communityform')
})

router.post('/upload',async (req,res) => {
    const body = req.body
    const name = rtn_(req.session.key).properties.nickname
    const title = body.title
    const content = body.content
    fs.readFile('/static/data/communitydata.json',(err,data) => {
        decrypt(data, (data_) => {
            data_[name] = [title,content]           //{이름 : [제목, 내용]}
            let data_en = encrypt(data_)
            fs.writeFileSync('/static/data/communitydata.json',data_en,(err) => {
                console.log(err)
                res.status(404)
            })
            res.redirect('/studygroup/community')
        })
    })
})