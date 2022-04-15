const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get("/tip",async (req,res) => {
    fs.readFile("./static/data/studytips.json", (err,data) => {
        const tipdata = JSON.parse(data)
        res.render("StudyTip.ejs",{tips:tipdata})
    })
})

module.exports = router