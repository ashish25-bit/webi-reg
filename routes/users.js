const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

// database models
const User = require('../models/User')

// registering the user
router.post('/',
    [
        // checking the username
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        // checking whether the email is valid or not
        check('email', 'Please include a valid email').isEmail(),
        // checking the password
        check('password', 'Please enter the password of minimum length 6')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        const { name, email, password } = req.body

        try {
            let user = await User.findOne({ email })

            if (user)
                return res.status(400).json({ errors: [{ msg: 'User Already exists' }] }) // 400 -> bad request

            const avatar = gravatar.url(email , {
                s: '200',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                password,
                avatar
            })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                'webinar-secret-token',
                {expiresIn: 360000},
                (err, token) => {
                    if(err) throw err
                    res.json( { token } )
            })
        }
        catch (err) {
                console.log(err.message)
                res.status(500).send('Server error') // 500 -> server error
        }
    })

// export the router
module.exports = router