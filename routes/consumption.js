const { auth } = require('../helpers/auth')
const mysql = require('../helpers/mysql')

const express = require('express')
const router = express.Router()

router.post('/add', auth, async (req, res) => {
    if (!req.body.consumption || !Array.isArray(req.body.consumption) || req.body.consumption.length == 0) {
        return res.json({ ok: false, msg: "[consumption] must be set and be a non-empty array" })
    }

    const consumption = req.body.consumption.filter(c => c.name != "" && c.amount > 0 && c.calories > 0).map(c => [c.name, c.amount, c.calories])
    const date = req.body.date || new Date().toLocaleDateString('sv-SE')
    const mealName = req.body.meal_name || "Måltid";
    const userId = req.user;

    const result = await mysql.addMeal(mealName, date, userId, consumption)

    res.json({ ok: result.status })
})

router.get('/day/:date', auth, async (req, res) => {
    const userId = req.user
    const [year, month, day] = req.params.date.split('-')

    const regDate = req.params.date || null;

    if (!regDate) {
        return res.json({ ok: false, msg: "[date] must be set" })
    }

    const result = await mysql.getConsumptionFromDay(userId, regDate)

    return res.json({ ok: true, data: result.data })
})

router.get('/meal/:meal_id', auth, async (req, res) => {
    const userId = req.user;
    const mealId = req.params.meal_id || null;

    if (!mealId) {
        return res.json({ ok: false, msg: "[mealId] must be set and be valid" })
    }

    const result = await mysql.getMeal(mealId, userId)

    if (!result.status) {
        return res.json({ ok: false, msg: result.msg })
    }

    return res.json({ ok: true, data: result.data })
})

module.exports = router
