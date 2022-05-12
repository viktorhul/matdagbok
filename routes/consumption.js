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

    if (token == null) {
        console.log('not authorized')
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
}

function addConsumption(consumption, mealName, userId) {
    //const { name, amount, calories } = consumption

    //if (!name) return { ok: false, msg: 'Name missing on ingredient' }
    //if (!amount) return { ok: false, msg: 'Amount missing on ingredient' }

    //const dbIngredient = db.getData('/ingredients').find(i => i.name.toLowerCase() == name.toLowerCase())

    const dateObj = new Date()
    const date = [
        dateObj.getFullYear(),
        dateObj.getMonth() + 1,
        dateObj.getDate()
    ]

    const mappedConsumption = consumption.map(ingr => {
        const energy = Math.round(ingr.calories * ingr.amount / 100)
        return { name: ingr.name, amount: ingr.amount, energy }
    })

    const data = {
        meal_name: mealName,
        meal_id: dateObj.getTime(),
        date,
        ingredients: mappedConsumption
    }

    db.push('/consumption/' + userId, [data], false)

    return { ok: true }
}

router.post('/add', auth, (req, res) => {
    const consumption = req.body.consumption
    const mealName = req.body.meal_name;
    const userId = req.user;

    addConsumption(consumption, mealName, userId)
    /*if (Array.isArray(consumption)) {
        consumption.forEach(i => addConsumption(i, mealName, userId))
    } else {
    }*/

    res.json({ ok: true })
})

router.get('/day/:date', auth, (req, res) => {
    const userId = req.user
    const [year, month, day] = req.params.date.split('-')

    const userConsumption = db.getData('/consumption')

    if (!userConsumption[userId]) return res.json({ ok: true, data: [] })

    const todayConsumption = userConsumption[userId].filter(c => c.date[0] == year && c.date[1] == month && c.date[2] == day)

    res.json({ ok: true, data: todayConsumption })
})

router.get('/meal/:meal_id', auth, (req, res) => {
    const userId = req.user;
    const mealId = req.params.meal_id;

    const meal = db.getData('/consumption/' + userId).filter(c => c.meal_id == mealId)

    if (!meal) return res.json({ ok: false, msg: 'No meal found' })

    return res.json({ ok: true, data: meal })

})

module.exports = router
