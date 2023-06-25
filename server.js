const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const port = process.env.PORT || 8080;

const {adminApp} = require('./Routes/admin');
const {websiteApp} = require('./Routes/website');

app.use('/admin' ,adminApp);
app.use('/website',websiteApp);

app.listen(port, function (){
    console.log(`running on http://localhost:${port}`)
});
