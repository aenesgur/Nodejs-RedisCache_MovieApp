const express = require('express');
const router = express.Router();

const { getData } =  require('../data_acces_layer/data');
const { getCache, setCache, clearCache } = require('../cache/redisCache');

router.get('/:movieId', (req, res, next) => {
    const { movieId } = req.params;

    (async() => {
        let data = await getCache(movieId);
        if(data !== null){
            return res.json(data);
        }
        
        data = await getData(movieId);
        if(data !== null){
            await setCache(movieId, data);
            return res.json(data);
        }
        return res.status(500);
    })();
});

router.delete('/:movieId', (req, res, next) => {
    const { movieId } = req.params;
    (async()=>{
        let result = await clearCache(movieId);
        if(result === 1){
            return res.json({Result: "Movie succesfully deleted from Redis Cache"});
        }
        return res.json({Result:`There is no value depend of key in Redis Server: ${movieId}`})
    })();
});

module.exports = router