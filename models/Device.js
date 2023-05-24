const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: true}, //имя уникальное устроства
    idSection: {type: Types.ObjectId,
                ref: 'SectionMap',
                required: true}, //анкерный участок на котором расположено устройство
    idType: {type: Types.ObjectId,
        ref: 'TypeDevice',
        required: true},
})

module.exports = model('Device', schema)