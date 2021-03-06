require('dotenv').config(); //To read .env
const express = require('express');
const sequelize = require('./db'); //

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started at post ${PORT}`));
    } catch (e) {
        console.error(e)
    }
}

start();
