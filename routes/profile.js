const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../models/Profile')
const User = require('../models/User')

// get profile of the current user 
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar', 'events'])
        if (!profile)
            return res.status(400).json({ msg: 'There is no profile' })

        res.json(profile)
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// create or update the user profile
router.post('/', 
    [ auth,
        [
            check('company' , 'Company name is required').not().isEmpty(),
            check('designation' , 'Designation is required').not().isEmpty(),
            check('mobile' , 'Mobile number is required').not().isEmpty()
        ]
    ], 
    async (req, res) => {

        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        const {
            company,
            designation,
            mobile,
            website,
            location,
            bio,
            twitter,
            facebook,
            linkedin,
            instagram
        } = req.body

        // profile object
        const profileFields = {}
        profileFields.user = req.user.id
        profileFields.company = company
        profileFields.designation = designation
        profileFields.mobile = mobile
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio

        profileFields.social = {}
        if (bio) profileFields.social.twitter = twitter
        if (bio) profileFields.social.facebook = facebook
        if (bio) profileFields.social.linkedin = linkedin
        if (bio) profileFields.social.instagram = instagram

        try {
            let profile = await Profile.findOne({ user: req.user.id })
            // if the profile is present then update it
            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                return res.json(profile)
            }
            // otherwise create the profile
            profile = new Profile(profileFields)
            await profile.save()
            res.json(profile)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).send('Server error')
        }
})

// get the profile of a particular user
router.get('/user/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id }).populate('user', ['name', 'avatar'])
        if (!profile)
            return res.status(400).json({ msg: 'Profile not found' })
        res.json(profile)
    }
    catch (err) {
        console.log(err.message)
        if (err.kind == 'ObjectId' || err.kind == undefined)
            return res.status(400).json({ msg: 'Profile not found' })
        res.status(500).send('Server error')
    }
})

// delete a profile, user
router.delete('/', auth, async (req, res) => {
    try {
        // remove the profile
        await Profile.findOneAndRemove({ user: req.user.id })
        // remove the user
        await User.findByIdAndRemove({ _id: req.user.id })
        res.json({ err: 'User deleted' })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// add experience
router.put('/experience', 
[ auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company name is required').not().isEmpty(),
        check('from', 'From Date is required').not().isEmpty()
    ]
], async (req, res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    const {
        title, // required
        company, // required
        location, 
        from, // required
        to,
        current,
        description
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    } 
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}) 

// add education
router.put('/education', 
[ auth,
    [
        check('school', 'School Name is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('from', 'From Date is required').not().isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    
    const {
        school,
        degree,
        from,
        to,
        current,
        description
    } = req.body

    const newEdu = {
        school,
        degree,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.education.unshift(newEdu)
        await profile.save()
        res.json(profile)
    } 
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router