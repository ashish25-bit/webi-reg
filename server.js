const express = require('express')
const connectDb = require('./core/db')
// defining the routes
const userRoute = require('./routes/users') 
const authRoute = require('./routes/auth') 
const profileRoute = require('./routes/profile')
const eventRoute = require('./routes/event')

const app = express()
// connect to the databse
connectDb()

// initialize the body parser
app.use(express.json({extented: false}))

app.use('/api/users' , userRoute)
app.use('/api/auth' , authRoute)
app.use('/api/profile' , profileRoute)
app.use('/api/event' , eventRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT , () => console.log(`Server running on port ${PORT}`))