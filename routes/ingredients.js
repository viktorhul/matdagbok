const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const router = express.Router()

const db = new JsonDB(new Config("db/db", true, true, '/'))

function auth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
}

function addIngredient(ingredient, userId) {
    const { name, calories, portion } = ingredient

    if (!name) { console.log("no name"); return { ok: false, msg: 'No name given' } }
    if (!calories) { console.log("no kcal given"); return { ok: false, msg: 'No kcal given' } }

    const current = db.getData('/ingredients').filter(i => i.name == name)

    if (current.length) { console.log("name taken"); return { ok: false, msg: 'Name already taken' } }

    const data = {
        name, calories, portion, owner: userId
    }
    db.push('/ingredients', [data], false)
    { console.log("ok"); return { ok: true } }
}

router.post('/add', auth, (req, res) => {
    const ingredients = req.body.ingredients
    console.log(ingredients)
    const userId = req.user;

    if (!ingredients) return res.json({ ok: false, msg: 'No ingredient' })

    if (Array.isArray(ingredients)) {
        ingredients.forEach(i => addIngredient(i, userId))
    } else {
        addIngredient(ingredients, userId)
    }

    res.json({ ok: true })
})

router.get('/', (req, res) => {
    const data = db.getData('/ingredients')
    res.json({ ok: true, data })
})

module.exports = router
