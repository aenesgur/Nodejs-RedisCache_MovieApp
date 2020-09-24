const express = require('express');

let port = process.env.PORT || 3000;
const movieRouter = require('../routes/movieRouter');

const app = express();

app.use('/movie/', movieRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});