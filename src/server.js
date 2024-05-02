const express = require('express')
const dbConnection = require('./config/db')
const Config = require('./config')
const userRouter = require('./routes/userRoute')

const app = express()
const PORT = Config.PORT || 5000

//server
dbConnection()

// routes
app.use('/api/user', userRouter)

app.listen(PORT, (err) => {
    if (err) {
        console.log('serever not start')
    }
    console.log(`listening on port http://localhost:${PORT}`)
})