const call = require('./call')

const api_host = "https://kapi.kakao.com";
const uri = api_host + "/v2/user/me";
const param = {};
async function rtn_(key){
    const header = {
        'content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + key
    }
    var rtn = await call('POST', uri, param, header);
}

module.exports = rtn_