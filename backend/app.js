const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

app.use(express.static('build'))

app.use(express.json())
app.use(cors())

app.use('/auth', require('./routes/auth'))
app.use('/ingredients', require('./routes/ingredients'))
app.use('/consumption', require('./routes/consumption'))

app.get(/.*/, (req, res) => res.sendFile(__dirname + '/build/index.html'))

app.listen(3000, () => console.log('Running'))