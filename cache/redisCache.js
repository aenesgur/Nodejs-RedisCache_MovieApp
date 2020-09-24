const redis = require('async-redis');
let redisPort = process.env.PORT || 6379;
const client = redis.createClient(redisPort);

const expirationTime = 300; //second
const movieKeyFormat = 'movie.id=';

async function setCache(movieId, data){
    var key = movieKeyFormat+movieId;
    return await set(key,JSON.stringify(data))
}

async function set(key, data){
     await client.setex(key,expirationTime, data);
}

async function getCache(movieId){
    var key = movieKeyFormat+movieId;
    var data = await get(key);
    return JSON.parse(data);
}

async function get(key) {
     return await client.get(key);
}

async function clearCache(movieId){
    var key = movieKeyFormat+movieId;
    return await clear(key);
}
async function clear(key){
      return  await client.del(key);
}

module.exports.getCache = getCache
module.exports.setCache = setCache
module.exports.clearCache = clearCache