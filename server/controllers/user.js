const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { comparePassword } = require('../helpers/bcrypt')
const customError = require('http-errors')
const secret = process.env.JWT_SECRET || 'hacktiv8'

class UserController {
    static register = async (req, res, next) => {
        try {
            let newUser = {
                email: req.body.email,
                password: req.body.password
            }
            let registerNewUser = await User.create(newUser)
            res.status(201).json(registerNewUser)
        } catch (err) {
            next(err)
        }
    }

    static login = async (req, res, next) => {
        try {
            let loginEmail = { email: req.body.email }
            let loginPassword = req.body.password
            
            let user = await User.findOne({ where: loginEmail })
            if (!user) throw new customError(400)
            
            let passTest = await comparePassword(loginPassword, user.password)
            if (!passTest) throw new customError(400)
            
            let token = await jwt.sign({ id: user.id }, secret)
            if (!token) throw new customError(500)

            res.status(200).json({ token })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController