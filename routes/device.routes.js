const {Router} = require('express')
const Device = require('../models/Device')
const TypeDevice = require('../models/TypeDevice')
const {check, validationResult} = require("express-validator");
const SectionMap = require("../models/SectionMap");
const DataDevice = require("../models/DataDevice");
const passport = require("passport");
const router = Router()

// /api/device
router.get(
    '/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const deviceAll = await Device.find({})
            if(!deviceAll) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            return res.json(deviceAll)
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
            const device = await Device.findById(req.params.id)
            if(!device) {
                return res.status(404).json({ message: 'Устройство не найден'})
            }
            return res.json(device)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })

router.post(
    '/',
    [
        check('name', 'Введите уникальное название устройства').exists(),
        check('idSection', 'Выберете анкерный участок').exists(),
        check('idType', 'Выберете тип устройства').exists(),
        passport.authenticate('jwt', {session: false}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при добавлении устройства'
                })
            }
            const {name, idSection, idType} = req.body
            const candidate = await Device.findOne({name})
            const candidateSection = await SectionMap.findById(idSection)
            const candidateType = await TypeDevice.findById(idType)
            console.log(candidateSection)
            if (candidate) {
                return res.status(400).json({message:'Такое устройство уже существует'})
            }
            if (!candidateSection) {
                return res.status(400).json({message:'Анкерный участок не существует'})
            }
            if (!candidateType) {
                return res.status(400).json({message:'Тип не существует не существует'})
            }

            const newDevice = new Device({name, idSection : idSection, idType: idType})

            await newDevice.save()

            return res.status(201).json({message: 'Устройство создано'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    }
)

router.post(
    '/many',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
           req.body.map(async (item) => {
               const {name, idSection, idType} = item
               const candidate = await Device.findOne({name})
               const candidateSection = await SectionMap.findById(idSection)
               const candidateType = await TypeDevice.findById(idType)
               if (candidate) {
                   return res.status(400).json({message: 'Такое устройство уже существует'})
               }
               if (!candidateSection) {
                   return res.status(400).json({message: 'Анкерный участок не существует'})
               }
               if (!candidateType) {
                   return res.status(400).json({message: 'Тип не существует не существует'})
               }

               const newDevice = new Device({name, idSection: idSection, idType: idType})
               await newDevice.save()
           })
            return res.status(201).json({message: 'Устройства созданы'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    }
)

router.get(
    '/:id/data',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const device = await Device.findById(req.params.id)
            if (!device) {
                return res.status(404).json({ message: 'Такого устройства нет'})
            }

            const {page, limit} = req.query
            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 50,
                sort: '-date'
            }

            const data = await  DataDevice.paginate({idDevice: req.params.id}, options)
            if(!data) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            return res.json(data)
        } catch (e) {
            res.status(500).json({ message: 'При получении данных что-то пошло не так'})
        }
    }
)


router.post(
    '/:id/data',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const candidate = await Device.findById(req.params.id)
            if (!candidate) {
                return res.status(400).json({message: 'Такого устройства нет'})
            }
            req.body.map(async (item) => {
                const {data, date} = item
                const newData = new DataDevice({idDevice : req.params.id, data, date: (date) ? date : Date.now()})
                await newData.save()
            })
            return res.status(201).json({message: 'Данные добавлены'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    }
)
router.post(
    '/many-data',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            req.body.map(async (item) => {
                const {idDevice, bodyData} = item
                const candidate = await Device.findById(idDevice)
                if (!candidate) {
                    return res.status(400).json({message: 'Такого устройства нет'})
                }
                bodyData.map(async (item) => {
                    const {data, date} = item
                    const newData = new DataDevice({idDevice, data, date: (date) ? date : Date.now()})
                    await newData.save()
                })
            })
            return res.status(201).json({message: 'Данные добавлены'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    }
)

router.delete(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const device = await Device.findByIdAndRemove(req.params.id)
            if(!device) {
                return res.status(404).json({ message: 'Устройство не найдено'})
            }
            return res.status(202).json({ message: 'Устройство удалено'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })

router.put(
    '/:id',
    [
        check('name', 'Введите уникальное название устройства').exists(),
        check('idSection', 'Выберете анкерный участок').exists(),
        passport.authenticate('jwt', {session: false}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при обновлении устройства'
                })
            }
            const {name, idSection} = req.body

            const candidate = await Device.findOne({name})

            const candidateSection = await SectionMap.findById(idSection)

            if (candidate) {
                return res.status(400).json({message:'Такое устройство уже существует'})
            }
            if (!candidateSection) {
                return res.status(400).json({message:'Анкерный участок не существует'})
            }
            const oldDevice = await Device.findByIdAndUpdate(req.params.id, {name, idSection})

            if (!oldDevice) {
                return res.status(400).json({message:'Такое устройство уже существует'})
            }

            return res.status(201).json({message: 'Устройство обновлено'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })



module.exports = router