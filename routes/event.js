const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Event = require('../models/Event')

// post an event
router.post('/',
    [auth,
        [
            check('name', 'Name of the event is required').not().isEmpty(),
            check('host', 'Host is required').not().isEmpty(),
            check('mail', 'Mail is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('date', 'Date is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        try {
            const newEvent = new Event({
                name: req.body.name,
                host: req.body.host,
                mail: req.body.mail,
                description: req.body.description,
                date: req.body.date,
                postedBy: req.user.id,
                tags: req.body.tags
            })
            const event = await newEvent.save()
            const user = await User.findById(req.user.id)
            const posted = { name: event.name, id: event.id }
            user.posted.unshift(posted)
            const updatedUser = await user.save()
            res.json(updatedUser)
        }
        catch (err) {
            console.log(err)
            res.status(500).send('Server error')
        }
    })

// get the event details
router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
        res.json(events)
    }
    catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// get the event detail of a particular event
router.get('/id/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event)
            return res.status(400).json({ msg: 'Event not found' })
        const userInfo = await User.find({}).where('_id').in(event.attendee).select('-password')
        res.json({users: userInfo, event})
    }
    catch (err) {
        console.error(err.message)
        if (err.kind == 'Objectid' || err.kind == undefined)
            return res.status(400).json({ msg: 'Event not found' })
        res.status(500).send('Server error')
    }
})

// register for an event
router.put('/register', auth, async (req, res) => {
    const event = await Event.findById(req.body.id)
    const user = await User.findById(req.user.id)
    // register the user if not present in the attendee list
    if (!event.attendee.includes(req.user.id)) {
        try {
            event.attendee.push(req.user.id)
            await event.save()
            user.events.push(req.body.id)
            const updatedUser = await user.save()
            res.json(updatedUser)
        }
        catch (err) {
            console.log(err.message)
            res.json({ error: 'Unable to register' })
        }
    }
    // if already resgistered remove from the attendee list
    else {
        try {
            index = event.attendee.indexOf(req.user.id)
            event.attendee.splice(index, 1)
            await event.save()
            index = user.events.indexOf(req.params.id)
            user.events.splice(index, 1)
            const updatedUser = await user.save()
            res.json(updatedUser)
        }
        catch (err) {
            console.log(err.message)
            res.json({ error: 'Unable to de-register' })
        }
    }
})

// search for events
router.post('/find', auth, async (req, res) => {
    const { key, type, id } = req.body
    try {
        const events = await Event.find({ postedBy: { $not: { $eq: id } } }).where(type).equals(key)
        res.json(events.length ? events : { msg: `Found Nothing for the keyword '${key}'` })
    }
    catch (err) {
        console.log(err.message)
        res.json({ msg: `Server Error` })
    }
})

// find details of all the events in which the user has registered
router.post('/registered', auth, async (req, res) => {
    try {
        const details = await Event.find({}).where('_id').in(req.body.id)
        res.json(details)
    }
    catch (err) {
        console.log(err)
        res.json({ error: err.message })
    }
})

// get the events for a particular day - the events for which you have registered
router.post('/date', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const events = await Event.find({ date: req.body.date }).where('_id').in(user.events)
        res.json(events.length ? events : {msg: 'No Webinars Today'})
    }
    catch (err) {
        console.log(err)
        res.json({ msg: err.message })
    }
})

module.exports = router