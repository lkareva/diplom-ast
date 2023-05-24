const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
    idDevice: {type: Schema.Types.ObjectId,
                ref: 'Device',
                required: true}, //с какого устройства были взяты данные
    data: {type: Map, required: true}, //сами данные
    date: {type: Date, required: true} //время

})

schema.plugin(mongoosePaginate)

module.exports = model('DataDevice', schema)