const express = require('express')
const app = express()

app.use(express.json())

app.use('/ingredients', require('./routes/ingredients'))
app.use('/consumption', require('./routes/consumption'))

app.get('/', (req, res) => {
    res.status(400).json({ ok: true })
})

app.listen(3000, () => console.log('Running'))