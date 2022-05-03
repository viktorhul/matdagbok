const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

const express = require('express')
const router = express.Router()

const db = new JsonDB(new Config("db", true, false, '/'))

function addConsumption(consumption) {
    const { name, amount } = consumption

    if (!name) return { ok: false, msg: 'Name missing on ingredient' }
    if (!amount) return { ok: false, msg: 'Amount missing on ingredient' }

    const dbIngredient = db.getData('/ingredients').find(i => i.name.toLowerCase() == name.toLowerCase())

    const energy = dbIngredient.energy * amount / 100

    const date = new Date()
    const data = {
        date: [
            date.getFullYear(),
            date.getMonth(),
            date.getDay()
        ],
        name: dbIngredient.name,
        energy
    }

    db.push('/consumption', [data], false)

    return { ok: true }
}

router.post('/add', (req, res) => {
    const consumption = req.body.consumption

    if (Array.isArray(consumption)) {
        consumption.forEach(i => addConsumption(i))
    } else {
        addConsumption(consumption)
    }

    res.json({ ok: true })
})

router.get('/day/:year/:month/:day', (req, res) => {
    const { year, month, day } = req.params

    const todayConsumption = db.getData('/consumption').filter(c => c.date[0] == year && c.date[1] == month && c.date[2] == day)

    res.json({ ok: true, data: todayConsumption })
})

router.get('/', (req, res) => {
    const data = db.getData('/consumption')
    res.json({ ok: true, data })
})

module.exports = router