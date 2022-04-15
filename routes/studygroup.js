const express = require('express')
const router = express.Router()

app.get("/tip",async (req,res) => {
    fs.readFile("../static/data/studytips.json", (err,data) => {
        const tipdata = JSON.parse(data)
        res.render("../static/html/StudyTip.ejs",{tips:tipdata})
    })
})
