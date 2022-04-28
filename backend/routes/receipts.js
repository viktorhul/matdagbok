const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

const express = require('express')
const router = express.Router()

const db = new JsonDB(new Config("db", true, false, '/'))

function addReceipt(receipt) {
    if (!receipt.name) return { ok: false, msg: 'No name given' }

    const current = db.getData('/receipts').filter(r => r.name == receipt.name)

    if (current.length) return { ok: false, msg: 'Name already taken' }

    const data = {
        name: receipt.name,

    }

    db.push('/receipts', [data], false)
    return { ok: true }
}

router.get('/', (req, res) => {
    const data = db.getData('/receipts')
    res.json({ ok: true, data })
})

router.post('/add', (req, res) => {
    const { name } = req.body
    const result = addReceipt({
        name
    })
    res.json(result)
})

module.exports = router