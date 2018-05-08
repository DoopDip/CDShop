var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000;

Cd = require('./models/cd');

mongoose.connect('mongodb://localhost:27017/cd');
var db = mongoose.connection;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log("Open index.html");
    res.sendfile('index.html')
});

app.get('/api/cds', function (req, res) {
    Cd.getCds(function (err, cds) {
        if (err) throw err;
        res.json(cds)
    })
});

app.get('/api/cds/:name', function (req, res) {
    Cd.searchCd(req.params.name, function (err, cd) {
        if (err) throw err;
        res.json(cd)
    })
});

app.post('/api/buy', function (req, res) {
    Cd.buyCd(req.body.cd, function (err, cd) {
        if (err) throw err;
        res.json(cd)
    })
});

app.post("/api/add", function (req, res) {
    Cd.addCd(req.body.cd, function (err, cd) {
        if (err) throw err;
        res.json(cd)
    })
});

app.listen(port);
console.log("Start to port : "+port);