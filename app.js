const express = require('express')
const session = require('express-session');
const path = require("path")
const app = express()
const De = require('dotenv')
const cors = require("cors")
const port = 8080
const studytime = require('./routes/studytme')
const kakologin = require('./routes/kakaoLogin')
const admin = require('./routes/admin')
const studygroup = require('./routes/studygroup')
const corsOptions = {
    origin: 'http://localhost',
    credentials: true
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

app.use('/studytime',studytime)
app.use('/kakologin',kakologin)
app.use('/admin',admin)
app.use('/studygroup',studygroup)

app.get("/",async (req,res) => {
    res.sendFile("Home.html")
})

app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})