const express = require('express')
const session = require('express-session');
const path = require("path")
const De = require('dotenv')
const cors = require("cors")
const studytime = require('./routes/studytme')
const kakologin = require('./routes/kakaoLogin')
const admin = require('./routes/admin')
const studygroup = require('./routes/studygroup')
const ejs = require('ejs')
const app = express()
const port = 8080
const corsOptions = {
    origin: 'http://localhost',
    credentials: true
}
let ejsOptions = {
    async: true
}
  

De.config()
app.use(express.urlencoded())
app.use(express.json())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/static/html'))
app.use(express.static(path.join(__dirname,'/static')))
app.use(cors(corsOptions));
app.use(session({
    secret: process.env['SESSION_SECRET'],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.engine('ejs', async (path, data, cb) => {
    try{
        let html = await ejs.renderFile(path, data, ejsOptions);
        cb(null, html);
    }catch (e){
        cb(e, '');
    }
});

app.use('/studytime',studytime)
app.use('/kakologin',kakologin)
app.use('/admin',admin)
app.use('/studygroup',studygroup)

app.get("/",async (req,res) => {
    res.render("Home")
})

app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})