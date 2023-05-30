const {Router} = require('express')
const SectionMap = require('../models/SectionMap')
const {check, validationResult} = require("express-validator");
const Device = require("../models/Device");
const DataDevice = require("../models/DataDevice");
const passport = require("passport");
const router = Router()

// /api/section-map
router.get(
    '/all',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const sectionMapAll = await SectionMap.find({})
            if(!sectionMapAll) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            return res.json(sectionMapAll)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    }
)
router.get(
    '/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const {page, limit} = req.query
            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 10
            }
            const sectionMapAll = await SectionMap.paginate({}, options)

            if(!sectionMapAll) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            return res.json(sectionMapAll)
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
            const sectionMap = await SectionMap.findById(req.params.id)
            if(!sectionMap) {
                return res.status(404).json({ message: 'Анкерный участок не найден'})
            }
            return res.json(sectionMap)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })
// api/section-map/:id
router.get(
    '/:id/device',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const sectionMap = await SectionMap.findById(req.params.id)
            if(!sectionMap) {
                return res.status(404).json({ message: 'Анкерный участок не найден'})
            }
            const deviceAll = await Device.find({idSection: req.params.id})
            if(!deviceAll) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            return res.json(deviceAll)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })

router.get(
    '/:idSection/device/:idDevice',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const sectionMap = await SectionMap.findById(req.params.idSection)
            if(!sectionMap) {
                return res.status(404).json({ message: 'Анкерный участок не найден'})
            }
            const deviceAll = await Device.findOne({idSection: req.params.idSection, "_id": req.params.idDevice})
            if(!deviceAll) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            const data = await  DataDevice.find({idDevice: req.params.idDevice})
            if(!data) {
                return res.status(404).json({ message: 'Ничего не найдено'})
            }
            return res.json(data)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })

router.post(
    '/',
    [
        check('name', 'Введите уникальное название анкерного участка').exists(),
        check('from', 'Введите название участка дороги').exists(),
        passport.authenticate('jwt', {session: false}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при добавлении анкерного участка'
                })
            }
            const {name, from, coordinates, desc} = req.body

            const coord = coordinates ? coordinates: []
            const candidate = await SectionMap.findOne({name})

            if (candidate) {
                return res.status(400).json({message:'Такой анкерный участок уже существует'})
            }

            const newSectionMap = new SectionMap({name: name, from: from, coordinates: coord, desc: desc})

            await newSectionMap.save()

            return res.status(201).json({message: 'Анкерный участок создан'})
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
            const sectionMap = await SectionMap.findByIdAndRemove(req.params.id)
            if(!sectionMap) {
                return res.status(404).json({ message: 'Анкерный участок не найден'})
            }
            return res.status(202).json({ message: 'Анкерный участок удален'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })

router.put(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    [
        check('name', 'Введите уникальное название анкерного участка').exists(),
        check('from', 'Введите название участка дороги').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при обновлении анкерного участка'
                })
            }
            const {name, from, coordinates, desc} = req.body

            const coord = coordinates ? coordinates: []
            const oldSectionMap = await SectionMap.findByIdAndUpdate(req.params.id, {name: name, from: from, coordinates: coord, desc:desc})

            if (!oldSectionMap) {
                return res.status(400).json({message:'Такой анкерный участок не существует'})
            }

            return res.status(201).json({message: 'Анкерный участок обновлен'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })
router.put(
    '/desc/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при обновлении анкерного участка'
                })
            }
            const { desc} = req.body

            const oldSectionMap = await SectionMap.findByIdAndUpdate(req.params.id, {desc:desc})

            if (!oldSectionMap) {
                return res.status(400).json({message:'Такой анкерный участок не существует'})
            }

            return res.status(201).json({message: 'Анкерный участок обновлен'})
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })



module.exports = router