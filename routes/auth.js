const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// database models
const User = require('../models/User')

// authenticating the user token
router.get('/' , auth , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// login the user with the authenticated token\
router.post('/', 
    [
        // checking whether the email is valid or not
        check('email', 'Please include a valid email').isEmail(),
        // checking the password
        check('password', 'Please enter the password of minimum length 6').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        const { email, password } = req.body

        try {
            let user = await User.findOne({ email })

            if (!user)
                return res.status(400).json({ errors: [{ msg: 'Invalid crendetials' }] })

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) 
                return res.status(400).json({ errors: [{ msg: 'Invalid crendetials' }] })
            

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
            res.status(500).send('Server error')
        }
    }
)

// export the router
module.exports = router