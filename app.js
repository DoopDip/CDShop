var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var port = 3000

Cd = require('./models/cd')

mongoose.connect('mongodb://localhost:27017/cd')
var db = mongoose.connection


app.get('/', function (req, res) {
    res.sendfile('index.html')
});

app.get('/api/cds', function (req, res) {
    Cd.getCds(function (err, cds) {
        if (err) throw err
        res.json(cds)
    })
});

app.get('/api/cds/:name', function (req, res) {
    Cd.getCdByName(req.params.name, function (err, cd) {
        if (err) throw err
        res.json(cd)
    })
})

app.get('/api/buy/:id', function (req, res) {
    Cd.buyCdByName(req.params.id, function (err, cd) {
        if (err) throw err
        res.json(cd)
    })
})

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/api/add", function (req, res) {
    console.log(req.body.cd.name)
    console.log(req.body.cd.price)
    Cd.addCd(req.body.cd, function (err, cd) {
        if (err) throw err
        res.json(cd)
    })
    // Cd.addCd(req.body.name, req.body.price, req.body.type, req.body.stock, function (err, cd) {
    //     if (err) throw err
    //     res.json(cd)
    // })
});

console.log(port);
app.listen(port)