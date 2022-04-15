const express = require('express')
const router = express.Router();
const axios = require('axios');
const qs = require("qs");

const client_id = process.env['REST_SECRET'];
const redirect_uri = 'https://studywith.kro.kr/kakologin/redirect';
const token_uri = 'https://kauth.kakao.com/oauth/token';
const client_secret = '';

async function call(method, uri, param, header){
    try {
        rtn = await axios({
            method: method,
            url: uri,
            headers: header,
            data: param
        })
    } catch (err) {
        rtn = err.response;
    }
    return rtn.data;
}

router.get('/authorize', function (req, res) {
    let { scope } = req.query;
    var scopeParam = "";
    if (scope) {
        scopeParam = "&scope=" + scope;
    }
    res.status(302).redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code${scopeParam}`);
})

router.get('/redirect', async function (req, res) {
    const param = qs.stringify({
        "grant_type": 'authorization_code',
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "client_secret": client_secret,
        "code": req.query.code
    });
    const header = { 'content-type': 'application/x-www-form-urlencoded' };
    var rtn = await call('POST', token_uri, param, header);
    req.session.key = rtn.access_token;
    res.status(302).redirect('/');
})

// app.get('/profile', async function (req, res) {
//     const uri = api_host + "/v2/user/me";
//     const param = {};
//     const header = {
//         'content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Bearer ' + req.session.key
//     }
//     var rtn = await call('POST', uri, param, header);
//     res.send(rtn);
// })

module.exports = router