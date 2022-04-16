const express = require('express')
const fs = require("fs")
const decrypt = require('../modules/decrypt')
const encrypt = require('../modules/encrypt')
const call = require('../modules/call')
const router = express.Router()
const rtn_ = require('../modules/callprofile')

Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}

router.get("/", async (req,res) => {
    fs.readFile("./static/data/studytime.json",(err,data) => {
        var datalist = new Array();
        decrypt(data,(datadic) => {
            var datadic = Object.entries(datadic)
            .sort(([, a], [, b]) => b[0] - a[0])
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
            Object.entries(datadic).forEach(key => {
                const name = key[0]
                let val = key[1]
                const dic = {}
                if(datalist.length == 0){
                    dic[name]
                }
                dic[(datalist.length+1).toString() + "등" +" "+ name] = val
                datalist.push(dic)
            })
        })
        if (req.session.key) {
            var islogin = true
        }
        res.render("StudyTime.ejs",{membersTime : datalist, islogin, islogin})
    })
})

router.post("/uploadtime",async (req,res) => {
    const body = req.body
    const name = rtn_(req.session.key).properties.nickname
    const hr = parseInt(body.timeH)
    const min = parseInt(body.timeM)
    fs.readFile("./static/data/studytime.json", (err,data) => {
        decrypt(data, (timedata) => {
            const time = [min+hr*60,hr,min]
            timedata[name] = time                   //{이름 : [시간]}
            timedata_en = encrypt(timedata)
            fs.writeFileSync("./static/data/studytime.json",timedata_en,(err) => {
                console.log(err);
                res.status(404)
            })
            res.redirect("/studytime")
        })
    })

})

module.exports = router