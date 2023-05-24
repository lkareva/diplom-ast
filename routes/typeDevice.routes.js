const {Router} = require('express')
const TypeDevice = require('../models/TypeDevice')
const {check, validationResult} = require("express-validator");
const auth = require('../middleware/auth.middleware')
const SectionMap = require("../models/SectionMap");
const router = Router()

// /api/type-device
router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const typeDeviceAll = await TypeDevice.find({})
            if(!typeDeviceAll) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            return res.json(typeDeviceAll)
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
            const device = await TypeDevice.findById(req.params.id)
            if(!device) {
                return res.status(404).json({ message: 'Тип устройства не найден'})
            }
            return res.json(device)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })

router.post(
    '/',
    [
        check('name', 'Введите название типа устройств').exists(),
        auth
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при добавлении типа устройства'
                })
            }
            const {name} = req.body
            const candidate = await TypeDevice.findOne({name})
            if (candidate) {
                return res.status(400).json({message:'Такой тип устройства уже существует'})
            }


            const newDevice = new TypeDevice({name})

            await newDevice.save()

            return res.status(201).json({message: 'Тип устройства создан'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    }
)



module.exports = router