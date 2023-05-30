const {Router} = require('express')
const TypeDevice = require('../models/TypeDevice')
const {check, validationResult} = require("express-validator");
const passport = require("passport");
const Device = require("../models/Device");
const router = Router()

// /api/type-device
router.get(
    '/',
    passport.authenticate('jwt', {session: false}),
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
    passport.authenticate('jwt', {session: false}),
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


router.get(
    '/:id/list-device',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const type = await TypeDevice.findById(req.params.id)
            if(!type) {
                return res.status(404).json({ message: 'Тип устройства не найден'})
            }
            const deviceAll = await Device.find({idType: req.params.id})
            if(!deviceAll) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            return res.json(deviceAll.map((i) => i._id))
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })

router.post(
    '/',
    [
        check('name', 'Введите название типа устройств').exists(),
        passport.authenticate('jwt', {session: false}),
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