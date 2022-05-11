const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const router = express.Router()

const db = new JsonDB(new Config("db/db", true, false, '/'))

router.post('/login', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.json({ ok: false, msg: "username and password must be non-empty" })

    const users = db.getData('/users').find(u => u.username.toLowerCase() == username.toLowerCase())

    if (!users) return res.json({ ok: false, msg: "Incorrect credentials" })

    if (users.password != password) return res.json({ ok: false, msg: "Incorrect credentials" })

    const token = jwt.sign(users.username, process.env.TOKEN_SECRET);

    return res.json({ ok: true, token, username: users.username })
})

module.exports = router