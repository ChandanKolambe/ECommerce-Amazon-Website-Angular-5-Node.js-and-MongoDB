const express = require("express"); //
const bodyParser = require("body-parser"); //
const morgan = require("morgan");
const nodemon = require("nodemon");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const app = express(); //

app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: false })); //
app.use(morgan("dev"));
app.use(cors());

mongoose.connect(config.dbUrl, { useMongoClient: true }, err => {
    if (err) {
        console.log("Error:" + err);
    } else {
        console.log("Connect to MongoDB");
    }
});

/*
 app.get("/", (req, res, next) => {
   res.json({ user: "Chandan" });
 });

app.get('/', function (req, res) {

    res.send('Hello World')
})
*/

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes = require('./routes/seller');
const productSearchRoutes = require('./routes/product-search');

app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/search', productSearchRoutes);

app.listen(config.port, err => {
    console.log("Server on port " + config.port);
});


