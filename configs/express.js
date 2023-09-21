const express = require('express');
const router = require('../routers/routes.js');
const app = express();

app.get('/', (req,res,next) => {
    res.send(`welcome to my socail app`);
    next();
});

app.use(express.json())
app.use('/api/v1', router)

module.exports = app;