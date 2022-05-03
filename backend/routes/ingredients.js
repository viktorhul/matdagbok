const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

const express = require('express')
const router = express.Router()

const db = new JsonDB(new Config("db", true, false, '/'))

function addIngredient(ingredient) {
    const { name, energy, portion, protein, kolhydrat, fett } = ingredient

    if (!name) return { ok: false, msg: 'No name given' }
    if (!energy) return { ok: false, msg: 'No kcal given' }

    const current = db.getData('/ingredients').filter(i => i.name == name)

    if (current.length) return { ok: false, msg: 'Name already taken' }

    const data = {
        name, energy, portion, protein, kolhydrat, fett
    }
    db.push('/ingredients', [data], false)
    return { ok: true }
}

router.post('/add', (req, res) => {
    const ingredients = req.body.ingredients

    if (!ingredients) return res.json({ ok: false, msg: 'No ingredient' })

    if (Array.isArray(ingredients)) {
        ingredients.forEach(i => addIngredient(i))
    } else {
        addIngredient(ingredients)
    }

    res.json({ ok: true })
})

router.get('/', (req, res) => {
    const data = db.getData('/ingredients')
    res.json({ ok: true, data })
})

module.exports = router