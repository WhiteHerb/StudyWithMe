const express = require('express')
const fs = require('fs')
const router = express.Router()
const decrypt = require('../modules/decrypt')
const encrypt = require('../modules/encrypt')
let viewlist
function refrashdata() {
    fs.readFile('/static/data/communitydata.json',(err,data) =>{
        if(data == undefined){
            viewlist = {}
        }else{
            decrypt(data,(data_) => {
                viewlist = data_
            })
        }
    })
}

router.get('/',async (req,res) => {
    if (req.session.key == undefined){
        res.send('<script>alert("카카오 로그인이 필요합니다");window.location = "/kakologin/authorize"</script>')
    }
    res.render("community",{views : Object.entries(viewlist)})
    
})

router.get('/form', async (req,res) => {
    if (req.session.key) {
        var islogin = true
    }
    res.render('communityform',{islogin:islogin})
})

router.get('/:id',async (req,res) => {
    
    if (req.session.key) {
        var islogin = true
    }
    res.render('view',{islogin:islogin,view:viewlist[req.params.id]})
})

router.post('/upload',async (req,res) => {
    const body = req.body
    const name = rtn_(req.session.key).properties.nickname
    const title = body.title
    const content = body.content
    fs.readFile('/static/data/communitydata.json',(err,data) => {
        decrypt(data, (data_) => {
            data_[data_.keys().length] = [name,title,content,[]]        //{num : [name,제목, 내용,[ [name,content], [] ] ]}
            let data_en = encrypt(data_)
            fs.writeFileSync('/static/data/communitydata.json',data_en,(err) => {
                console.log(err)
                res.status(404)
            })
            res.redirect('/studygroup/community')
        })
    })
})

module.exports = router