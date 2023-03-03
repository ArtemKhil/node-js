const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const configs = require("./configs/configs");
const {userRouter, carRouter, authRouter} = require("./routers");
const {cronRunner} = require("./cron");
const swaggerJson = require('./swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload());

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.MONGO_URL)
    console.log(`Server listen ${configs.PORT}`);
    // cronRunner();
});