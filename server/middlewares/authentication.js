const jwt = require('jsonwebtoken')
const { User } = require('../models')
const secret = process.env.JWT_SECRET || 'hacktiv8'

module.exports = {
    authentication: async (req, res, next) => {
        try {
            let token = req.headers.token
            let decoded = await jwt.verify(token, secret)
            let matchUser = await User.findOne({ where: { id: decoded.id } })
            if (matchUser) req.userData = decoded
            next()
        } catch (err) {
            next(err)
        }
    }
}