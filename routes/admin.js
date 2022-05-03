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

router.get('/community/remove/:id',async (req,res) => {
    var params = req.params
    var name = params.id
    fs.readFile("./static/data/communitydata.json", (err,data) => {
            decrypt(data,(timedata) => {
            delete timedata[name]
            timedata_en = encrypt(timedata)
            fs.writeFileSync("./static/data/communitydata.json",timedata_en,(err) => {
                console.log(err);
                res.status(404).redirect('/')
            })
      res.send(timedata)
        })
    })
})

router.get('/community/remove/:id/:contentid',async (req,res) => {
    var params = req.params
    var name = params.id
    var contentid = params.contentid
    fs.readFile("./static/data/communitydata.json", (err,data) => {
            decrypt(data,(timedata) => {
            delete timedata[name][3][contentid]
            timedata_en = encrypt(timedata)
            fs.writeFileSync("./static/data/communitydata.json",timedata_en,(err) => {
                console.log(err);
                res.status(404).redirect('/')
            })
      res.send(timedata)
        })
    })
})

router.get('/',async (req,res) => {
    var datas = new Array()
    fs.readdir('./static/data',(err, files) => {
        files.forEach(file => {
            fs.readFile(`./static/data/${file}`, (err,data) => {
              console.log(err)  
      console.log(file)
              try{
                  decrypt(data,(data_) => {
                        datas.push(data_)
                        console.log(data_)
                })
              }catch(error){
                  console.log(data)
              }
            })
          
        })
    })
})

module.exports = router