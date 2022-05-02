const express = require('express')
const fs = require('fs')
const router = express.Router()
const decrypt = require('../modules/decrypt')
const encrypt = require('../modules/encrypt')
const rtn_ = require('../modules/callprofile')

async function getviews() {
    fs.readFile('./static/data/communitydata.json',(err,data) =>{
        if(data == undefined){
            return {}
        }else{
            decrypt(data,(data_) => {
                return data_
            })
        }
    })
}

router.get('/',async (req,res) => {
    if (req.session.key == undefined){
        res.send('<script>alert("카카오 로그인이 필요합니다");window.location = "/kakologin/authorize"</script>')
    }
    refrashdata()
    let views = Object.entries(await getviews)
    res.render("community",{views : views})
    
})

router.get('/form', async (req,res) => {
    if (req.session.key) {
        var islogin = true
    }else{
      var islogin = false
    }
    res.render('communityform.ejs',{islogin: islogin})
})

router.get('/:id',async (req,res) => {
    
    if (req.session.key) {
        var islogin = true
    }else{
      var islogin = false
    }
    let view = await getviews()[req.params.id]
    if(view != undefined){
        res.render('view.ejs',{islogin: islogin, view: view})
    }else{
        res.redirect('/')
    }
})

router.post('/upload',async (req,res) => {
    const body = req.body
    let rtn = await rtn_(req.session.key)
    const name = rtn.properties.nickname
    const title = body.title
    const content = body.content
    fs.readFile('./static/data/communitydata.json',(err,data) => {
        decrypt(data, (data_) => {
            data_[Object.keys(data_).length] = [name,title,content,[]]        //{num : [name,제목, 내용,[ [name,content], [] ] ]}
            let data_en = encrypt(data_)
            fs.writeFileSync('./static/data/communitydata.json',data_en,(err) => {
                console.log(err)
                res.status(404)
            })
            res.redirect('/studygroup/community')
        })
    })
})

router.post('/:id/upload',async (req,res) => {
    const body = req.body
    const id = req.params.id
    const view = await getviews()[id]
    let rtn = await rtn_(req.session.key)
    const name = rtn.properties.nickname
    const content = body.content
    view[3].push([name,content])
    let data_en = encrypt(view)
    fs.writeFileSync('./static/data/communitydata.json',data_en,(err) => {
        console.log(err)
        res.status(404)
    })
    res.send(`<script> window.location = "/studygroup/community/${id}" </script>`)
})

module.exports = router