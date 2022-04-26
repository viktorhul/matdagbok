const express = require('express')
const app = express()

app.use(express.json())

app.use('/receipts', require('./routes/receipts'))
app.use('/ingredients', require('./routes/ingredients'))
app.use('/meals', require('./routes/meals'))

app.listen(3000, () => console.log('Running'))