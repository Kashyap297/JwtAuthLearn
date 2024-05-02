const express = require('express')

const app = express()
const PORT = 8000

app.listen(PORT, (err) => {
    if (err) {
        console.log('serever not start')
    }
    console.log(`listening on port http://localhost:${PORT}`)
})