const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/ingredients', require('./routes/ingredients'))
app.use('/consumption', require('./routes/consumption'))

app.get('/', (req, res) => {
    res.status(400).json({ ok: true })
})

app.listen(3000, () => console.log('Running'))