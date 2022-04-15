const axios = require('axios')

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

module.exports = call