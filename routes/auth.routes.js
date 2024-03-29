const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const passport = require('passport')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            const {email, password, fullName} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message:'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword, fullName: fullName || "" })

            await user.save()

            return res.status(201).json({message: 'Пользователь создан'})

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
        }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message:'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '12h'}
            )
            return res.json({token, userId: user.id, userEmail: user.email})

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
        }
})
router.get(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if(!user) {
                return res.status(404).json({ message: 'Пользователь не найден'})
            }
            return res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так'})
        }
    })

module.exports = router