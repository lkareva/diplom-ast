const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: true}, //название типа устройств
})

module.exports = model('TypeDevice', schema)