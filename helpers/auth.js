const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

function auth(req, res, next) {
    let token = req.headers['authorization']

    if (!token) {
        return res.sendStatus(403)
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user.user
        next()
    })
}

function sign(seed) {
    return jwt.sign({ user: seed }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 * 30 })
}

module.exports = { auth, sign }