const fetch = require('node-fetch');

const dataSourceUrl = 'http://www.omdbapi.com?apikey=2baf24d1&i=';

async function getData(movieId){
    try {
        const response = await fetch(dataSourceUrl+movieId);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports.getData = getData;