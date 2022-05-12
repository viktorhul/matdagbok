const { auth } = require('../helpers/auth')
const mysql = require('../helpers/mysql')

const express = require('express')
const router = express.Router()

router.post('/add', auth, async (req, res) => {
    if (!req.body.ingredients || !Array.isArray(req.body.ingredients) || req.body.ingredients.length == 0) {
        return res.json({ ok: false, msg: "[ingredients] must be set and be a non-empty array" })
    }

    const userId = req.user;
    const ingredients = req.body.ingredients.filter(i => i.name != "" && i.calories > 0).map(i => [i.name, i.calories, userId])

    const result = await mysql.addIngredients(ingredients)

    return res.json({ ok: result })
})

router.get('/', async (req, res) => {
    const ingredients = await mysql.getIngredients()
    res.json({ ok: true, data: ingredients.data })
})

module.exports = router
