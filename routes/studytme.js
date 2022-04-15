const express = require('express')
const fs = require("fs")
const decrypt = require('../modules/decrypt')
const encrypt = require('../modules/encrypt')
const call = require('../modules/call')
const router = express.Router()

const api_host = "https://kapi.kakao.com";

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
      if(data.toString().length != 0){
      var datadic = decrypt(data)
        datadic = Object.entries(datadic)
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
      }
        if (req.session.key) {
            var islogin = true
        }
        res.render("StudyTime.ejs",{membersTime : datalist, islogin, islogin})
    })
})

router.post("/uploadtime",async (req,res) => {
    const body = req.body
    const uri = api_host + "/v2/user/me";
    const param = {};
    const header = {
        'content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + req.session.key
    }
    var rtn = await call('POST', uri, param, header);
    const name = rtn.properties.nickname
    const hr = parseInt(body.timeH)
    const min = parseInt(body.timeM)
    fs.readFile("./static/data/studytime.json", (err,data) => {
      var timedata = {};
      if(data.toString().length != 0) timedata = decrypt(data)
        const time = [min+hr*60,hr,min]
        timedata[name] = time
        timedata_en = encrypt(timedata)
        fs.writeFileSync("./static/data/studytime.json",timedata_en,(err) => {
            console.log(err);
            res.state(404)
        })
        res.redirect("/studytime")
    })

})

module.exports = router