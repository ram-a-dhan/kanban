const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'hacktiv8'

module.exports = {
    authentication: async (req, res, next) => {
        try {
            let token = req.headers.token
            let decoded = await jwt.verify(token, secret)
            req.userData = decoded
            next()
        } catch (err) {
            next(err)
        }
    }
}