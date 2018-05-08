var mongoose = require('mongoose')
var cdSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true

    },
    type: {
        type: String
    },
    stock: {
        type: String
    }
});

var Cd = module.export = mongoose.model('Cd', cdSchema)

module.exports.getCds = function (callback, limit) { //ดึงข้อมูล cd ทั้งหมด
    console.log("Find all CD");
    Cd.find(callback).limit(limit)
};

module.exports.searchCd = function (name, callback) { //ค้นหาข้อมูลตามชื่อ cd
    console.log("Search CD name : " + name);
    Cd.find({name: name}, callback)
};

module.exports.buyCd = function (cd, callback) { //ลบจำนวน cd
    console.log("Buy CD id : " + cd.id);
    Cd.update({_id: cd.id}, {$set: {stock: cd.total}}, callback)
};

module.exports.addCd = function (cd, callback) { //เพิ่ม cd
    console.log("Add CD name : " + cd.name);
    Cd.create({name: cd.name, price: cd.price, type: cd.type, stock: cd.stock}, callback)
};