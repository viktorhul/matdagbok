const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('./helpers/mysql')

app.use(express.static('build'))

app.use(express.json())
app.use(cors())

app.get('/db', async (req, res) => {
    const boy = await mysql.query("SELECT * FROM ingredients;")
    return res.json({ ok: true, data: boy })
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/ingredients', require('./routes/ingredients'))
app.use('/api/consumption', require('./routes/consumption'))

app.get('/api/*', (req, res) => res.sendStatus(404))
app.post('/api/*', (req, res) => res.sendStatus(404))

app.get(/.*/, (req, res) => res.sendFile(__dirname + '/build/index.html'))

app.listen(3000, () => console.log('Running'))