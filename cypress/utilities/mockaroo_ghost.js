const axios = require('axios');

function getPseudoData(callback){
    axios.get('https://my.api.mockaroo.com/ghost_test.json?key=d1be7180')
    .then(response => {
        callback(response.data);
    })
    .catch(error => {
        console.log("error");
    });
}


module.exports.getPseudoData = getPseudoData;
