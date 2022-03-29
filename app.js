const express = require('express')
const path = require("path")
const app = express()
const cors = require("cors")
const fs = require("fs")
const port = 8000

app.use(express.urlencoded())
app.use(express.json())
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'/static')))
app.engine('html',require('ejs').renderFile)
app.use(cors())

Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/static/html/Home.html")
})

app.get("/studytip",(req,res) => {
    fs.readFile(__dirname+"/static/data/studytips.json", (err,data) => {
        const tipdata = JSON.parse(data)
        res.render(__dirname+"/static/html/StudyTip.ejs",{tips:tipdata})
    })
})

app.get("/studytime", (req,res) => {
    fs.readFile(__dirname+"/static/data/studytime.json",(err,data) => {
        var datadic = JSON.parse(data)
        datadic = Object.entries(datadic)
        .sort(([, a], [, b]) => b[0] - a[0])
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        // console.log(datadic);
        let datalist = new Array()
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
        res.render(__dirname+"/static/html/StudyTIme.ejs",{membersTime : datalist})
    })
})

app.post("/studytime/uploadtime",(req,res) => {
    const body = req.body
    const name = body.name
    const hr = parseInt(body.timeH)
    const min = parseInt(body.timeM)
    fs.readFile(__dirname+"/static/data/studytime.json", (err,data) => {
        var timedata = JSON.parse(data)
        const time = [min+hr*60,hr,min]
        // console.log(time);
        timedata[name] = time
        fs.writeFileSync(__dirname+"/static/data/studytime.json",JSON.stringify(timedata),(err) => {
            console.log(err);
            res.state(404)
        })
        res.redirect("/studytime")
    })

})

app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})