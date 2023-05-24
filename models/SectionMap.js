const {Schema, model, Types} = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2");


const schema = new Schema({
    name: {type: String, required: true, unique: true}, //имя уникальное анкерного участка
    from: {type: String, required: true}, //имя участка дороги на котором расположен анкер
    desc: {type: Map},
    coordinates: [{}] // координаты в виде карты анкерного участка для отображения его на карте

})

schema.plugin(mongoosePaginate)

module.exports = model('SectionMap', schema)