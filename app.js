const express = require('express');
const {fileServices} = require('./services');

const app = express();
const userRouter = require('./routers/user.router');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('Server listen 5000');
});

