const {Router} = require('express')
const Device = require('../models/Device')
const DataDevice = require('../models/DataDevice')
const {check, validationResult} = require("express-validator");
const auth = require('../middleware/auth.middleware')
const SectionMap = require("../models/SectionMap");
const router = Router()

// /api/data
router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const dataAll = await DataDevice.find({})
            if(!dataAll) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            return res.json(dataAll)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    }
)

router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const data = await DataDevice.findById(req.params.id)
            if(!data) {
                return res.status(404).json({ message: 'данных нет'})
            }
            return res.json(data)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })


router.post(
    '/',
    [
        check('data', 'Введите данные').exists(),
        check('idDevice', 'Выберете номер устройства').exists(),
        auth
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при добавлении данных'
                })
            }
            const {data, idDevice} = req.body
            const candidateSection = await Device.findById(idDevice)
            if (!candidateSection) {
                return res.status(400).json({message:'устройство не существует'})
            }

            const newData = new DataDevice({idDevice : idDevice, data, date: Date.now()})

            await newData.save()

            return res.status(201).json({message: 'данные добавлены'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    }
)

router.delete(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const data = await DataDevice.findByIdAndRemove(req.params.id)
            if(!data) {
                return res.status(404).json({ message: 'Данных нет'})
            }
            return res.status(202).json({ message: 'Данные удалены'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })

module.exports = router