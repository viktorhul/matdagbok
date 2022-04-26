const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

const express = require('express')
const router = express.Router()

const db = new JsonDB(new Config("db", true, false, '/'))

function addMeal(meal) {
    const { ingredients = [] } = meal
    if (!ingredients.length) return { ok: false, msg: 'No ingredients' }

    const emptyNames = ingredients.filter(i => i.name == "")
    const emptyAmount = ingredients.filter(i => i.amount == 0)

    if (emptyNames.length) return { ok: false, msg: 'Name missing on ingredient' }
    if (emptyAmount.length) return { ok: false, msg: 'Amount missing on ingredient' }

    const dbIngredients = db.getData('/ingredients')

    const newIngredients = ingredients.map(i => {
        if (!i.amount) return i
        const energyIngredient = dbIngredients.find(n => n.name == i.name)
        if (!energyIngredient) return i

        const energy = energyIngredient.energy * i.amount / 100
        return { ...i, energy }
    })

    const data = {
        date: Date.now(),
        ingredients: newIngredients
    }

    db.push('/meals', [data], false)

    return { ok: true }
}

router.post('/add', (req, res) => {
    const result = addMeal(req.body)
    res.json(result)
})

router.get('/', (req, res) => {
    const data = db.getData('/meals')
    res.json({ ok: true, data })
})

module.exports = router