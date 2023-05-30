const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport');

const app = express()

app.use(express.json())
app.use(passport.initialize())
require('./middleware/auth.middleware')(passport)

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/section-map', require('./routes/sectionMap.routes'))
app.use('/api/device', require('./routes/device.routes'))
app.use('/api/type-device', require('./routes/typeDevice.routes'))
app.use('/api/data', require('./routes/dataDevice.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000
const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log (`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()