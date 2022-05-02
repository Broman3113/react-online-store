require('dotenv').config(); //To read .env
const express = require('express');
const sequelize = require('./db'); //
const models = require('./models/models'); //Importing our entities
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const fileupload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload({}));
app.use('/api', router);

// Error handling
app.use(errorHandler)


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
