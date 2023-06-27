const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
require('dotenv').config();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/gfg');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var app = express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign-up', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;

    var data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone
    }
    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('signup_success.html');
})


app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
});

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1); // Exit the process if unable to connect to the database
    }
};

connectToMongoDB();

console.log(process.env.DB_CONNECTION)
app.listen((req, res) => {
    console.log("listening on port 3000")

})


