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
})

var Cd = module.export = mongoose.model('Cd', cdSchema)

module.exports.getCds = function (callback, limit) { //ดึงข้อมูล cd ทั้งหมด
    Cd.find(callback).limit(limit)
}

module.exports.getCdByName = function (name, callback) { //ค้นหาข้อมูลตามชื่อ cd
    Cd.find({name: name}, callback)
}

module.exports.buyCdByName = function (name, callback) { //ลบจำนวน cd
    Cd.update({name: name}, {$inc: {stock: 1}}, callback)
}

module.exports.addCd = function (cd, callback) { //เพิ่ม cd
    console.log(cd.name)
    Cd.create({name: cd.name, price: cd.price, type: cd.type, stock: cd.stock}, callback)
    // Cd.create({name: name, price: price, type: type, stock: stock}, callback)
}