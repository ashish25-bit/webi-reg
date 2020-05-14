const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    postedOn: {
        type: Date,
        default: Date.now()
    },
    attendee: []
})

module.exports = Event = mongoose.model('event', EventSchema)