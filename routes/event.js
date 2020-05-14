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
                postedBy: req.user.id
            })
            const event = await newEvent.save()
            res.json(event)
        }
        catch (err) {
            console.log(err.message)
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
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// get the event detail of a particular event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event)
            return res.status(400).json({ msg: 'Event not found' })
        res.json(event)
    }
    catch (err) {
        console.error(err.message)
        if (err.kind == 'Objectid' || err.kind == undefined)
            return res.status(400).json({ msg: 'Event not found' })
        res.status(500).send('Server error')
    }
})

// register for an event
router.put('/resgister/:id', auth, async (req, res) => {
    const event = await Event.findById(req.params.id)
    const user = await User.findById(req.user.id)
    // register the user if not present in the attendee list
    if (!event.attendee.includes(req.user.id)) {
        event.attendee.push(req.user.id)
        await event.save()
        user.events.push(req.params.id)
        await user.save()
        res.send('You have registered for this webinar..')
    }
    // if already resgistered remove from the attendee list
    else {
        index = event.attendee.indexOf(req.user.id)
        event.attendee.splice(index,1)
        await event.save()
        index = user.events.indexOf(req.params.id)
        user.events.splice(index,1)
        await user.save()
        res.send('You have successfully de-registered from this webinar..')
    }
})

module.exports = router