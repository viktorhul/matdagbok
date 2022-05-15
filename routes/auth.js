const { sign } = require('../helpers/auth')
const mysql = require('../helpers/mysql')

const express = require('express')
const router = express.Router()

router.post('/create-user', async (req, res) => {
    let username = req.body.username
    const password = req.body.password

    if (!username || !password || username == "" || password == "") {
        return res.json({ ok: false, msg: "Användarnamn och lösenord måste anges" })
    }

    username = username.toString().toLowerCase()

    const createdUser = await mysql.createUser({ username, password })

    return res.json({ ok: createdUser })
})

router.post('/login', async (req, res) => {
    let username = req.body.username
    const password = req.body.password

    if (!username || !password) return res.json({ ok: false, msg: "Användarnamn och lösenord måste anges" })

    username = username.toString().toLowerCase()

    const validation = await mysql.validateUser(username, password)

    if (validation.status) {
        const token = sign(validation.user_id)
        return res.json({ ok: true, token, username })
    } else {
        return res.status(401).json({ ok: false })
    }
})

module.exports = router
